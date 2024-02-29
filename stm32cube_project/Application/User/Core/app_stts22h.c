/* USER CODE BEGIN Header */
/**
  ******************************************************************************
 * @file    app_stts22h.c
 * @author  MCD Application Team
 * @brief   Temperature Application
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2019-2021 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/

#include "app_stts22h.h"
#include "stm32_lcd.h"
#include "stm32wb5mm_dk_lcd.h"
#include "app_zigbee.h"
#include "stm_logging.h"
#include "app_ads1115.h"
#include "app_bme280.h"
#include "app_ens160.h"
#include "app_veml7700.h"
#include "app_ds18b20.h"
#include "app_ahtxx.h"
#include "app_automat.h"
#include "app_clusters.h"

/* Private variables ---------------------------------------------------------*/
extern I2C_HandleTypeDef hbus_i2c3;
static STTS22H_Object_t stts22h_obj_0;


/* Private functions ---------------------------------------------------------*/
static int32_t STTS22H_write(void *handle, uint8_t reg, uint8_t *bufp,uint16_t len)
{
  BSP_I2C3_WriteReg(STTS22H_I2C_ADD_H, (uint16_t) reg, bufp, len);
  return 0;
}
static int32_t STTS22H_read(void *handle, uint8_t reg, uint8_t *bufp,uint16_t len)
{
  BSP_I2C3_ReadReg(STTS22H_I2C_ADD_H, (uint16_t) reg, bufp, len);
  return 0;
}

/**
 * @brief  STTS22H sensor Initialization.
 * @param  None
 * @retval BSP status
 */
int32_t STTS22H_Init_Sensor(void){
  STTS22H_IO_t            io_ctx;
  uint8_t              id;
  int32_t              ret = BSP_ERROR_NONE;

  /* Configure the environmental sensor driver */
  io_ctx.BusType     = STTS22H_I2C_BUS; /* I2C */
  io_ctx.Address     = STTS22H_I2C_ADD_H;
  io_ctx.Init        = BSP_I2C3_Init;
  io_ctx.DeInit      = BSP_I2C3_DeInit;
  io_ctx.ReadReg     = BSP_I2C3_ReadReg;
  io_ctx.WriteReg    = BSP_I2C3_WriteReg;
  io_ctx.GetTick     = BSP_GetTick;

  stts22h_obj_0.Ctx.write_reg = STTS22H_write;
  stts22h_obj_0.Ctx.read_reg = STTS22H_read;
  stts22h_obj_0.Ctx.handle = &hbus_i2c3;
  
  if (STTS22H_RegisterBusIO(&stts22h_obj_0, &io_ctx) != STTS22H_OK)
  {
    ret = BSP_ERROR_UNKNOWN_COMPONENT;
  }
  else if (STTS22H_ReadID(&stts22h_obj_0, &id) != STTS22H_OK)
  {
    ret = BSP_ERROR_UNKNOWN_COMPONENT;
  }
  else if (id != STTS22H_ID)
  {
    ret = BSP_ERROR_UNKNOWN_COMPONENT;
  }
  else if (STTS22H_Init(&stts22h_obj_0) != STTS22H_OK)
  {
    ret = BSP_ERROR_COMPONENT_FAILURE;
  }
  else if (STTS22H_TEMP_Enable(&stts22h_obj_0) != STTS22H_OK)
  {
    ret = BSP_ERROR_COMPONENT_FAILURE;
  }
  else
  {
    ret = BSP_ERROR_NONE;
  }
  return ret;
}



/**
 * @brief  Get the STTS22H temperature value
 * @param  Value pointer where the temperature value is written
 * @retval None
 */
void STTS22H_getTemperatureValue(float *value){
  float val;
  STTS22H_TEMP_GetTemperature(&stts22h_obj_0,&val);
  *value = val;
}

