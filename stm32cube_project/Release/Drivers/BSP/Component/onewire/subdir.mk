################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Drivers/BSP/Component/onewire/onewire.c 

OBJS += \
./Drivers/BSP/Component/onewire/onewire.o 

C_DEPS += \
./Drivers/BSP/Component/onewire/onewire.d 


# Each subdirectory must supply rules for building sources it contributes
Drivers/BSP/Component/onewire/%.o Drivers/BSP/Component/onewire/%.su Drivers/BSP/Component/onewire/%.cyclo: ../Drivers/BSP/Component/onewire/%.c Drivers/BSP/Component/onewire/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m4 -std=gnu11 -DZIGBEE_WB -DSTM32WB55xx -DUSE_HAL_DRIVER -c -I../../Core/Inc -I../../STM32_WPAN/App -I../../Drivers/BSP/STM32WB5MM-DK -I../../Drivers/BSP/Components/Common -I../../Drivers/STM32WBxx_HAL_Driver/Inc -I../../Drivers/STM32WBxx_HAL_Driver/Inc/Legacy -I../../Middlewares/ST/STM32_WPAN -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/tl -I../../Middlewares/ST/STM32_WPAN/interface/patterns/ble_thread/shci -I../../Middlewares/ST/STM32_WPAN/utilities -I../../Drivers/CMSIS/Device/ST/STM32WBxx/Include -I../../Middlewares/ST/STM32_WPAN/zigbee/core/inc -I../../Middlewares/ST/STM32_WPAN/zigbee/stack -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include -I../../Middlewares/ST/STM32_WPAN/zigbee/stack/include/mac -I../../Drivers/CMSIS/Include -I../../Utilities/sequencer -I../../Utilities/lpm/tiny_lpm -I../../Utilities/LCD -I../../Drivers/BSP/Components/stts22h -I../../Drivers/BSP/Components/ssd1315 -I../../Drivers/BSP/Components/ism330dhcx -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ads1115" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/bme280" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/veml7700" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ds18b20" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/dwt" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/onewire" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ens160" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Drivers/BSP/Component/ahtxx" -I"C:/Users/mag/STM32CubeIDE/workspace_1.13.0/Zigbee_TempMeas_Server_Coord/STM32CubeIDE/Application/User/Core" -Os -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@"  -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -o "$@"

clean: clean-Drivers-2f-BSP-2f-Component-2f-onewire

clean-Drivers-2f-BSP-2f-Component-2f-onewire:
	-$(RM) ./Drivers/BSP/Component/onewire/onewire.cyclo ./Drivers/BSP/Component/onewire/onewire.d ./Drivers/BSP/Component/onewire/onewire.o ./Drivers/BSP/Component/onewire/onewire.su

.PHONY: clean-Drivers-2f-BSP-2f-Component-2f-onewire

