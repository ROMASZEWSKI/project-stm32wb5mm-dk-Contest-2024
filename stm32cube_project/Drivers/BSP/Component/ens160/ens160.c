/*
  ScioSense_ENS160.h - Library for the ENS160 sensor with I2C interface from ScioSense
  2023 Dec 23   v1.0 Alain Romaszewski  RetroAdaptation to C Language ans I2C1 for stm32wb5mm-dk
  2023 Mar 23	v6	Christoph Friese	Bugfix measurement routine, prepare next release
  2021 Nov 25   v5	Martin Herold		Custom mode timing fixed
  2021 Feb 04	v4	Giuseppe de Pinto	Custom mode fixed
  2020 Apr 06	v3	Christoph Friese	Changed nomenclature to ScioSense as product shifted from ams
  2020 Feb 15	v2	Giuseppe Pasetti	Corrected firmware flash option
  2019 May 05	v1	Christoph Friese	Created
  based on application note "ENS160 Software Integration.pdf" rev 0.01
*/

#include "ens160.h"
#include "math.h"


// create a structure TSens160 in main



// Init I2C communication, resets ENS160 and checks its PART_ID. Returns Se->Error on I2C problems or wrong PART_ID.
void ens160_init(TSens160 *Se,uint8_t ADDR)
{
	Se->seq_steps[0][0] = 0x7C;
	Se->seq_steps[0][1] = 0x0A;
	Se->seq_steps[0][2] = 0x7E;
	Se->seq_steps[0][3] = 0xAF;
	Se->seq_steps[0][4] = 0xAF;
	Se->seq_steps[0][5] = 0xA2;
	Se->seq_steps[0][6] = 0x00;
	Se->seq_steps[0][7] = 0x80;
	Se->available = 1;
	Se->ADDR = ADDR;
	ens160_reset(Se);
	if (Se->Error!=0) Se->available = 0;
	ens160_setMode(Se,ENS160_OPMODE_IDLE);
	if (Se->Error!=0) Se->available = 0;
	ens160_checkPartID(Se);
	if (Se->Error!=0) Se->available = 0;
	if (Se->available) {
		ens160_getFirmware(Se);
		ens160_setMode(Se,ENS160_OPMODE_STD);
	}
	return;
}

// Sends a reset to the ENS160. Returns false on I2C problems.
void ens160_reset(TSens160 *Se)
{
	ens160_write8(Se, ENS160_REG_OPMODE, ENS160_OPMODE_RESET);
	if (Se->Error!=0) return;
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
}

// Reads the part ID and confirms valid sensor
void ens160_checkPartID(TSens160 *Se) {
	uint8_t i2cbuf[2];
	ens160_read(Se, ENS160_REG_PART_ID, i2cbuf, 2);
	if (Se->Error!=0) return;
	Se->part_id = i2cbuf[0] | ((uint16_t)i2cbuf[1] << 8);
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	return ;
}

// Initialize idle mode and confirms
void ens160_clearCommand(TSens160 *Se) {
	ens160_write8(Se, ENS160_REG_COMMAND, ENS160_COMMAND_NOP);
	if (Se->Error!=0) return;
	ens160_write8(Se, ENS160_REG_COMMAND, ENS160_COMMAND_CLRGPR);
	if (Se->Error!=0) return;
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	return;
}

// Read firmware revisions
void ens160_getFirmware(TSens160 *Se) {
	uint8_t i2cbuf[2];
	uint32_t tickstart = HAL_GetTick();
	uint32_t wait = 100; // Time out 100ms
	ens160_clearCommand(Se);
	ens160_write8(Se, ENS160_REG_COMMAND, ENS160_COMMAND_GET_APPVER);
	if (Se->Error!=0) return;
	HAL_Delay(ENS160_BOOTING);
	while ( ((Se->status=ens160_read8(Se, ENS160_REG_DATA_STATUS))&0x01) == 0 ){
		if ( Se->Error != 0 ) return;
		if ((HAL_GetTick() - tickstart) > wait) {
			Se->Error = 1;
			return;
		}
		DwtDelay_us(100);// delay 100us for old poor ens160
	}
	ens160_read(Se, ENS160_REG_GPR_READ_0, i2cbuf, 2);
	Se->fw_ver_minor = i2cbuf[0]&0x0F;
	Se->fw_ver_major = i2cbuf[0]>>4;
	Se->fw_ver_build = i2cbuf[1];
	if (Se->fw_ver_major > 6)
		Se->revENS16x = 1;
	else
		Se->revENS16x = 0;
	//HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	return;
}

