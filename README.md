<h3>Zigbee Environmental measurement center for indoor plants or greenhouse</h3>

The goal of this project is to create with STM32WB5MM-DK a device allowing environmental measurements as well as monitoring of soil humidity and soil temperature of plantations with the management of an automation allowing automated watering and additional illumination according to the measurements.

![image](https://github.com/ROMASZEWSKI/project-stm32wb5mm-dk-Contest-2024/assets/149319225/d6053d69-33aa-460b-99dc-ba84c00970e6)

<h3>Project description</h3>

![Sensors in place (Petite)](https://github.com/ROMASZEWSKI/project-stm32wb5mm-dk-Contest-2024/assets/149319225/f77cbeac-67cb-4708-8d8a-a80df298e40e)

The goal of this project is to create an environmental measurement unit, lighting and water supply for indoor plants or in a greenhouse using the stm32wb5mm-dk kit with communication in the Zigbee protocol to a server Mqtt linux on the internet through an Mqtt2Zigbee gateway under Windows 11, the information and automations then being processed by the Node-RED application under Linux with web user interface.
The persistence of data is performed by Node-RED to a MariaDB database under Linux.  
A box has been designed and printed on a 3D printer to accommodate the stm32wb5mm-dk card which will be fixed with 3 screws, the main diode is visible through the top case and a window is available to view the Oled display. The two buttons are mechanically transferred to the exterior. The two USB sockets are available and a way is provided for all the wiring. The sensors are fixed on the upper part, each with a receptacle and a window to the outside.

The device must carry out measurements of ambient temperature, ambient humidity, atmospheric pressure (BME280 component), Co2 level, air quality and volatile organic compound or TVOC level. (Ens160 component). An illumination sensor is present to measure the available light. Finally, a capacitive water level sensor is used and fixed to the low level of the water reserve.

Some measurements are taken at each plant using a capacitive sensor and a temperature probe (DS18B20 component). Capacitive sensors are measured with a 16-bit converter (ADS1115 component).

Most sensors can be used via the board's available I2C1 bus. One port is used to create a 1-wire bus for the 3 DS18B20s.

A switching board equipped with power MOSFETs is responsible for relaying the ports of the main board in order to manage 3 watering pumps and a relay for switching a special lamp for plants.

A switching power supply module provides complementary 3v3 power from the 5v source and powers the Shield. This card can also charge a battery and provide 3v3 if  5v is no more present.

The 3 pumps operating from 3v to 5v with brushless motors are immersed in the water reserve and a silicone hose supplies each plant.

In the event of lack of humidity in a plant, the planned automation takes care of supplying water with a given watering time until the desired humidity level is reached.

Phone SMS sending from node-RED is planned when the ambient or plant temperature is too high, when the air quality is too poor or when the water level is too low.

Datas are available and accessible via the Zigbee network, the card behaves as a server and as a router.

Datas are read and refreshed locally every 4s or fixed via an attribute .

The data can be viewed on the Oled display by selecting different screens using buttons 1 and 2.

To force the Zigbee pairing of the card at startup, button 1 must be pressed for 3 seconds.

The available and modifiable data for the lamp and the operating time of the pumps are available to be used by a Zigbee2mqtt coordinator, this coordinator is responsible for retrieving/modifying the information and retransmitting/monitoring topics (path to each data) on a mqtt server.

By using Node-RED specialized in retrieving and modifying Topics, it is possible with a graphical editor to display, storage in dataBase and make some automations.

This project uses different skills: digital electronics, printed circuit design, 3D printing creation, microcontroller programming, internet networks, Mqtt server, Node-RED server, Mariadb database, Linux system.

<h3>My goals are as follows:</h3>

- The first objective which constitutes this project is the commissioning of the stm32wb5mm-dk kit with the use of the sensors on the card and the use of additional sensors connected to a daughter card (two layers shield PCB) . The design of a two specific box printed in ABS or ASA, on 3D printer. The card works in Router/CLUSTER client-server mode. Interface to Zigbee2mqtt application and Node-RED interface.

- The second objective after is the creation of a printed card (4 layers) using the integrated component stm32wb55mmg with its shield (daughter card) and a power supply circuit with battery and solar panel, allowing the exploitation of the low power mode of the component .

Resumption of certain sensors from the first part.

Add water quality TDS sensor. Add high level sensor and automatic supply the water reserve.

- The third objective is to use and evaluate the Thread network in place of Zigbee.

<h3>Ressources links of the project</h3>

<h3>Project description </h3>
https://project.sophe.com/project_description.pdf


<h3>All files of the project </h3>
https://project.sophe.com/stm32ContestAllProject.zip
 
<b>For discovering the project :</b>

Read project_description.pdf<br/>
you find stm32cube_project.zip for stm32Cubeproject<br/>
Parse PCB directory<br/>
Parse 3D_print directory<br />
Parse zigbee2mqtt directory, you can read Zigbee2Mqtt_on_Windows_install.pdf <br />
Parse node-RED directory, you can read Installation_of_node-RED and persistence.pdf <br />
And some photos and datasheets.<br />
