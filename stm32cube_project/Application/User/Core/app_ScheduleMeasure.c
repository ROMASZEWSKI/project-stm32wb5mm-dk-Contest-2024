/*
 * app_ScheduleMeasure.c
 *
 *  Created on: Jan 24, 2024
 *  Author: A.Romaszewski
 *  Manage the sensors and automation
 */

#include "app_stts22h.h"
#include "stm32_lcd.h"
#include "stm32wb5mm_dk_lcd.h"
#include "stm32wb5mm_dk.h"
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

uint8_t Schedule_Update_Timer_Id;
#define Schedule_UPDATE_PERIOD       (uint32_t)(0.5*1000*1000/CFG_TS_TICK_VAL) /*500ms*/

void Schedule_Start_Measure(void)
{
  HW_TS_Start(Schedule_Update_Timer_Id, Schedule_UPDATE_PERIOD);
}

void Schedule_Stop_Measure(void)
{
  HW_TS_Stop(Schedule_Update_Timer_Id);
}

static void Schedule_Update_Timer_Callback(void)
{
  UTIL_SEQ_SetTask(1 << CFG_TASK_GET_MEASURE_ENV_ID, CFG_SCH_PRIO_0);
}

void init_ScheduleMeasure(void) {
    UTIL_SEQ_RegTask( 1 << CFG_TASK_GET_MEASURE_ENV_ID, UTIL_SEQ_RFU, Selection);

    /* Create timer to get the measure of environment data */
    HW_TS_Create(CFG_TIM_PROC_ID_ISR, &Schedule_Update_Timer_Id, hw_ts_Repeated, Schedule_Update_Timer_Callback);
}


#define NBTIMESMEASURE 20

/*
 * Main function activated every 500ms
 * Manage automation, button and display
 * and every nbtimes*500ms read the sensors
 * nbtimes period can be fixed remotely by attribute DelayRefreshMeas
 */

void Selection(void) {
	enum ZclStatusCodeT status;
	static uint16_t nbtimes = NBTIMESMEASURE;
	static uint16_t attmaxtime = NBTIMESMEASURE;
	uint8_t i;
	Schedule_Stop_Measure();

	// AUTOMAT PART
	status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD],ATTLIGHT,NULL,(uint8_t *)&Automat.LightState,1,0);
	if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Reading Att Light");
	SetLightState(Automat.LightState);
	for (i=0;i<=2;i++) {
	  status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD],ListAttrPumpAlim[i],NULL,(uint8_t *)&Automat.PumpValue[i],2,0);
	  if(status != ZCL_STATUS_SUCCESS) {
		  APP_DBG("Error Reading Att Value Pump %d",i);
	  }
	  else
		  SchedulePump(&Automat,i);
	}

	GetTankLevel(&Automat);
	status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTTANKLEVEL, (uint8_t)Automat.TankLevel);
	if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Tank level in Cluster");

	// MEASURE EVERY nbtimes * 500ms
	if ( nbtimes == attmaxtime ) {
		nbtimes=0;
		Measuring();
		APP_DBG("Tank Level : %s",(Automat.TankLevel==1)?"LOW":"HIGHT");

		// This attribute can modify periodicity of measure by default 10s
		status = ZbZclAttrRead(zigbee_app_info.clusters[IDCLUSTER_CARD],ATTREFRESHMEAS,NULL,(uint8_t *)&attmaxtime,2,0);
		if(status != ZCL_STATUS_SUCCESS)
		{
			APP_DBG("Error Reading Att REFRESH TIME");
		}
		else
		{
			if ((attmaxtime==65535)||(attmaxtime<=2))
				attmaxtime=NBTIMESMEASURE;
			else
				attmaxtime*=2;
		}
	}
	else
		nbtimes++;

	// FRAME SELECTION OF THE SCREEN
	if( BSP_PB_GetState(BUTTON_USER1)==0){
	  currentFrame = (currentFrame==0) ? MAX_FRAMES-1 : currentFrame-1;
	}
	if( BSP_PB_GetState(BUTTON_USER2)==0){
		  currentFrame++;
		  currentFrame = (currentFrame==MAX_FRAMES) ? 0 : currentFrame;
	}
	refresh_Frame(currentFrame);

	APP_ZIGBEE_LedToggle();
	Schedule_Start_Measure();
	return;
}

/*
 * Main function which reads all the sensors
 */
