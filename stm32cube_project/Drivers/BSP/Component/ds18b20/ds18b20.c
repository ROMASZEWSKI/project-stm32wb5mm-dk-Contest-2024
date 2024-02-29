/**
  ******************************************************************************
  * @file    ds18b20.c
  * @brief   This file includes the HAL/LL driver for DS18B20 1-Wire Digital
  * 		 Thermometer
  ******************************************************************************
  */
#include "ds18b20.h"

/**
  * @brief  The function is used to check valid DS18B20 ROM
  * @retval Return in OK = 1, Failed = 0
  * @param  ROM		Pointer to ROM number
  */
uint8_t DS18B20_IsValid(uint8_t *ROM)
{
	/* Checks if first byte is equal to DS18B20's family code */
	return (*ROM == DS18B20_FAMILY_CODE) ? 1 : 0;
}

/**
  * @brief  The function is used to get resolution
  * @retval Return value in 9 - 12
  * @param  DS			DS18B20 HandleTypedef
  * @param  ROM		Pointer to ROM number
  */
uint8_t DS18B20_GetResolution(DS18B20_Drv_t *DS, uint8_t *ROM) {
	uint8_t conf;

	/* Check valid ROM */
	if (!DS18B20_IsValid(ROM)) return 0;

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Read scratchpad command by onewire protocol */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_READSCRATCHPAD);

	/* Ignore first 4 bytes */
	OneWire_ReadByte(DS->OW);
	OneWire_ReadByte(DS->OW);
	OneWire_ReadByte(DS->OW);
	OneWire_ReadByte(DS->OW);

	/* 5th byte of scratchpad is configuration register */
	conf = OneWire_ReadByte(DS->OW);

	/* Return 9 - 12 value according to number of bits */
	return ((conf & 0x60) >> 5) + 9;
}

/**
  * @brief  The function is used as set resolution
  * @retval status in OK = 1, Failed = 0
  * @param  DS			DS18B20 HandleTypedef
  * @param  ROM			Pointer to ROM number
  * @param  Resolution	Resolution in 9 - 12
  */
void DS18B20_SetResolution(DS18B20_Drv_t *DS, uint8_t *ROM,
		DS18B20_Res_t Resolution)
{
	uint8_t th, tl, conf;

	/* Check valid ROM */
	if (!DS18B20_IsValid(ROM)){
		DS->Error=1;
		return;
	}

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Read scratchpad command by onewire protocol */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_READSCRATCHPAD);

	/* Ignore first 2 bytes */
	OneWire_ReadByte(DS->OW);
	OneWire_ReadByte(DS->OW);

	th = OneWire_ReadByte(DS->OW);
	tl = OneWire_ReadByte(DS->OW);
	conf = OneWire_ReadByte(DS->OW);

	if (Resolution == DS18B20_Resolution_9bits) {
		conf &= ~(1 << DS18B20_RESOLUTION_R1);
		conf &= ~(1 << DS18B20_RESOLUTION_R0);
	} else if (Resolution == DS18B20_Resolution_10bits) {
		conf &= ~(1 << DS18B20_RESOLUTION_R1);
		conf |= 1 << DS18B20_RESOLUTION_R0;
	} else if (Resolution == DS18B20_Resolution_11bits) {
		conf |= 1 << DS18B20_RESOLUTION_R1;
		conf &= ~(1 << DS18B20_RESOLUTION_R0);
	} else if (Resolution == DS18B20_Resolution_12bits) {
		conf |= 1 << DS18B20_RESOLUTION_R1;
		conf |= 1 << DS18B20_RESOLUTION_R0;
	}

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Write scratchpad command by onewire protocol, only th, tl and conf
	 * register can be written */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_WRITESCRATCHPAD);

	/* Write bytes */
	OneWire_WriteByte(DS->OW, th);
	OneWire_WriteByte(DS->OW, tl);
	OneWire_WriteByte(DS->OW, conf);

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Copy scratchpad to EEPROM of DS18B20 */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_COPYSCRATCHPAD);

	DS->Error=0;
	return;
}

