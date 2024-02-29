/*
 * app_bme280.c
 *
 *  Created on: Dec 23, 2023
 *  A.ROMASZEWSKI
 */

#include "app_bme280.h"

struct bme280_dev dev;
struct bme280_data comp_data;

void init_bme280(void){
	  dev.dev_id = BME280_I2C_ADDR_PRIM;
	  dev.intf = BME280_I2C_INTF;
	  dev.Error = bme280_init(&dev);
	  if (dev.Error!=0) return;
	  dev.settings.osr_h = BME280_OVERSAMPLING_1X;
	  dev.settings.osr_p = BME280_OVERSAMPLING_16X;
	  dev.settings.osr_t = BME280_OVERSAMPLING_2X;
	  dev.settings.filter = BME280_FILTER_COEFF_16;
	  dev.Error = bme280_set_sensor_settings(BME280_OSR_PRESS_SEL | BME280_OSR_TEMP_SEL | BME280_OSR_HUM_SEL | BME280_FILTER_SEL, &dev);
	  return;
}

void read_bme280(void){
	dev.Error = bme280_set_sensor_mode(BME280_FORCED_MODE, &dev);
	if (dev.Error != BME280_OK) return;
    HAL_Delay(40);
    dev.Error = bme280_get_sensor_data(BME280_ALL, &comp_data, &dev);
    if(dev.Error != BME280_OK) return;
	dev.temperature = comp_data.temperature / 100.0;      /* °C  */
	dev.humidity = comp_data.humidity / 1024.0;           /* %   */
	dev.pressure = comp_data.pressure / 10000.0;          /* hPa */
}
