/*
 * app_bme280.h
 *
 *  Created on: Dec 23, 2023
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_BME280_H_
#define APPLICATION_USER_CORE_APP_BME280_H_

#include "bme280.h"
extern struct bme280_dev dev;
extern struct bme280_data comp_data;
void init_bme280(void);
void read_bme280(void);

#endif /* APPLICATION_USER_CORE_APP_BME280_H_ */