/**
  * @brief  The function is used as start selected ROM device
  * @retval status in OK = 1, Failed = 0
  * @param  DS			DS18B20 HandleTypedef
  * @param  ROM			Pointer to ROM number
  */
void DS18B20_Start(DS18B20_Drv_t *DS, uint8_t *ROM)
{
	/* Check if device is DS18B20 */
	if(!DS18B20_IsValid(ROM)){
		DS->Error=1;
		return;
	}

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Start temperature conversion */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_CONVERT);
	DS->Error=0;
	return;
}

/**
  * @brief  The function is used as start all ROM device
  * @param  DS			DS18B20 HandleTypedef
  */
void DS18B20_StartAll(DS18B20_Drv_t *DS)
{
	/* Reset pulse */
	OneWire_Reset(DS->OW);

	/* Skip rom */
	OneWire_WriteByte(DS->OW, ONEWIRE_CMD_SKIPROM);

	/* Start conversion on all connected devices */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_CONVERT);
	DS->Error=0;
	return;
}

/**
  * @brief  The function is used as read bit from device and store in selected
  * 		destination
  * @retval status in OK = 1, Failed = 0
  * @param  DS			DS18B20 HandleTypedef
  * @param  ROM				Pointer to ROM number
  * @param  Destination		Pointer to return value
  */
void DS18B20_Read(DS18B20_Drv_t *DS, uint8_t *ROM, float *Destination)
{
	uint16_t temperature;
	uint8_t resolution;
	int8_t digit, minus = 0;
	float decimal;
	uint8_t i = 0;
	uint8_t data[9];
	uint8_t crc;

	/* Check if device is DS18B20 */
	if (!DS18B20_IsValid(ROM)) {
		DS->Error = 1;
		return;
	}

	/* Wait until line is released, then coversion is completed */
	while(!OneWire_ReadBit(DS->OW)) {};

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Read scratchpad command by onewire protocol */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_READSCRATCHPAD);

	/* Get data */
	for (i = 0; i < 9; i++) {
		/* Read byte by byte */
		data[i] = OneWire_ReadByte(DS->OW);
	}

	/* Calculate CRC */
	crc = OneWire_CRC8(data, 8);

	/* Check if CRC is ok */
	if (crc != data[8]) {
		/* CRC invalid */
		DS->Error=1;
		return;
	}

	/* First two bytes of scratchpad are temperature values */
	temperature = data[0] | (data[1] << 8);

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Check if temperature is negative */
	if (temperature & 0x8000) {
		/* Two's complement, temperature is negative */
		temperature = ~temperature + 1;
		minus = 1;
	}

	/* Get sensor resolution */
	resolution = ((data[4] & 0x60) >> 5) + 9;

	/* Store temperature integer digits and decimal digits */
	digit = temperature >> 4;
	digit |= ((temperature >> 8) & 0x7) << 4;

	/* Store decimal digits */
	switch (resolution) {
		case 9: {
			decimal = (temperature >> 3) & 0x01;
			decimal *= (float)DS18B20_DECIMAL_STEPS_9BIT;
		} break;
		case 10: {
			decimal = (temperature >> 2) & 0x03;
			decimal *= (float)DS18B20_DECIMAL_STEPS_10BIT;
		} break;
		case 11: {
			decimal = (temperature >> 1) & 0x07;
			decimal *= (float)DS18B20_DECIMAL_STEPS_11BIT;
		} break;
		case 12: {
			decimal = temperature & 0x0F;
			decimal *= (float)DS18B20_DECIMAL_STEPS_12BIT;
		} break;
		default: {
			decimal = 0xFF;
			digit = 0;
		}
	}

	/* Check for negative part */
	decimal = digit + decimal;
	if (minus) {
		decimal = 0 - decimal;
	}

	/* Set to pointer */
	*Destination = decimal;

	/* Return 0, temperature valid */
	DS->Error=0;
	return;
}