void Measuring(void) {
  enum ZclStatusCodeT status;
  float temp,mes;
  int16_t vint16t;
  uint16_t vuint16t;
  uint16_t als,white;

  // Read temperature value of the main board
  STTS22H_getTemperatureValue(&temp);
  vint16t = (int16_t)(temp*100);
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ZCL_TEMP_MEAS_ATTR_MEAS_VAL, (int16_t)vint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Att. temperature in cluster %d",status);
  APP_DBG("T:%.1f C",temp);

  // Read the result values of 4 AD Converter - ADS1115
  mes=read_ADS1115(CHANNEL_AIN0_GND);
  vuint16t = (uint16_t)(mes*2000);
  // The first Value is the battery voltage /2
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTCARDBATT, (int16_t)vuint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Att. battery voltage in clustercard");
  if (ADS1115_Config.Error!=0)
	   APP_DBG("Error I2C %d",ADS1115_Config.Error);
  APP_DBG("Battery:%.2f Volts",mes*2);

  mes=read_ADS1115(CHANNEL_AIN1_GND);

  if (ADS1115_Config.Error!=0)
	   APP_DBG("Error I2C %d",ADS1115_Config.Error);
  mes-=1;
  if (mes<=0)
	  mes=10000;
  else
  {
	  if (mes>1.5)
		  mes=1.5;
	  mes = (100-(mes/0.015));
	  mes = mes*100;
  }
  vuint16t = (uint16_t)mes;
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTSHUM1, (int16_t)vuint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Soil Moisture  in Cluster Plant 1");
  APP_DBG("Soil Moisture 1:%.1f ",mes/100);

  mes=read_ADS1115(CHANNEL_AIN2_GND);
  if (ADS1115_Config.Error!=0)
	   APP_DBG("Error I2C %d",ADS1115_Config.Error);
  mes-=1;
  if (mes<=0)
	  mes=10000;
  else
  {
	  if (mes>1.5)
		  mes=1.5;
	  mes = (100-(mes/0.015))*100;
  }
  vuint16t = (uint16_t)mes;
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTSHUM2, (uint16_t)vuint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Soil Moisture  in Cluster Plant 2");
  APP_DBG("Soil Moisture 2:%.1f ",mes/100);

  mes=read_ADS1115(CHANNEL_AIN3_GND);
  if (ADS1115_Config.Error!=0)
	   APP_DBG("Erreur I2C %d",ADS1115_Config.Error);
  mes-=1;
  if (mes<=0)
	  mes=10000;
  else
  {
	  if (mes>1.5)
		  mes=1.5;
	  mes = (100-(mes/0.015))*100;
  }
  vuint16t = (uint16_t)mes;
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTPLANTSHUM3, (uint16_t)vuint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Soil Moisture in Cluster Plant 3");
  APP_DBG("Soil Moisture 3:%.1f ",mes/100);

  // Read temperature, pressure and ambient humidity with BME280
  read_bme280();
  if (dev.Error != 0)
	   APP_DBG("Erreur read bme %d",dev.Error);
  vuint16t = (uint16_t)dev.pressure*10;
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVPRESS, (uint16_t)vuint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Att. Pressure in Cluster");
  vint16t = (int16_t)(dev.temperature*100);
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVTEMP, (int16_t)vint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Att. temperature in Cluster");

  vuint16t = (uint16_t)dev.humidity*100;
  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVHUM, (uint16_t)vuint16t);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Humidity in Cluster");

  APP_DBG("Temp:%.2f - Hum:%.2f - Press:%.2f",dev.temperature,dev.humidity,dev.pressure);


  // READ Temperature and humidity of the sensor for calibration of ens160
  read_AHTxx();

  if (StAhtxx.Error==0)
  {
	  APP_DBG("AHT25 ENS160 Calibration temp:%.2f - Hum:%.2f", StAhtxx.temperature,StAhtxx.humidity);
	  calibrate_ens160(StAhtxx.temperature,StAhtxx.humidity);
	  if (Sens160.Error != 0)
		   APP_DBG("Erreur calibrating ens160 %d",Sens160.Error);
  }
  else
	  APP_DBG("AHT25 - ERROR");

  // READ ENS160 Pollution Sensor
  read_ens160();
  if (Sens160.Error != 0) {
	   APP_DBG("Erreur read ens160 %d",Sens160.Error);
	   // reanimate eventualy the ens160 for next time
	   init_ens160();
  }
  else
  {
	  if ((Sens160.data_aqi>0)&&(Sens160.data_aqi<6)&&(Sens160.data_eco2>=400)) {
		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVQA, (uint8_t)Sens160.data_aqi);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Aqi in Cluster");

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVCO2, (uint16_t)Sens160.data_eco2);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Co2 in Cluster");

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVTVOC, (uint16_t)Sens160.data_tvoc);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing TVOC in Cluster");

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVR1, (uint32_t)Sens160.hp0_rs);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing R1 in Cluster");

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVR2, (uint32_t)Sens160.hp1_rs);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing R2 in Cluster");

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVR3, (uint32_t)Sens160.hp2_rs);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing R3 in Cluster");

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVR4, (uint32_t)Sens160.hp3_rs);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing R4 in Cluster");

		  APP_DBG("status : %d - Aqi:%d - Tvoc:%d ppb - Eco2:%d ppm - Hp0:%d Ohms - Hp1:%d Ohms - Hp2:%d Ohms - Hp3:%d Ohms ",
				  Sens160.status,
				  Sens160.data_aqi,
				  Sens160.data_tvoc,
				  Sens160.data_eco2,
				  Sens160.hp0_rs,
				  Sens160.hp1_rs,
				  Sens160.hp2_rs,
				  Sens160.hp3_rs);
	  }
	  else
	  {
		 APP_DBG ("ens160 problem");
	  }
  }
  // READING LUMINOSITY
  readlux_veml7700(&als,&white);
  if (Sve.Error != 0)
	   APP_DBG("Erreur read veml7700 %d",Sve.Error);

  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTENVLUM, (uint16_t)als);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Luminosity in Cluster");

  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ATTWHITELUM, (uint16_t)white);
  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing White Luminosity in Cluster");

  APP_DBG("Als:%d - White:%d",als,white);


  read_ds18b20(&Sds);
  if (Sds.Error==0)
  {
	  uint8_t i,t;
	  uint64_t j;
	  char buf[17];
	  for (i=0;i<Sds.OW->RomCnt;i++)
	  {
		  sprintf(buf,"%02x%02x%02x%02x%02x%02x%02x%02x",Sds.DevAddr[i][0],Sds.DevAddr[i][1],Sds.DevAddr[i][2],Sds.DevAddr[i][3],Sds.DevAddr[i][4],Sds.DevAddr[i][5],Sds.DevAddr[i][6],Sds.DevAddr[i][7]);
		  for (t=1,j=Sds.DevAddr[i][0];t<8;t++) { j<<=8;j|=Sds.DevAddr[i][t];}

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ListAttrIDDS[i], (uint64_t)j);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing addr MAC DS18B20 in Cluster Plant %d",i);
		  vint16t = (int16_t)(Sds.Temperature[i] * 100);

		  status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ListAttrTemp[i], (int16_t)vint16t);
		  if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Writing Temperature in Cluster Plant %d",i);
		  APP_DBG("DS18B20 id:%s temp:%.2f",buf, Sds.Temperature[i]);
	  }
  }

  return;
}

