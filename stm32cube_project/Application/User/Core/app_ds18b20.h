/*
 * app_ds18b20.h
 *
 *  Created on: Dec 24, 2023
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_DS18B20_H_
#define APPLICATION_USER_CORE_APP_DS18B20_H_
#include "app_common.h"
#include "ds18b20.h"
#include "dwt.h"

#define DS_Pin GPIO_PIN_2
#define DS_GPIO_Port GPIOB


extern OneWire_t Sow;
extern DS18B20_Drv_t Sds;
void init_ds18b20(DS18B20_Drv_t *DS,OneWire_t *OW);
void read_ds18b20(DS18B20_Drv_t *DS);

#endif /* APPLICATION_USER_CORE_APP_DS18B20_H_ */
