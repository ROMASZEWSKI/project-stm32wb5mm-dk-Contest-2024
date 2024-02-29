/*
 * app_clusters.h
 *
 *  Created on: Jan 13, 2024
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_CLUSTERS_H_
#define APPLICATION_USER_CORE_APP_CLUSTERS_H_

#include "zcl/zcl.h"
#include "zcl/general/zcl.temp.meas.h"

struct zigbee_app_info {
  bool has_init;
  struct ZigBeeT *zb;
  enum ZbStartType startupControl;
  enum ZbStatusCodeT join_status;
  uint32_t join_delay;
  bool init_after_join;
  uint32_t persistNumWrites;
  bool fresh_startup;
  struct ZbZclClusterT *clusters[1];
};
extern struct zigbee_app_info zigbee_app_info;

#define IDCLUSTER_CARD 0x00

#define ENDPOINT_GEN	0x01


#define ATTCARDBATT 		0x0101
#define ATTREFRESHMEAS		0x0102

#define ATTENVLUM	        0x0300
#define ATTENVPRESS			0x0301
#define ATTENVHUM			0x0302
#define ATTENVTEMP			0x0303
#define ATTENVQA			0x0304
#define ATTENVCO2			0x0305
#define ATTENVTVOC			0x0306
#define ATTENVR1			0x0307
#define ATTENVR2			0x0308
#define ATTENVR3			0x0309
#define ATTENVR4			0x030A
#define ATTWHITELUM         0x030B
#define ATTTANKLEVEL		0x030C


#define ATTPLANTTEMP1		0x0310
#define ATTPLANTIDDS1		0x0311
#define ATTPLANTSHUM1		0x0312
#define ATTPLANTWALIM1		0x0313
#define ATTPLANTWALIMSTATE1	0x0314

#define ATTPLANTTEMP2		0x0320
#define ATTPLANTIDDS2		0x0321
#define ATTPLANTSHUM2		0x0322
#define ATTPLANTWALIM2		0x0323
#define ATTPLANTWALIMSTATE2	0x0324

#define ATTPLANTTEMP3		0x0330
#define ATTPLANTIDDS3		0x0331
#define ATTPLANTSHUM3		0x0332
#define ATTPLANTWALIM3		0x0333
#define ATTPLANTWALIMSTATE3	0x0334

#define ATTLIGHT			0x0340

#define ATTCARDGYROAXEX 0x0200
#define ATTCARDGYROAXEY 0x0201
#define ATTCARDGYROAXEZ 0x0202
#define ATTCARDGYROSPEEDX 0x0203
#define ATTCARDGYROSPEEDY 0x0204
#define ATTCARDGYROSPEEDZ 0x0205
#define ATTCARDGYROACT	0x0206

void AddProjectCluster(void);
extern uint16_t ListAttrPumpAlim[3];
extern uint16_t ListAttrPumpState[3];
extern uint16_t ListAttrIDDS[3];
extern uint16_t ListAttrTemp[3];





#endif /* APPLICATION_USER_CORE_APP_CLUSTERS_H_ */
