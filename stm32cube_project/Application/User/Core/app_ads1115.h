/*
 * app_ads1115.h
 *
 *  Created on: Dec 21, 2023
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_ADS1115_H_
#define APPLICATION_USER_CORE_APP_ADS1115_H_

#include "ADS1115.h"
extern ADS1115_Config_t ADS1115_Config;
void init_ADS1115(void);
float read_ADS1115(uint8_t channel);

#endif /* APPLICATION_USER_CORE_APP_ADS1115_H_ */
