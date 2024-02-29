const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const utils_1 = require("zigbee-herdsman-converters/lib/utils");
const e = exposes.presets;
const ea = exposes.access;
const ee = exposes.localpresets;

const tzL = {	
    BatteryVoltage: {
        key: ['BatteryVoltage'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['BatteryVoltage']);
        },
    },	
    DelayRefreshMeas: {
        key: ['DelayRefreshMeas'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['DelayRefreshMeas']);
        },
    },	
	TemperatureEnv: {
        key: ['TemperatureEnv'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['TemperatureEnv']);
        },
    },
	TankLevel: {
        key: ['TankLevel'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['TankLevel']);
        },
    },	
	Luminosity: {
        key: ['Luminosity'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['Luminosity']);
        },
    },	
	WhiteLuminosity: {
        key: ['WhiteLuminosity'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['WhiteLuminosity']);
        },
    },	
	Pressure: {
        key: ['Pressure'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['Pressure']);
        },
    },
	Humidity: {
        key: ['Humidity'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['Humidity']);
        },
    },	
	AirQuality: {
        key: ['AirQuality'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['AirQuality']);
        },
    },	
	Co2: {
        key: ['Co2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['Co2']);
        },
    },	
	Tvoc: {
        key: ['Tvoc'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['Tvoc']);
        },
    },
	R1: {
        key: ['R1'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['R1']);
        },
    },
	R2: {
        key: ['R2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['R2']);
        },
    },
	R3: {
        key: ['R3'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['R3']);
        },
    },
	R4: {
        key: ['R4'],
        convertGet: async (entity, key, meta) => {
            await entity.read('dfmEnvironment', ['R4']);
        },
    },
	PlantMACDS1: {
        key: ['PlantMACDS1'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantMACDS1']);
        },
    },		
	PlantSoilMoisture1: {
        key: ['PlantSoilMoisture1'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantSoilMoisture1']);
        },
    },
	PlantTemperature1: {
        key: ['PlantTemperature1'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantTemperature1']);
        },
    },	
	PlantWaterAlimentationState1: {
        key: ['PlantWaterAlimentationState1'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantWaterAlimentationState1']);
        },
    },	
	PlantWaterAlimentation1: {
        key: ['PlantWaterAlimentation1'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantWaterAlimentation1']);
        },
		convertSet: async (entity, key, rawValue, meta) => {
            const value = parseInt(rawValue, 10);
            const payloads = {
                PlantWaterAlimentation1: ['msTemperatureMeasurement', { 0x0313: { value, type: 0x21 } }],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: { [key]: rawValue },
            };			
		},
    },
	PlantMACDS2: {
        key: ['PlantMACDS2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantMACDS2']);
        },
    },		
	PlantSoilMoisture2: {
        key: ['PlantSoilMoisture2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantSoilMoisture2']);
        },
    },
	PlantTemperature2: {
        key: ['PlantTemperature2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantTemperature2']);
        },
    },	
	PlantWaterAlimentationState2: {
        key: ['PlantWaterAlimentationState2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantWaterAlimentationState2']);
        },
    },	
	PlantWaterAlimentation2: {
        key: ['PlantWaterAlimentation2'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantWaterAlimentation2']);
        },
		convertSet: async (entity, key, rawValue, meta) => {
            const value = parseInt(rawValue, 10);
            const payloads = {
                PlantWaterAlimentation1: ['msTemperatureMeasurement', { 0x0323: { value, type: 0x21 } }],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: { [key]: rawValue },
            };			
		},
    },	
	PlantMACDS3: {
        key: ['PlantMACDS3'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantMACDS3']);
        },
    },		
	PlantSoilMoisture3: {
        key: ['PlantSoilMoisture3'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantSoilMoisture3']);
        },
    },
	PlantTemperature3: {
        key: ['PlantTemperature3'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantTemperature3']);
        },
    },	
	PlantWaterAlimentationState3: {
        key: ['PlantWaterAlimentationState3'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantWaterAlimentationState3']);
        },
    },	
	PlantWaterAlimentation3: {
        key: ['PlantWaterAlimentation3'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantWaterAlimentation3']);
        },
		convertSet: async (entity, key, rawValue, meta) => {
            const value = parseInt(rawValue, 10);
            const payloads = {
                PlantWaterAlimentation1: ['msTemperatureMeasurement', { 0x0333: { value, type: 0x21 } }],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: { [key]: rawValue },
            };			
		},
    },		
	PlantLight: {
        key: ['PlantLight'],
        convertGet: async (entity, key, meta) => {
            await entity.read('msTemperatureMeasurement', ['PlantLight']);
        },
		convertSet: async (entity, key, rawValue, meta) => {
            const value = parseInt(rawValue, 10);
            const payloads = {
                PlantWaterAlimentation1: ['msTemperatureMeasurement', { 0x0340: { value, type: 0x20 } }],
            };
            await entity.write(payloads[key][0], payloads[key][1]);
            return {
                state: { [key]: rawValue },
            };			
		},
    },
};

