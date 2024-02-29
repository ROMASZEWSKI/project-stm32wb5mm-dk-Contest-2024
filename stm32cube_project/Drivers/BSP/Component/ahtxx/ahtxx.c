/*
 * ahtxx.c
 *
 *  Created on: Jan 3, 2024
 *      Author: mag
 */


/***************************************************************************************************/
/*
   This is an Arduino library for Aosong ASAIR AHT10/AHT15/AHT20/AHT21/AHT25/AM2301B/AM2311B
   Digital Humidity & Temperature Sensor

   written by : enjoyneering
   sourse code: https://github.com/enjoyneering/

   Aosong ASAIR AHT1x/AHT2x features:
   - AHT1x +1.8v..+3.6v, AHT2x +2.2v..+5.5v
   - AHT1x 0.25uA..320uA, AHT2x 0.25uA..980uA
   - temperature range -40C..+85C
   - humidity range 0%..100%
   - typical accuracy T +-0.3C, RH +-2%
   - typical resolution T 0.01C, RH 0.024%
   - normal operating range T -20C..+60C, RH 10%..80%
   - maximum operating rage T -40C..+80C, RH 0%..100%
   - response time 8..30sec*
   - I2C bus speed 100KHz..400KHz, 10KHz recommended minimum
     *measurement with high frequency leads to heating of the
      sensor, interval must be > 1 second to keep self-heating below 0.1C

   GNU GPL license, all text above must be included in any redistribution,
   see link for details - https://www.gnu.org/licenses/licenses.html
*/
/***************************************************************************************************/

#include "ahtxx.h"


TStAhtxx StAhtxx;


void AHTxx_begin(TStAhtxx *St)
{
  HAL_Delay(AHT2X_POWER_ON_DELAY);                             //wait for sensor to initialize
  AHTxx_softReset(St);                                      //soft reset is recommended at start (reset, set normal mode, set calibration bit & check calibration bit)
  return;
}


/**************************************************************************/
/*
    readHumidity()

    Read relative humidity, in %

    NOTE:
    - relative humidity range........ 0%..100%
    - relative humidity resolution... 0.024%
    - relative humidity accuracy..... +-2%
    - response time............ 5..30sec
    - measurement with high frequency leads to heating of the
      sensor, must be > 2 seconds apart to keep self-heating below 0.1C
    - long-term exposure for 60 hours outside the normal range
      (humidity > 80%) can lead to a temporary drift of the
      signal +3%, sensor slowly returns to the calibrated state at normal
      operating conditions

    - sensors data structure:
      - {status, RH, RH, RH+T, T, T, CRC*}, *CRC for AHT2x only

    - normal operating range T -20C..+60C, RH 10%..80%
    - maximum operating rage T -40C..+80C, RH 0%..100%
*/
/**************************************************************************/
void AHTxx_readHumidity(TStAhtxx *St,uint8_t readAHT)
{
	uint32_t humidity;
	if (readAHT == AHTXX_FORCE_READ_DATA)
		AHTxx_readMeasurement(St); //force to read data via I2C & update "_rawData[]" buffer
	if (St->status != AHTXX_NO_ERROR)
		return; //no reason to continue, call "getStatus()" for error description
	humidity = St->rawData[1];                          //20-bit raw humidity data
    humidity <<= 8;
    humidity |= St->rawData[2];
    humidity <<= 4;
    humidity  |= St->rawData[3] >> 4;
    if (humidity > 0x100000)
    	humidity = 0x100000;             //check if RH>100, no need to check for RH<0 since "humidity" is "uint"
    St->humidity = ((float)humidity / 0x100000) * 100;
    return;
}


/**************************************************************************/
/*
    readTemperature()

    Read temperature, in C

    NOTE:
    - temperature range........ -40C..+85C
    - temperature resolution... 0.01C
    - temperature accuracy..... +-0.3C
    - response time............ 5..30sec
    - measurement with high frequency leads to heating of the
      sensor, must be > 2 seconds apart to keep self-heating below 0.1C

    - sensors data structure:
      - {status, RH, RH, RH+T, T, T, CRC*}, *CRC for AHT2x only
*/
/**************************************************************************/
void AHTxx_readTemperature(TStAhtxx *St,uint8_t readAHT)
{
	uint32_t temperature;
	if (readAHT == AHTXX_FORCE_READ_DATA)
		AHTxx_readMeasurement(St); //force to read data via I2C & update "_rawData[]" buffer
	if (St->status != AHTXX_NO_ERROR)
		return ; //no reason to continue, call "getStatus()" for error description
	temperature = St->rawData[3] & 0x0F;                //20-bit raw temperature data
    temperature <<= 8;
    temperature  |= St->rawData[4];
    temperature <<= 8;
    temperature  |= St->rawData[5];

    St->temperature = ((float)temperature / 0x100000) * 200 - 50;
    return;
}


