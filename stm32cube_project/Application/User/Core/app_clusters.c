/*
 * app_clusters.c
 *
 *  Created on: Jan 13, 2024
 *      Author: mag
 */
#include <assert.h>
#include "app_common.h"
#include "main.h"
#include "app_entry.h"
#include "app_zigbee.h"
#include "app_conf.h"
#include "hw_conf.h"
#include "stm32_seq.h"
#include "stm_logging.h"
#include "shci_tl.h"
#include "stm32_lpm.h"
#include "dbg_trace.h"
#include "shci.h"
#include "zcl/zcl.h"
#include "zcl/general/zcl.temp.meas.h"
#include "app_stts22h.h"
#include "app_ads1115.h"
#include "app_bme280.h"
#include "app_ens160.h"
#include "app_veml7700.h"
#include "app_ds18b20.h"
#include "app_ahtxx.h"
#include "app_clusters.h"



/* attributes
 * cluster Card
 */
uint16_t ListAttrPumpAlim[3]={ ATTPLANTWALIM1, ATTPLANTWALIM2, ATTPLANTWALIM3 };
uint16_t ListAttrPumpState[3]={ ATTPLANTWALIMSTATE1, ATTPLANTWALIMSTATE2, ATTPLANTWALIMSTATE3 };
uint16_t ListAttrIDDS[3]={ ATTPLANTIDDS1, ATTPLANTIDDS2, ATTPLANTIDDS3};
uint16_t ListAttrTemp[3]={ ATTPLANTTEMP1, ATTPLANTTEMP2, ATTPLANTTEMP3};


static const struct ZbZclAttrT attr_list_Main[] = {
	{
		ATTCARDBATT,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 5000},{0, 0xffff}
	},
	{
		ATTENVTEMP,ZCL_DATATYPE_SIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{-4000, 14500},{0, 0xffff}
	},
	{
		ATTENVLUM,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 65535},{0, 0xffff}
	},
	{
		ATTWHITELUM,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 65535},{0, 0xffff}
	},
	{
		ATTENVPRESS,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{9000, 10700},{0, 0xffff}
	},
	{
		ATTENVHUM,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 10000},{0, 0xffff}
	},
	{
		ATTENVQA,ZCL_DATATYPE_UNSIGNED_8BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 4},{0, 0xffff}
	},
	{
		ATTENVCO2,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{400,65000},{0, 0xffff}
	},
	{
		ATTENVTVOC,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,65000},{0, 0xffff}
	},
	{
		ATTENVR1,ZCL_DATATYPE_UNSIGNED_32BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,0x7FFFFFFF},{0, 0xffff}
	},
	{
		ATTENVR2,ZCL_DATATYPE_UNSIGNED_32BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,0x7FFFFFFF},{0, 0xffff}
	},
	{
		ATTENVR3,ZCL_DATATYPE_UNSIGNED_32BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,0x7FFFFFFF},{0, 0xffff}
	},
	{
		ATTENVR4,ZCL_DATATYPE_UNSIGNED_32BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,0x7FFFFFFF},{0, 0xffff}
	},
	{
		ATTTANKLEVEL,ZCL_DATATYPE_UNSIGNED_8BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,1},{0, 0xffff}
	},
	{
		ATTPLANTTEMP1,ZCL_DATATYPE_SIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{-4000, 14500},{0, 0xffff}
	},
	{
		ATTPLANTIDDS1,ZCL_DATATYPE_EUI64,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 0},{0, 0xffff}
	},
	{
		ATTPLANTSHUM1,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 10000},{0, 0xffff}
	},
	{
		ATTPLANTWALIM1,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 65000},{0, 0xffff}
	},
	{
		ATTPLANTWALIMSTATE1,ZCL_DATATYPE_UNSIGNED_8BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,2},{0, 0xffff}
	},
	{
		ATTPLANTTEMP2,ZCL_DATATYPE_SIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{-4000, 14500},{0, 0xffff}
	},
	{
		ATTPLANTIDDS2,ZCL_DATATYPE_EUI64,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 0},{0, 0xffff}
	},
	{
		ATTPLANTSHUM2,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 10000},{0, 0xffff}
	},
	{
		ATTPLANTWALIM2,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 65000},{0, 0xffff}
	},
	{
		ATTPLANTWALIMSTATE2,ZCL_DATATYPE_UNSIGNED_8BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,2},{0, 0xffff}
	},
	{
		ATTPLANTTEMP3,ZCL_DATATYPE_SIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{-4000, 14500},{0, 0xffff}
	},
	{
		ATTPLANTIDDS3,ZCL_DATATYPE_EUI64,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 0},{0, 0xffff}
	},
	{
		ATTPLANTSHUM3,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 10000},{0, 0xffff}
	},
	{
		ATTPLANTWALIM3,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0, 65000},{0, 0xffff}
	},
	{
		ATTPLANTWALIMSTATE3,ZCL_DATATYPE_UNSIGNED_8BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,2},{0, 0xffff}
	},
	{
		ATTLIGHT,ZCL_DATATYPE_UNSIGNED_8BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{0,1},{0, 0xffff}
	},
	{
		ATTREFRESHMEAS,ZCL_DATATYPE_UNSIGNED_16BIT,ZCL_ATTR_FLAG_WRITABLE,0,
		NULL,
		{1, 65535},{0, 0xffff}
	},
};





