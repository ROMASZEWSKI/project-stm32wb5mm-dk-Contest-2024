/*
 * app_automat.c
 *
 *  Created on: Jan 21, 2024
 *      Author: mag
 */

#include "app_automat.h"

TAutomat Automat;


void init_pump(TAutomat *au) {
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	GPIO_InitStruct.Pin = Pump1_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	HAL_GPIO_Init(Pump1_GPIO_Port, &GPIO_InitStruct);
	SetPumpState(0,0);
	au->PumpValue[0]=0;
	au->PumpState[0]=PumpStateStopped;

	GPIO_InitStruct.Pin = Pump2_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	HAL_GPIO_Init(Pump2_GPIO_Port, &GPIO_InitStruct);
	SetPumpState(1,0);
	au->PumpValue[1]=0;
	au->PumpState[1]=PumpStateStopped;

	GPIO_InitStruct.Pin = Pump3_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	HAL_GPIO_Init(Pump3_GPIO_Port, &GPIO_InitStruct);
	SetPumpState(2,0);
	au->PumpValue[2]=0;
	au->PumpState[2]=PumpStateStopped;
}

void init_light(TAutomat *au) {
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	GPIO_InitStruct.Pin = Light_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	HAL_GPIO_Init(Light_GPIO_Port, &GPIO_InitStruct);
	SetLightState(GPIO_PIN_RESET);
	au->LightState = 0;
}

void init_tanklevel(TAutomat *au) {
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	GPIO_InitStruct.Pin = TankLevel_Pin;
	GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
	HAL_GPIO_Init(TankLevel_GPIO_Port, &GPIO_InitStruct);
	GetTankLevel(au);
}

void SetPumpState(uint8_t n, uint8_t st) {
	GPIO_PinState Pi;
	Pi = GPIO_PIN_RESET;
	if (st==1) Pi= GPIO_PIN_SET;
	switch(n) {
		case 0:
			HAL_GPIO_WritePin(Pump1_GPIO_Port, Pump1_Pin, Pi);
			break;
		case 1:
			HAL_GPIO_WritePin(Pump2_GPIO_Port, Pump2_Pin, Pi);
			break;
		case 2:
			HAL_GPIO_WritePin(Pump3_GPIO_Port, Pump3_Pin, Pi);
			break;
	}
	return;
}

void SetLightState(uint8_t st) {
	GPIO_PinState Pi;
	Pi = GPIO_PIN_RESET;
	if (st==1) Pi= GPIO_PIN_SET;
	HAL_GPIO_WritePin(Light_GPIO_Port, Light_Pin, Pi);
}


void GetTankLevel(TAutomat *au) {
	au->TankLevel = HAL_GPIO_ReadPin(TankLevel_GPIO_Port,TankLevel_Pin);
}