/**************************************************************************/
/*
    setNormalMode()

    Set normal measurement mode

    NOTE:
    - no info in datasheet, suspect this is one measurement & power down
    - true=success, false=I2C error
*/
/**************************************************************************/
void AHTxx_setNormalMode(TStAhtxx *St)
{
	AHTxx_setInitializationRegister(St,AHTXX_INIT_CTRL_CAL_ON | AHT1X_INIT_CTRL_NORMAL_MODE);
}


/**************************************************************************/
/*
    setCycleMode()

    Set cycle measurement mode

    NOTE:
    - no info in datasheet, suspect this is continuous measurement
    - true=success, false=I2C error
*/
/**************************************************************************/
void AHTxx_setCycleMode(TStAhtxx *St)
{
	AHTxx_setInitializationRegister(St,AHTXX_INIT_CTRL_CAL_ON | AHT1X_INIT_CTRL_CYCLE_MODE);
}


/**************************************************************************/
/*
    setComandMode()

    Set command measurement mode

    NOTE:
    - no info in datasheet
    - true=success, false=I2C error
*/
/**************************************************************************/
void AHTxx_setCommandMode(TStAhtxx *St)
{
	AHTxx_setInitializationRegister(St,AHTXX_INIT_CTRL_CAL_ON | AHT1X_INIT_CTRL_CMD_MODE);
}


/**************************************************************************/
/*
    softReset()

    Restart sensor, without power off

    NOTE:
    - takes 20ms
    - all registers set to default
*/
/**************************************************************************/
void AHTxx_softReset(TStAhtxx *St)
{
	uint8_t buf[1];
	AHTxx_write(St, AHTXX_SOFT_RESET_REG, buf, 0);
	HAL_Delay(AHTXX_SOFT_RESET_DELAY);
	AHTxx_setNormalMode(St);
	AHTxx_getCalibration(St); //set mode & check calibration bit
	St->status = (St->status == AHTXX_STATUS_CTRL_CAL_ON)?0:1;
	return;
}





/**************************************************************************/
/*
    _readMeasurement()

    Start new measurement, read sensor data to buffer & collect errors

    NOTE:
    - sensors data structure:
      - {status, RH, RH, RH+T, T, T, CRC*}, *CRC for AHT2x only & for
        status description see "_readStatusRegister()" NOTE
*/
/**************************************************************************/
void AHTxx_readMeasurement(TStAhtxx *St)
{
  uint8_t buf[2];
  uint8_t dataSize;
  buf[0]=AHTXX_START_MEASUREMENT_CTRL;
  buf[1]=AHTXX_START_MEASUREMENT_CTRL_NOP;
  AHTxx_write(St, AHTXX_START_MEASUREMENT_REG, buf, 2);
	/* send measurement command */

  /* check busy bit */
  AHTxx_getBusy(St,AHTXX_FORCE_READ_DATA);                                                //update status byte, read status byte & check busy bi
  if (St->status == AHTXX_BUSY_ERROR)
	  HAL_Delay(AHTXX_MEASUREMENT_DELAY - AHTXX_CMD_DELAY);
  else
	  if (St->status != AHTXX_NO_ERROR)
		  return;                                           //no reason to continue, received data smaller than expected

  /* read data from sensor */
  if   (St->sensorType == AHT1x_SENSOR)
	  dataSize = 6;   //{status, RH, RH, RH+T, T, T, CRC*}, *CRC for AHT2x only
  else
  	  dataSize = 7;
  AHTxx_readxbyte(St,St->rawData, dataSize);

  /* check busy bit after measurement dalay */
  AHTxx_getBusy(St,AHTXX_FORCE_READ_DATA);             //update status byte, read status byte & check busy bit

  if (St->status != AHTXX_NO_ERROR)
	  return;             //no reason to continue, sensor is busy

  /* check CRC8, for AHT2x only */
  if (St->sensorType == AHT2x_SENSOR) {
	  if (AHTxx_checkCRC8(St) != 0x01)
	  	 St->status = AHTXX_CRC8_ERROR; //update status byte
  }
}


/**************************************************************************/
/*
    _setInitializationRegister()

    Set initialization register

    NOTE:
    - true=success, false=I2C error
*/
/**************************************************************************/
void AHTxx_setInitializationRegister(TStAhtxx *St,uint8_t value)
{
	uint8_t buf[3];
	HAL_Delay(AHTXX_CMD_DELAY);
	if   (St->sensorType == AHT1x_SENSOR)
	  buf[0]=AHT1X_INIT_REG; //send initialization command, for AHT1x only
	else
	  buf[0]=AHT2X_INIT_REG; //send initialization command, for AHT2x only
	buf[1] = value;                                               //send initialization register controls
	buf[2] = AHTXX_INIT_CTRL_NOP;                                 //send initialization register NOP control
	AHTxx_write(St, buf[0], &buf[1], 2);
	return;
}


