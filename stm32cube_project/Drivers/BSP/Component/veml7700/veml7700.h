/**
 * @file veml7700.c
 *
 * 2023-12-23  Modification Alain Romaszewski for stm32wb5mm-dk on I2C1
 *
 */

#ifndef DRIVERS_BSP_COMPONENT_VEML7700_VEML7700_H_
#define DRIVERS_BSP_COMPONENT_VEML7700_VEML7700_H_

#include "stm32wbxx_hal.h"
#include "stm32wb5mm_dk_bus.h"
#include "stm_logging.h"
#include <math.h>


/**
 * @brief Represents sensor and I2C device configuration.
 *
 * @note Can contain calculated values for active settings such
 * as 'resolution' and 'maximum lux'.
 *
 */
typedef struct stveml7700 {
	uint8_t		ADDR;
	uint8_t 	Error;
	uint16_t 	gain;				/*!< Sensor gain configuration */
	uint16_t 	integration_time;	/*!< Sensor integration time configuration */
	uint16_t 	persistence;		/*!< Last result persistence on-sensor configuration */
	uint16_t 	interrupt_enable;	/*!< Enable/disable interrupts */
	uint16_t 	shutdown;			/*!< Shutdown command configuration */
} TSveml7700;

#define VEML7700_I2C_ADDR UINT8_C(0x10) /*!< Sensor slave I2C address */

#define VEML7700_ALS_CONFIG 0x00        /*!< Light configuration register */
#define VEML7700_ALS_THREHOLD_HIGH 0x01 /*!< Light high threshold for irq */
#define VEML7700_ALS_THREHOLD_LOW 0x02  /*!< Light low threshold for irq */
#define VEML7700_ALS_POWER_SAVE 0x03    /*!< Power save register */
#define VEML7700_ALS_DATA 0x04          /*!< The light data output */
#define VEML7700_WHITE_DATA 0x05        /*!< The white light data output */
#define VEML7700_INTERRUPTSTATUS 0x06   /*!< What IRQ (if any) */

#define VEML7700_INTERRUPT_HIGH 0x4000  /*!< Interrupt status for high threshold */
#define VEML7700_INTERRUPT_LOW 0x8000   /*!< Interrupt status for low threshold */

#define VEML7700_GAIN_2 0x0800            /*!< ALS gain 2x */
#define VEML7700_GAIN_1 0x0000            /*!< ALS gain 1x */
#define VEML7700_GAIN_1_8 0x1000          /*!< ALS gain 1/8x */
#define VEML7700_GAIN_1_4 0x1800          /*!< ALS gain 1/4x */

#define VEML7700_IT_800MS 0x00C0          /*!< ALS integration time 800ms */
#define VEML7700_IT_400MS 0x0080          /*!< ALS integration time 400ms */
#define VEML7700_IT_200MS 0x0040          /*!< ALS integration time 200ms */
#define VEML7700_IT_100MS 0x0000          /*!< ALS integration time 100ms */
#define VEML7700_IT_50MS 0x0200           /*!< ALS integration time 50ms */
#define VEML7700_IT_25MS 0x0300           /*!< ALS integration time 25ms */

#define VEML7700_PERS_1 0x00            /*!< ALS irq persistance 1 sample */
#define VEML7700_PERS_2 0x0010            /*!< ALS irq persistance 2 samples */
#define VEML7700_PERS_4 0x0020            /*!< ALS irq persistance 4 samples */
#define VEML7700_PERS_8 0x0030            /*!< ALS irq persistance 8 samples */

#define VEML7700_POWERSAVE_MODE1 0x00   /*!< Power saving mode 1 */
#define VEML7700_POWERSAVE_MODE2 0x01   /*!< Power saving mode 2 */
#define VEML7700_POWERSAVE_MODE3 0x02   /*!< Power saving mode 3 */
#define VEML7700_POWERSAVE_MODE4 0x03   /*!< Power saving mode 4 */


void veml7700_init(TSveml7700 *Sv,uint8_t Addr);
void veml7700_i2creadreg(TSveml7700 *Sv, uint8_t reg_addr, uint16_t *reg_data);
void veml7700_i2cwritereg(TSveml7700 *Sv, uint8_t reg_addr, uint16_t reg_data);
void veml7700_setconfig(TSveml7700 *Sv);
uint16_t veml7700_readals(TSveml7700 *Sv);
uint16_t veml7700_readwhite(TSveml7700 *Sv);


#endif /* DRIVERS_BSP_COMPONENT_VEML7700_VEML7700_H_ */
