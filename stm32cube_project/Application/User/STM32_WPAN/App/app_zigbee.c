
/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * File Name          : App/app_zigbee.c
  * Description        : Zigbee Application.
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2019-2021 STMicroelectronics.
  * All rights reserved.
  * 2023 - Modifications A.Romaszewski for creation of router et autojoin to coord*
  *
  * Modifications A.Romaszewski for creation of router et autojoin to coord with NVM
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */

/* Includes ------------------------------------------------------------------*/
#include "app_common.h"
#include "app_entry.h"
#include "dbg_trace.h"
#include "app_zigbee.h"
#include "zigbee_interface.h"
#include "shci.h"
#include "stm_logging.h"
#include "app_conf.h"
#include "app_stts22h.h"
#include "stm32wbxx_core_interface_def.h"
#include "zigbee_types.h"
#include "stm32_seq.h"
#include "ee.h"
#include "hw_flash.h"

/* Private includes -----------------------------------------------------------*/
#include <assert.h>
#include "zcl/zcl.h"
#include "zcl/general/zcl.temp.meas.h"
#include "zcl/general/zcl.wcm.h"
#include "app_clusters.h"
#include "app_ScheduleMeasure.h"
#include "app_screen.h"

#define CFG_NVM                 1U /* use FLASH */
#define CFG_NVM_DIAG            1U

/* USER CODE BEGIN Includes */
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */
/* USER CODE END PTD */

/* Private defines -----------------------------------------------------------*/
#define APP_ZIGBEE_STARTUP_FAIL_DELAY               500U
#define CHANNEL                                     15

#define SW1_ENDPOINT                                17
#define SW2_ENDPOINT                                30

/* USER CODE BEGIN PD */
#define SW1_GROUP_ADDR          0x0001
#define MIN_MEASURED_TEMP       0xf060   /* -40C   */
#define MAX_MEASURED_TEMP       0x30d4   /* 125C   */
#define TOLERANCE_TEMP          0x0032   /* +-0.5C */
#define MIN_HUM					0x0000  /* 0% */
#define MAX_HUM					0x2710  /* 100% */

/* USER CODE END PD */

/* Private macros ------------------------------------------------------------*/
/* USER CODE BEGIN PM */
/* USER CODE END PM */

/* External definition -------------------------------------------------------*/
enum ZbStatusCodeT ZbStartupWait(struct ZigBeeT *zb, struct ZbStartupT *config);

/* USER CODE BEGIN ED */
/* USER CODE END ED */

/* Private function prototypes -----------------------------------------------*/
static void APP_ZIGBEE_StackLayersInit(void);
static void APP_ZIGBEE_ConfigEndpoints(void);
static void APP_ZIGBEE_NwkForm(void);
static void APP_ZIGBEE_TraceError(const char *pMess, uint32_t ErrCode);
static void APP_ZIGBEE_CheckWirelessFirmwareInfo(void);
static void Wait_Getting_Ack_From_M0(void);
static void Receive_Ack_From_M0(void);
static void Receive_Notification_From_M0(void);
static void APP_ZIGBEE_ProcessNotifyM0ToM4(void);
static void APP_ZIGBEE_ProcessRequestM0ToM4(void);

static bool APP_ZIGBEE_persist_load(void);
static bool APP_ZIGBEE_persist_save(void);
static void APP_ZIGBEE_persist_delete(void);
static void APP_ZIGBEE_persist_notify_cb(struct ZigBeeT *zb, void *cbarg);
static enum ZbStatusCodeT APP_ZIGBEE_ZbStartupPersist(struct ZigBeeT *zb);
static void APP_ZIGBEE_PersistCompleted_callback(enum ZbStatusCodeT status,void *arg);
//static enum ZclStatusCodeT APP_ZIGBEE_RestoreClusterAttr(struct ZbZclClusterT *clusterPtr);
#ifdef CFG_NVM
static void APP_ZIGBEE_NVM_Init(void);
static bool APP_ZIGBEE_NVM_Read(void);
static bool APP_ZIGBEE_NVM_Write(void);
static void APP_ZIGBEE_NVM_Erase(void);
#endif /* CFG_NVM */
static void APP_ZIGBEE_NVM_Diag_Init(void);
static void APP_ZIGBEE_NVM_Diag_Exec(void);
static bool APP_ZIGBEE_NVM_Diag_DataValidation(void);

static void LED_On(aPwmLedGsData_TypeDef aPwmLedGsData);
static void LED_Off(void);
static void LED_Deinit(void);
static void LED_Toggle(aPwmLedGsData_TypeDef aPwmLedGsData);
/* USER CODE BEGIN PFP */
static void APP_ZIGBEE_ConfigGroupAddr(void);
/* USER CODE END PFP */

/* Private variables ---------------------------------------------------------*/
static TL_CmdPacket_t *p_ZIGBEE_otcmdbuffer;
static TL_EvtPacket_t *p_ZIGBEE_notif_M0_to_M4;
static TL_EvtPacket_t *p_ZIGBEE_request_M0_to_M4;
static __IO uint32_t CptReceiveNotifyFromM0 = 0;
static __IO uint32_t CptReceiveRequestFromM0 = 0;

PLACE_IN_SECTION("MB_MEM1") ALIGN(4) static TL_ZIGBEE_Config_t ZigbeeConfigBuffer;
PLACE_IN_SECTION("MB_MEM2") ALIGN(4) static TL_CmdPacket_t ZigbeeOtCmdBuffer;
PLACE_IN_SECTION("MB_MEM2") ALIGN(4) static uint8_t ZigbeeNotifRspEvtBuffer[sizeof(TL_PacketHeader_t) + TL_EVT_HDR_SIZE + 255U];
PLACE_IN_SECTION("MB_MEM2") ALIGN(4) static uint8_t ZigbeeNotifRequestBuffer[sizeof(TL_PacketHeader_t) + TL_EVT_HDR_SIZE + 255U];


struct zigbee_app_info zigbee_app_info;


/* NVM variables */
/* cache in uninit RAM to store/retrieve persistent data */
union cache
{
  uint8_t  U8_data[ST_PERSIST_MAX_ALLOC_SZ];     // in bytes
  uint32_t U32_data[ST_PERSIST_MAX_ALLOC_SZ/4U]; // in U32 words
};
// __attribute__ ((section(".noinit"))) union cache cache_persistent_data;

// __attribute__ ((section(".noinit"))) union cache cache_diag_reference;

union cache cache_persistent_data;
union cache cache_diag_reference;


/* timer to delay reading attribute back from persistence */
//static uint8_t TS_ID1;
//static uint8_t TS_ID2;
/* USER CODE BEGIN PV */
/* USER CODE END PV */
/* Functions Definition ------------------------------------------------------*/



