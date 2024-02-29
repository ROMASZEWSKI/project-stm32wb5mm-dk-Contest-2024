/*
 * app_ds18b20.c
 *
 *  Created on: Dec 24, 2023
 *      Author: mag
 */
#include "app_ds18b20.h"


OneWire_t Sow;
DS18B20_Drv_t Sds;

void init_ds18b20(DS18B20_Drv_t *DS,OneWire_t *OW){
  DwtInit();
  OW->DataPin = DS_Pin;
  OW->DataPort = DS_GPIO_Port;
  DS->OW=OW;
  DS->Resolution = DS18B20_Resolution_12bits;
  DS18B20_Init(DS);
  /* Set high temperature alarm on device number 0, 31 Deg C */
  //DS18B20_SetTempAlarm(&OW, DS.DevAddr[0], 0, 31);
}

void read_ds18b20(DS18B20_Drv_t *DS){
		DS18B20_StartAll(DS);
		/* Read temperature from device and store it to DS data structure */
		for(uint8_t i = 0; i < DS->OW->RomCnt; i++)
		{
			/* Read Temperature */
			DS18B20_Read(DS, DS->DevAddr[i], &DS->Temperature[i]);
		}
		/* Search Alarm triggered and store in DS data structure */
		//DS18B20_AlarmSearch(&DS, &OW);
}
