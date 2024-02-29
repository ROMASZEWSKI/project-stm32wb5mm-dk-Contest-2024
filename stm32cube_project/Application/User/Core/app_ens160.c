/*
 * app_ens160.c
 *
 *  Created on: Dec 23, 2023
 *      Author: mag
 */
#include "app_ens160.h"
#include "app_conf.h"

TSens160 Sens160;


void init_ens160(void) {
	ens160_init(&Sens160,ENS160_I2CADDR_1);
	return;
}

void calibrate_ens160(float t, float h) {
	ens160_set_envdata(&Sens160,t,h);
	return;
}

void read_ens160(void) {
	//ens160_set_envdata(&sens160,temp,hum)  // temp hum en provenance du bme280
	ens160_measure(&Sens160);
	if (Sens160.Error!=0) return;
	ens160_measureRaw(&Sens160);
/*
            Se->data_aqi   valeur 1 bon à 5 mauvais
            Se->data_tvoc  ppb
            Se->data_eco2  ppm
            Se->hp0_rs	ohms
            Se->hp1_rs
            Se->hp2_rs
            Se->hp3_rs

*/
	return;
}
