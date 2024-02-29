/*
 * ens160.h
 *
 *  Created on: Dec 23, 2023
 *      Author: mag
 */

#ifndef DRIVERS_BSP_COMPONENT_ENS160_ENS160_H_
#define DRIVERS_BSP_COMPONENT_ENS160_ENS160_H_

#include "bme280_defs.h"
#include "stm32wbxx_hal.h"
#include "stm32wb5mm_dk_bus.h"
#include "stm_logging.h"
#include "dwt.h"


// Chip constants
#define ENS160_PARTID				0x0160
#define ENS161_PARTID				0x0161
#define ENS160_BOOTING				10

// 7-bit I2C slave address of the ENS160
#define ENS160_I2CADDR_0          	0x52		//ADDR low
#define ENS160_I2CADDR_1          	0x53		//ADDR high

// ENS160 registers for version V0
#define ENS160_REG_PART_ID          	0x00 		// 2 byte register
#define ENS160_REG_OPMODE		0x10
#define ENS160_REG_CONFIG		0x11
#define ENS160_REG_COMMAND		0x12
#define ENS160_REG_TEMP_IN		0x13
#define ENS160_REG_RH_IN		0x15
#define ENS160_REG_DATA_STATUS		0x20
#define ENS160_REG_DATA_AQI		0x21
#define ENS160_REG_DATA_TVOC		0x22
#define ENS160_REG_DATA_ECO2		0x24
#define ENS160_REG_DATA_BL		0x28
#define ENS160_REG_DATA_T		0x30
#define ENS160_REG_DATA_RH		0x32
#define ENS160_REG_DATA_MISR		0x38
#define ENS160_REG_GPR_WRITE_0		0x40
#define ENS160_REG_GPR_WRITE_1		ENS160_REG_GPR_WRITE_0 + 1
#define ENS160_REG_GPR_WRITE_2		ENS160_REG_GPR_WRITE_0 + 2
#define ENS160_REG_GPR_WRITE_3		ENS160_REG_GPR_WRITE_0 + 3
#define ENS160_REG_GPR_WRITE_4		ENS160_REG_GPR_WRITE_0 + 4
#define ENS160_REG_GPR_WRITE_5		ENS160_REG_GPR_WRITE_0 + 5
#define ENS160_REG_GPR_WRITE_6		ENS160_REG_GPR_WRITE_0 + 6
#define ENS160_REG_GPR_WRITE_7		ENS160_REG_GPR_WRITE_0 + 7
#define ENS160_REG_GPR_READ_0		0x48
#define ENS160_REG_GPR_READ_4		ENS160_REG_GPR_READ_0 + 4
#define ENS160_REG_GPR_READ_6		ENS160_REG_GPR_READ_0 + 6
#define ENS160_REG_GPR_READ_7		ENS160_REG_GPR_READ_0 + 7

//ENS160 data register fields
#define ENS160_COMMAND_NOP		0x00
#define ENS160_COMMAND_CLRGPR		0xCC
#define ENS160_COMMAND_GET_APPVER	0x0E
#define ENS160_COMMAND_SETTH		0x02
#define ENS160_COMMAND_SETSEQ		0xC2

#define ENS160_OPMODE_RESET		0xF0
#define ENS160_OPMODE_DEP_SLEEP		0x00
#define ENS160_OPMODE_IDLE		0x01
#define ENS160_OPMODE_STD		0x02
#define ENS160_OPMODE_LP		0x03
#define ENS160_OPMODE_CUSTOM		0xC0

#define ENS160_BL_CMD_START		0x02
#define ENS160_BL_CMD_ERASE_APP		0x04
#define ENS160_BL_CMD_ERASE_BLINE	0x06
#define ENS160_BL_CMD_WRITE		0x08
#define ENS160_BL_CMD_VERIFY		0x0A
#define ENS160_BL_CMD_GET_BLVER		0x0C
#define ENS160_BL_CMD_GET_APPVER	0x0E
#define ENS160_BL_CMD_EXITBL		0x12

#define ENS160_SEQ_ACK_NOTCOMPLETE	0x80
#define ENS160_SEQ_ACK_COMPLETE		0xC0

