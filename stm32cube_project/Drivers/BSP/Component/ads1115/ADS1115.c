/*
 * ADS1115.c
 *
 *  2023 . A.Romaszewski
 */

#include "ADS1115.h"
#include "app_conf.h"

static void prepareConfigFrame(uint8_t *pOutFrame, ADS1115_Config_t *pConfig);

// driver hbus_i2c1


int32_t ADS1115(ADS1115_Config_t *pConfig,uint16_t Addr)
{
	pConfig->Error = BSP_ERROR_NONE;
	pConfig->Addr = Addr;
	pConfig->Error = BSP_I2C1_Init();
	return(pConfig->Error);
}

/*
 * Test if component ADS1115 is present to the address
*/
int32_t ADS1115_present(ADS1115_Config_t *pConfig){
	pConfig->Error = BSP_I2C1_IsReady((pConfig->Addr << 1),2);
	return(pConfig->Error);
}

bool ADS1115_isReady(ADS1115_Config_t *pConfig)
{
  uint16_t val = ADS1115_readRegister(pConfig, ADS1115_REG_CONFIG);
  return ((val & ADS1X15_OS_NOT_BUSY) > 0);
}


void ADS1115_updateConfig(ADS1115_Config_t *pConfig){
	uint8_t bytes[3] = {0};
	prepareConfigFrame(bytes, pConfig);
	pConfig->Error = BSP_I2C1_WriteReg((pConfig->Addr << 1),bytes[0],&bytes[1],2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), bytes, 3, 100);
}


void ADS1115_updateAddress(ADS1115_Config_t *pConfig, uint16_t Addr){
	pConfig->Addr = Addr;
}

uint16_t ADS1115_oneShotMeasure(ADS1115_Config_t *pConfig){
	uint8_t bytes[3] = {0};
	prepareConfigFrame(bytes, pConfig);
	bytes[1] |= 0x80; // OS one shot measure

	pConfig->Error = BSP_I2C1_WriteReg((pConfig->Addr << 1),bytes[0],&bytes[1],2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), bytes, 3, 100);

	return ADS1115_getData(pConfig);
}

uint16_t ADS1115_getData(ADS1115_Config_t *pConfig){
	uint8_t bytes[2] = {0};
	while(1) {
		pConfig->Error = BSP_I2C1_ReadReg((pConfig->Addr << 1),ADS1115_REG_CONFIG,bytes,2);
		if ((bytes[0]&0x80)==0x80) break;
	}
	pConfig->Error = BSP_I2C1_ReadReg((pConfig->Addr << 1),ADS1115_REG_CONVERT,bytes,2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), bytes, 1, 50);
	uint16_t readValue = ((bytes[0] << 8) | bytes[1]);
	return readValue;
}


uint16_t ADS1115_readRegister(ADS1115_Config_t *pConfig,uint8_t reg){
	uint8_t bytes[2] = {0};
	pConfig->Error = BSP_I2C1_ReadReg((pConfig->Addr << 1),reg,bytes,2);
	uint16_t readValue = ((bytes[0] << 8) | bytes[1]);
	return readValue;
}

void ADS1115_setThresholds(ADS1115_Config_t *pConfig, int16_t lowValue, int16_t highValue){
	uint8_t ADSWrite[2] = { 0 };

	//hi threshold reg
	ADSWrite[0] = (uint8_t)((highValue & 0xFF00) >> 8);
	ADSWrite[1] = (uint8_t)(highValue & 0x00FF);
	pConfig->Error = BSP_I2C1_WriteReg((pConfig->Addr << 1),ADS1115_REG_HIGH_THRESHOLD,&ADSWrite[0],2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), ADSWrite, 3, 100);

	//lo threshold reg
	ADSWrite[0] = (uint8_t)((lowValue & 0xFF00) >> 8);
	ADSWrite[1] = (uint8_t)(lowValue & 0x00FF);
	pConfig->Error |= BSP_I2C1_WriteReg((pConfig->Addr << 1),ADS1115_REG_LOW_THRESHOLD,&ADSWrite[0],2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), ADSWrite, 3, 100);
}

void ADS1115_flushData(ADS1115_Config_t* pConfig){
	ADS1115_getData(pConfig);
}

void ADS1115_setConversionReadyPin(ADS1115_Config_t* pConfig){
	ADS1115_setThresholds(pConfig, 0x0000, 0xFFFF);
}

void ADS1115_startContinousMode(ADS1115_Config_t* pConfig){
	uint8_t bytes[3] = {0};
	pConfig->operatingMode = MODE_CONTINOUS;
	prepareConfigFrame(bytes, pConfig);
	pConfig->Error = BSP_I2C1_WriteReg((pConfig->Addr << 1),bytes[0],&bytes[1],2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), bytes, 3, 100);
}

void ADS1115_stopContinousMode(ADS1115_Config_t* pConfig){
	uint8_t bytes[3] = {0};
	pConfig->operatingMode = MODE_SINGLE_SHOT;
	prepareConfigFrame(bytes, pConfig);
	pConfig->Error = BSP_I2C1_WriteReg((pConfig->Addr << 1),bytes[0],&bytes[1],2);
	//HAL_I2C_Master_Transmit(pConfig->hi2c, (pConfig->Addr << 1), bytes, 3, 100);
}

static void prepareConfigFrame(uint8_t *pOutFrame, ADS1115_Config_t* pConfig){
	pOutFrame[0] = ADS1115_REG_CONFIG;
	pOutFrame[1] = pConfig->channel | pConfig->pgaConfig | pConfig->operatingMode ;
	pOutFrame[2] = pConfig->dataRate  | pConfig->compareMode  | pConfig->polarityMode | pConfig->latchingMode | pConfig->queueComparator;
}

float ADS1115_toVoltage(ADS1115_Config_t* pConfig,uint16_t value)
{
  if (value == 0) return 0;
  float volts = ADS1115_getMaxVoltage(pConfig);
  if (volts < 0) return volts;
  volts *= value;
  volts /= 32767;  //  value = 16 bits - sign bit = 15 bits mantissa
  return volts;
}


float ADS1115_getMaxVoltage(ADS1115_Config_t* pConfig)
{
  switch (pConfig->pgaConfig)
  {
    case PGA_6_144: return 6.144;
    case PGA_4_096: return 4.096;
    case PGA_2_048: return 2.048;
    case PGA_1_024: return 1.024;
    case PGA_0_512: return 0.512;
    case PGA_0_256: return 0.256;
  }
  return 0;
}

