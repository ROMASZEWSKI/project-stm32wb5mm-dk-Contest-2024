/*
 * app_ads1115.c
 *
 *  Created on: Dec 21, 2023
 *      Author: mag
 */
#include "app_ads1115.h"
#include "app_conf.h"

ADS1115_Config_t ADS1115_Config;


void init_ADS1115(void)
{
	ADS1115_Config.channel = 		CHANNEL_AIN0_GND; // mesure tension batterie
	ADS1115_Config.compareMode = 	COMP_HYSTERESIS;
	ADS1115_Config.dataRate = 		DRATE_128;
	ADS1115_Config.latchingMode = 	LATCHING_NONE;
	ADS1115_Config.operatingMode = 	MODE_SINGLE_SHOT;
	ADS1115_Config.pgaConfig = 		PGA_4_096;
	ADS1115_Config.polarityMode = 	POLARITY_ACTIVE_LOW;
	ADS1115_Config.queueComparator = QUEUE_DISABLE;
	ADS1115(&ADS1115_Config,ADS1115_ADDR);
	if (ADS1115_Config.Error == BSP_ERROR_NONE){
		ADS1115_present(&ADS1115_Config);
	}
}

float read_ADS1115(uint8_t channel)
{
	uint16_t res;
	ADS1115_Config.channel = channel;
	res = ADS1115_oneShotMeasure(&ADS1115_Config);
	return (ADS1115_toVoltage(&ADS1115_Config,res));
}