// Set operation mode of sensor
void ens160_setMode(TSens160 *Se,uint8_t mode) {
	//LP only valid for rev>0
	if ((mode == ENS160_OPMODE_LP) && (Se->revENS16x == 0))
		Se->Error = 1;
	else
		ens160_write8(Se, ENS160_REG_OPMODE, mode);
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	Se->Error = 0;
	return;
}

// Initialize definition of custom mode with <n> steps
void ens160_initCustomMode(TSens160 *Se,uint16_t stepNum) {
	if (stepNum > 0) {
		Se->stepCount = stepNum;
		ens160_setMode(Se,ENS160_OPMODE_IDLE);
		ens160_clearCommand(Se);
		ens160_write8(Se, ENS160_REG_COMMAND, ENS160_COMMAND_SETSEQ);
	}
	else
	{
		Se->Error = 1;
	}
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	Se->Error = 0;
	return;
}

// Add a step to custom measurement profile with definition of duration, enabled data acquisition and temperature for each hotplate
void ens160_addCustomStep(TSens160 *Se,uint16_t time, uint8_t measureHP0, uint8_t measureHP1, uint8_t measureHP2, uint8_t measureHP3, uint16_t tempHP0, uint16_t tempHP1, uint16_t tempHP2, uint16_t tempHP3) {
	uint8_t seq_ack;
	uint8_t temp;
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	temp = (uint8_t)(((time / 24)-1) << 6);
	if (measureHP0)
		temp = temp | 0x20;
	if (measureHP1)
		temp = temp | 0x10;
	if (measureHP2)
		temp = temp | 0x8;
	if (measureHP3)
		temp = temp | 0x4;
	ens160_write8(Se, ENS160_REG_GPR_WRITE_0, temp);
	temp = (uint8_t)(((time / 24)-1) >> 2);
	ens160_write8(Se, ENS160_REG_GPR_WRITE_1, temp);
	ens160_write8(Se, ENS160_REG_GPR_WRITE_2, (uint8_t)(tempHP0/2));
	ens160_write8(Se, ENS160_REG_GPR_WRITE_3, (uint8_t)(tempHP1/2));
	ens160_write8(Se, ENS160_REG_GPR_WRITE_4, (uint8_t)(tempHP2/2));
	ens160_write8(Se, ENS160_REG_GPR_WRITE_5, (uint8_t)(tempHP3/2));
	ens160_write8(Se, ENS160_REG_GPR_WRITE_6, (uint8_t)(Se->stepCount - 1));
    if (Se->stepCount == 1) {
    	ens160_write8(Se, ENS160_REG_GPR_WRITE_7, 128);
    } else {
    	ens160_write8(Se, ENS160_REG_GPR_WRITE_7, 0);
    }
	HAL_Delay(ENS160_BOOTING);
	seq_ack = ens160_read8(Se, ENS160_REG_GPR_READ_7);
	HAL_Delay(ENS160_BOOTING);                   // Wait to boot after reset
	if ((ENS160_SEQ_ACK_COMPLETE | Se->stepCount) != seq_ack) {
		Se->stepCount = Se->stepCount - 1;
		Se->Error=0;
	} else {
		Se->Error=1;
	}
}

// Perform prediction measurement and stores result in internal variables
void ens160_measure(TSens160 *Se) {
	uint8_t i2cbuf[8];
	uint32_t tickstart = HAL_GetTick();
	uint32_t wait = 100; // Time out 100ms
	Se->Error = 0;

	while( (Se->status = ens160_read8(Se, ENS160_REG_DATA_STATUS)&0x02)==0) {
		if ( Se->Error != 0 ) return;
		if ((HAL_GetTick() - tickstart) > wait) {
			Se->Error = 1;
			return;
		}
		DwtDelay_us(100);// delay 100us for old poor ens160
	}
	// Read predictions
	ens160_read(Se, ENS160_REG_DATA_AQI, i2cbuf, 7);
	Se->data_aqi = i2cbuf[0];
	Se->data_tvoc = i2cbuf[1] | ((uint16_t)i2cbuf[2] << 8);
	Se->data_eco2 = i2cbuf[3] | ((uint16_t)i2cbuf[4] << 8);
	if (Se->revENS16x > 0)
		Se->data_aqi500 = ((uint16_t)i2cbuf[5]) | ((uint16_t)i2cbuf[6] << 8);
	else
		Se->data_aqi500 = 0;
	return;
}