void AddProjectCluster(void)
{
	struct ZbApsmeAddEndpointReqT req;
	struct ZbApsmeAddEndpointConfT conf;
	enum ZclStatusCodeT status;
	uint8_t i;
	i=0;

	// create Endpoint Gen
	memset(&req, 0, sizeof(req));

	req.profileId = ZCL_PROFILE_HOME_AUTOMATION;  // profile >0x7FFF si prop
	req.deviceId = ZCL_DEVICE_ENVIRONMENTAL_SENSOR; // Normalized Endpoint else >0x2FFF if prop
	req.endpoint = ENDPOINT_GEN;
	ZbZclAddEndpoint(zigbee_app_info.zb, &req, &conf);
	assert(conf.status == ZB_STATUS_SUCCESS);

	zigbee_app_info.clusters[IDCLUSTER_CARD] = ZbZclTempMeasServerAlloc(zigbee_app_info.zb,ENDPOINT_GEN,-4000,14500,10);
	assert(zigbee_app_info.clusters[IDCLUSTER_CARD] != NULL);
	ZbZclClusterEndpointRegister(zigbee_app_info.clusters[IDCLUSTER_CARD]);
	status=ZbZclAttrAppendList(zigbee_app_info.clusters[IDCLUSTER_CARD], attr_list_Main, ZCL_ATTR_LIST_LEN(attr_list_Main));

	// initializing default Pomp alimentation and state
    for ( i=0 ; i<=2 ; i++ ) {

		status = ZbZclAttrWrite(zigbee_app_info.clusters[IDCLUSTER_CARD],NULL,ListAttrPumpAlim[i],(uint8_t *)&Automat.PumpValue[i],2,ZCL_ATTR_WRITE_FLAG_NORMAL);
		if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Initialising Att Water Alimentation  in Cluster Plant %d",i+1);

		status = ZbZclAttrWrite(zigbee_app_info.clusters[IDCLUSTER_CARD],NULL,ListAttrPumpState[i],(uint8_t *)&Automat.PumpState[i],1,ZCL_ATTR_WRITE_FLAG_NORMAL);
		if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Initialising Att Water Alimentation State in Cluster Plant %d",i+1);
    }
    // initializing light state
	status = ZbZclAttrWrite(zigbee_app_info.clusters[IDCLUSTER_CARD],NULL,ATTLIGHT,(uint8_t *)&Automat.LightState,1,ZCL_ATTR_WRITE_FLAG_NORMAL);
	if(status != ZCL_STATUS_SUCCESS) APP_DBG("Error Initialising Light State to 0");
	return;
}