/**
 * @brief  Zigbee application initialization
 * @param  None
 * @retval None
 */
void APP_ZIGBEE_Init(void)
{
  SHCI_CmdStatus_t ZigbeeInitStatus;

  APP_DBG("APP_ZIGBEE_Init");
  LED_Off();
  /* Check the compatibility with the Coprocessor Wireless Firmware loaded */
  APP_ZIGBEE_CheckWirelessFirmwareInfo();

  /* Register cmdbuffer */
  APP_ZIGBEE_RegisterCmdBuffer(&ZigbeeOtCmdBuffer);

  /* Init config buffer and call TL_ZIGBEE_Init */
  APP_ZIGBEE_TL_INIT();

  /* NVM Init */
#if CFG_NVM
  APP_ZIGBEE_NVM_Init();
#endif

  /* Register task */
  /* Create the different tasks */

  UTIL_SEQ_RegTask(1U << (uint32_t)CFG_TASK_NOTIFY_FROM_M0_TO_M4, UTIL_SEQ_RFU, APP_ZIGBEE_ProcessNotifyM0ToM4);
  UTIL_SEQ_RegTask(1U << (uint32_t)CFG_TASK_REQUEST_FROM_M0_TO_M4, UTIL_SEQ_RFU, APP_ZIGBEE_ProcessRequestM0ToM4);

  /* Task associated with network creation process */
  UTIL_SEQ_RegTask(1U << CFG_TASK_ZIGBEE_NETWORK_FORM, UTIL_SEQ_RFU, APP_ZIGBEE_NwkForm);


  /* USER CODE BEGIN APP_ZIGBEE_INIT */
  /* USER CODE END APP_ZIGBEE_INIT */

  /* Start the Zigbee on the CPU2 side */
  ZigbeeInitStatus = SHCI_C2_ZIGBEE_Init();
  /* Prevent unused argument(s) compilation warning */
  UNUSED(ZigbeeInitStatus);

  /* Initialize Zigbee stack layers */
  APP_ZIGBEE_StackLayersInit();

} /* APP_ZIGBEE_Init */

/**
 * @brief  Initialize Zigbee stack layers
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_StackLayersInit(void)
{
  enum ZbStatusCodeT status;
  APP_DBG("APP_ZIGBEE_StackLayersInit");

  zigbee_app_info.zb = ZbInit(0U, NULL, NULL);
  assert(zigbee_app_info.zb != NULL);

  /* Create the endpoint and cluster(s) */
  APP_ZIGBEE_ConfigEndpoints();

  /* Configure the joining parameters */
  zigbee_app_info.join_status = (enum ZbStatusCodeT) 0x01; /* init to error status */
  zigbee_app_info.join_delay = HAL_GetTick(); /* now */
  zigbee_app_info.startupControl = ZbStartTypeJoin;
  /* STEP 1 - TRY to START FROM PERSISTENCE */

/* define if we need to do a fresh start */
  zigbee_app_info.fresh_startup = true;

  /* First we disable the persistent notification */
  ZbPersistNotifyRegister(zigbee_app_info.zb,NULL,NULL);

  /* if button 1 is pressed at boot when renew join and persistence */
  if (BSP_PB_GetState(BUTTON_USER1)==1)
  {
	  /* Call a startup from persistence */
	  status = APP_ZIGBEE_ZbStartupPersist(zigbee_app_info.zb);
	  if(status == ZB_STATUS_SUCCESS)
	  {
		 /* no fresh startup need anymore */
		 zigbee_app_info.fresh_startup = false;
		 zigbee_app_info.join_status = status;
		 APP_DBG("ZbStartupPersist: SUCCESS, restarted from persistence");
	     refresh_Frame(FRAMEGEN);
	  }
	  else
	  {
		   /* Start-up form persistence failed perform a fresh ZbStartup */
		   APP_DBG("ZbStartupPersist: FAILED to restart from persistence with status: 0x%02x",status);
	  }
  }
  while (BSP_PB_GetState(BUTTON_USER1)==0) HAL_Delay(20);
  if(zigbee_app_info.fresh_startup)
  {
    /* Go for fresh start */
    UTIL_SEQ_SetTask(1U << CFG_TASK_ZIGBEE_NETWORK_FORM, CFG_SCH_PRIO_0);
  }
  else
	   /* Start Measure of the temperature */
	  Schedule_Start_Measure();
  /* Initialization Complete */
  zigbee_app_info.has_init = true;

  /* run the task */
  //UTIL_SEQ_SetTask(1U << CFG_TASK_ZIGBEE_NETWORK_FORM, CFG_SCH_PRIO_0);
} /* APP_ZIGBEE_StackLayersInit */

/**
 * @brief  Configure Zigbee application endpoints and Clusters
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_ConfigEndpoints(void)
{
	/*
  struct ZbApsmeAddEndpointReqT req;
  struct ZbApsmeAddEndpointConfT conf;

  memset(&req, 0, sizeof(req));
  req.profileId = ZCL_PROFILE_HOME_AUTOMATION;
  req.deviceId = ZCL_DEVICE_ENVIRONMENTAL_SENSOR;
  req.endpoint = SW1_ENDPOINT;
  ZbZclAddEndpoint(zigbee_app_info.zb, &req, &conf);
  assert(conf.status == ZB_STATUS_SUCCESS);

  memset(&req, 0, sizeof(req));

  // Endpoint: SW1_ENDPOINT
  req.profileId = ZCL_PROFILE_HOME_AUTOMATION;
  req.deviceId = ZCL_DEVICE_ENVIRONMENTAL_SENSOR;
  req.endpoint = SW2_ENDPOINT;
  ZbZclAddEndpoint(zigbee_app_info.zb, &req, &conf);
  assert(conf.status == ZB_STATUS_SUCCESS);

  // Temp meas server
  zigbee_app_info.temp_meas_server = ZbZclTempMeasServerAlloc(zigbee_app_info.zb,SW1_ENDPOINT,MIN_MEASURED_TEMP,MAX_MEASURED_TEMP,TOLERANCE_TEMP);
  assert(zigbee_app_info.temp_meas_server != NULL);
  ZbZclClusterEndpointRegister(zigbee_app_info.temp_meas_server);
  // USER CODE BEGIN CONFIG_ENDPOINT
  zigbee_app_info.hum_meas_server = ZbZclWaterContentMeasServerAlloc(zigbee_app_info.zb,SW1_ENDPOINT,0x0405, MIN_HUM, MAX_HUM);
  assert(zigbee_app_info.hum_meas_server != NULL);
  ZbZclClusterEndpointRegister(zigbee_app_info.hum_meas_server);

  zigbee_app_info.hum_meas_server2 = ZbZclWaterContentMeasServerAlloc(zigbee_app_info.zb,SW2_ENDPOINT,0x0405, MIN_HUM, MAX_HUM);
  assert(zigbee_app_info.hum_meas_server != NULL);
  ZbZclClusterEndpointRegister(zigbee_app_info.hum_meas_server2);
  */

  AddProjectCluster();
  /* USER CODE END CONFIG_ENDPOINT */
} /* APP_ZIGBEE_ConfigEndpoints */

