/*
 * app_screen.c
 *
 *  Created on: Jan 25, 2024
 *      Author: mag
 */

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
#include "app_ScheduleMeasure.h"
#include "app_screen.h"

uint8_t currentFrame;
uint8_t refreshFrame;

void init_Frames(void) {
	currentFrame=0;
	refreshFrame=1;
}

void refresh_Frame(uint8_t rf) {
	enum ZclStatusCodeT status;
	uint16_t vuint16;
	int16_t vint16;
	uint8_t vuint8;
	uint64_t vuint64;
	char text[32];
	enum ZclDataTypeT at;
	bool rep = 0;
	switch(rf) {
		case FRAMEGEN:
		// Zigbee Join : JOINED/WAITING
		// Channel     : XX EP:XX
		// Temperature : XX.X °C
	    // Battery     : X.XX V
		// Light State : ON/OFF
		// Tank Level  : HIGHT/LOW
		  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
		  sprintf(text,"Chan. 15 - %s",(zigbee_app_info.join_status == ZB_STATUS_SUCCESS)?"JOINED":"WAITING");
		  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, LEFT_MODE);
		  if (zigbee_app_info.join_status == ZB_STATUS_SUCCESS) {
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ZCL_TEMP_MEAS_ATTR_MEAS_VAL, &at, &vint16, 2, rep);
			  sprintf(text,"Temperature:%.1f C",(float)(vint16)/100);
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTCARDBATT, &at, &vuint16, 2, rep);
			  sprintf(text,"Battery:%.2f V",(float)(vuint16)/1000);
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTLIGHT, &at, &vuint8, 1, rep);
			  sprintf(text,"Light State:%s",(vuint8==0)?"OFF":"ON");
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTTANKLEVEL, &at, &vuint8, 1, rep);
			  sprintf(text,"Tank Level:%s",(vuint8==0)?"HIGHT":"LOW");
			  UTIL_LCD_DisplayStringAt(0, LINE(4), (uint8_t *)text, LEFT_MODE);
		  }
		  BSP_LCD_Refresh(0);
		break;
		case FRAMECARD:
			// Temperature : XX.X °C
			// Humidity    : XX %
			// Pressure    : XXXX hPa
			// Luminosity  : XXX
			// WLuminosity : XXX
			  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVTEMP, &at, &vint16, 2, rep);
			  sprintf(text,"Temperature: %.1f C",(float)(vint16)/100);
			  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVHUM, &at, &vuint16, 2, rep);
			  sprintf(text,"Humidity:%.1f %s",(float)(vuint16)/100,"%");
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVPRESS, &at, &vuint16, 2, rep);
			  sprintf(text,"Pressure:%.1f hPa",(float)(vuint16)/10);
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVLUM, &at, &vuint16, 2, rep);
			  sprintf(text,"Luminosity:%d",vuint16);
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTWHITELUM, &at, &vuint16, 2, rep);
			  sprintf(text,"WLuminosity:%d",vuint16);
			  UTIL_LCD_DisplayStringAt(0, LINE(4), (uint8_t *)text, LEFT_MODE);
			  BSP_LCD_Refresh(0);
		break;
		case FRAMEENV:
			// POLLUTION
			// Air quality : X
			// CO2         : XXX ppm
			// Tvoc        : XXX pbm
			  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
			  sprintf(text,"-- POLLUTION --");
			  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, CENTER_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVQA, &at, &vuint8, 1, rep);
			  sprintf(text,"Air Quality:%d",vuint8);
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVCO2, &at, &vuint16, 2, rep);
			  sprintf(text,"CO2:%d ppm",vuint16);
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVTVOC, &at, &vuint16, 2, rep);
			  sprintf(text,"TVOC:%d pbm",vuint16);
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  BSP_LCD_Refresh(0);
		break;
		case FRAMEPLANT1:
			// PLANT : 1
			// Id Sensor: XXXXXXXX
			// Temperature : XX.X °C
			// Soil Moisture : XX %
			// Pump State : ON/OFF
			// Pump Time : XX.XX s
			  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
			  sprintf(text,"PLANT 1");
			  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTTEMP1, &at, &vint16, 2, rep);
			  sprintf(text,"Temperature:%.1f C",(float)(vint16)/100);
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTSHUM1, &at, &vuint16, 2, rep);
			  sprintf(text,"Soil Moist:%.1f %s",(float)(vuint16)/100,"%");
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTWALIMSTATE1, &at, &vuint8, 1, rep);
			  sprintf(text,"Pump State:%s",(vuint8==0)?"OFF":"ON");
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTWALIM1, &at, &vuint16, 2, rep);
			  sprintf(text,"Pump Time:%.3f ",(float)(vuint16)/1000);
			  UTIL_LCD_DisplayStringAt(0, LINE(4), (uint8_t *)text, LEFT_MODE);
			  BSP_LCD_Refresh(0);
		break;
		case FRAMEPLANT2:
			// PLANT : 2
			// Id : XXXXXXXX
			// Temperature : XX.X °C
			// Soil Moisture : XX %
			// Pump Activity : ON/OFF
			// Pump Time : XX.XX s
			  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
			  sprintf(text,"PLANT 2");
			  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTTEMP2, &at, &vint16, 2, rep);
			  sprintf(text,"Temperature:%.1f C",(float)(vint16)/100);
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTSHUM2, &at, &vuint16, 2, rep);
			  sprintf(text,"Soil Moist:%.1f %s",(float)(vuint16)/100,"%");
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTWALIMSTATE2, &at, &vuint8, 1, rep);
			  sprintf(text,"Pump State:%s",(vuint8==0)?"OFF":"ON");
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTWALIM2, &at, &vuint16, 2, rep);
			  sprintf(text,"Pump Time:%.3f ",(float)(vuint16)/1000);
			  UTIL_LCD_DisplayStringAt(0, LINE(4), (uint8_t *)text, LEFT_MODE);
			  BSP_LCD_Refresh(0);
		break;
		case FRAMEPLANT3:
			// PLANT : 3
			// Id : XXXXXXXX
			// Temperature : XX.X °C
			// Soil Moisture : XX %
			// Pump Activity : ON/OFF
			// Pump Time : XX.XX s
			  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
			  sprintf(text,"PLANT 3");
			  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTTEMP3, &at, &vint16, 2, rep);
			  sprintf(text,"Temperature:%.1f C",(float)(vint16)/100);
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTSHUM3, &at, &vuint16, 2, rep);
			  sprintf(text,"Soil Moist:%.1f %s",(float)(vuint16)/100,"%");
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTWALIMSTATE3, &at, &vuint8, 1, rep);
			  sprintf(text,"Pump State:%s",(vuint8==0)?"OFF":"ON");
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTWALIM3, &at, &vuint16, 2, rep);
			  sprintf(text,"Pump Time:%.3f ",(float)(vuint16)/1000);
			  UTIL_LCD_DisplayStringAt(0, LINE(4), (uint8_t *)text, LEFT_MODE);
			  BSP_LCD_Refresh(0);
		break;
		case FRAMEID:
			// PLANT : 3
			// Id : XXXXXXXX
			// Temperature : XX.X °C
			// Soil Moisture : XX %
			// Pump Activity : ON/OFF
			// Pump Time : XX.XX s
			  BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
			  sprintf(text,"DS18B20 ID List");
			  UTIL_LCD_DisplayStringAt(0, LINE(0), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTIDDS1, &at, &vuint64, 8, rep);
			  sprintf(text,"%" PRIx64 ,vuint64);
			  UTIL_LCD_DisplayStringAt(0, LINE(1), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTIDDS2, &at, &vuint64, 8, rep);
			  sprintf(text,"%" PRIx64 ,vuint64);
			  UTIL_LCD_DisplayStringAt(0, LINE(2), (uint8_t *)text, LEFT_MODE);
			  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTIDDS3, &at, &vuint64, 8, rep);
			  sprintf(text,"%" PRIx64 ,vuint64);
			  UTIL_LCD_DisplayStringAt(0, LINE(3), (uint8_t *)text, LEFT_MODE);
			  BSP_LCD_Refresh(0);

		break;
	}
	return;
}
