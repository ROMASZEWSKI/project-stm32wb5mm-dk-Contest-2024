/*
 * app_athxx.c
 *
 *  Created on: Jan 10, 2024
 *      Author: Romaszewski
 */

#include "app_ahtxx.h"

void init_AHTxx(void) {
	StAhtxx.Addr = AHTXX_ADDRESS_X38;
	AHTxx_begin(&StAhtxx);
}

void read_AHTxx(void) {
	AHTxx_readTemperature(&StAhtxx,AHTXX_FORCE_READ_DATA);
	if (StAhtxx.status!=AHTXX_NO_ERROR)
		return;
	AHTxx_readHumidity(&StAhtxx,AHTXX_USE_READ_DATA);
	return;
}