/**
 * @brief  Handle Zigbee network forming and joining
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_NwkForm(void)
{
  if ((zigbee_app_info.join_status != ZB_STATUS_SUCCESS) && (HAL_GetTick() >= zigbee_app_info.join_delay))
  {
    struct ZbStartupT config;
    enum ZbStatusCodeT status;

    /* Configure Zigbee Logging */
    ZbSetLogging(zigbee_app_info.zb, ZB_LOG_MASK_LEVEL_5, NULL);

    /* Attempt to join a zigbee network */
    ZbStartupConfigGetProDefaults(&config);

    /* Set the centralized network */
    APP_DBG("Network config : APP_STARTUP_CENTRALIZED_ROUTER");
    config.startupControl = zigbee_app_info.startupControl;

    /* Using the default HA preconfigured Link Key */
    memcpy(config.security.preconfiguredLinkKey, sec_key_ha, ZB_SEC_KEYSIZE);

    config.channelList.count = 1;
    config.channelList.list[0].page = 0;
    config.channelList.list[0].channelMask = 1 << CHANNEL; /*Channel in use */

    /* Using ZbStartupWait (blocking) */
    status = ZbStartupWait(zigbee_app_info.zb, &config);

    APP_DBG("ZbStartup Callback (status = 0x%02x)", status);
    zigbee_app_info.join_status = status;

    if (status == ZB_STATUS_SUCCESS) {
      /* USER CODE BEGIN 3 */
      zigbee_app_info.join_delay = 0U;
      zigbee_app_info.init_after_join = true;
      refresh_Frame(FRAMEGEN);
      /* Register Persistent data change notification */
      ZbPersistNotifyRegister(zigbee_app_info.zb,APP_ZIGBEE_persist_notify_cb,NULL);
      /* Call the callback once here to save persistence data */
      APP_ZIGBEE_persist_notify_cb(zigbee_app_info.zb,NULL);
    }
    else
    {
      /* USER CODE END 3 */
      APP_DBG("Startup failed, attempting again after a short delay (%d ms)", APP_ZIGBEE_STARTUP_FAIL_DELAY);
      zigbee_app_info.join_delay = HAL_GetTick() + APP_ZIGBEE_STARTUP_FAIL_DELAY;
    }
  }
  refresh_Frame(FRAMEGEN);
  /* If Network forming/joining was not successful reschedule the current task to retry the process */
  if (zigbee_app_info.join_status != ZB_STATUS_SUCCESS)
  {
    UTIL_SEQ_SetTask(1U << CFG_TASK_ZIGBEE_NETWORK_FORM, CFG_SCH_PRIO_0);
  }

  /* USER CODE BEGIN NW_FORM */
  else
  {
    zigbee_app_info.init_after_join = false;

    /* Assign ourselves to the group addresses */
    APP_ZIGBEE_ConfigGroupAddr();

    /* Since we're using group addressing (broadcast), shorten the broadcast timeout */
    uint32_t bcast_timeout = 3;
    ZbNwkSet(zigbee_app_info.zb, ZB_NWK_NIB_ID_NetworkBroadcastDeliveryTime, &bcast_timeout, sizeof(bcast_timeout));
    /* Start Measure of the temperature */
    Schedule_Start_Measure();
  }
  /* USER CODE END NW_FORM */
} /* APP_ZIGBEE_NwkForm */

/*************************************************************
 * ZbStartupWait Blocking Call
 *************************************************************/
struct ZbStartupWaitInfo {
  bool active;
  enum ZbStatusCodeT status;
};

static void ZbStartupWaitCb(enum ZbStatusCodeT status, void *cb_arg)
{
  struct ZbStartupWaitInfo *info = cb_arg;

  info->status = status;
  info->active = false;
  UTIL_SEQ_SetEvt(EVENT_ZIGBEE_STARTUP_ENDED);
} /* ZbStartupWaitCb */

enum ZbStatusCodeT ZbStartupWait(struct ZigBeeT *zb, struct ZbStartupT *config)
{
  struct ZbStartupWaitInfo *info;
  enum ZbStatusCodeT status;

  info = malloc(sizeof(struct ZbStartupWaitInfo));
  if (info == NULL) {
    return ZB_STATUS_ALLOC_FAIL;
  }
  memset(info, 0, sizeof(struct ZbStartupWaitInfo));

  info->active = true;
  status = ZbStartup(zb, config, ZbStartupWaitCb, info);
  if (status != ZB_STATUS_SUCCESS)
  {
    free(info);
    return status;
  }
  UTIL_SEQ_WaitEvt(EVENT_ZIGBEE_STARTUP_ENDED);
  status = info->status;
  free(info);
  return status;
} /* ZbStartupWait */

/**
 * @brief  Trace the error or the warning reported.
 * @param  ErrId :
 * @param  ErrCode
 * @retval None
 */
void APP_ZIGBEE_Error(uint32_t ErrId, uint32_t ErrCode)
{
  switch (ErrId) {
  default:
    APP_ZIGBEE_TraceError("ERROR Unknown ", 0);
    break;
  }
} /* APP_ZIGBEE_Error */


/*************************************************************
 *
 * NVM FUNCTIONS
 *
 *************************************************************/
/**
 * @brief  notify to save persistent data callback
 * @param  zb: Zigbee device object pointer, cbarg: callback arg pointer
 * @retval None
 */
static void APP_ZIGBEE_persist_notify_cb(struct ZigBeeT *zb, void *cbarg)
{
  APP_DBG("Notification to save persistent data requested from stack");
  /* Save the persistent data */
  APP_ZIGBEE_persist_save();
}

/**
 * @brief  Start Zigbee Network from persistent data
 * @param  zb: Zigbee device object pointer
 * @retval Zigbee stack Status code
 */
static enum ZbStatusCodeT APP_ZIGBEE_ZbStartupPersist(struct ZigBeeT* zb)
{
   bool read_status;
   enum ZbStatusCodeT status = ZB_STATUS_SUCCESS;

   /* Restore persistence */
   read_status = APP_ZIGBEE_persist_load();

