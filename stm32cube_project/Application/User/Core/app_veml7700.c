/*
 * app_veml7700.c
 *
 *  Created on: Dec 24, 2023
 *      Author: mag
 */

#include "app_veml7700.h"

TSveml7700 Sve;

void init_veml7700(void) {
	veml7700_init(&Sve,VEML7700_I2C_ADDR);
}

void readlux_veml7700(uint16_t *als,uint16_t *white) {
	*als=veml7700_readals(&Sve);
	*white=veml7700_readwhite(&Sve);
	//veml7700_readalsluxauto(&Sve, lux);
	//veml7700_readwhiteluxauto(&Sve, lux_white);
}
