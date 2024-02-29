/*
 * app_automat.h
 *
 *  Created on: Jan 21, 2024
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_AUTOMAT_H_
#define APPLICATION_USER_CORE_APP_AUTOMAT_H_
#include "stdint.h"
#include "stdlib.h"
#include <stdbool.h>
#include "stm32wbxx_hal.h"
#include "stm32wb5mm_dk_bus.h"
#include "stm_logging.h"

#define Pump1_Pin GPIO_PIN_5
#define Pump1_GPIO_Port GPIOC

#define Pump2_Pin GPIO_PIN_4
#define Pump2_GPIO_Port GPIOC

#define Pump3_Pin GPIO_PIN_1
#define Pump3_GPIO_Port GPIOC

#define Light_Pin GPIO_PIN_5
#define Light_GPIO_Port GPIOA

#define TankLevel_Pin GPIO_PIN_3
#define TankLevel_GPIO_Port GPIOC


#define PumpStateStopped 0x00
#define PumpStateStarted 0x01

typedef struct {
	uint16_t PumpValue[3];
	uint8_t PumpState[3];
	uint8_t LightState;
	uint8_t TankLevel; // input
} TAutomat;

extern TAutomat Automat;
void init_pump(TAutomat *au);
void init_light(TAutomat *au);
void init_tanklevel(TAutomat *au);
void SetPumpState(uint8_t n, uint8_t st);
void SetLightState(uint8_t st);
void SchedulePump(TAutomat *a,uint8_t n);
void GetTankLevel(TAutomat *au);


#endif /* APPLICATION_USER_CORE_APP_AUTOMAT_H_ */
