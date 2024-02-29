################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (11.3.rel1)
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include Utilities/sequencer/subdir.mk
-include Utilities/lpm/tiny_lpm/subdir.mk
-include Utilities/LCD/subdir.mk
-include Middlewares/STM32_WPAN/zigbee/core/subdir.mk
-include Middlewares/STM32_WPAN/utilities/subdir.mk
-include Middlewares/STM32_WPAN/interface/patterns/ble_thread/tl/subdir.mk
-include Middlewares/STM32_WPAN/interface/patterns/ble_thread/schi/subdir.mk
-include Drivers/STM32WBxx_HAL_Driver/subdir.mk
-include Drivers/CMSIS/subdir.mk
-include Drivers/BSP/STM32WB5MM-DK/subdir.mk
-include Drivers/BSP/Component/veml7700/subdir.mk
-include Drivers/BSP/Component/stts22h/subdir.mk
-include Drivers/BSP/Component/ssdl1315/subdir.mk
-include Drivers/BSP/Component/onewire/subdir.mk
-include Drivers/BSP/Component/ism330dhcx/subdir.mk
-include Drivers/BSP/Component/ens160/subdir.mk
-include Drivers/BSP/Component/dwt/subdir.mk
-include Drivers/BSP/Component/ds18b20/subdir.mk
-include Drivers/BSP/Component/bme280/subdir.mk
-include Drivers/BSP/Component/ahtxx/subdir.mk
-include Drivers/BSP/Component/ads1115/subdir.mk
-include Application/User/STM32_WPAN/Target/subdir.mk
-include Application/User/STM32_WPAN/App/subdir.mk
-include Application/User/Core/subdir.mk
-include Application/Startup/subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(S_DEPS)),)
-include $(S_DEPS)
endif
ifneq ($(strip $(S_UPPER_DEPS)),)
-include $(S_UPPER_DEPS)
endif
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

OPTIONAL_TOOL_DEPS := \
$(wildcard ../makefile.defs) \
$(wildcard ../makefile.init) \
$(wildcard ../makefile.targets) \


BUILD_ARTIFACT_NAME := Zigbee_TempMeas_Server_Coord
BUILD_ARTIFACT_EXTENSION := elf
BUILD_ARTIFACT_PREFIX :=
BUILD_ARTIFACT := $(BUILD_ARTIFACT_PREFIX)$(BUILD_ARTIFACT_NAME)$(if $(BUILD_ARTIFACT_EXTENSION),.$(BUILD_ARTIFACT_EXTENSION),)

# Add inputs and outputs from these tool invocations to the build variables 
EXECUTABLES += \
Zigbee_TempMeas_Server_Coord.elf \

MAP_FILES += \
Zigbee_TempMeas_Server_Coord.map \

SIZE_OUTPUT += \
default.size.stdout \

OBJDUMP_LIST += \
Zigbee_TempMeas_Server_Coord.list \


# All Target
all: main-build

# Main-build Target
main-build: Zigbee_TempMeas_Server_Coord.elf secondary-outputs

# Tool invocations
Zigbee_TempMeas_Server_Coord.elf Zigbee_TempMeas_Server_Coord.map: $(OBJS) $(USER_OBJS) C:\Users\mag\STM32CubeIDE\workspace_1.13.0\Zigbee_TempMeas_Server_Coord\STM32CubeIDE\STM32WB5MMGHX_FLASH.ld makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-gcc -o "Zigbee_TempMeas_Server_Coord.elf" @"objects.list" $(USER_OBJS) $(LIBS) -mcpu=cortex-m4 -T"C:\Users\mag\STM32CubeIDE\workspace_1.13.0\Zigbee_TempMeas_Server_Coord\STM32CubeIDE\STM32WB5MMGHX_FLASH.ld" --specs=nosys.specs -Wl,-Map="Zigbee_TempMeas_Server_Coord.map" -Wl,--gc-sections -static -L../../Middlewares/ST/STM32_WPAN/zigbee/lib  -mfpu=fpv4-sp-d16 -mfloat-abi=hard -mthumb -Wl,--start-group -lc -lm -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

default.size.stdout: $(EXECUTABLES) makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-size  $(EXECUTABLES)
	@echo 'Finished building: $@'
	@echo ' '

Zigbee_TempMeas_Server_Coord.list: $(EXECUTABLES) makefile objects.list $(OPTIONAL_TOOL_DEPS)
	arm-none-eabi-objdump -h -S $(EXECUTABLES) > "Zigbee_TempMeas_Server_Coord.list"
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) Zigbee_TempMeas_Server_Coord.elf Zigbee_TempMeas_Server_Coord.list Zigbee_TempMeas_Server_Coord.map default.size.stdout
	-@echo ' '

secondary-outputs: $(SIZE_OUTPUT) $(OBJDUMP_LIST)

fail-specified-linker-script-missing:
	@echo 'Error: Cannot find the specified linker script. Check the linker settings in the build configuration.'
	@exit 2

warn-no-linker-script-specified:
	@echo 'Warning: No linker script specified. Check the linker settings in the build configuration.'

.PHONY: all clean dependents main-build fail-specified-linker-script-missing warn-no-linker-script-specified

-include ../makefile.targets
