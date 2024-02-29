/**
 * @file veml7700.c
 *
  * 2023-12-23  Modification Alain Romaszewski for stm32wb5mm-dk on I2C1
 *
 */
#include "veml7700.h"


void veml7700_init(TSveml7700 *Sv,uint8_t Addr)
{
	Sv->ADDR = Addr;
	Sv->gain = VEML7700_GAIN_1_8;
	Sv->integration_time = VEML7700_IT_400MS;	// Start with 100ms to avoid any saturation effect
	Sv->persistence = VEML7700_PERS_1;
	Sv->interrupt_enable = 0;
	Sv->shutdown = VEML7700_POWERSAVE_MODE1;
	veml7700_setconfig(Sv);
	return ;
}



void veml7700_i2creadreg(TSveml7700 *Sv, uint8_t reg_addr, uint16_t *reg_data)
{
	uint8_t bytes[2];
	Sv->Error = BSP_I2C1_ReadReg((Sv->ADDR << 1),reg_addr,bytes,2);
	*reg_data = bytes[0] | (bytes[1]<<8);
	return;
}


void veml7700_i2cwritereg(TSveml7700 *Sv, uint8_t reg_addr, uint16_t reg_data)
{
	uint8_t bytes[2];
	bytes[0] = reg_data&0xff;
	bytes[1] = (reg_data>>8)&0xff;
	Sv->Error = BSP_I2C1_WriteReg((Sv->ADDR << 1),reg_addr,bytes,2);
	return;
}


void veml7700_setconfig(TSveml7700 *Sv)
{
	uint16_t config_data =  Sv->gain | Sv->integration_time | Sv->persistence | Sv->interrupt_enable | Sv->shutdown ;
	uint16_t ps_data = 0x0001;
	// Set the resolution on the configuration struct
	//Sv->resolution = veml7700_getresolution(Sv);
	// Set the current maximum value on the configuration struct
	//Sv->maximum_lux = veml7700_getcurrentmaximumlux(Sv);
	veml7700_i2cwritereg(Sv,VEML7700_ALS_CONFIG,config_data);
	veml7700_i2cwritereg(Sv,VEML7700_ALS_POWER_SAVE,ps_data);
	return;
}


uint16_t veml7700_readals(TSveml7700 *Sv)
{
	uint16_t reg_data;
	veml7700_i2creadreg(Sv, VEML7700_ALS_DATA, &reg_data);
	if (Sv->Error != 0)
		return (0);
	return (reg_data);
}

uint16_t veml7700_readwhite(TSveml7700 *Sv)
{
	uint16_t reg_data;
	veml7700_i2creadreg(Sv, VEML7700_WHITE_DATA, &reg_data);
	if (Sv->Error != 0)
		return(0);
	return (reg_data);
}