/**
  * @brief  The function is used as set temperature alarm range on
  * 		selected device
  * @retval status in OK = 1, Failed = 0
  * @param  DS			DS18B20 HandleTypedef
  * @param  ROM		Pointer to ROM number
  * @param  Low		Low temperature alarm, value > -55, 0 = reset
  * @param  High	High temperature alarm,, value < 125, 0 = reset
  */
void DS18B20_SetTempAlarm(DS18B20_Drv_t *DS, uint8_t *ROM, int8_t Low, int8_t High)
{
	uint8_t tl, th, conf;

	/* Check if device is DS18B20 */
	if (!DS18B20_IsValid(ROM)){
		DS->Error = 1;
		return;
	}

	Low = ((Low < -55) || (Low == 0)) ? -55 : Low;
	High = ((High > 125) || (High == 0)) ? 125 : High;

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Read scratchpad command by onewire protocol */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_READSCRATCHPAD);

	/* Ignore first 2 bytes */
	OneWire_ReadByte(DS->OW);
	OneWire_ReadByte(DS->OW);

	th = OneWire_ReadByte(DS->OW);
	tl = OneWire_ReadByte(DS->OW);
	conf = OneWire_ReadByte(DS->OW);

	th = (uint8_t)High;
	tl = (uint8_t)Low;

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Write scratchpad command by onewire protocol, only th, tl and conf
	 * register can be written */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_WRITESCRATCHPAD);

	/* Write bytes */
	OneWire_WriteByte(DS->OW, th);
	OneWire_WriteByte(DS->OW, tl);
	OneWire_WriteByte(DS->OW, conf);

	/* Reset line */
	OneWire_Reset(DS->OW);

	/* Select ROM number */
	OneWire_SelectWithPointer(DS->OW, ROM);

	/* Copy scratchpad to EEPROM of DS18B20 */
	OneWire_WriteByte(DS->OW, DS18B20_CMD_COPYSCRATCHPAD);
	DS->Error = 0;
	return;
}

/**
  * @brief  The function is used as search device that had temperature alarm
  * 		triggered and store it in DS18B20 alarm data structure
  * @retval status of search, OK = 1, Failed = 0
  * @param  DS		DS18B20 HandleTypedef
  */
uint8_t DS18B20_AlarmSearch(DS18B20_Drv_t *DS)
{
	uint8_t t = 0;

	/* Reset Alarm in DS */
	for(uint8_t i = 0; i < DS18B20_MaxCnt; i++)
	{
		for(uint8_t j = 0; j < 8; j++)
		{
			DS->AlmAddr[i][j] = 0;
		}
	}

	/* Start alarm search */
	while (OneWire_Search(DS->OW, DS18B20_CMD_ALARM_SEARCH))
	{
		/* Store ROM of device which has alarm flag set */
		OneWire_GetDevRom(DS->OW, DS->AlmAddr[t]);
		t++;
	}
	return (t > 0) ? 1 : 0;
}

/**
  * @brief  The function is used to initialize the DS18B20 sensor, and search
  * 		for all ROM along the line. Store in DS18B20 data structure
  * @retval Rom detect status, OK = 1, No Rom detected = 0
  * @param  DS			DS18B20 HandleTypedef
  */
uint8_t DS18B20_Init(DS18B20_Drv_t *DS)
{
	/* Initialize OneWire and reset all data */
	OneWire_Init(DS->OW);

	/* Search all OneWire devices ROM */
	while(1)
	{
		/* Start searching for OneWire devices along the line */
		if(OneWire_Search(DS->OW, ONEWIRE_CMD_SEARCHROM) != 1) break;

		/* Get device ROM */
		OneWire_GetDevRom(DS->OW, DS->DevAddr[DS->OW->RomCnt]);

		/* Set ROM Resolution */
		DS18B20_SetResolution(DS, &DS->OW->RomCnt, DS->Resolution);

		/* Reset Temperature Alarm */
		DS18B20_SetTempAlarm(DS, &DS->OW->RomCnt, 0, 0);

		DS->OW->RomCnt++;
	}
    if (DS->OW->RomCnt== 0)
    	DS->Error = 1;
	else
		DS->Error = 0;
	return (DS->OW->RomCnt);
}