const fzL = {
	BatteryVoltage: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('BatteryVoltage')) {
                const BV = parseFloat(msg.data['BatteryVoltage'])/1000;
                return {BatteryVoltage : BV}
            }
        },
    },
	DelayRefreshMeas: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('DelayRefreshMeas')) {
                const del = msg.data['DelayRefreshMeas'];
                return {DelayRefreshMeas : del};
            }
        },
    },
	TemperatureEnv: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('TemperatureEnv')) {
                const Temperature = parseFloat(msg.data['TemperatureEnv']) / 100.0;
                const property = (0, utils_1.postfixWithEndpointName)('TemperatureEnv', msg, model, meta);
                return { [property]: Temperature };
            }
        },
    },
    TankLevel: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('TankLevel')) {
                const tl = msg.data['TankLevel'];
                return {TankLevel : tl};				
            }
        },
    },	
    Luminosity: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('Luminosity')) {
                const lum = msg.data['Luminosity'];
                return {Luminosity : lum};				
            }
        },
    },
	WhiteLuminosity: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('WhiteLuminosity')) {
                const lum = msg.data['WhiteLuminosity'];
                return {WhiteLuminosity : lum};
            }
        },
    },
    Pressure: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('Pressure')) {			
                const press = parseFloat(msg.data['Pressure'])/10;
                return {Pressure : press};
            }
        },
    },
    Humidity: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('Humidity')) {
                const hum = parseFloat(msg.data['Humidity'])/100;
                return {Humidity : hum};				
            }
        },
    },	
    AirQuality: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('AirQuality')) {
                const Aq = msg.data['AirQuality'];
                return {AirQuality : Aq};
            }
        },
    },
    Co2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('Co2')) {
                const co2 = msg.data['Co2'];
                return {Co2 : co2};
            }
        },
    },
    Tvoc: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('Tvoc')) {
                const Tvoc = msg.data['Tvoc'];
                return {Tvoc : Tvoc};
            }
        },
    },
    R1: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('R1')) {
                const R = msg.data['R1'];
                return {R1 : R};
            }
        },
    },	
    R2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('R2')) {
                const R = msg.data['R2'];
                return {R2 : R};
            }
        },
    },	
    R3: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('R3')) {
                const R = msg.data['R3'];
                return {R3 : R};
            }
        },
    },
    R4: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('R4')) {
                const R = msg.data['R4'];
                return {R4 : R};
            }
        },
    },
	PlantTemperature1: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantTemperature1')) {
                const Temperature = parseFloat(msg.data['PlantTemperature1']) / 100.0;
                return { PlantTemperature1: Temperature };
            }
        },
    },	

	PlantMACDS1: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantMACDS1')) {
                const MACDS = msg.data['PlantMACDS1'];
                return { PlantMACDS1: MACDS };
            }		
        },
    },
    PlantSoilMoisture1: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantSoilMoisture1')) {
                const SoilMoisture = parseFloat(msg.data['PlantSoilMoisture1']) / 100.0;
                return { PlantSoilMoisture1: SoilMoisture };
            }				
        },
    },	
    PlantWaterAlimentation1: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantWaterAlimentation1')) {
                const Wa = msg.data['PlantWaterAlimentation1'];
                return { PlantWaterAlimentation1: Wa };
            }		
        },
    },	
    PlantWaterAlimentationState1: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantWaterAlimentationState1')) {	
                const Wa = msg.data['PlantWaterAlimentationState1'];
                return { PlantWaterAlimentationState1: Wa };
			}
        },
    },
	PlantTemperature2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantTemperature2')) {
                const Temperature = parseFloat(msg.data['PlantTemperature2']) / 100.0;
                return { PlantTemperature2: Temperature };
            }
        },
    },	

	PlantMACDS2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantMACDS2')) {
                const MACDS = msg.data['PlantMACDS2'];
                return { PlantMACDS2: MACDS };
            }		
        },
    },
    PlantSoilMoisture2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantSoilMoisture2')) {
                const SoilMoisture = parseFloat(msg.data['PlantSoilMoisture2']) / 100.0;
                return { PlantSoilMoisture2: SoilMoisture };
            }				
        },
    },	
    PlantWaterAlimentation2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantWaterAlimentation2')) {
                const Wa = msg.data['PlantWaterAlimentation2'];
                return { PlantWaterAlimentation2: Wa };
            }		
        },
    },	
    PlantWaterAlimentationState2: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantWaterAlimentationState2')) {	
                const Wa = msg.data['PlantWaterAlimentationState2'];
                return { PlantWaterAlimentationState2: Wa };
			}
        },
    },	
	PlantTemperature3: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantTemperature3')) {
                const Temperature = parseFloat(msg.data['PlantTemperature3']) / 100.0;
                return { PlantTemperature3: Temperature };
            }
        },
    },	

	PlantMACDS3: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantMACDS3')) {
                const MACDS = msg.data['PlantMACDS3'];
                return { PlantMACDS3: MACDS };
            }		
        },
    },
    PlantSoilMoisture3: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantSoilMoisture3')) {
                const SoilMoisture = parseFloat(msg.data['PlantSoilMoisture3']) / 100.0;
                return { PlantSoilMoisture3: SoilMoisture };
            }				
        },
    },	
    PlantWaterAlimentation3: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantWaterAlimentation3')) {
                const Wa = msg.data['PlantWaterAlimentation3'];
                return { PlantWaterAlimentation3: Wa };
            }		
        },
    },	
    PlantWaterAlimentationState3: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantWaterAlimentationState3')) {	
                const Wa = msg.data['PlantWaterAlimentationState3'];
                return { PlantWaterAlimentationState3: Wa };
			}
        },
    },	
    PlantLight: {
        cluster: 'msTemperatureMeasurement',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.data.hasOwnProperty('PlantLight')) {	
                const Wa = msg.data['PlantLight'];
                return { PlantLight: Wa };
			}
        },
    },	
};