/**************************************************************************/
/*
    _readStatusRegister()

    Read status register

    NOTE:
    - AHT1x status register controls:
      7    6    5    4   3    2   1   0
      BSY, MOD, MOD, xx, CAL, xx, xx, xx
      - BSY:
        - 1, sensor busy/measuring
        - 0, sensor idle/sleeping
      - MOD:
        - 00, normal mode
        - 01, cycle mode
        - 1x, comand mode
      - CAL:
        - 1, calibration on
        - 0, calibration off

    - AHT2x status register controls:
      7    6   5   4   3    2   1  0
      BSY, xx, xx, xx, CAL, xx, xx, xx

    - under normal conditions status is 0x18 & 0x80 if the sensor is busy
*/
/**************************************************************************/
void AHTxx_readStatusRegister(TStAhtxx *St)
{
  HAL_Delay(AHTXX_CMD_DELAY);
  St->status = AHTxx_read8(St,AHTXX_STATUS_REG);
  return;
}


/**************************************************************************/
/*
    _getCalibration()

    Read calibration bits from status register

    NOTE:
    - 0x08=loaded, 0x00=not loaded, 0xFF=I2C error
    - calibration status check should only be performed at power-up,
      rechecking is not required during data collection
*/
/**************************************************************************/
void AHTxx_getCalibration(TStAhtxx *St)
{
  AHTxx_readStatusRegister(St); //return St->value & AHTXX_STATUS_CTRL_CAL_ON; //0x08=loaded, 0x00=not loaded
  return;
}


/**************************************************************************/
/*
    _getBusy()

    Read/check busy bit after measurement command

    NOTE:
    - part of "readRawMeasurement()" function!!!
    - 0x80=busy, 0x00=measurement completed, etc
*/
/**************************************************************************/
void AHTxx_getBusy(TStAhtxx *St,uint8_t readAHT)
{
  if (readAHT == AHTXX_FORCE_READ_DATA)                    //force to read data via I2C & update "_rawData[]" buffer
  {
    HAL_Delay(AHTXX_CMD_DELAY);
    AHTxx_readxbyte(St,St->rawData,1);
    if   ((St->rawData[0] & AHTXX_STATUS_CTRL_BUSY) == AHTXX_STATUS_CTRL_BUSY)
    	St->status = AHTXX_BUSY_ERROR; //0x80=busy, 0x00=measurement completed
    else
    	St->status = AHTXX_NO_ERROR;
  }
  return;
}


/**************************************************************************/
/*
    _checkCRC8()

    Check CRC-8-Maxim of AHT2X measured data

    NOTE:
    - part of "readRawMeasurement()" function!!!
    - only AHT2x sensors have CRC
    - initial value=0xFF, polynomial=(x8 + x5 + x4 + 1) ie 0x31 CRC [7:0] = 1+X4+X5+X8
*/
/**************************************************************************/
uint8_t AHTxx_checkCRC8(TStAhtxx *St)
{
  if (St->sensorType == AHT2x_SENSOR)
  {
    uint8_t crc = 0xFF;                                      //initial value
    for (uint8_t byteIndex = 0; byteIndex < 6; byteIndex ++) //6-bytes in data, {status, RH, RH, RH+T, T, T, CRC}
    {
      crc ^= St->rawData[byteIndex];
      for(uint8_t bitIndex = 8; bitIndex > 0; --bitIndex)    //8-bits in byte
      {
        if   (crc & 0x80) {crc = (crc << 1) ^ 0x31;}         //0x31=CRC seed/polynomial
        else              {crc = (crc << 1);}
      }
    }
    return (crc == St->rawData[6]);
  }
  return 0x01;
}



/**************************************************************************/

uint8_t AHTxx_read8(TStAhtxx *St, uint8_t reg) {
	uint8_t ret;
	St->Error = BSP_I2C1_ReadReg((St->Addr << 1),reg,&ret,1);
	return ret;
}

void AHTxx_read(TStAhtxx *St, uint8_t reg, uint8_t *buf, uint8_t num) {
	St->Error = BSP_I2C1_ReadReg((St->Addr << 1),reg,buf,num);
	return;
}

void AHTxx_readxbyte(TStAhtxx *St, uint8_t *buf, uint8_t num) {
	St->Error = BSP_I2C1_Read((St->Addr << 1),buf,num);
	return;
}

/**************************************************************************/

void AHTxx_write8(TStAhtxx *St, uint8_t reg, uint8_t value) {
	St->Error = BSP_I2C1_WriteReg((St->Addr << 1),reg,&value,1);
	return;
}

void AHTxx_write(TStAhtxx *St, uint8_t reg, uint8_t *buf, uint8_t num) {
	St->Error = BSP_I2C1_WriteReg((St->Addr << 1),reg,buf,num);
	return;
}