/*
 * Function that manages the pumps by activating them for the requested time and update attributes
 */
void SchedulePump(TAutomat *a,uint8_t n) {
	uint8_t rAlim,rState;
	enum ZclStatusCodeT status;
	rAlim=0;
	rState=0;
	if ( a->PumpState[n] == PumpStateStopped ) { // pump stopped
		if ( a->PumpValue[n] != 0 ) {
			a->PumpState[n] = PumpStateStarted;  // pump started if alimentation = 0
			SetPumpState(n,1);
			rState=1;
		}
	}
	if ( a->PumpState[n] == PumpStateStarted ) { // pump started
		if ( a->PumpValue[n] == 0 ) {  // job finished if alimentation = 0
			a->PumpState[n] = PumpStateStopped;
			SetPumpState(n,0);
			rState=1;
		}
		else
		{
			if ( a->PumpValue[n] != 0 ) {
				if ( a->PumpValue[n] < 500 )
					a->PumpValue[n] = 0;
				else
					a->PumpValue[n] -= 500;  // decrement 1 or more times of 500ms to 0
				rAlim=1;
			}
		}
	}
	// Update Attribute if alimentation modified
	if ( rAlim == 1 ) {
		status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ListAttrPumpAlim[n], (uint16_t)a->PumpValue[n]);
		if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Modify Att Water Alimentation  in Cluster Plant %d",n+1);
	}
	// Update Attribute If State modified
	if ( rState == 1 ) {
		status = ZbZclAttrIntegerWrite(zigbee_app_info.clusters[IDCLUSTER_CARD], ListAttrPumpState[n], (uint8_t)a->PumpState[n]);
		if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Modify Att Water Alimentation State in Cluster Plant %d",n+1);
	}
	return;
}
