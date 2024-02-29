/*
 * app_ens160.h
 *
 *  Created on: Dec 23, 2023
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_ENS160_H_
#define APPLICATION_USER_CORE_APP_ENS160_H_

#include "ens160.h"
extern TSens160 Sens160;
void init_ens160(void);
void read_ens160(void);
void calibrate_ens160(float t, float h);

#endif /* APPLICATION_USER_CORE_APP_ENS160_H_ */
