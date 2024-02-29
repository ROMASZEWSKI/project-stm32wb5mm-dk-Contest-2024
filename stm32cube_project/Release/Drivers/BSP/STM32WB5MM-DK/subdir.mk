################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.c \
C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.c \
C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.c 

OBJS += \
./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.o \
./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.o \
./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.o 

C_DEPS += \
./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.d \
./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.d \
./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.d 


# Each subdirectory must supply rules for building sources it contributes
Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.o: C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.c Drivers/BSP/STM32WB5MM-DK/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DZIGBEE_WB -DSTM32WB55xx -DUSE_HAL_DRIVER -c -I../../Core/Inc -I../../STM32_WPAN/App -I../../Drivers/BSP/STM32WB5MM-DK -I../../Drivers/BSP/Components/Common -I../../Drivers/STM32WBxx_HAL_Driver/Inc -I../../Drivers/STM32WBxx_HAL_Driver/Inc/Legacy -I../../Middlewares/ST/STM32_WPAN -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/tl -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/shci -I../../Middlewares/ST/STM32_WPAN/utilities -I../../Drivers/CMSIS/Device/ST/STM32WBxx/Include -I../../Middlewares/ST/STM32_WPAN/zigbee/core/inc -I../../Middlewares/ST/STM32_WPAN/zigbee/stack -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include/mac -I../../Drivers/CMSIS/Include -I../../Utilities/sequencer -I../../Utilities/lpm/tiny_lpm -I../../Utilities/LCD -I../../Drivers/BSP/Components/stts22h -I../../Drivers/BSP/Components/ssd1315 -I../../Drivers/BSP/Components/ism330dhcx -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ads1115" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/bme280" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/veml7700" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ds18b20" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/dwt" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/onewire" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ens160" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ahtxx" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Application/User/Core" -Os -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@"  -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.o: C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.c Drivers/BSP/STM32WB5MM-DK/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DZIGBEE_WB -DSTM32WB55xx -DUSE_HAL_DRIVER -c -I../../Core/Inc -I../../STM32_WPAN/App -I../../Drivers/BSP/STM32WB5MM-DK -I../../Drivers/BSP/Components/Common -I../../Drivers/STM32WBxx_HAL_Driver/Inc -I../../Drivers/STM32WBxx_HAL_Driver/Inc/Legacy -I../../Middlewares/ST/STM32_WPAN -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/tl -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/shci -I../../Middlewares/ST/STM32_WPAN/utilities -I../../Drivers/CMSIS/Device/ST/STM32WBxx/Include -I../../Middlewares/ST/STM32_WPAN/zigbee/core/inc -I../../Middlewares/ST/STM32_WPAN/zigbee/stack -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include/mac -I../../Drivers/CMSIS/Include -I../../Utilities/sequencer -I../../Utilities/lpm/tiny_lpm -I../../Utilities/LCD -I../../Drivers/BSP/Components/stts22h -I../../Drivers/BSP/Components/ssd1315 -I../../Drivers/BSP/Components/ism330dhcx -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ads1115" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/bme280" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/veml7700" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ds18b20" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/dwt" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/onewire" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ens160" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ahtxx" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Application/User/Core" -Os -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@"  -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"
Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.o: C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.c Drivers/BSP/STM32WB5MM-DK/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DZIGBEE_WB -DSTM32WB55xx -DUSE_HAL_DRIVER -c -I../../Core/Inc -I../../STM32_WPAN/App -I../../Drivers/BSP/STM32WB5MM-DK -I../../Drivers/BSP/Components/Common -I../../Drivers/STM32WBxx_HAL_Driver/Inc -I../../Drivers/STM32WBxx_HAL_Driver/Inc/Legacy -I../../Middlewares/ST/STM32_WPAN -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/tl -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/shci -I../../Middlewares/ST/STM32_WPAN/utilities -I../../Drivers/CMSIS/Device/ST/STM32WBxx/Include -I../../Middlewares/ST/STM32_WPAN/zigbee/core/inc -I../../Middlewares/ST/STM32_WPAN/zigbee/stack -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include/mac -I../../Drivers/CMSIS/Include -I../../Utilities/sequencer -I../../Utilities/lpm/tiny_lpm -I../../Utilities/LCD -I../../Drivers/BSP/Components/stts22h -I../../Drivers/BSP/Components/ssd1315 -I../../Drivers/BSP/Components/ism330dhcx -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ads1115" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/bme280" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/veml7700" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ds18b20" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/dwt" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/onewire" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ens160" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ahtxx" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Application/User/Core" -Os -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@"  -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-Drivers-2f-BSP-2f-STM32WB5MM-2d-DK

clean-Drivers-2f-BSP-2f-STM32WB5MM-2d-DK:
	-$(RM) ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.cyclo ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.d ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.o ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk.su ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.cyclo ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.d ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.o ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_bus.su ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.cyclo ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.d ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.o ./Drivers/BSP/STM32WB5MM-DK/stm32wb5mm_dk_lcd.su

.PHONY: clean-Drivers-2f-BSP-2f-STM32WB5MM-2d-DK