const definition = {
    zigbeeModel: ['STM32WB'],
    model: 'STM32WB',
    vendor: 'STMicroelectronics',
    description: 'Plantation feeding management - PFM - Elektor Project Contest 2024',
    fromZigbee: [fz.temperature,fzL.TemperatureEnv,fzL.BatteryVoltage,fzL.DelayRefreshMeas,
	fzL.Humidity,fzL.Luminosity,fzL.WhiteLuminosity,fzL.Pressure,fzL.AirQuality,
	fzL.Co2,fzL.Tvoc,fzL.R1,fzL.R2,fzL.R3,fzL.R4,
	fzL.PlantTemperature1,fzL.PlantMACDS1,fzL.PlantSoilMoisture1,fzL.PlantWaterAlimentation1,fzL.PlantWaterAlimentationState1,
	fzL.PlantTemperature2,fzL.PlantMACDS2,fzL.PlantSoilMoisture2,fzL.PlantWaterAlimentation2,fzL.PlantWaterAlimentationState2,
	fzL.PlantTemperature3,fzL.PlantMACDS3,fzL.PlantSoilMoisture3,fzL.PlantWaterAlimentation3,fzL.PlantWaterAlimentationState3,
    fzL.PlantLight,fzL.TankLevel,],
    toZigbee: [tz.temperature,tzL.TemperatureEnv,tzL.BatteryVoltage,tzL.DelayRefreshMeas,
	tzL.Humidity,tzL.Luminosity,tzL.WhiteLuminosity,tzL.Pressure,tzL.AirQuality,
	tzL.Co2,tzL.Tvoc,tzL.R1,tzL.R2,tzL.R3,tzL.R4,
	tzL.PlantTemperature1,tzL.PlantMACDS1,tzL.PlantSoilMoisture1,tzL.PlantWaterAlimentation1,tzL.PlantWaterAlimentationState1,
	tzL.PlantTemperature2,tzL.PlantMACDS2,tzL.PlantSoilMoisture2,tzL.PlantWaterAlimentation2,tzL.PlantWaterAlimentationState2,
	tzL.PlantTemperature3,tzL.PlantMACDS3,tzL.PlantSoilMoisture3,tzL.PlantWaterAlimentation3,tzL.PlantWaterAlimentationState3,	
	tzL.PlantLight,tzL.TankLevel,],
    exposes: [e.temperature(),e.TemperatureEnv(),e.BatteryVoltage(),e.DelayRefreshMeas(),
	e.Humidity(),e.Luminosity(),e.WhiteLuminosity(),e.Pressure(),e.AirQuality(),
	e.Co2(),e.Tvoc(),e.R1(),e.R2(),e.R3(),e.R4(),
	e.PlantTemperature1(),e.PlantMACDS1(),e.PlantSoilMoisture1(),e.PlantWaterAlimentation1(),e.PlantWaterAlimentationState1(),
	e.PlantTemperature2(),e.PlantMACDS2(),e.PlantSoilMoisture2(),e.PlantWaterAlimentation2(),e.PlantWaterAlimentationState2(),
	e.PlantTemperature3(),e.PlantMACDS3(),e.PlantSoilMoisture3(),e.PlantWaterAlimentation3(),e.PlantWaterAlimentationState3(),
	e.PlantLight(),e.TankLevel(),],
};



module.exports = definition;