   if (read_status)
   {
       /* Make sure the EPID is cleared, before we are allowed to restore persistence */
       uint64_t epid = 0U;
       ZbNwkSet(zb, ZB_NWK_NIB_ID_ExtendedPanId, &epid, sizeof(uint64_t));

       /* Start-up from persistence */
       APP_DBG("APP_ZIGBEE_ZbStartupPersist: restoring stack persistence");
       status = ZbStartupPersist(zb, &cache_persistent_data.U8_data[4], cache_persistent_data.U32_data[0],NULL,APP_ZIGBEE_PersistCompleted_callback,NULL);
   }
   else
   {
       /* Failed to restart from persistence */
       APP_DBG("APP_ZIGBEE_ZbStartupPersist: no persistence data to restore");
       status = ZB_STATUS_ALLOC_FAIL;
   }

   /* Only for debug purpose, depending of persistent data, following traces
      could display bytes that are irrelevants to on off cluster */
   if(status == ZB_STATUS_SUCCESS)
   {
     /* read the last bytes of data where the ZCL on off persistent data shall be*/
      uint32_t len = cache_persistent_data.U32_data[0] + 4 ;
      APP_DBG("ClusterID %02x %02x",cache_persistent_data.U8_data[len-9],cache_persistent_data.U8_data[len-10]);
      APP_DBG("Endpoint %02x %02x",cache_persistent_data.U8_data[len-7],cache_persistent_data.U8_data[len-8]);
      APP_DBG("Direction %02x",cache_persistent_data.U8_data[len-6]);
      APP_DBG("AttrID %02x %02x",cache_persistent_data.U8_data[len-4],cache_persistent_data.U8_data[len-5]);
      APP_DBG("Len %02x %02x",cache_persistent_data.U8_data[len-2],cache_persistent_data.U8_data[len-3]);
      APP_DBG("Value %02x",cache_persistent_data.U8_data[len-1]);
   }

   return status;
}/* APP_ZIGBEE_ZbStartupPersist */

/**
 * @brief  timer callback to wait end of restore cluster persistence form M0
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_PersistCompleted_callback(enum ZbStatusCodeT status,void *arg)
{
   if(status == ZB_WPAN_STATUS_SUCCESS)
   {
  APP_DBG("Persist complete callback entered with SUCCESS");
  /* Restore the on/off value based on persitence loaded */
  /* relire les atributs distants si besoin */
   //if(APP_ZIGBEE_RestoreClusterAttr(zigbee_app_info.onoff_server_1)==ZCL_STATUS_SUCCESS)
   //{
   //   APP_DBG("Read back OnOff cluster attribute : SUCCESS");
   //}
   //else
   //{
   //  APP_DBG("Read back OnOff cluster attribute : FAILED");
   //}
  }
  else
  {
    APP_DBG("Error in persist complete callback %x",status);
  }
   /* STEP3 - Activate back the persistent notification */
     /* Register Persistent data change notification */
     ZbPersistNotifyRegister(zigbee_app_info.zb,APP_ZIGBEE_persist_notify_cb,NULL);

     /* Call the callback once here to save persistence data */
     APP_ZIGBEE_persist_notify_cb(zigbee_app_info.zb,NULL);
}/* APP_ZIGBEE_PersistCompleted_callback */


/**
 * @brief  Load persistent data
 * @param  None
 * @retval true if success, false if fail
 */
static bool APP_ZIGBEE_persist_load(void)
{
#ifdef CFG_NVM
    APP_DBG("Retrieving persistent data from FLASH");
    return APP_ZIGBEE_NVM_Read();
#else
    /* Check length range */
    if ((cache_persistent_data.U32_data[0] == 0) ||
        (cache_persistent_data.U32_data[0] > ST_PERSIST_MAX_ALLOC_SZ))
    {
        APP_DBG("No data or too large length : %d",cache_persistent_data.U32_data[0]);
        return false;
    }
    return true;
#endif /* CFG_NVM */
} /* APP_ZIGBEE_persist_load */

/**
 * @brief  Save persistent data
 * @param  None
 * @retval true if success , false if fail
 */
static bool APP_ZIGBEE_persist_save(void)
{
    uint32_t len;

    /* Clear the RAM cache before saving */
    memset(cache_persistent_data.U8_data, 0x00, ST_PERSIST_MAX_ALLOC_SZ);

    /* Call the satck API t get current persistent data */
    len = ZbPersistGet(zigbee_app_info.zb, 0, 0);
    /* Check Length range */
    if (len == 0U)
    {
        /* If the persistence length was zero then no data available. */
        APP_DBG("APP_ZIGBEE_persist_save: no persistence data to save !");
        return false;
    }
    if (len > ST_PERSIST_MAX_ALLOC_SZ)
    {
        /* if persistence length to big to store */
        APP_DBG("APP_ZIGBEE_persist_save: persist size too large for storage (%d)", len);
        return false;
    }

    /* Store in cache the persistent data */
    len = ZbPersistGet(zigbee_app_info.zb, &cache_persistent_data.U8_data[ST_PERSIST_FLASH_DATA_OFFSET], len);

    /* Store in cache the persistent data length */
    cache_persistent_data.U32_data[0] = len;

    zigbee_app_info.persistNumWrites++;
    APP_DBG("APP_ZIGBEE_persist_save: Persistence written in cache RAM (num writes = %d) len=%d",
             zigbee_app_info.persistNumWrites, cache_persistent_data.U32_data[0]);

#ifdef CFG_NVM
    if(!APP_ZIGBEE_NVM_Write())
    {
      return false;
    }
    APP_DBG("APP_ZIGBEE_persist_save: Persistent data FLASHED");
#endif /* CFG_NVM */

    return true;
} /* APP_ZIGBEE_persist_save */

/**
 * @brief  Delete persistent data
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_persist_delete(void)
{
  /* Clear RAM cache */
   memset(cache_persistent_data.U8_data, 0x00, ST_PERSIST_MAX_ALLOC_SZ);
   APP_DBG("Persistent Data RAM cache cleared");
#ifdef CFG_NVM
   APP_DBG("FLASH ERASED");
   APP_ZIGBEE_NVM_Erase();
#endif /* CFG_NVM */
} /* APP_ZIGBEE_persist_delete */


#ifdef CFG_NVM
/**
 * @brief  Init the NVM
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_NVM_Init(void)
{
  int eeprom_init_status;

  APP_DBG("Flash starting address = %x",HW_FLASH_ADDRESS  + CFG_NVM_BASE_ADDRESS);
  eeprom_init_status = EE_Init( 0 , HW_FLASH_ADDRESS + CFG_NVM_BASE_ADDRESS );

  if(eeprom_init_status != EE_OK)
  {
    /* format NVM since init failed */
    eeprom_init_status= EE_Init( 1, HW_FLASH_ADDRESS + CFG_NVM_BASE_ADDRESS );
  }
  APP_DBG("EE_init status = %d",eeprom_init_status);

} /* APP_ZIGBEE_NVM_Init */