// Perfrom raw measurement and stores result in internal variables
void ens160_measureRaw(TSens160 *Se) {
	uint8_t i2cbuf[8];
	uint32_t tickstart = HAL_GetTick();
	uint32_t wait = 100; // time out 100ms
	Se->Error = 0;
	while( (Se->status = ens160_read8(Se, ENS160_REG_DATA_STATUS)&0x01)==0){
		if ( Se->Error != 0 ) return;
		if ((HAL_GetTick() - tickstart) > wait) {
			Se->Error = 1;
			return;
		}
		DwtDelay_us(100); // delay 100us for old poor ens160
	}
	// Read raw resistance values
	ens160_read(Se, ENS160_REG_GPR_READ_0, i2cbuf, 8);
	if ( Se->Error != 0 ) return;
	Se->hp0_rs = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[0] | ((uint16_t)i2cbuf[1] << 8)));
	Se->hp1_rs = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[2] | ((uint16_t)i2cbuf[3] << 8)));
	Se->hp2_rs = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[4] | ((uint16_t)i2cbuf[5] << 8)));
	Se->hp3_rs = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[6] | ((uint16_t)i2cbuf[7] << 8)));
	// Read baselines
	ens160_read(Se, ENS160_REG_DATA_BL, i2cbuf, 8);
	if ( Se->Error != 0 ) return;
	Se->hp0_bl = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[0] | ((uint16_t)i2cbuf[1] << 8)));
	Se->hp1_bl = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[2] | ((uint16_t)i2cbuf[3] << 8)));
	Se->hp2_bl = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[4] | ((uint16_t)i2cbuf[5] << 8)));
	Se->hp3_bl = CONVERT_RS_RAW2OHMS_F((uint32_t)(i2cbuf[6] | ((uint16_t)i2cbuf[7] << 8)));
	ens160_read(Se, ENS160_REG_DATA_MISR, i2cbuf, 1);
	Se->misr = i2cbuf[0];
	return;
}


// Writes t (degC) and h (%rh) to ENV_DATA. Returns Se->Error on I2C problems.
void ens160_set_envdata(TSens160 *Se,float t, float h) {
	uint16_t t_data = (uint16_t)((t + 273.15f) * 64.0f);
	uint16_t rh_data = (uint16_t)(h * 512.0f);
	ens160_set_envdata210(Se,t_data, rh_data);
	return;
}

// Writes t and h (in ENS210 format) to ENV_DATA. Returns Se->Error on I2C problems.
void ens160_set_envdata210(TSens160 *Se,uint16_t t, uint16_t h) {
	//uint16_t temp;
	uint8_t trh_in[4];
	//temp = (uint16_t)((t + 273.15f) * 64.0f);
	trh_in[0] = t & 0xff;
	trh_in[1] = (t >> 8) & 0xff;
	//temp = (uint16_t)(h * 512.0f);
	trh_in[2] = h & 0xff;
	trh_in[3] = (h >> 8) & 0xff;
	ens160_write(Se, ENS160_REG_TEMP_IN, trh_in, 4);
	return;
}



/**************************************************************************/

uint8_t ens160_read8(TSens160 *Se, uint8_t reg) {
	uint8_t ret;
	Se->Error = BSP_I2C1_ReadReg((Se->ADDR << 1),reg,&ret,1);
	return ret;
}

void ens160_read(TSens160 *Se, uint8_t reg, uint8_t *buf, uint8_t num) {
	Se->Error = BSP_I2C1_ReadReg((Se->ADDR << 1),reg,buf,num);
	return;
}

/**************************************************************************/

void ens160_write8(TSens160 *Se, uint8_t reg, uint8_t value) {
	Se->Error = BSP_I2C1_WriteReg((Se->ADDR << 1),reg,&value,1);
	return;
}

void ens160_write(TSens160 *Se, uint8_t reg, uint8_t *buf, uint8_t num) {
	Se->Error = BSP_I2C1_WriteReg((Se->ADDR << 1),reg,buf,num);
	return;
}

/**************************************************************************/

