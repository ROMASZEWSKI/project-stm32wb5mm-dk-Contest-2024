/*
 * app_veml7700.h
 *
 *  Created on: Dec 24, 2023
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_VEML7700_H_
#define APPLICATION_USER_CORE_APP_VEML7700_H_

#include "veml7700.h"

extern TSveml7700 Sve;
void init_veml7700(void);
void readlux_veml7700(uint16_t *als,uint16_t *white);


#endif /* APPLICATION_USER_CORE_APP_VEML7700_H_ */