#define IS_ENS160_SEQ_ACK_NOT_COMPLETE(x) 	(ENS160_SEQ_ACK_NOTCOMPLETE == (ENS160_SEQ_ACK_NOTCOMPLETE & (x)))
#define IS_ENS160_SEQ_ACK_COMPLETE(x) 		(ENS160_SEQ_ACK_COMPLETE == (ENS160_SEQ_ACK_COMPLETE & (x)))

#define ENS160_DATA_STATUS_NEWDAT	0x02
#define ENS160_DATA_STATUS_NEWGPR	0x01

#define IS_NEWDAT(x) 			(ENS160_DATA_STATUS_NEWDAT == (ENS160_DATA_STATUS_NEWDAT & (x)))
#define IS_NEWGPR(x) 			(ENS160_DATA_STATUS_NEWGPR == (ENS160_DATA_STATUS_NEWGPR & (x)))
#define IS_NEW_DATA_AVAILABLE(x) 	(0 != ((ENS160_DATA_STATUS_NEWDAT | ENS160_DATA_STATUS_NEWGPR ) & (x)))

#define CONVERT_RS_RAW2OHMS_I(x) 	(1 << ((x) >> 11))
#define CONVERT_RS_RAW2OHMS_F(x) 	(pow (2, (float)(x) / 2048))

#endif /* DRIVERS_BSP_COMPONENT_ENS160_ENS160_H_ */


typedef struct {
	uint8_t		ADDR;
	uint8_t 	Error;
	uint8_t 	status;
	uint16_t	part_id;
	uint8_t		available;						// ENS160 available
	uint8_t		revENS16x;							// ENS160 or ENS161 connected? (FW >7)
	uint8_t		fw_ver_major;
	uint8_t 	fw_ver_minor;
	uint8_t		fw_ver_build;

	uint16_t	stepCount;							// Counter for custom sequence

	uint8_t		data_aqi;
	uint16_t	data_tvoc;
	uint16_t	data_eco2;
	uint16_t	data_aqi500;
	uint32_t	hp0_rs;
	uint32_t	hp0_bl;
	uint32_t	hp1_rs;
	uint32_t	hp1_bl;
	uint32_t	hp2_rs;
	uint32_t	hp2_bl;
	uint32_t	hp3_rs;
	uint32_t	hp3_bl;
	uint16_t	temp;
	int  		slaveaddr;							// Slave address of the ENS160
	uint8_t		misr;

	//Isotherm, HP0 252°C / HP1 350°C / HP2 250°C / HP3 324°C / measure every 1008ms
	uint8_t 	seq_steps[1][8]; // {		{ 0x7C, 0x0A, 0x7E, 0xAF, 0xAF, 0xA2, 0x00, 0x80 },};
} TSens160;

void ens160_init(TSens160 *Se,uint8_t ADDR);
void ens160_reset(TSens160 *Se);
void ens160_checkPartID(TSens160 *Se);
void ens160_clearCommand(TSens160 *Se);
void ens160_getFirmware(TSens160 *Se);
void ens160_setMode(TSens160 *Se,uint8_t mode);
void ens160_initCustomMode(TSens160 *Se,uint16_t stepNum);
void ens160_addCustomStep(TSens160 *Se,uint16_t time, uint8_t measureHP0, uint8_t measureHP1, uint8_t measureHP2, uint8_t measureHP3, uint16_t tempHP0, uint16_t tempHP1, uint16_t tempHP2, uint16_t tempHP3);
void ens160_measure(TSens160 *Se);
void ens160_measureRaw(TSens160 *Se);
void ens160_set_envdata(TSens160 *Se,float t, float h);
void ens160_set_envdata210(TSens160 *Se,uint16_t t, uint16_t h);
uint8_t ens160_read8(TSens160 *Se, uint8_t reg);
void ens160_read(TSens160 *Se, uint8_t reg, uint8_t *buf, uint8_t num);
void ens160_write8(TSens160 *Se, uint8_t reg, uint8_t value);
void ens160_write(TSens160 *Se, uint8_t reg, uint8_t *buf, uint8_t num);
