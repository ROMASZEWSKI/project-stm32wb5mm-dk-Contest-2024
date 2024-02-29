/*
 * app_screen.h
 *
 *  Created on: Jan 25, 2024
 *      Author: mag
 */

#ifndef APPLICATION_USER_CORE_APP_SCREEN_H_
#define APPLICATION_USER_CORE_APP_SCREEN_H_

extern uint8_t currentFrame;
extern uint8_t refreshFrame;

#define NOFRAMETOREFRESH 0
#define FRAMETOREFRESH 1
#define FRAMEREFRESHING 2

#define MAX_FRAMES 7
#define FRAMEGEN 0
#define FRAMECARD 1
#define FRAMEENV 2
#define FRAMEPLANT1 3
#define FRAMEPLANT2 4
#define FRAMEPLANT3 5
#define FRAMEID 6

void init_Frames(void);
void refresh_Frame(uint8_t rf);


#endif /* APPLICATION_USER_CORE_APP_SCREEN_H_ */