/**
*@brief  Read the persistent data from NVM
* @param  None
* @retval true if success , false if failed
*/
static bool APP_ZIGBEE_NVM_Read(void)
{
    uint16_t num_words = 0;
    bool status = true;
    int ee_status = 0;
    HAL_FLASH_Unlock();
    __HAL_FLASH_CLEAR_FLAG(FLASH_FLAG_EOP | FLASH_FLAG_PGSERR | FLASH_FLAG_WRPERR | FLASH_FLAG_OPTVERR);

    /* Read the data length from cache */
    ee_status = EE_Read(0, ZIGBEE_DB_START_ADDR, &cache_persistent_data.U32_data[0]);
    if (ee_status != EE_OK)
    {
        APP_DBG("Read -> persistent data length not found ERASE to be done - Read Stopped");
        status = false;
    }
      /* Check length is not too big nor zero */
    else if((cache_persistent_data.U32_data[0] == 0) ||
            (cache_persistent_data.U32_data[0]> ST_PERSIST_MAX_ALLOC_SZ))
    {
            APP_DBG("No data or too large length : %d", cache_persistent_data.U32_data[0]);
            status = false;
    }
        /* Length is within range */
    else
    {
           /* Adjust the length to be U32 aligned */
            num_words = (uint16_t) (cache_persistent_data.U32_data[0]/4) ;
            if (cache_persistent_data.U32_data[0] % 4 != 0)
            {
                num_words++;
            }

            /* copy the read data from Flash to cache including length */
            for (uint16_t local_length = 1; local_length <= num_words; local_length++)
            {
                /* read data from first data in U32 unit */
                ee_status = EE_Read(0, local_length + ZIGBEE_DB_START_ADDR, &cache_persistent_data.U32_data[local_length] );
                if (ee_status != EE_OK)
                {
                    APP_DBG("Read not found leaving");
                    status = false;
                    break;
                }
            }
    }

    HAL_FLASH_Lock();
    if(status)
    {
        APP_DBG("READ PERSISTENT DATA LEN = %d",cache_persistent_data.U32_data[0]);
    }
    return status;
} /* APP_ZIGBEE_NVM_Read */

/**
 * @brief  Write the persistent data in NVM
 * @param  None
 * @retval None
 */
static bool APP_ZIGBEE_NVM_Write(void)
{
    int ee_status = 0;

    uint16_t num_words;
    uint16_t local_current_size;


    num_words = 1U; /* 1 words for the length */
    num_words+= (uint16_t) (cache_persistent_data.U32_data[0]/4);


    /* Adjust the length to be U32 aligned */
    if (cache_persistent_data.U32_data[0] % 4 != 0)
    {
        num_words++;
    }

    //save data in flash
    for (local_current_size = 0; local_current_size < num_words; local_current_size++)
    {
        ee_status = EE_Write(0, (uint16_t)local_current_size + ZIGBEE_DB_START_ADDR, cache_persistent_data.U32_data[local_current_size]);
        if (ee_status != EE_OK)
        {
           if(ee_status == EE_CLEAN_NEEDED) /* Shall not be there if CFG_EE_AUTO_CLEAN = 1*/
           {
              APP_DBG("CLEAN NEEDED, CLEANING");
              EE_Clean(0,0);
           }
           else
           {
              /* Failed to write , an Erase shall be done */
              APP_DBG("APP_ZIGBEE_NVM_Write failed @ %d status %d", local_current_size,ee_status);
              break;
           }
        }
    }


    if(ee_status != EE_OK)
    {
       APP_DBG("WRITE STOPPED, need a FLASH ERASE");
       return false;
    }

    APP_DBG("WRITTEN PERSISTENT DATA LEN = %d",cache_persistent_data.U32_data[0]);
    return true;

} /* APP_ZIGBEE_NVM_Write */

/**
 * @brief  Erase the NVM
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_NVM_Erase(void)
{
   EE_Init(1, HW_FLASH_ADDRESS + CFG_NVM_BASE_ADDRESS); /* Erase Flash */
} /* APP_ZIGBEE_NVM_Erase */

#endif /* CFG_NVM */

/**
 * @brief  LCD initialisation
 * @param  None
 * @retval None
 */
void APP_ZIGBEE_LCD_DisplayInit(void)
{
    BSP_LCD_Init(0, LCD_ORIENTATION_LANDSCAPE);
    /* Set LCD Foreground Layer  */
    UTIL_LCD_SetFuncDriver(&LCD_Driver); /* SetFunc before setting device */
    UTIL_LCD_SetDevice(0);            /* SetDevice after funcDriver is set */
    BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
    BSP_LCD_DisplayOn(0);
    BSP_LCD_Refresh(0);
    UTIL_LCD_SetFont(&Font12);
    /* Set the LCD Text Color */
    UTIL_LCD_SetTextColor(SSD1315_COLOR_WHITE);
    UTIL_LCD_SetBackColor(SSD1315_COLOR_BLACK);
    BSP_LCD_Clear(0,SSD1315_COLOR_BLACK);
    BSP_LCD_Refresh(0);
}

/*************************************************************
 *
 * LOCAL FUNCTIONS
 *
 *************************************************************/

/**
 * @brief  Warn the user that an error has occurred.
 *
 * @param  pMess  : Message associated to the error.
 * @param  ErrCode: Error code associated to the module (Zigbee or other module if any)
 * @retval None
 */
static void APP_ZIGBEE_TraceError(const char *pMess, uint32_t ErrCode)
{
  APP_DBG("**** Fatal error = %s (Err = %d)", pMess, ErrCode);
  /* USER CODE BEGIN TRACE_ERROR */
  while (1U == 1U) {
    UTIL_LCD_ClearStringLine(4);
    UTIL_LCD_DisplayStringAt(0, LINE(4), (uint8_t *)"FATAL_ERROR", CENTER_MODE);
    BSP_LCD_Refresh(0);
    HAL_Delay(500U);
    UTIL_LCD_ClearStringLine(4);
    BSP_LCD_Refresh(0);

  }
  /* USER CODE END TRACE_ERROR */

} /* APP_ZIGBEE_TraceError */

