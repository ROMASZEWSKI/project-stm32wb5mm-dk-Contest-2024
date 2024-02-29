#ifndef DRIVERS_BSP_COMPONENT_ADS1115_ADS1115_H_
#define DRIVERS_BSP_COMPONENT_ADS1115_ADS1115_H_


/*
 * ADS1115.h
 *
 *  2023 A.Romaszewski
 */


#include "stdint.h"
#include "stdlib.h"
#include <stdbool.h>
#include "stm32wbxx_hal.h"
#include "stm32wb5mm_dk_bus.h"
#include "stm_logging.h"
//#include "stm32wbxx_hal_i2c.h"

//  REGISTERS
#define ADS1115_REG_CONVERT         0x00
#define ADS1115_REG_CONFIG          0x01
#define ADS1115_REG_LOW_THRESHOLD   0x02
#define ADS1115_REG_HIGH_THRESHOLD  0x03

#define ADS1X15_OS_BUSY             0x0000
#define ADS1X15_OS_NOT_BUSY         0x8000
#define ADS1X15_OS_START_SINGLE     0x8000

#define ADS1115_ADDR	0x48

#define	CHANNEL_AIN0_AIN1  0x00
#define	CHANNEL_AIN0_AIN3  0x10
#define	CHANNEL_AIN1_AIN3  0x20
#define	CHANNEL_AIN2_AIN3  0x30
#define	CHANNEL_AIN0_GND   0x40
#define	CHANNEL_AIN1_GND   0x50
#define	CHANNEL_AIN2_GND   0x60
#define	CHANNEL_AIN3_GND   0x70


#define	PGA_6_144	0x00
#define	PGA_4_096   0x02
#define	PGA_2_048 	0x04
#define	PGA_1_024	0x06
#define	PGA_0_512	0x08
#define	PGA_0_256	0x0A


#define	MODE_CONTINOUS	0x00
#define	MODE_SINGLE_SHOT 0x01


#define	DRATE_8		0x00
#define	DRATE_16	0x20
#define	DRATE_32	0x40
#define	DRATE_64	0x60
#define	DRATE_128	0x80
#define	DRATE_250	0xA0
#define	DRATE_475	0xC0
#define	DRATE_860	0xE0

#define	COMP_HYSTERESIS 0x00
#define	COMP_WINDOW		0x10

#define	POLARITY_ACTIVE_LOW		0x00
#define	POLARITY_ACTIVE_HEIGH	0x08


#define LATCHING_NONE			0x00
#define LATCHING_COMPARATOR		0x04



#define QUEUE_ONE	0x00
#define QUEUE_TWO	0x01
#define QUEUE_FOUR	0x02
#define QUEUE_DISABLE	0x03


typedef struct{
	uint16_t Addr;
	uint8_t channel;
	uint8_t pgaConfig;
	uint8_t operatingMode;
	uint8_t	dataRate;
	uint8_t	compareMode;
	uint8_t	polarityMode;
	uint8_t	latchingMode;
	uint8_t	queueComparator;
	int32_t	Error;
}ADS1115_Config_t;





int32_t ADS1115(ADS1115_Config_t *pConfig,uint16_t Addr);

int32_t ADS1115_present(ADS1115_Config_t *pConfig);

bool ADS1115_isReady(ADS1115_Config_t *pConfig);

void ADS1115_updateConfig(ADS1115_Config_t *pConfig);

void ADS1115_updateAddress(ADS1115_Config_t *pConfig, uint16_t address);

uint16_t ADS1115_oneShotMeasure();

uint16_t ADS1115_getData();

void ADS1115_setThresholds(ADS1115_Config_t *pConfig, int16_t lowValue, int16_t highValue);

void ADS1115_flushData(ADS1115_Config_t* pConfig);

void ADS1115_setConversionReadyPin(ADS1115_Config_t* pConfig);

void ADS1115_startContinousMode(ADS1115_Config_t* pConfig);

void ADS1115_stopContinousMode(ADS1115_Config_t* pConfig);

uint16_t ADS1115_readRegister(ADS1115_Config_t *pConfig,uint8_t reg);
float ADS1115_getMaxVoltage(ADS1115_Config_t* pConfig);
float ADS1115_toVoltage(ADS1115_Config_t* pConfig,uint16_t value);

#endif /* DRIVERS_BSP_COMPONENT_ADS1115_ADS1115_H_ */