/**
 * @brief Check if the Coprocessor Wireless Firmware loaded supports Zigbee
 *        and display associated information
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_CheckWirelessFirmwareInfo(void)
{
  WirelessFwInfo_t wireless_info_instance;
  WirelessFwInfo_t *p_wireless_info = &wireless_info_instance;

  if (SHCI_GetWirelessFwInfo(p_wireless_info) != SHCI_Success) {
    APP_ZIGBEE_Error((uint32_t)ERR_ZIGBEE_CHECK_WIRELESS, (uint32_t)ERR_INTERFACE_FATAL);
  }
  else {
    APP_DBG("**********************************************************");
    APP_DBG("WIRELESS COPROCESSOR FW:");
    /* Print version */
    APP_DBG("VERSION ID = %d.%d.%d", p_wireless_info->VersionMajor, p_wireless_info->VersionMinor, p_wireless_info->VersionSub);

    switch (p_wireless_info->StackType) {
    case INFO_STACK_TYPE_ZIGBEE_FFD:
      APP_DBG("FW Type : FFD Zigbee stack");
      break;
   case INFO_STACK_TYPE_ZIGBEE_RFD:
      APP_DBG("FW Type : RFD Zigbee stack");
      break;
    default:
      /* No Zigbee device supported ! */
      APP_ZIGBEE_Error((uint32_t)ERR_ZIGBEE_CHECK_WIRELESS, (uint32_t)ERR_INTERFACE_FATAL);
      break;
    }
    // print the application name
    char* __PathProject__ =(strstr(__FILE__, "Zigbee") ? strstr(__FILE__, "Zigbee") + 7 : __FILE__);
    char *del;
    if ( (strchr(__FILE__, '/')) == NULL)
        {del = strchr(__PathProject__, '\\');}
    else 
        {del = strchr(__PathProject__, '/');}
    
        int index = (int) (del - __PathProject__);
        APP_DBG("Application flashed: %*.*s",index,index,__PathProject__);
    
    //print channel
    APP_DBG("Channel used: %d",CHANNEL);
    //print Link Key
    APP_DBG("Link Key: %.16s", sec_key_ha);
    //print Link Key value hex   
    char Z09_LL_string[ZB_SEC_KEYSIZE*3+1];
    Z09_LL_string[0]=0;
    for(int str_index=0; str_index < ZB_SEC_KEYSIZE; str_index++)
      {           
        sprintf(&Z09_LL_string[str_index*3],"%02x ",sec_key_ha[str_index]);
      }
  
    APP_DBG("Link Key value: %s",Z09_LL_string);
    //print clusters allocated
    APP_DBG("Clusters allocated are:");  
    APP_DBG("Temperature measurement Server on Endpoint %02d",ENDPOINT_GEN);
    APP_DBG("**********************************************************");
  }
} /* APP_ZIGBEE_CheckWirelessFirmwareInfo */


/**
 * @brief Init NVM Diagnostic test. Init test pattern and reset NVM memory.
 * This will DESTROY the existing NVM data
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_NVM_Diag_Init(void)
{
   /* disable notification */
    ZbPersistNotifyRegister(zigbee_app_info.zb,NULL,NULL);

    /* Display information on the configuration */
    APP_DBG("");
    APP_DBG("NVM DIAGNOSTICS TEST STARTED")
    APP_DBG("NVM CONFIGURATION");
    APP_DBG("Nb Flash Page allocated : %d",CFG_NB_OF_PAGE);
    APP_DBG("Bank Size : %d bytes",CFG_EE_BANK0_SIZE);
    APP_DBG("Flash Base Address: %08x",(0x08000000+CFG_NVM_BASE_ADDRESS));
    APP_DBG("Persist Max alloc buffer: %d bytes",ST_PERSIST_MAX_ALLOC_SZ);
    APP_DBG("Auto Clean : %d",CFG_EE_AUTO_CLEAN);
    APP_DBG("");
    /* Clear cache and Erase NVM */
    APP_ZIGBEE_persist_delete();

    /* build the test pattern */
    cache_persistent_data.U32_data[0]= 725;
    memset(&cache_persistent_data.U8_data[4],0xAA,95);
    memset(&cache_persistent_data.U8_data[100],0xBB,100);
    memset(&cache_persistent_data.U8_data[200],0xCC,100);
    memset(&cache_persistent_data.U8_data[300],0xDD,100);
    memset(&cache_persistent_data.U8_data[400],0xEE,100);
    memset(&cache_persistent_data.U8_data[500],0x77,221);
    cache_persistent_data.U8_data[722] = 0x01;
    cache_persistent_data.U8_data[723] = 0x02;
    cache_persistent_data.U8_data[724] = 0x03;
    cache_persistent_data.U8_data[725] = 0x04;

    /* Save the pattern in the reference cache for data validation */
    memcpy(&cache_diag_reference.U8_data[0],&cache_persistent_data.U8_data[0],ST_PERSIST_MAX_ALLOC_SZ);

} /* APP_ZIGBEE_NVM_Diag_Init */

/**
 * @brief Execute  NVM Diagnostic test.
 *
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_NVM_Diag_Exec(void)
{
  uint16_t test = 1;

  bool write_err = false;
  bool read_err = false;
  bool data_err = false;


  /* Test init */
  APP_ZIGBEE_NVM_Diag_Init();

  /* Execute tests 30 loops is enough to overlapped 2n half of a 64k flash   */
  for (test = 1 ; test <= 30; test++)
  {
    APP_DBG("TEST #%d --> EXECUTION",test);
    APP_DBG(">>> WRITE NVM");
    if(!APP_ZIGBEE_NVM_Write())
    {
      write_err = true;
      break;
    }
    APP_DBG("<<< READ NVM");
    if(!APP_ZIGBEE_NVM_Read())
    {
      read_err = true;
      break;
    }
    APP_DBG("DATA VALIDATION");
    if(!APP_ZIGBEE_NVM_Diag_DataValidation())
    {
      data_err = true;
      break;
    }
    else
    {
      APP_DBG("TEST #%d --> PASSED",test);
      APP_DBG("");
    }
  }
  if(write_err)
  {
     APP_DBG("NVM DIAGNOSTIC TESTS STATUS --> FAILED (write error)",test);
  }
  else if(read_err)
  {
     APP_DBG("NVM DIAGNOSTIC TESTS STATUS --> FAILED (read error)",test);
  }
  else if(data_err)
  {
     APP_DBG("NVM DIAGNOSTIC TESTS STATUS --> FAILED (data integrity error)",test);
  }
  else{
    APP_DBG("NVM DIAGNOSTIC TESTS STATUS --> PASSED",test);
  }
  APP_DBG("");
  APP_DBG("NVM DIAGNOSTIC TESTS IS OVER");
}

/**
 * @brief Execute  NVM Diagnostic data integrity validation.
 *
 * @param  None
 * @retval None
 */
static bool APP_ZIGBEE_NVM_Diag_DataValidation(void)
{
  bool status = true;
  /* Check length */
  if(cache_persistent_data.U32_data[0] != cache_diag_reference.U32_data[0])
  {
    APP_DBG("DATA LENGTH FAILED %d vs ref %d",cache_persistent_data.U32_data[0],
                                              cache_diag_reference.U32_data[0]);
    return false;
  }

  /* Check data */
  for (uint16_t i = 4 ; i <= 725; i++)
  {
    if(cache_persistent_data.U8_data[i] != cache_diag_reference.U8_data[i])
    {
      APP_DBG("FAILED data validation byte #%d - %02x vs ref %02x",i,
                                     cache_persistent_data.U8_data[i],
                                     cache_diag_reference.U8_data[i] );
      status = false ;
    }
  }

  return status;
} /* APP_ZIGBEE_NVM_Diag_DataValidation */



/*************************************************************
 *
 * WRAP FUNCTIONS
 *
 *************************************************************/

void APP_ZIGBEE_RegisterCmdBuffer(TL_CmdPacket_t *p_buffer)
{
  p_ZIGBEE_otcmdbuffer = p_buffer;
} /* APP_ZIGBEE_RegisterCmdBuffer */

Zigbee_Cmd_Request_t * ZIGBEE_Get_OTCmdPayloadBuffer(void)
{
  return (Zigbee_Cmd_Request_t *)p_ZIGBEE_otcmdbuffer->cmdserial.cmd.payload;
} /* ZIGBEE_Get_OTCmdPayloadBuffer */

Zigbee_Cmd_Request_t * ZIGBEE_Get_OTCmdRspPayloadBuffer(void)
{
  return (Zigbee_Cmd_Request_t *)((TL_EvtPacket_t *)p_ZIGBEE_otcmdbuffer)->evtserial.evt.payload;
} /* ZIGBEE_Get_OTCmdRspPayloadBuffer */

Zigbee_Cmd_Request_t * ZIGBEE_Get_NotificationPayloadBuffer(void)
{
  return (Zigbee_Cmd_Request_t *)(p_ZIGBEE_notif_M0_to_M4)->evtserial.evt.payload;
} /* ZIGBEE_Get_NotificationPayloadBuffer */

Zigbee_Cmd_Request_t * ZIGBEE_Get_M0RequestPayloadBuffer(void)
{
  return (Zigbee_Cmd_Request_t *)(p_ZIGBEE_request_M0_to_M4)->evtserial.evt.payload;
}

/**
 * @brief  This function is used to transfer the commands from the M4 to the M0.
 *
 * @param   None
 * @return  None
 */
void ZIGBEE_CmdTransfer(void)
{
  Zigbee_Cmd_Request_t *cmd_req = (Zigbee_Cmd_Request_t *)p_ZIGBEE_otcmdbuffer->cmdserial.cmd.payload;

  /* Zigbee OT command cmdcode range 0x280 .. 0x3DF = 352 */
  p_ZIGBEE_otcmdbuffer->cmdserial.cmd.cmdcode = 0x280U;
  /* Size = otCmdBuffer->Size (Number of OT cmd arguments : 1 arg = 32bits so multiply by 4 to get size in bytes)
   * + ID (4 bytes) + Size (4 bytes) */
  p_ZIGBEE_otcmdbuffer->cmdserial.cmd.plen = 8U + (cmd_req->Size * 4U);

  TL_ZIGBEE_SendM4RequestToM0();

  /* Wait completion of cmd */
  Wait_Getting_Ack_From_M0();
} /* ZIGBEE_CmdTransfer */

/**
 * @brief  This function is called when the M0+ acknowledge the fact that it has received a Cmd
 *
 *
 * @param   Otbuffer : a pointer to TL_EvtPacket_t
 * @return  None
 */
void TL_ZIGBEE_CmdEvtReceived(TL_EvtPacket_t *Otbuffer)
{
  /* Prevent unused argument(s) compilation warning */
  UNUSED(Otbuffer);

  Receive_Ack_From_M0();
} /* TL_ZIGBEE_CmdEvtReceived */

/**
 * @brief  This function is called when notification from M0+ is received.
 *
 * @param   Notbuffer : a pointer to TL_EvtPacket_t
 * @return  None
 */
void TL_ZIGBEE_NotReceived(TL_EvtPacket_t *Notbuffer)
{
  p_ZIGBEE_notif_M0_to_M4 = Notbuffer;

  Receive_Notification_From_M0();
} /* TL_ZIGBEE_NotReceived */

/**
 * @brief  This function is called before sending any ot command to the M0
 *         core. The purpose of this function is to be able to check if
 *         there are no notifications coming from the M0 core which are
 *         pending before sending a new ot command.
 * @param  None
 * @retval None
 */
void Pre_ZigbeeCmdProcessing(void)
{
  UTIL_SEQ_WaitEvt(EVENT_SYNCHRO_BYPASS_IDLE);
} /* Pre_ZigbeeCmdProcessing */

/**
 * @brief  This function waits for getting an acknowledgment from the M0.
 *
 * @param  None
 * @retval None
 */
static void Wait_Getting_Ack_From_M0(void)
{
  UTIL_SEQ_WaitEvt(EVENT_ACK_FROM_M0_EVT);
} /* Wait_Getting_Ack_From_M0 */

/**
 * @brief  Receive an acknowledgment from the M0+ core.
 *         Each command send by the M4 to the M0 are acknowledged.
 *         This function is called under interrupt.
 * @param  None
 * @retval None
 */
static void Receive_Ack_From_M0(void)
{
  UTIL_SEQ_SetEvt(EVENT_ACK_FROM_M0_EVT);
} /* Receive_Ack_From_M0 */

/**
 * @brief  Receive a notification from the M0+ through the IPCC.
 *         This function is called under interrupt.
 * @param  None
 * @retval None
 */
static void Receive_Notification_From_M0(void)
{
    CptReceiveNotifyFromM0++;
    UTIL_SEQ_SetTask(1U << (uint32_t)CFG_TASK_NOTIFY_FROM_M0_TO_M4, CFG_SCH_PRIO_0);
}

/**
 * @brief  This function is called when a request from M0+ is received.
 *
 * @param   Notbuffer : a pointer to TL_EvtPacket_t
 * @return  None
 */
void TL_ZIGBEE_M0RequestReceived(TL_EvtPacket_t *Reqbuffer)
{
    p_ZIGBEE_request_M0_to_M4 = Reqbuffer;

    CptReceiveRequestFromM0++;
    UTIL_SEQ_SetTask(1U << (uint32_t)CFG_TASK_REQUEST_FROM_M0_TO_M4, CFG_SCH_PRIO_0);
}

/**
 * @brief Perform initialization of TL for Zigbee.
 * @param  None
 * @retval None
 */
void APP_ZIGBEE_TL_INIT(void)
{
    ZigbeeConfigBuffer.p_ZigbeeOtCmdRspBuffer = (uint8_t *)&ZigbeeOtCmdBuffer;
    ZigbeeConfigBuffer.p_ZigbeeNotAckBuffer = (uint8_t *)ZigbeeNotifRspEvtBuffer;
    ZigbeeConfigBuffer.p_ZigbeeNotifRequestBuffer = (uint8_t *)ZigbeeNotifRequestBuffer;
    TL_ZIGBEE_Init(&ZigbeeConfigBuffer);
}

/**
 * @brief Process the messages coming from the M0.
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_ProcessNotifyM0ToM4(void)
{
  if (CptReceiveNotifyFromM0 != 0)
  {
    /* Reset counter */
    CptReceiveNotifyFromM0 = 0;
    Zigbee_CallBackProcessing();
  }
}

/**
 * @brief Process the requests coming from the M0.
 * @param  None
 * @return None
 */
static void APP_ZIGBEE_ProcessRequestM0ToM4(void)
{
    if (CptReceiveRequestFromM0 != 0) {
      CptReceiveRequestFromM0 = 0;
      Zigbee_M0RequestProcessing();
    }
}
/* USER CODE BEGIN FD_LOCAL_FUNCTIONS */

/**
 * @brief  Set group addressing mode
 * @param  None
 * @retval None
 */
static void APP_ZIGBEE_ConfigGroupAddr(void)
{
  struct ZbApsmeAddGroupReqT req;
  struct ZbApsmeAddGroupConfT conf;

  memset(&req, 0, sizeof(req));
  req.endpt = SW1_ENDPOINT;
  req.groupAddr = SW1_GROUP_ADDR;
  ZbApsmeAddGroupReq(zigbee_app_info.zb, &req, &conf);

} /* APP_ZIGBEE_ConfigGroupAddr */


/**
 * @brief  Write locally temp meas attribute 
 * @param  sensor read temp value
 * @retval None
 */
void APP_ZIGBEE_WriteTempAttribute(float temp_val)
{
   //enum ZclStatusCodeT status;
  
   //float temp = temp_val*100;
   //int16_t temp_val_attr;
   /* Write attribute */
  //temp_val_attr = (int16_t) temp ;
   aPwmLedGsData_TypeDef aPwmLedGsData;
  aPwmLedGsData[PWM_LED_RED] = PWM_LED_GSDATA_OFF;
  aPwmLedGsData[PWM_LED_GREEN] = PWM_LED_GSDATA_7_0;
  aPwmLedGsData[PWM_LED_BLUE] = PWM_LED_GSDATA_OFF;
  LED_Toggle(aPwmLedGsData);
  //status = ZbZclAttrIntegerWrite(zigbee_app_info.temp_meas_server, ZCL_TEMP_MEAS_ATTR_MEAS_VAL, (int16_t)temp_val_attr);
  //if(status != ZCL_STATUS_SUCCESS)
  //{
  //    UTIL_LCD_DisplayStringAtLine(3,(uint8_t *) "WRITE ATTR ERR");
  //    BSP_LCD_Refresh(0);
  //}
}/*APP_ZIGBEE_WriteTempAttribute*/

void APP_ZIGBEE_LedToggle(void)
{
	   aPwmLedGsData_TypeDef aPwmLedGsData;
	  aPwmLedGsData[PWM_LED_RED] = PWM_LED_GSDATA_OFF;
	  aPwmLedGsData[PWM_LED_GREEN] = PWM_LED_GSDATA_7_0;
	  aPwmLedGsData[PWM_LED_BLUE] = PWM_LED_GSDATA_OFF;
	  LED_Toggle(aPwmLedGsData);
}

/**
 * @brief  Write locally temp meas attribute
 * @param  sensor read temp value
 * @retval None
 */
void APP_ZIGBEE_WriteHumAttribute(float hum_val)
{
   //enum ZclStatusCodeT status;
   //float hum = hum_val*100;
   //int16_t hum_val_attr;
   /* Write attribute */
  //hum_val_attr = (int16_t) hum ;
   /* Write attribute */
 // status = ZbZclAttrIntegerWrite(zigbee_app_info.hum_meas_server, ZCL_WC_MEAS_ATTR_MEAS_VAL, (int16_t)hum_val_attr);
  /*if(status != ZCL_STATUS_SUCCESS)
  {
      UTIL_LCD_DisplayStringAtLine(3,(uint8_t *) "WRITE ATTR ERR");
      BSP_LCD_Refresh(0);
  }
  hum_val_attr+=100;
  //status = ZbZclAttrIntegerWrite(zigbee_app_info.hum_meas_server2, ZCL_WC_MEAS_ATTR_MEAS_VAL, (int16_t)hum_val_attr);
  if(status != ZCL_STATUS_SUCCESS)
  {
      UTIL_LCD_DisplayStringAtLine(3,(uint8_t *) "WRITE ATTR ERR");
      BSP_LCD_Refresh(0);
  }*/
}/*APP_ZIGBEE_WriteTempAttribute*/

/**
 * @brief  Deinit LED
 * @param  None
 * @retval None
 */
static void LED_Deinit(void)
{
  GPIO_InitTypeDef  GPIO_InitStructure = {0};
  
  /* RGB Led de-init */
  BSP_PWM_LED_DeInit();

  /* configure SPIx MOSI for LCD */
  GPIO_InitStructure.Pin       = BUS_SPI1_MOSI_PIN;
  GPIO_InitStructure.Mode      = GPIO_MODE_AF_PP;
  GPIO_InitStructure.Pull      = GPIO_PULLDOWN;
  GPIO_InitStructure.Speed     = GPIO_SPEED_FREQ_LOW;
  GPIO_InitStructure.Alternate = BUS_SPI1_AF;
  HAL_GPIO_Init(BUS_SPI1_GPIO_PORTA, &GPIO_InitStructure);
}/*LED_Deinit*/

/**
 * @brief  LED On
 * @param  PwmData
 * @retval None
 */
static void LED_On(aPwmLedGsData_TypeDef aPwmLedGsData)
{
  BSP_PWM_LED_Init();
  BSP_PWM_LED_On(aPwmLedGsData);
  LED_Deinit();
}/*LED_On*/

/**
 * @brief  LED off
 * @param  None
 * @retval None
 */
static void LED_Off(void)
{
  BSP_PWM_LED_Init();
  BSP_PWM_LED_Off();
  LED_Deinit();
}/*LED_Off*/

/**
 * @brief  LED Toggle
 * @param  PwmData
 * @retval None
 */
static void LED_Toggle(aPwmLedGsData_TypeDef aPwmLedGsData)
{
  if (BSP_PWM_LED_GetState() == 0U)
  {
    LED_On(aPwmLedGsData);
  }
  else
  {
    LED_Off();
  }
}/*LED_Toggle*/
/* USER CODE END FD_LOCAL_FUNCTIONS */



