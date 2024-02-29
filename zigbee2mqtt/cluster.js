"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint max-len: 0 */
const dataType_1 = __importDefault(require("./dataType"));
const buffaloZclDataType_1 = __importDefault(require("./buffaloZclDataType"));
const manufacturerCode_1 = __importDefault(require("./manufacturerCode"));
const Cluster = {
    genBasic: {
        ID: 0,
        attributes: {
            zclVersion: { ID: 0, type: dataType_1.default.uint8 },
            appVersion: { ID: 1, type: dataType_1.default.uint8 },
            stackVersion: { ID: 2, type: dataType_1.default.uint8 },
            hwVersion: { ID: 3, type: dataType_1.default.uint8 },
            manufacturerName: { ID: 4, type: dataType_1.default.charStr },
            modelId: { ID: 5, type: dataType_1.default.charStr },
            dateCode: { ID: 6, type: dataType_1.default.charStr },
            powerSource: { ID: 7, type: dataType_1.default.enum8 },
            appProfileVersion: { ID: 8, type: dataType_1.default.enum8 },
            swBuildId: { ID: 16384, type: dataType_1.default.charStr },
            locationDesc: { ID: 16, type: dataType_1.default.charStr },
            physicalEnv: { ID: 17, type: dataType_1.default.enum8 },
            deviceEnabled: { ID: 18, type: dataType_1.default.boolean },
            alarmMask: { ID: 19, type: dataType_1.default.bitmap8 },
            disableLocalConfig: { ID: 20, type: dataType_1.default.bitmap8 },
            develcoPrimarySwVersion: { ID: 0x8000, type: dataType_1.default.octetStr, manufacturerCode: manufacturerCode_1.default.DEVELCO },
            develcoPrimaryHwVersion: { ID: 0x8020, type: dataType_1.default.octetStr, manufacturerCode: manufacturerCode_1.default.DEVELCO },
            develcoLedControl: { ID: 0x8100, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.DEVELCO },
            schneiderMeterRadioPower: { ID: 0xE200, type: dataType_1.default.int8, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
        },
        commands: {
            resetFactDefault: {
                ID: 0,
                parameters: [],
            },
            tuyaSetup: {
                ID: 0xf0,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    genPowerCfg: {
        ID: 1,
        attributes: {
            mainsVoltage: { ID: 0, type: dataType_1.default.uint16 },
            mainsFrequency: { ID: 1, type: dataType_1.default.uint8 },
            mainsAlarmMask: { ID: 16, type: dataType_1.default.bitmap8 },
            mainsVoltMinThres: { ID: 17, type: dataType_1.default.uint16 },
            mainsVoltMaxThres: { ID: 18, type: dataType_1.default.uint16 },
            mainsVoltageDwellTripPoint: { ID: 19, type: dataType_1.default.uint16 },
            batteryVoltage: { ID: 32, type: dataType_1.default.uint8 },
            batteryPercentageRemaining: { ID: 33, type: dataType_1.default.uint8 },
            batteryManufacturer: { ID: 48, type: dataType_1.default.charStr },
            batterySize: { ID: 49, type: dataType_1.default.enum8 },
            batteryAHrRating: { ID: 50, type: dataType_1.default.uint16 },
            batteryQuantity: { ID: 51, type: dataType_1.default.uint8 },
            batteryRatedVoltage: { ID: 52, type: dataType_1.default.uint8 },
            batteryAlarmMask: { ID: 53, type: dataType_1.default.bitmap8 },
            batteryVoltMinThres: { ID: 54, type: dataType_1.default.uint8 },
            batteryVoltThres1: { ID: 55, type: dataType_1.default.uint8 },
            batteryVoltThres2: { ID: 56, type: dataType_1.default.uint8 },
            batteryVoltThres3: { ID: 57, type: dataType_1.default.uint8 },
            batteryPercentMinThres: { ID: 58, type: dataType_1.default.uint8 },
            batteryPercentThres1: { ID: 59, type: dataType_1.default.uint8 },
            batteryPercentThres2: { ID: 60, type: dataType_1.default.uint8 },
            batteryPercentThres3: { ID: 61, type: dataType_1.default.uint8 },
            batteryAlarmState: { ID: 62, type: dataType_1.default.bitmap32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genDeviceTempCfg: {
        ID: 2,
        attributes: {
            currentTemperature: { ID: 0, type: dataType_1.default.int16 },
            minTempExperienced: { ID: 1, type: dataType_1.default.int16 },
            maxTempExperienced: { ID: 2, type: dataType_1.default.int16 },
            overTempTotalDwell: { ID: 3, type: dataType_1.default.uint16 },
            devTempAlarmMask: { ID: 16, type: dataType_1.default.bitmap8 },
            lowTempThres: { ID: 17, type: dataType_1.default.int16 },
            highTempThres: { ID: 18, type: dataType_1.default.int16 },
            lowTempDwellTripPoint: { ID: 19, type: dataType_1.default.uint24 },
            highTempDwellTripPoint: { ID: 20, type: dataType_1.default.uint24 },
        },
        commands: {},
        commandsResponse: {},
    },
    genIdentify: {
        ID: 3,
        attributes: {
            identifyTime: { ID: 0, type: dataType_1.default.uint16 },
            identifyCommissionState: { ID: 1, type: dataType_1.default.unknown },
        },
        commands: {
            identify: {
                ID: 0,
                parameters: [
                    { name: 'identifytime', type: dataType_1.default.uint16 },
                ],
            },
            identifyQuery: {
                ID: 1,
                parameters: [],
            },
            ezmodeInvoke: {
                ID: 2,
                parameters: [
                    { name: 'action', type: dataType_1.default.uint8 },
                ],
            },
            updateCommissionState: {
                ID: 3,
                parameters: [
                    { name: 'action', type: dataType_1.default.uint8 },
                    { name: 'commstatemask', type: dataType_1.default.uint8 },
                ],
            },
            triggerEffect: {
                ID: 64,
                parameters: [
                    { name: 'effectid', type: dataType_1.default.uint8 },
                    { name: 'effectvariant', type: dataType_1.default.uint8 },
                ],
            },
        },
        commandsResponse: {
            identifyQueryRsp: {
                ID: 0,
                parameters: [
                    { name: 'timeout', type: dataType_1.default.uint16 },
                ],
            },
        },
    },
    genGroups: {
        ID: 4,
        attributes: {
            nameSupport: { ID: 0, type: dataType_1.default.bitmap8 },
        },
        commands: {
            add: {
                ID: 0,
                response: 0,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'groupname', type: dataType_1.default.charStr },
                ],
            },
            view: {
                ID: 1,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
            getMembership: {
                ID: 2,
                response: 2,
                parameters: [
                    { name: 'groupcount', type: dataType_1.default.uint8 },
                    { name: 'grouplist', type: buffaloZclDataType_1.default.LIST_UINT16 },
                ],
            },
            remove: {
                ID: 3,
                response: 3,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
            removeAll: {
                ID: 4,
                parameters: [],
            },
            addIfIdentifying: {
                ID: 5,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'groupname', type: dataType_1.default.charStr },
                ],
            },
            miboxerSetZones: {
                ID: 0xf0,
                parameters: [
                    { name: 'zones', type: buffaloZclDataType_1.default.LIST_MIBOXER_ZONES },
                ],
            }
        },
        commandsResponse: {
            addRsp: {
                ID: 0,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
            viewRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'groupname', type: dataType_1.default.charStr },
                ],
            },
            getMembershipRsp: {
                ID: 2,
                parameters: [
                    { name: 'capacity', type: dataType_1.default.uint8 },
                    { name: 'groupcount', type: dataType_1.default.uint8 },
                    { name: 'grouplist', type: buffaloZclDataType_1.default.LIST_UINT16 },
                ],
            },
            removeRsp: {
                ID: 3,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
        },
    },
    genScenes: {
        ID: 5,
        attributes: {
            count: { ID: 0, type: dataType_1.default.uint8 },
            currentScene: { ID: 1, type: dataType_1.default.uint8 },
            currentGroup: { ID: 2, type: dataType_1.default.uint16 },
            sceneValid: { ID: 3, type: dataType_1.default.boolean },
            nameSupport: { ID: 4, type: dataType_1.default.bitmap8 },
            lastCfgBy: { ID: 5, type: dataType_1.default.ieeeAddr },
        },
        commands: {
            add: {
                ID: 0,
                response: 0,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                    { name: 'scenename', type: dataType_1.default.charStr },
                    { name: 'extensionfieldsets', type: buffaloZclDataType_1.default.EXTENSION_FIELD_SETS },
                ],
            },
            view: {
                ID: 1,
                response: 1,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            remove: {
                ID: 2,
                response: 2,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            removeAll: {
                ID: 3,
                response: 3,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
            store: {
                ID: 4,
                response: 4,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            recall: {
                ID: 5,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            getSceneMembership: {
                ID: 6,
                response: 6,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
            enhancedAdd: {
                ID: 64,
                response: 64,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                    { name: 'scenename', type: dataType_1.default.charStr },
                    { name: 'extensionfieldsets', type: buffaloZclDataType_1.default.EXTENSION_FIELD_SETS },
                ],
            },
            enhancedView: {
                ID: 65,
                response: 65,
                parameters: [
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            copy: {
                ID: 66,
                response: 66,
                parameters: [
                    { name: 'mode', type: dataType_1.default.uint8 },
                    { name: 'groupidfrom', type: dataType_1.default.uint16 },
                    { name: 'sceneidfrom', type: dataType_1.default.uint8 },
                    { name: 'groupidto', type: dataType_1.default.uint16 },
                    { name: 'sceneidto', type: dataType_1.default.uint8 },
                ],
            },
            tradfriArrowSingle: {
                ID: 7,
                parameters: [
                    { name: 'value', type: dataType_1.default.uint16 },
                    { name: 'value2', type: dataType_1.default.uint16 },
                ],
            },
            tradfriArrowHold: {
                ID: 8,
                parameters: [
                    { name: 'value', type: dataType_1.default.uint16 },
                ],
            },
            tradfriArrowRelease: {
                ID: 9,
                parameters: [
                    { name: 'value', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {
            addRsp: {
                ID: 0,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupId', type: dataType_1.default.uint16 },
                    { name: 'sceneId', type: dataType_1.default.uint8 },
                ],
            },
            viewRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                    { name: 'scenename', type: dataType_1.default.charStr },
                    { name: 'extensionfieldsets', type: buffaloZclDataType_1.default.EXTENSION_FIELD_SETS },
                ],
            },
            removeRsp: {
                ID: 2,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            removeAllRsp: {
                ID: 3,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                ],
            },
            storeRsp: {
                ID: 4,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                ],
            },
            getSceneMembershipRsp: {
                ID: 6,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'capacity', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'scenecount', type: dataType_1.default.uint8 },
                    { name: 'scenelist', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            enhancedAddRsp: {
                ID: 64,
                parameters: [],
            },
            enhancedViewRsp: {
                ID: 65,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupid', type: dataType_1.default.uint16 },
                    { name: 'sceneid', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                    { name: 'scenename', type: dataType_1.default.charStr },
                    { name: 'extensionfieldsets', type: buffaloZclDataType_1.default.EXTENSION_FIELD_SETS },
                ],
            },
            copyRsp: {
                ID: 66,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'groupidfrom', type: dataType_1.default.uint16 },
                    { name: 'sceneidfrom', type: dataType_1.default.uint8 },
                ],
            },
        },
    },
    genOnOff: {
        ID: 6,
        attributes: {
            onOff: { ID: 0, type: dataType_1.default.boolean },
            globalSceneCtrl: { ID: 16384, type: dataType_1.default.boolean },
            onTime: { ID: 16385, type: dataType_1.default.uint16 },
            offWaitTime: { ID: 16386, type: dataType_1.default.uint16 },
            startUpOnOff: { ID: 16387, type: dataType_1.default.enum8 },
            tuyaBacklightSwitch: { ID: 0x5000, type: dataType_1.default.enum8 },
            tuyaBacklightMode: { ID: 0x8001, type: dataType_1.default.enum8 },
            moesStartUpOnOff: { ID: 0x8002, type: dataType_1.default.enum8 },
            tuyaOperationMode: { ID: 0x8004, type: dataType_1.default.enum8 },
            elkoPreWarningTime: { ID: 0xE000, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoOnTimeReload: { ID: 0xE001, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoOnTimeReloadOptions: { ID: 0xE002, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.ELKO },
        },
        commands: {
            off: {
                ID: 0,
                parameters: [],
            },
            on: {
                ID: 1,
                parameters: [],
            },
            toggle: {
                ID: 2,
                parameters: [],
            },
            offWithEffect: {
                ID: 64,
                parameters: [
                    { name: 'effectid', type: dataType_1.default.uint8 },
                    { name: 'effectvariant', type: dataType_1.default.uint8 },
                ],
            },
            onWithRecallGlobalScene: {
                ID: 65,
                parameters: [],
            },
            onWithTimedOff: {
                ID: 66,
                parameters: [
                    { name: 'ctrlbits', type: dataType_1.default.uint8 },
                    { name: 'ontime', type: dataType_1.default.uint16 },
                    { name: 'offwaittime', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {},
    },
    genOnOffSwitchCfg: {
        ID: 7,
        attributes: {
            switchType: { ID: 0, type: dataType_1.default.enum8 },
            switchMultiFunction: { ID: 2, type: dataType_1.default.unknown },
            switchActions: { ID: 16, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    genLevelCtrl: {
        ID: 8,
        attributes: {
            currentLevel: { ID: 0, type: dataType_1.default.uint8 },
            remainingTime: { ID: 1, type: dataType_1.default.uint16 },
            minLevel: { ID: 2, type: dataType_1.default.uint8 },
            maxLevel: { ID: 3, type: dataType_1.default.uint8 },
            options: { ID: 15, type: dataType_1.default.bitmap8 },
            onOffTransitionTime: { ID: 16, type: dataType_1.default.uint16 },
            onLevel: { ID: 17, type: dataType_1.default.uint8 },
            onTransitionTime: { ID: 18, type: dataType_1.default.uint16 },
            offTransitionTime: { ID: 19, type: dataType_1.default.uint16 },
            defaultMoveRate: { ID: 20, type: dataType_1.default.uint16 },
            startUpCurrentLevel: { ID: 16384, type: dataType_1.default.uint8 },
            elkoStartUpCurrentLevel: { ID: 0x4000, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.ELKO },
            ubisysMinimumOnLevel: { ID: 0, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.Ubisys },
        },
        commands: {
            moveToLevel: {
                ID: 0,
                parameters: [
                    { name: 'level', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            move: {
                ID: 1,
                parameters: [
                    { name: 'movemode', type: dataType_1.default.uint8 },
                    { name: 'rate', type: dataType_1.default.uint8 },
                ],
            },
            step: {
                ID: 2,
                parameters: [
                    { name: 'stepmode', type: dataType_1.default.uint8 },
                    { name: 'stepsize', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            stop: {
                ID: 3,
                parameters: [],
            },
            moveToLevelWithOnOff: {
                ID: 4,
                parameters: [
                    { name: 'level', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            moveWithOnOff: {
                ID: 5,
                parameters: [
                    { name: 'movemode', type: dataType_1.default.uint8 },
                    { name: 'rate', type: dataType_1.default.uint8 },
                ],
            },
            stepWithOnOff: {
                ID: 6,
                parameters: [
                    { name: 'stepmode', type: dataType_1.default.uint8 },
                    { name: 'stepsize', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            stopWithOnOff: {
                ID: 7,
                parameters: [],
            },
            moveToLevelTuya: {
                ID: 240,
                parameters: [
                    { name: 'level', type: dataType_1.default.uint16 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {},
    },
    genAlarms: {
        ID: 9,
        attributes: {
            alarmCount: { ID: 0, type: dataType_1.default.uint16 },
        },
        commands: {
            reset: {
                ID: 0,
                parameters: [
                    { name: 'alarmcode', type: dataType_1.default.uint8 },
                    { name: 'clusterid', type: dataType_1.default.uint16 },
                ],
            },
            resetAll: {
                ID: 1,
                parameters: [],
            },
            getAlarm: {
                ID: 2,
                parameters: [],
            },
            resetLog: {
                ID: 3,
                parameters: [],
            },
            publishEventLog: {
                ID: 4,
                parameters: [],
            },
        },
        commandsResponse: {
            alarm: {
                ID: 0,
                parameters: [
                    { name: 'alarmcode', type: dataType_1.default.uint8 },
                    { name: 'clusterid', type: dataType_1.default.uint16 },
                ],
            },
            getRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'alarmcode', type: dataType_1.default.uint8 },
                    { name: 'clusterid', type: dataType_1.default.uint16 },
                    { name: 'timestamp', type: dataType_1.default.uint32 },
                ],
            },
            getEventLog: {
                ID: 2,
                parameters: [],
            },
        },
    },
    genTime: {
        ID: 10,
        attributes: {
            time: { ID: 0, type: dataType_1.default.utc },
            timeStatus: { ID: 1, type: dataType_1.default.bitmap8 },
            timeZone: { ID: 2, type: dataType_1.default.int32 },
            dstStart: { ID: 3, type: dataType_1.default.uint32 },
            dstEnd: { ID: 4, type: dataType_1.default.uint32 },
            dstShift: { ID: 5, type: dataType_1.default.int32 },
            standardTime: { ID: 6, type: dataType_1.default.uint32 },
            localTime: { ID: 7, type: dataType_1.default.uint32 },
            lastSetTime: { ID: 8, type: dataType_1.default.utc },
            validUntilTime: { ID: 9, type: dataType_1.default.utc },
        },
        commands: {},
        commandsResponse: {},
    },
    genRssiLocation: {
        ID: 11,
        attributes: {
            type: { ID: 0, type: dataType_1.default.data8 },
            method: { ID: 1, type: dataType_1.default.enum8 },
            age: { ID: 2, type: dataType_1.default.uint16 },
            qualityMeasure: { ID: 3, type: dataType_1.default.uint8 },
            numOfDevices: { ID: 4, type: dataType_1.default.uint8 },
            coordinate1: { ID: 16, type: dataType_1.default.int16 },
            coordinate2: { ID: 17, type: dataType_1.default.int16 },
            coordinate3: { ID: 18, type: dataType_1.default.int16 },
            power: { ID: 19, type: dataType_1.default.int16 },
            pathLossExponent: { ID: 20, type: dataType_1.default.uint16 },
            reportingPeriod: { ID: 21, type: dataType_1.default.uint16 },
            calcPeriod: { ID: 22, type: dataType_1.default.uint16 },
            numRSSIMeasurements: { ID: 23, type: dataType_1.default.uint16 },
        },
        commands: {
            setAbsolute: {
                ID: 0,
                parameters: [
                    { name: 'coord1', type: dataType_1.default.int16 },
                    { name: 'coord2', type: dataType_1.default.int16 },
                    { name: 'coord3', type: dataType_1.default.int16 },
                    { name: 'power', type: dataType_1.default.int16 },
                    { name: 'pathlossexponent', type: dataType_1.default.uint16 },
                ],
            },
            setDevCfg: {
                ID: 1,
                parameters: [
                    { name: 'power', type: dataType_1.default.int16 },
                    { name: 'pathlossexponent', type: dataType_1.default.uint16 },
                    { name: 'calperiod', type: dataType_1.default.uint16 },
                    { name: 'numrssimeasurements', type: dataType_1.default.uint8 },
                    { name: 'reportingperiod', type: dataType_1.default.uint16 },
                ],
            },
            getDevCfg: {
                ID: 2,
                parameters: [
                    { name: 'targetaddr', type: dataType_1.default.ieeeAddr },
                ],
            },
            getData: {
                ID: 3,
                parameters: [
                    { name: 'getdatainfo', type: dataType_1.default.uint8 },
                    { name: 'numrsp', type: dataType_1.default.uint8 },
                    { name: 'targetaddr', type: dataType_1.default.ieeeAddr },
                ],
            },
        },
        commandsResponse: {
            devCfgRsp: {
                ID: 0,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'power', type: dataType_1.default.int16 },
                    { name: 'pathlossexp', type: dataType_1.default.uint16 },
                    { name: 'calperiod', type: dataType_1.default.uint16 },
                    { name: 'numrssimeasurements', type: dataType_1.default.uint8 },
                    { name: 'reportingperiod', type: dataType_1.default.uint16 },
                ],
            },
            dataRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'locationtype', type: dataType_1.default.uint8 },
                    { name: 'coord1', type: dataType_1.default.int16 },
                    { name: 'coord2', type: dataType_1.default.int16 },
                    { name: 'coord3', type: dataType_1.default.int16 },
                    { name: 'power', type: dataType_1.default.int16 },
                    { name: 'pathlossexp', type: dataType_1.default.uint16 },
                    { name: 'locationmethod', type: dataType_1.default.uint8 },
                    { name: 'qualitymeasure', type: dataType_1.default.uint8 },
                    { name: 'locationage', type: dataType_1.default.uint16 },
                ],
            },
            dataNotif: {
                ID: 2,
                parameters: [
                    { name: 'locationtype', type: dataType_1.default.uint8 },
                    { name: 'coord1', type: dataType_1.default.int16 },
                    { name: 'coord2', type: dataType_1.default.int16 },
                    { name: 'coord3', type: dataType_1.default.int16 },
                    { name: 'power', type: dataType_1.default.int16 },
                    { name: 'pathlossexp', type: dataType_1.default.uint16 },
                    { name: 'locationmethod', type: dataType_1.default.uint8 },
                    { name: 'qualitymeasure', type: dataType_1.default.uint8 },
                    { name: 'locationage', type: dataType_1.default.uint16 },
                ],
            },
            compactDataNotif: {
                ID: 3,
                parameters: [
                    { name: 'locationtype', type: dataType_1.default.uint8 },
                    { name: 'coord1', type: dataType_1.default.int16 },
                    { name: 'coord2', type: dataType_1.default.int16 },
                    { name: 'coord3', type: dataType_1.default.int16 },
                    { name: 'qualitymeasure', type: dataType_1.default.uint8 },
                    { name: 'locationage', type: dataType_1.default.uint16 },
                ],
            },
            rssiPing: {
                ID: 4,
                parameters: [
                    { name: 'locationtype', type: dataType_1.default.uint8 },
                ],
            },
        },
    },
    genAnalogInput: {
        ID: 12,
        attributes: {
            description: { ID: 28, type: dataType_1.default.charStr },
            maxPresentValue: { ID: 65, type: dataType_1.default.singlePrec },
            minPresentValue: { ID: 69, type: dataType_1.default.singlePrec },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.singlePrec },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            resolution: { ID: 106, type: dataType_1.default.singlePrec },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            engineeringUnits: { ID: 117, type: dataType_1.default.enum16 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genAnalogOutput: {
        ID: 13,
        attributes: {
            description: { ID: 28, type: dataType_1.default.charStr },
            maxPresentValue: { ID: 65, type: dataType_1.default.singlePrec },
            minPresentValue: { ID: 69, type: dataType_1.default.singlePrec },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.singlePrec },
            priorityArray: { ID: 87, type: dataType_1.default.array },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            relinquishDefault: { ID: 104, type: dataType_1.default.singlePrec },
            resolution: { ID: 106, type: dataType_1.default.singlePrec },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            engineeringUnits: { ID: 117, type: dataType_1.default.enum16 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genAnalogValue: {
        ID: 14,
        attributes: {
            description: { ID: 28, type: dataType_1.default.charStr },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.singlePrec },
            priorityArray: { ID: 87, type: dataType_1.default.array },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            relinquishDefault: { ID: 104, type: dataType_1.default.singlePrec },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            engineeringUnits: { ID: 117, type: dataType_1.default.enum16 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genBinaryInput: {
        ID: 15,
        attributes: {
            activeText: { ID: 4, type: dataType_1.default.charStr },
            description: { ID: 28, type: dataType_1.default.charStr },
            inactiveText: { ID: 46, type: dataType_1.default.charStr },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            polarity: { ID: 84, type: dataType_1.default.enum8 },
            presentValue: { ID: 85, type: dataType_1.default.boolean },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genBinaryOutput: {
        ID: 16,
        attributes: {
            activeText: { ID: 4, type: dataType_1.default.charStr },
            description: { ID: 28, type: dataType_1.default.charStr },
            inactiveText: { ID: 46, type: dataType_1.default.charStr },
            minimumOffTime: { ID: 66, type: dataType_1.default.uint32 },
            minimumOnTime: { ID: 67, type: dataType_1.default.uint32 },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            polarity: { ID: 84, type: dataType_1.default.enum8 },
            presentValue: { ID: 85, type: dataType_1.default.boolean },
            priorityArray: { ID: 87, type: dataType_1.default.array },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            relinquishDefault: { ID: 104, type: dataType_1.default.boolean },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genBinaryValue: {
        ID: 17,
        attributes: {
            activeText: { ID: 4, type: dataType_1.default.charStr },
            description: { ID: 28, type: dataType_1.default.charStr },
            inactiveText: { ID: 46, type: dataType_1.default.charStr },
            minimumOffTime: { ID: 66, type: dataType_1.default.uint32 },
            minimumOnTime: { ID: 67, type: dataType_1.default.uint32 },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.boolean },
            priorityArray: { ID: 87, type: dataType_1.default.array },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            relinquishDefault: { ID: 104, type: dataType_1.default.boolean },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genMultistateInput: {
        ID: 18,
        attributes: {
            stateText: { ID: 14, type: dataType_1.default.array },
            description: { ID: 28, type: dataType_1.default.charStr },
            numberOfStates: { ID: 74, type: dataType_1.default.uint16 },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.uint16 },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genMultistateOutput: {
        ID: 19,
        attributes: {
            stateText: { ID: 14, type: dataType_1.default.array },
            description: { ID: 28, type: dataType_1.default.charStr },
            numberOfStates: { ID: 74, type: dataType_1.default.uint16 },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.uint16 },
            priorityArray: { ID: 87, type: dataType_1.default.array },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            relinquishDefault: { ID: 104, type: dataType_1.default.uint16 },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genMultistateValue: {
        ID: 20,
        attributes: {
            stateText: { ID: 14, type: dataType_1.default.array },
            description: { ID: 28, type: dataType_1.default.charStr },
            numberOfStates: { ID: 74, type: dataType_1.default.uint16 },
            outOfService: { ID: 81, type: dataType_1.default.boolean },
            presentValue: { ID: 85, type: dataType_1.default.uint16 },
            priorityArray: { ID: 87, type: dataType_1.default.array },
            reliability: { ID: 103, type: dataType_1.default.enum8 },
            relinquishDefault: { ID: 104, type: dataType_1.default.uint16 },
            statusFlags: { ID: 111, type: dataType_1.default.bitmap8 },
            applicationType: { ID: 256, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    genCommissioning: {
        ID: 21,
        attributes: {
            shortress: { ID: 0, type: dataType_1.default.uint16 },
            extendedPANId: { ID: 1, type: dataType_1.default.ieeeAddr },
            panId: { ID: 2, type: dataType_1.default.uint16 },
            channelmask: { ID: 3, type: dataType_1.default.bitmap32 },
            protocolVersion: { ID: 4, type: dataType_1.default.uint8 },
            stackProfile: { ID: 5, type: dataType_1.default.uint8 },
            startupControl: { ID: 6, type: dataType_1.default.enum8 },
            trustCenterress: { ID: 16, type: dataType_1.default.ieeeAddr },
            trustCenterMasterKey: { ID: 17, type: dataType_1.default.secKey },
            networkKey: { ID: 18, type: dataType_1.default.secKey },
            useInsecureJoin: { ID: 19, type: dataType_1.default.boolean },
            preconfiguredLinkKey: { ID: 20, type: dataType_1.default.secKey },
            networkKeySeqNum: { ID: 21, type: dataType_1.default.uint8 },
            networkKeyType: { ID: 22, type: dataType_1.default.enum8 },
            networkManagerress: { ID: 23, type: dataType_1.default.uint16 },
            scanAttempts: { ID: 32, type: dataType_1.default.uint8 },
            timeBetweenScans: { ID: 33, type: dataType_1.default.uint16 },
            rejoinInterval: { ID: 34, type: dataType_1.default.uint16 },
            maxRejoinInterval: { ID: 35, type: dataType_1.default.uint16 },
            indirectPollRate: { ID: 48, type: dataType_1.default.uint16 },
            parentRetryThreshold: { ID: 49, type: dataType_1.default.uint8 },
            concentratorFlag: { ID: 64, type: dataType_1.default.boolean },
            concentratorRus: { ID: 65, type: dataType_1.default.uint8 },
            concentratorDiscoveryTime: { ID: 66, type: dataType_1.default.uint8 },
        },
        commands: {
            restartDevice: {
                ID: 0,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint8 },
                    { name: 'delay', type: dataType_1.default.uint8 },
                    { name: 'jitter', type: dataType_1.default.uint8 },
                ],
            },
            saveStartupParams: {
                ID: 1,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint8 },
                    { name: 'index', type: dataType_1.default.uint8 },
                ],
            },
            restoreStartupParams: {
                ID: 2,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint8 },
                    { name: 'index', type: dataType_1.default.uint8 },
                ],
            },
            resetStartupParams: {
                ID: 3,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint8 },
                    { name: 'index', type: dataType_1.default.uint8 },
                ],
            },
        },
        commandsResponse: {
            restartDeviceRsp: {
                ID: 0,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            saveStartupParamsRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            restoreStartupParamsRsp: {
                ID: 2,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            resetStartupParamsRsp: {
                ID: 3,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
        },
    },
    genOta: {
        ID: 25,
        attributes: {
            upgradeServerId: { ID: 0, type: dataType_1.default.ieeeAddr },
            fileOffset: { ID: 1, type: dataType_1.default.uint32 },
            currentFileVersion: { ID: 2, type: dataType_1.default.uint32 },
            currentZigbeeStackVersion: { ID: 3, type: dataType_1.default.uint16 },
            downloadedFileVersion: { ID: 4, type: dataType_1.default.uint32 },
            downloadedZigbeeStackVersion: { ID: 5, type: dataType_1.default.uint16 },
            imageUpgradeStatus: { ID: 6, type: dataType_1.default.enum8 },
            manufacturerId: { ID: 7, type: dataType_1.default.uint16 },
            imageTypeId: { ID: 8, type: dataType_1.default.uint16 },
            minimumBlockReqDelay: { ID: 9, type: dataType_1.default.uint16 },
            imageStamp: { ID: 10, type: dataType_1.default.uint32 },
        },
        commands: {
            queryNextImageRequest: {
                ID: 1,
                response: 2,
                parameters: [
                    { name: 'fieldControl', type: dataType_1.default.uint8 },
                    { name: 'manufacturerCode', type: dataType_1.default.uint16 },
                    { name: 'imageType', type: dataType_1.default.uint16 },
                    { name: 'fileVersion', type: dataType_1.default.uint32 },
                ],
            },
            imageBlockRequest: {
                ID: 3,
                response: 5,
                parameters: [
                    { name: 'fieldControl', type: dataType_1.default.uint8 },
                    { name: 'manufacturerCode', type: dataType_1.default.uint16 },
                    { name: 'imageType', type: dataType_1.default.uint16 },
                    { name: 'fileVersion', type: dataType_1.default.uint32 },
                    { name: 'fileOffset', type: dataType_1.default.uint32 },
                    { name: 'maximumDataSize', type: dataType_1.default.uint8 },
                ],
            },
            imagePageRequest: {
                ID: 4,
                response: 5,
                parameters: [
                    { name: 'fieldControl', type: dataType_1.default.uint8 },
                    { name: 'manufacturerCode', type: dataType_1.default.uint16 },
                    { name: 'imageType', type: dataType_1.default.uint16 },
                    { name: 'fileVersion', type: dataType_1.default.uint32 },
                    { name: 'fileOffset', type: dataType_1.default.uint32 },
                    { name: 'maximumDataSize', type: dataType_1.default.uint8 },
                    { name: 'pageSize', type: dataType_1.default.uint16 },
                    { name: 'responseSpacing', type: dataType_1.default.uint16 },
                ],
            },
            upgradeEndRequest: {
                ID: 6,
                response: 7,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'manufacturerCode', type: dataType_1.default.uint16 },
                    { name: 'imageType', type: dataType_1.default.uint16 },
                    { name: 'fileVersion', type: dataType_1.default.uint32 },
                ],
            }
        },
        commandsResponse: {
            imageNotify: {
                ID: 0,
                parameters: [
                    { name: 'payloadType', type: dataType_1.default.uint8 },
                    { name: 'queryJitter', type: dataType_1.default.uint8 },
                ],
            },
            queryNextImageResponse: {
                ID: 2,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'manufacturerCode', type: dataType_1.default.uint16, conditions: [{ type: 'statusEquals', value: 0 }] },
                    { name: 'imageType', type: dataType_1.default.uint16, conditions: [{ type: 'statusEquals', value: 0 }] },
                    { name: 'fileVersion', type: dataType_1.default.uint32, conditions: [{ type: 'statusEquals', value: 0 }] },
                    { name: 'imageSize', type: dataType_1.default.uint32, conditions: [{ type: 'statusEquals', value: 0 }] },
                ],
            },
            imageBlockResponse: {
                ID: 5,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'manufacturerCode', type: dataType_1.default.uint16 },
                    { name: 'imageType', type: dataType_1.default.uint16 },
                    { name: 'fileVersion', type: dataType_1.default.uint32 },
                    { name: 'fileOffset', type: dataType_1.default.uint32 },
                    { name: 'dataSize', type: dataType_1.default.uint8 },
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
            upgradeEndResponse: {
                ID: 7,
                parameters: [
                    { name: 'manufacturerCode', type: dataType_1.default.uint16 },
                    { name: 'imageType', type: dataType_1.default.uint16 },
                    { name: 'fileVersion', type: dataType_1.default.uint32 },
                    { name: 'currentTime', type: dataType_1.default.uint32 },
                    { name: 'upgradeTime', type: dataType_1.default.uint32 },
                ],
            }
        },
    },
    genPollCtrl: {
        ID: 32,
        attributes: {
            checkinInterval: { ID: 0, type: dataType_1.default.uint32 },
            longPollInterval: { ID: 1, type: dataType_1.default.uint32 },
            shortPollInterval: { ID: 2, type: dataType_1.default.uint16 },
            fastPollTimeout: { ID: 3, type: dataType_1.default.uint16 },
            checkinIntervalMin: { ID: 4, type: dataType_1.default.uint32 },
            longPollIntervalMin: { ID: 5, type: dataType_1.default.uint32 },
            fastPollTimeoutMax: { ID: 6, type: dataType_1.default.uint16 },
        },
        commands: {
            checkinRsp: {
                ID: 0,
                parameters: [
                    { name: 'startFastPolling', type: dataType_1.default.boolean },
                    { name: 'fastPollTimeout', type: dataType_1.default.uint16 },
                ],
            },
            fastPollStop: {
                ID: 1,
                parameters: [],
            },
            setLongPollInterval: {
                ID: 2,
                parameters: [
                    { name: 'newLongPollInterval', type: dataType_1.default.uint32 },
                ],
            },
            setShortPollInterval: {
                ID: 3,
                parameters: [
                    { name: 'newShortPollInterval', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {
            checkin: {
                ID: 0,
                parameters: [],
            },
        },
    },
    greenPower: {
        ID: 33,
        attributes: {},
        commands: {
            notification: {
                ID: 0,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint16 },
                    { name: 'srcID', type: dataType_1.default.uint32, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b000 }] },
                    { name: 'gpdIEEEAddr', type: dataType_1.default.ieeeAddr, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'gpdEndpoint', type: dataType_1.default.uint8, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'frameCounter', type: dataType_1.default.uint32 },
                    { name: 'commandID', type: dataType_1.default.uint8 },
                    { name: 'payloadSize', type: dataType_1.default.uint8 },
                    { name: 'commandFrame', type: buffaloZclDataType_1.default.GDP_FRAME },
                    { name: 'gppNwkAddr', type: dataType_1.default.uint16, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x4000 }] },
                    { name: 'gppGddLink', type: dataType_1.default.uint8, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x4000 }] },
                ],
            },
            commisioningNotification: {
                ID: 4,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint16 },
                    { name: 'srcID', type: dataType_1.default.uint32, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b000 }] },
                    { name: 'gpdIEEEAddr', type: dataType_1.default.ieeeAddr, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'gpdEndpoint', type: dataType_1.default.uint8, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'frameCounter', type: dataType_1.default.uint32 },
                    { name: 'commandID', type: dataType_1.default.uint8 },
                    { name: 'payloadSize', type: dataType_1.default.uint8 },
                    { name: 'commandFrame', type: buffaloZclDataType_1.default.GDP_FRAME },
                    { name: 'gppNwkAddr', type: dataType_1.default.uint16, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x800 }] },
                    { name: 'gppGddLink', type: dataType_1.default.uint8, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x800 }] },
                ],
            },
        },
        commandsResponse: {
            response: {
                ID: 6,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint8 },
                    { name: 'tempMaster', type: dataType_1.default.uint16 },
                    { name: 'tempMasterTx', type: dataType_1.default.uint8 },
                    { name: 'srcID', type: dataType_1.default.uint32, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b000 }] },
                    { name: 'gpdIEEEAddr', type: dataType_1.default.ieeeAddr, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'gpdEndpoint', type: dataType_1.default.uint8, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'gpdCmd', type: dataType_1.default.uint8 },
                    { name: 'gpdPayload', type: buffaloZclDataType_1.default.GDP_FRAME },
                ],
            },
            pairing: {
                ID: 1,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint24 },
                    { name: 'srcID', type: dataType_1.default.uint32, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b000 }] },
                    { name: 'gpdIEEEAddr', type: dataType_1.default.ieeeAddr, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'gpdEndpoint', type: dataType_1.default.uint8, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 0, size: 3, value: 0b010 }] },
                    { name: 'sinkIEEEAddr', type: dataType_1.default.ieeeAddr, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 4, size: 3, value: 0b110 }] },
                    { name: 'sinkIEEEAddr', type: dataType_1.default.ieeeAddr, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 4, size: 3, value: 0b000 }] },
                    { name: 'sinkNwkAddr', type: dataType_1.default.uint16, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 4, size: 3, value: 0b110 }] },
                    { name: 'sinkNwkAddr', type: dataType_1.default.uint16, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 4, size: 3, value: 0b000 }] },
                    { name: 'sinkGroupID', type: dataType_1.default.uint16, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 4, size: 3, value: 0b100 }] },
                    { name: 'sinkGroupID', type: dataType_1.default.uint16, conditions: [{ type: 'bitFieldEnum', param: 'options', offset: 4, size: 3, value: 0b010 }] },
                    { name: 'deviceID', type: dataType_1.default.uint8, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x0008 }] },
                    { name: 'frameCounter', type: dataType_1.default.uint32, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x4000 }] },
                    { name: 'gpdKey', type: dataType_1.default.secKey, conditions: [{ type: 'bitMaskSet', param: 'options', mask: 0x8000 }] },
                ],
            },
            commisioningMode: {
                ID: 2,
                parameters: [
                    { name: 'options', type: dataType_1.default.uint8 },
                    { name: 'commisioningWindow', type: dataType_1.default.uint16 },
                ],
            },
        },
    },
    mobileDeviceCfg: {
        ID: 34,
        attributes: {
            keepAliveTime: { ID: 0, type: dataType_1.default.uint16 },
            rejoinTimeout: { ID: 1, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    neighborCleaning: {
        ID: 35,
        attributes: {
            neighborCleaningTimeout: { ID: 0, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    nearestGateway: {
        ID: 36,
        attributes: {
            nearestGateway: { ID: 0, type: dataType_1.default.uint16 },
            newMobileNode: { ID: 1, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    closuresShadeCfg: {
        ID: 256,
        attributes: {
            physicalClosedLimit: { ID: 0, type: dataType_1.default.uint16 },
            motorStepSize: { ID: 1, type: dataType_1.default.uint8 },
            status: { ID: 2, type: dataType_1.default.bitmap8 },
            losedLimit: { ID: 16, type: dataType_1.default.uint16 },
            mode: { ID: 18, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    closuresDoorLock: {
        ID: 257,
        attributes: {
            lockState: { ID: 0, type: dataType_1.default.enum8 },
            lockType: { ID: 38, type: dataType_1.default.bitmap16 },
            actuatorEnabled: { ID: 2, type: dataType_1.default.boolean },
            doorState: { ID: 3, type: dataType_1.default.enum8 },
            doorOpenEvents: { ID: 4, type: dataType_1.default.uint32 },
            doorClosedEvents: { ID: 5, type: dataType_1.default.uint32 },
            openPeriod: { ID: 6, type: dataType_1.default.uint16 },
            numOfLockRecordsSupported: { ID: 16, type: dataType_1.default.uint16 },
            numOfTotalUsersSupported: { ID: 17, type: dataType_1.default.uint16 },
            numOfPinUsersSupported: { ID: 18, type: dataType_1.default.uint16 },
            numOfRfidUsersSupported: { ID: 19, type: dataType_1.default.uint16 },
            numOfWeekDaySchedulesSupportedPerUser: { ID: 20, type: dataType_1.default.uint8 },
            numOfYearDaySchedulesSupportedPerUser: { ID: 21, type: dataType_1.default.uint8 },
            numOfHolidayScheduledsSupported: { ID: 22, type: dataType_1.default.uint8 },
            maxPinLen: { ID: 23, type: dataType_1.default.uint8 },
            minPinLen: { ID: 24, type: dataType_1.default.uint8 },
            maxRfidLen: { ID: 25, type: dataType_1.default.uint8 },
            minRfidLen: { ID: 26, type: dataType_1.default.uint8 },
            enableLogging: { ID: 32, type: dataType_1.default.boolean },
            language: { ID: 33, type: dataType_1.default.charStr },
            ledSettings: { ID: 34, type: dataType_1.default.uint8 },
            autoRelockTime: { ID: 35, type: dataType_1.default.uint32 },
            soundVolume: { ID: 36, type: dataType_1.default.uint8 },
            operatingMode: { ID: 37, type: dataType_1.default.uint32 },
            defaultConfigurationRegister: { ID: 39, type: dataType_1.default.bitmap16 },
            enableLocalProgramming: { ID: 40, type: dataType_1.default.boolean },
            enableOneTouchLocking: { ID: 41, type: dataType_1.default.boolean },
            enableInsideStatusLed: { ID: 42, type: dataType_1.default.boolean },
            enablePrivacyModeButton: { ID: 43, type: dataType_1.default.boolean },
            wrongCodeEntryLimit: { ID: 48, type: dataType_1.default.uint8 },
            userCodeTemporaryDisableTime: { ID: 49, type: dataType_1.default.uint8 },
            sendPinOta: { ID: 50, type: dataType_1.default.boolean },
            requirePinForRfOperation: { ID: 51, type: dataType_1.default.boolean },
            zigbeeSecurityLevel: { ID: 52, type: dataType_1.default.uint8 },
            alarmMask: { ID: 64, type: dataType_1.default.bitmap16 },
            keypadOperationEventMask: { ID: 65, type: dataType_1.default.bitmap16 },
            rfOperationEventMask: { ID: 66, type: dataType_1.default.bitmap16 },
            manualOperationEventMask: { ID: 67, type: dataType_1.default.bitmap16 },
            rfidOperationEventMask: { ID: 68, type: dataType_1.default.bitmap16 },
            keypadProgrammingEventMask: { ID: 69, type: dataType_1.default.bitmap16 },
            rfProgrammingEventMask: { ID: 70, type: dataType_1.default.bitmap16 },
            rfidProgrammingEventMask: { ID: 71, type: dataType_1.default.bitmap16 },
        },
        commands: {
            lockDoor: {
                ID: 0,
                response: 0,
                parameters: [
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            unlockDoor: {
                ID: 1,
                response: 1,
                parameters: [
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            toggleDoor: {
                ID: 2,
                response: 2,
                parameters: [
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            unlockWithTimeout: {
                ID: 3,
                response: 3,
                parameters: [
                    { name: 'timeout', type: dataType_1.default.uint16 },
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            getLogRecord: {
                ID: 4,
                response: 4,
                parameters: [
                    { name: 'logindex', type: dataType_1.default.uint16 },
                ],
            },
            setPinCode: {
                ID: 5,
                response: 5,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            getPinCode: {
                ID: 6,
                response: 6,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            clearPinCode: {
                ID: 7,
                response: 7,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            clearAllPinCodes: {
                ID: 8,
                response: 8,
                parameters: [],
            },
            setUserStatus: {
                ID: 9,
                response: 9,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                ],
            },
            getUserStatus: {
                ID: 10,
                response: 10,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            setWeekDaySchedule: {
                ID: 11,
                response: 11,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'daysmask', type: dataType_1.default.uint8 },
                    { name: 'starthour', type: dataType_1.default.uint8 },
                    { name: 'startminute', type: dataType_1.default.uint8 },
                    { name: 'endhour', type: dataType_1.default.uint8 },
                    { name: 'endminute', type: dataType_1.default.uint8 },
                ],
            },
            getWeekDaySchedule: {
                ID: 12,
                response: 12,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            clearWeekDaySchedule: {
                ID: 13,
                response: 13,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            setYearDaySchedule: {
                ID: 14,
                response: 14,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'zigbeelocalstarttime', type: dataType_1.default.uint32 },
                    { name: 'zigbeelocalendtime', type: dataType_1.default.uint32 },
                ],
            },
            getYearDaySchedule: {
                ID: 15,
                response: 15,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            clearYearDaySchedule: {
                ID: 16,
                response: 16,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            setHolidaySchedule: {
                ID: 17,
                response: 17,
                parameters: [
                    { name: 'holidayscheduleid', type: dataType_1.default.uint8 },
                    { name: 'zigbeelocalstarttime', type: dataType_1.default.uint32 },
                    { name: 'zigbeelocalendtime', type: dataType_1.default.uint32 },
                    { name: 'opermodelduringholiday', type: dataType_1.default.uint8 },
                ],
            },
            getHolidaySchedule: {
                ID: 18,
                response: 18,
                parameters: [
                    { name: 'holidayscheduleid', type: dataType_1.default.uint8 },
                ],
            },
            clearHolidaySchedule: {
                ID: 19,
                response: 19,
                parameters: [
                    { name: 'holidayscheduleid', type: dataType_1.default.uint8 },
                ],
            },
            setUserType: {
                ID: 20,
                response: 20,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                ],
            },
            getUserType: {
                ID: 21,
                response: 21,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            setRfidCode: {
                ID: 22,
                response: 22,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            getRfidCode: {
                ID: 23,
                response: 23,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            clearRfidCode: {
                ID: 24,
                response: 24,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                ],
            },
            clearAllRfidCodes: {
                ID: 25,
                response: 25,
                parameters: [],
            },
        },
        commandsResponse: {
            lockDoorRsp: {
                ID: 0,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            unlockDoorRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            toggleDoorRsp: {
                ID: 2,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            unlockWithTimeoutRsp: {
                ID: 3,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getLogRecordRsp: {
                ID: 4,
                parameters: [
                    { name: 'logentryid', type: dataType_1.default.uint16 },
                    { name: 'timestamp', type: dataType_1.default.uint32 },
                    { name: 'eventtype', type: dataType_1.default.uint8 },
                    { name: 'source', type: dataType_1.default.uint8 },
                    { name: 'eventidalarmcode', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            setPinCodeRsp: {
                ID: 5,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getPinCodeRsp: {
                ID: 6,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            clearPinCodeRsp: {
                ID: 7,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            clearAllPinCodesRsp: {
                ID: 8,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            setUserStatusRsp: {
                ID: 9,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getUserStatusRsp: {
                ID: 10,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                ],
            },
            setWeekDayScheduleRsp: {
                ID: 11,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getWeekDayScheduleRsp: {
                ID: 12,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'daysmask', type: dataType_1.default.uint8 },
                    { name: 'starthour', type: dataType_1.default.uint8 },
                    { name: 'startminute', type: dataType_1.default.uint8 },
                    { name: 'endhour', type: dataType_1.default.uint8 },
                    { name: 'endminute', type: dataType_1.default.uint8 },
                ],
            },
            clearWeekDayScheduleRsp: {
                ID: 13,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            setYearDayScheduleRsp: {
                ID: 14,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getYearDayScheduleRsp: {
                ID: 15,
                parameters: [
                    { name: 'scheduleid', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'zigbeelocalstarttime', type: dataType_1.default.uint32 },
                    { name: 'zigbeelocalendtime', type: dataType_1.default.uint32 },
                ],
            },
            clearYearDayScheduleRsp: {
                ID: 16,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            setHolidayScheduleRsp: {
                ID: 17,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getHolidayScheduleRsp: {
                ID: 18,
                parameters: [
                    { name: 'holidayscheduleid', type: dataType_1.default.uint8 },
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'zigbeelocalstarttime', type: dataType_1.default.uint32 },
                    { name: 'zigbeelocalendtime', type: dataType_1.default.uint32 },
                    { name: 'opermodelduringholiday', type: dataType_1.default.uint8 },
                ],
            },
            clearHolidayScheduleRsp: {
                ID: 19,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            setUserTypeRsp: {
                ID: 20,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getUserTypeRsp: {
                ID: 21,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                ],
            },
            setRfidCodeRsp: {
                ID: 22,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            getRfidCodeRsp: {
                ID: 23,
                parameters: [
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                    { name: 'pincodevalue', type: dataType_1.default.charStr },
                ],
            },
            clearRfidCodeRsp: {
                ID: 24,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            clearAllRfidCodesRsp: {
                ID: 25,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            operationEventNotification: {
                ID: 32,
                parameters: [
                    { name: 'opereventsrc', type: dataType_1.default.uint8 },
                    { name: 'opereventcode', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'pin', type: dataType_1.default.octetStr },
                    { name: 'zigbeelocaltime', type: dataType_1.default.uint32 },
                    { name: 'data', type: dataType_1.default.uint8 },
                ],
            },
            programmingEventNotification: {
                ID: 33,
                parameters: [
                    { name: 'programeventsrc', type: dataType_1.default.uint8 },
                    { name: 'programeventcode', type: dataType_1.default.uint8 },
                    { name: 'userid', type: dataType_1.default.uint16 },
                    { name: 'pin', type: dataType_1.default.octetStr },
                    { name: 'usertype', type: dataType_1.default.uint8 },
                    { name: 'userstatus', type: dataType_1.default.uint8 },
                    { name: 'zigbeelocaltime', type: dataType_1.default.uint32 },
                    { name: 'data', type: dataType_1.default.uint8 },
                ],
            },
        },
    },
    closuresWindowCovering: {
        ID: 258,
        attributes: {
            windowCoveringType: { ID: 0, type: dataType_1.default.enum8 },
            physicalClosedLimitLiftCm: { ID: 1, type: dataType_1.default.uint16 },
            physicalClosedLimitTiltDdegree: { ID: 2, type: dataType_1.default.uint16 },
            currentPositionLiftCm: { ID: 3, type: dataType_1.default.uint16 },
            currentPositionTiltDdegree: { ID: 4, type: dataType_1.default.uint16 },
            numOfActuationsLift: { ID: 5, type: dataType_1.default.uint16 },
            numOfActuationsTilt: { ID: 6, type: dataType_1.default.uint16 },
            configStatus: { ID: 7, type: dataType_1.default.bitmap8 },
            currentPositionLiftPercentage: { ID: 8, type: dataType_1.default.uint8 },
            currentPositionTiltPercentage: { ID: 9, type: dataType_1.default.uint8 },
            operationalStatus: { ID: 10, type: dataType_1.default.bitmap8 },
            installedOpenLimitLiftCm: { ID: 16, type: dataType_1.default.uint16 },
            installedClosedLimitLiftCm: { ID: 17, type: dataType_1.default.uint16 },
            installedOpenLimitTiltDdegree: { ID: 18, type: dataType_1.default.uint16 },
            installedClosedLimitTiltDdegree: { ID: 19, type: dataType_1.default.uint16 },
            velocityLift: { ID: 20, type: dataType_1.default.uint16 },
            accelerationTimeLift: { ID: 21, type: dataType_1.default.uint16 },
            decelerationTimeLift: { ID: 22, type: dataType_1.default.uint16 },
            windowCoveringMode: { ID: 23, type: dataType_1.default.bitmap8 },
            intermediateSetpointsLift: { ID: 24, type: dataType_1.default.octetStr },
            intermediateSetpointsTilt: { ID: 25, type: dataType_1.default.octetStr },
            ubisysTurnaroundGuardTime: { ID: 0x1000, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysLiftToTiltTransitionSteps: { ID: 0x1001, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysTotalSteps: { ID: 0x1002, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysLiftToTiltTransitionSteps2: { ID: 0x1003, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysTotalSteps2: { ID: 0x1004, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysAdditionalSteps: { ID: 0x1005, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysInactivePowerThreshold: { ID: 0x1006, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Ubisys },
            ubisysStartupSteps: { ID: 0x1007, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Ubisys },
            tuyaMovingState: { ID: 0xf000, type: dataType_1.default.enum8 },
            tuyaCalibration: { ID: 0xf001, type: dataType_1.default.enum8 },
            stepPositionLift: { ID: 0xf001, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.LegrandNetatmo },
            tuyaMotorReversal: { ID: 0xf002, type: dataType_1.default.enum8 },
            calibrationMode: { ID: 0xf002, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.LegrandNetatmo },
            moesCalibrationTime: { ID: 0xf003, type: dataType_1.default.uint16 },
            targetPositionTiltPercentage: { ID: 0xf003, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.LegrandNetatmo },
            stepPositionTilt: { ID: 0xf004, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.LegrandNetatmo },
            elkoDriveCloseDuration: { ID: 0xE000, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoProtectionStatus: { ID: 0xE010, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoProtectionSensor: { ID: 0xE013, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoSunProtectionIlluminanceThreshold: { ID: 0xE012, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoLiftDriveUpTime: { ID: 0xE014, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoLiftDriveDownTime: { ID: 0xE015, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoTiltOpenCloseAndStepTime: { ID: 0xE016, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoTiltPositionPercentageAfterMoveToLevel: { ID: 0xE017, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.ELKO },
        },
        commands: {
            upOpen: {
                ID: 0,
                parameters: [],
            },
            downClose: {
                ID: 1,
                parameters: [],
            },
            stop: {
                ID: 2,
                parameters: [],
            },
            goToLiftValue: {
                ID: 4,
                parameters: [
                    { name: 'liftvalue', type: dataType_1.default.uint16 },
                ],
            },
            goToLiftPercentage: {
                ID: 5,
                parameters: [
                    { name: 'percentageliftvalue', type: dataType_1.default.uint8 },
                ],
            },
            goToTiltValue: {
                ID: 7,
                parameters: [
                    { name: 'tiltvalue', type: dataType_1.default.uint16 },
                ],
            },
            goToTiltPercentage: {
                ID: 8,
                parameters: [
                    { name: 'percentagetiltvalue', type: dataType_1.default.uint8 },
                ],
            },
            elkoStopOrStepLiftPercentage: {
                ID: 0x80,
                parameters: [
                    { name: 'direction', type: dataType_1.default.uint16 },
                    { name: 'stepvalue', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {},
    },
    barrierControl: {
        ID: 259,
        attributes: {
            movingState: { ID: 1, type: dataType_1.default.enum8 },
            safetyStatus: { ID: 2, type: dataType_1.default.bitmap16 },
            capabilities: { ID: 3, type: dataType_1.default.bitmap8 },
            openEvents: { ID: 4, type: dataType_1.default.uint16 },
            closeEvents: { ID: 5, type: dataType_1.default.uint16 },
            commandOpenEvents: { ID: 6, type: dataType_1.default.uint16 },
            commandCloseEvents: { ID: 7, type: dataType_1.default.uint16 },
            openPeriod: { ID: 8, type: dataType_1.default.uint16 },
            closePeriod: { ID: 9, type: dataType_1.default.uint16 },
            barrierPosition: { ID: 10, type: dataType_1.default.uint8 }
        },
        commands: {
            goToPercent: {
                ID: 0,
                parameters: [
                    { name: 'percentOpen', type: dataType_1.default.uint8 }
                ],
            },
            stop: {
                ID: 1,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    hvacPumpCfgCtrl: {
        ID: 512,
        attributes: {
            maxPressure: { ID: 0, type: dataType_1.default.int16 },
            maxSpeed: { ID: 1, type: dataType_1.default.uint16 },
            maxFlow: { ID: 2, type: dataType_1.default.uint16 },
            minConstPressure: { ID: 3, type: dataType_1.default.int16 },
            maxConstPressure: { ID: 4, type: dataType_1.default.int16 },
            minCompPressure: { ID: 5, type: dataType_1.default.int16 },
            maxCompPressure: { ID: 6, type: dataType_1.default.int16 },
            minConstSpeed: { ID: 7, type: dataType_1.default.uint16 },
            maxConstSpeed: { ID: 8, type: dataType_1.default.uint16 },
            minConstFlow: { ID: 9, type: dataType_1.default.uint16 },
            maxConstFlow: { ID: 10, type: dataType_1.default.uint16 },
            minConstTemp: { ID: 11, type: dataType_1.default.int16 },
            maxConstTemp: { ID: 12, type: dataType_1.default.int16 },
            pumpStatus: { ID: 16, type: dataType_1.default.bitmap16 },
            effectiveOperationMode: { ID: 17, type: dataType_1.default.enum8 },
            effectiveControlMode: { ID: 18, type: dataType_1.default.enum8 },
            capacity: { ID: 19, type: dataType_1.default.int16 },
            speed: { ID: 20, type: dataType_1.default.uint16 },
            lifetimeRunningHours: { ID: 21, type: dataType_1.default.uint24 },
            power: { ID: 22, type: dataType_1.default.uint24 },
            lifetimeEnergyConsumed: { ID: 23, type: dataType_1.default.uint32 },
            operationMode: { ID: 32, type: dataType_1.default.enum8 },
            controlMode: { ID: 33, type: dataType_1.default.enum8 },
            alarmMask: { ID: 34, type: dataType_1.default.bitmap16 },
        },
        commands: {},
        commandsResponse: {},
    },
    hvacThermostat: {
        ID: 513,
        attributes: {
            localTemp: { ID: 0, type: dataType_1.default.int16 },
            outdoorTemp: { ID: 1, type: dataType_1.default.int16 },
            occupancy: { ID: 2, type: dataType_1.default.bitmap8 },
            absMinHeatSetpointLimit: { ID: 3, type: dataType_1.default.int16 },
            absMaxHeatSetpointLimit: { ID: 4, type: dataType_1.default.int16 },
            absMinCoolSetpointLimit: { ID: 5, type: dataType_1.default.int16 },
            absMaxCoolSetpointLimit: { ID: 6, type: dataType_1.default.int16 },
            pICoolingDemand: { ID: 7, type: dataType_1.default.uint8 },
            pIHeatingDemand: { ID: 8, type: dataType_1.default.uint8 },
            systemTypeConfig: { ID: 9, type: dataType_1.default.bitmap8 },
            localTemperatureCalibration: { ID: 16, type: dataType_1.default.int8 },
            occupiedCoolingSetpoint: { ID: 17, type: dataType_1.default.int16 },
            occupiedHeatingSetpoint: { ID: 18, type: dataType_1.default.int16 },
            unoccupiedCoolingSetpoint: { ID: 19, type: dataType_1.default.int16 },
            unoccupiedHeatingSetpoint: { ID: 20, type: dataType_1.default.int16 },
            minHeatSetpointLimit: { ID: 21, type: dataType_1.default.int16 },
            maxHeatSetpointLimit: { ID: 22, type: dataType_1.default.int16 },
            minCoolSetpointLimit: { ID: 23, type: dataType_1.default.int16 },
            maxCoolSetpointLimit: { ID: 24, type: dataType_1.default.int16 },
            minSetpointDeadBand: { ID: 25, type: dataType_1.default.int8 },
            remoteSensing: { ID: 26, type: dataType_1.default.bitmap8 },
            ctrlSeqeOfOper: { ID: 27, type: dataType_1.default.enum8 },
            systemMode: { ID: 28, type: dataType_1.default.enum8 },
            alarmMask: { ID: 29, type: dataType_1.default.bitmap8 },
            runningMode: { ID: 30, type: dataType_1.default.enum8 },
            startOfWeek: { ID: 32, type: dataType_1.default.enum8 },
            numberOfWeeklyTrans: { ID: 33, type: dataType_1.default.uint8 },
            numberOfDailyTrans: { ID: 34, type: dataType_1.default.uint8 },
            tempSetpointHold: { ID: 35, type: dataType_1.default.enum8 },
            tempSetpointHoldDuration: { ID: 36, type: dataType_1.default.uint16 },
            programingOperMode: { ID: 37, type: dataType_1.default.bitmap8 },
            runningState: { ID: 41, type: dataType_1.default.bitmap16 },
            setpointChangeSource: { ID: 48, type: dataType_1.default.enum8 },
            setpointChangeAmount: { ID: 49, type: dataType_1.default.int16 },
            setpointChangeSourceTimeStamp: { ID: 50, type: dataType_1.default.utc },
            acType: { ID: 64, type: dataType_1.default.enum8 },
            acCapacity: { ID: 65, type: dataType_1.default.uint16 },
            acRefrigerantType: { ID: 66, type: dataType_1.default.enum8 },
            acConpressorType: { ID: 67, type: dataType_1.default.enum8 },
            acErrorCode: { ID: 68, type: dataType_1.default.bitmap32 },
            acLouverPosition: { ID: 69, type: dataType_1.default.enum8 },
            acCollTemp: { ID: 70, type: dataType_1.default.int16 },
            acCapacityFormat: { ID: 71, type: dataType_1.default.enum8 },
            SinopeOccupancy: { ID: 1024, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.Sinope },
            SinopeMainCycleOutput: { ID: 1025, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Sinope },
            SinopeBacklight: { ID: 1026, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.Sinope },
            SinopeAuxCycleOutput: { ID: 1028, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.Sinope },
            StelproSystemMode: { ID: 0x401c, type: dataType_1.default.enum8 },
            StelproOutdoorTemp: { ID: 0x4001, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.Stelpro },
            viessmannWindowOpenInternal: { ID: 0x4000, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.VIESSMAN_ELEKTRO },
            viessmannWindowOpenForce: { ID: 0x4003, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.VIESSMAN_ELEKTRO },
            viessmannAssemblyMode: { ID: 0x4012, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.VIESSMAN_ELEKTRO },
            schneiderWiserSpecific: { ID: 0xe110, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            danfossWindowOpenInternal: { ID: 0x4000, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossWindowOpenExternal: { ID: 0x4003, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossDayOfWeek: { ID: 0x4010, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossTriggerTime: { ID: 0x4011, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossMountedModeActive: { ID: 0x4012, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossMountedModeControl: { ID: 0x4013, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossThermostatOrientation: { ID: 0x4014, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossExternalMeasuredRoomSensor: { ID: 0x4015, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossRadiatorCovered: { ID: 0x4016, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossAlgorithmScaleFactor: { ID: 0x4020, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossHeatAvailable: { ID: 0x4030, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossHeatRequired: { ID: 0x4031, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossLoadBalancingEnable: { ID: 0x4032, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossLoadRoomMean: { ID: 0x4040, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossLoadEstimate: { ID: 0x404a, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossRegulationSetpointOffset: { ID: 0x404b, type: dataType_1.default.int8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossAdaptionRunControl: { ID: 0x404c, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossAdaptionRunStatus: { ID: 0x404d, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossAdaptionRunSettings: { ID: 0x404e, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossPreheatStatus: { ID: 0x404f, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossPreheatTime: { ID: 0x4050, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossWindowOpenFeatureEnable: { ID: 0x4051, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossRoomStatusCode: { ID: 0x4100, type: dataType_1.default.bitmap16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossOutputStatus: { ID: 0x4110, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossRoomFloorSensorMode: { ID: 0x4120, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossFloorMinSetpoint: { ID: 0x4121, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossFloorMaxSetpoint: { ID: 0x4122, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            elkoLoad: { ID: 0x0401, type: dataType_1.default.uint16 },
            elkoDisplayText: { ID: 0x0402, type: dataType_1.default.charStr },
            elkoSensor: { ID: 0x0403, type: dataType_1.default.enum8 },
            elkoRegulatorTime: { ID: 0x0404, type: dataType_1.default.uint8 },
            elkoRegulatorMode: { ID: 0x0405, type: dataType_1.default.boolean },
            elkoPowerStatus: { ID: 0x0406, type: dataType_1.default.boolean },
            elkoDateTime: { ID: 0x0407, type: dataType_1.default.octetStr },
            elkoMeanPower: { ID: 0x0408, type: dataType_1.default.uint16 },
            elkoExternalTemp: { ID: 0x0409, type: dataType_1.default.int16 },
            elkoNightSwitching: { ID: 0x0411, type: dataType_1.default.boolean },
            elkoFrostGuard: { ID: 0x0412, type: dataType_1.default.boolean },
            elkoChildLock: { ID: 0x0413, type: dataType_1.default.boolean },
            elkoMaxFloorTemp: { ID: 0x0414, type: dataType_1.default.uint8 },
            elkoRelayState: { ID: 0x0415, type: dataType_1.default.boolean },
            elkoVersion: { ID: 0x0416, type: dataType_1.default.octetStr },
            elkoCalibration: { ID: 0x0417, type: dataType_1.default.int8 },
            elkoLastMessageId: { ID: 0x0418, type: dataType_1.default.uint8 },
            elkoLastMessageStatus: { ID: 0x0419, type: dataType_1.default.uint8 },
            fourNoksHysteresisHigh: { ID: 0x0101, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default._4_NOKS },
            fourNoksHysteresisLow: { ID: 0x0102, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default._4_NOKS },
        },
        commands: {
            setpointRaiseLower: {
                ID: 0,
                parameters: [
                    { name: 'mode', type: dataType_1.default.uint8 },
                    { name: 'amount', type: dataType_1.default.int8 },
                ],
            },
            setWeeklySchedule: {
                ID: 1,
                parameters: [
                    { name: 'numoftrans', type: dataType_1.default.uint8 },
                    { name: 'dayofweek', type: dataType_1.default.uint8 },
                    { name: 'mode', type: dataType_1.default.uint8 },
                    { name: 'transitions', type: buffaloZclDataType_1.default.LIST_THERMO_TRANSITIONS },
                ],
            },
            getWeeklySchedule: {
                ID: 2,
                parameters: [
                    { name: 'daystoreturn', type: dataType_1.default.uint8 },
                    { name: 'modetoreturn', type: dataType_1.default.uint8 },
                ],
            },
            clearWeeklySchedule: {
                ID: 3,
                parameters: [],
            },
            getRelayStatusLog: {
                ID: 4,
                parameters: [],
            },
            danfossSetpointCommand: {
                ID: 64,
                parameters: [
                    { name: 'setpointType', type: dataType_1.default.enum8 },
                    { name: 'setpoint', type: dataType_1.default.int16 },
                ],
            },
            schneiderWiserThermostatBoost: {
                ID: 0x80,
                parameters: [
                    { name: 'command', type: dataType_1.default.enum8 },
                    { name: 'enable', type: dataType_1.default.enum8 },
                    { name: 'temperature', type: dataType_1.default.uint16 },
                    { name: 'duration', type: dataType_1.default.uint16 },
                ],
            },
            wiserSmartSetSetpoint: {
                ID: 224,
                parameters: [
                    { name: 'operatingmode', type: dataType_1.default.uint8 },
                    { name: 'zonemode', type: dataType_1.default.uint8 },
                    { name: 'setpoint', type: dataType_1.default.int16 },
                    { name: 'reserved', type: dataType_1.default.uint8 },
                ],
            },
            wiserSmartSetFipMode: {
                ID: 225,
                parameters: [
                    { name: 'zonemode', type: dataType_1.default.uint8 },
                    { name: 'fipmode', type: dataType_1.default.enum8 },
                    { name: 'reserved', type: dataType_1.default.uint8 },
                ],
            },
            wiserSmartCalibrateValve: {
                ID: 226,
                parameters: [],
            },
            plugwiseCalibrateValve: {
                ID: 0xa0,
                parameters: [],
            }
        },
        commandsResponse: {
            getWeeklyScheduleRsp: {
                ID: 0,
                parameters: [
                    { name: 'numoftrans', type: dataType_1.default.uint8 },
                    { name: 'dayofweek', type: dataType_1.default.uint8 },
                    { name: 'mode', type: dataType_1.default.uint8 },
                    { name: 'transitions', type: buffaloZclDataType_1.default.LIST_THERMO_TRANSITIONS },
                ],
            },
            getRelayStatusLogRsp: {
                ID: 1,
                parameters: [
                    { name: 'timeofday', type: dataType_1.default.uint16 },
                    { name: 'relaystatus', type: dataType_1.default.uint16 },
                    { name: 'localtemp', type: dataType_1.default.uint16 },
                    { name: 'humidity', type: dataType_1.default.uint8 },
                    { name: 'setpoint', type: dataType_1.default.uint16 },
                    { name: 'unreadentries', type: dataType_1.default.uint16 },
                ],
            },
        },
    },
    hvacFanCtrl: {
        ID: 514,
        attributes: {
            fanMode: { ID: 0, type: dataType_1.default.enum8 },
            fanModeSequence: { ID: 1, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    hvacDehumidificationCtrl: {
        ID: 515,
        attributes: {
            relativeHumidity: { ID: 0, type: dataType_1.default.uint8 },
            dehumidCooling: { ID: 1, type: dataType_1.default.uint8 },
            rhDehumidSetpoint: { ID: 16, type: dataType_1.default.uint8 },
            relativeHumidityMode: { ID: 17, type: dataType_1.default.enum8 },
            dehumidLockout: { ID: 18, type: dataType_1.default.enum8 },
            dehumidHysteresis: { ID: 19, type: dataType_1.default.uint8 },
            dehumidMaxCool: { ID: 20, type: dataType_1.default.uint8 },
            relativeHumidDisplay: { ID: 21, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    hvacUserInterfaceCfg: {
        ID: 516,
        attributes: {
            tempDisplayMode: { ID: 0, type: dataType_1.default.enum8 },
            keypadLockout: { ID: 1, type: dataType_1.default.enum8 },
            programmingVisibility: { ID: 2, type: dataType_1.default.enum8 },
            danfossViewingDirection: { ID: 0x4000, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
        },
        commands: {},
        commandsResponse: {},
    },
    lightingColorCtrl: {
        ID: 768,
        attributes: {
            currentHue: { ID: 0, type: dataType_1.default.uint8 },
            currentSaturation: { ID: 1, type: dataType_1.default.uint8 },
            remainingTime: { ID: 2, type: dataType_1.default.uint16 },
            currentX: { ID: 3, type: dataType_1.default.uint16 },
            currentY: { ID: 4, type: dataType_1.default.uint16 },
            driftCompensation: { ID: 5, type: dataType_1.default.enum8 },
            compensationText: { ID: 6, type: dataType_1.default.charStr },
            colorTemperature: { ID: 7, type: dataType_1.default.uint16 },
            colorMode: { ID: 8, type: dataType_1.default.enum8 },
            options: { ID: 15, type: dataType_1.default.bitmap8 },
            numPrimaries: { ID: 16, type: dataType_1.default.uint8 },
            primary1X: { ID: 17, type: dataType_1.default.uint16 },
            primary1Y: { ID: 18, type: dataType_1.default.uint16 },
            primary1Intensity: { ID: 19, type: dataType_1.default.uint8 },
            primary2X: { ID: 21, type: dataType_1.default.uint16 },
            primary2Y: { ID: 22, type: dataType_1.default.uint16 },
            primary2Intensity: { ID: 23, type: dataType_1.default.uint8 },
            primary3X: { ID: 25, type: dataType_1.default.uint16 },
            primary3Y: { ID: 26, type: dataType_1.default.uint16 },
            primary3Intensity: { ID: 27, type: dataType_1.default.uint8 },
            primary4X: { ID: 32, type: dataType_1.default.uint16 },
            primary4Y: { ID: 33, type: dataType_1.default.uint16 },
            primary4Intensity: { ID: 34, type: dataType_1.default.uint8 },
            primary5X: { ID: 36, type: dataType_1.default.uint16 },
            primary5Y: { ID: 37, type: dataType_1.default.uint16 },
            primary5Intensity: { ID: 38, type: dataType_1.default.uint8 },
            primary6X: { ID: 40, type: dataType_1.default.uint16 },
            primary6Y: { ID: 41, type: dataType_1.default.uint16 },
            primary6Intensity: { ID: 42, type: dataType_1.default.uint8 },
            whitePointX: { ID: 48, type: dataType_1.default.uint16 },
            whitePointY: { ID: 49, type: dataType_1.default.uint16 },
            colorPointRX: { ID: 50, type: dataType_1.default.uint16 },
            colorPointRY: { ID: 51, type: dataType_1.default.uint16 },
            colorPointRIntensity: { ID: 52, type: dataType_1.default.uint8 },
            colorPointGX: { ID: 54, type: dataType_1.default.uint16 },
            colorPointGY: { ID: 55, type: dataType_1.default.uint16 },
            colorPointGIntensity: { ID: 56, type: dataType_1.default.uint8 },
            colorPointBX: { ID: 58, type: dataType_1.default.uint16 },
            colorPointBY: { ID: 59, type: dataType_1.default.uint16 },
            colorPointBIntensity: { ID: 60, type: dataType_1.default.uint8 },
            enhancedCurrentHue: { ID: 16384, type: dataType_1.default.uint16 },
            enhancedColorMode: { ID: 16385, type: dataType_1.default.enum8 },
            colorLoopActive: { ID: 16386, type: dataType_1.default.uint8 },
            colorLoopDirection: { ID: 16387, type: dataType_1.default.uint8 },
            colorLoopTime: { ID: 16388, type: dataType_1.default.uint16 },
            colorLoopStartEnhancedHue: { ID: 16389, type: dataType_1.default.uint16 },
            colorLoopStoredEnhancedHue: { ID: 16390, type: dataType_1.default.uint16 },
            colorCapabilities: { ID: 16394, type: dataType_1.default.uint16 },
            colorTempPhysicalMin: { ID: 16395, type: dataType_1.default.uint16 },
            colorTempPhysicalMax: { ID: 16396, type: dataType_1.default.uint16 },
            coupleColorTempToLevelMin: { ID: 16397, type: dataType_1.default.uint16 },
            startUpColorTemperature: { ID: 16400, type: dataType_1.default.uint16 },
            tuyaBrightness: { ID: 61441, type: dataType_1.default.uint16 },
            tuyaRgbMode: { ID: 61440, type: dataType_1.default.uint16 },
        },
        commands: {
            moveToHue: {
                ID: 0,
                parameters: [
                    { name: 'hue', type: dataType_1.default.uint8 },
                    { name: 'direction', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            moveHue: {
                ID: 1,
                parameters: [
                    { name: 'movemode', type: dataType_1.default.uint8 },
                    { name: 'rate', type: dataType_1.default.uint8 },
                ],
            },
            stepHue: {
                ID: 2,
                parameters: [
                    { name: 'stepmode', type: dataType_1.default.uint8 },
                    { name: 'stepsize', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint8 },
                ],
            },
            moveToSaturation: {
                ID: 3,
                parameters: [
                    { name: 'saturation', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            moveSaturation: {
                ID: 4,
                parameters: [
                    { name: 'movemode', type: dataType_1.default.uint8 },
                    { name: 'rate', type: dataType_1.default.uint8 },
                ],
            },
            stepSaturation: {
                ID: 5,
                parameters: [
                    { name: 'stepmode', type: dataType_1.default.uint8 },
                    { name: 'stepsize', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint8 },
                ],
            },
            moveToHueAndSaturation: {
                ID: 6,
                parameters: [
                    { name: 'hue', type: dataType_1.default.uint8 },
                    { name: 'saturation', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            tuyaMoveToHueAndSaturationBrightness: {
                ID: 6,
                parameters: [
                    { name: 'hue', type: dataType_1.default.uint8 },
                    { name: 'saturation', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                    { name: 'brightness', type: dataType_1.default.uint8 },
                ],
            },
            moveToColor: {
                ID: 7,
                parameters: [
                    { name: 'colorx', type: dataType_1.default.uint16 },
                    { name: 'colory', type: dataType_1.default.uint16 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            moveColor: {
                ID: 8,
                parameters: [
                    { name: 'ratex', type: dataType_1.default.int16 },
                    { name: 'ratey', type: dataType_1.default.int16 },
                ],
            },
            stepColor: {
                ID: 9,
                parameters: [
                    { name: 'stepx', type: dataType_1.default.int16 },
                    { name: 'stepy', type: dataType_1.default.int16 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            moveToColorTemp: {
                ID: 10,
                parameters: [
                    { name: 'colortemp', type: dataType_1.default.uint16 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            enhancedMoveToHue: {
                ID: 64,
                parameters: [
                    { name: 'enhancehue', type: dataType_1.default.uint16 },
                    { name: 'direction', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            enhancedMoveHue: {
                ID: 65,
                parameters: [
                    { name: 'movemode', type: dataType_1.default.uint8 },
                    { name: 'rate', type: dataType_1.default.uint16 },
                ],
            },
            enhancedStepHue: {
                ID: 66,
                parameters: [
                    { name: 'stepmode', type: dataType_1.default.uint8 },
                    { name: 'stepsize', type: dataType_1.default.uint16 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            enhancedMoveToHueAndSaturation: {
                ID: 67,
                parameters: [
                    { name: 'enhancehue', type: dataType_1.default.uint16 },
                    { name: 'saturation', type: dataType_1.default.uint8 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                ],
            },
            colorLoopSet: {
                ID: 68,
                parameters: [
                    { name: 'updateflags', type: dataType_1.default.uint8 },
                    { name: 'action', type: dataType_1.default.uint8 },
                    { name: 'direction', type: dataType_1.default.uint8 },
                    { name: 'time', type: dataType_1.default.uint16 },
                    { name: 'starthue', type: dataType_1.default.uint16 },
                ],
            },
            stopMoveStep: {
                ID: 71,
                parameters: [
                    { name: 'bits', type: dataType_1.default.uint8 },
                    { name: 'bytee', type: dataType_1.default.uint8 },
                    { name: 'action', type: dataType_1.default.uint8 },
                    { name: 'direction', type: dataType_1.default.uint8 },
                    { name: 'time', type: dataType_1.default.uint16 },
                    { name: 'starthue', type: dataType_1.default.uint16 },
                ],
            },
            moveColorTemp: {
                ID: 75,
                parameters: [
                    { name: 'movemode', type: dataType_1.default.uint8 },
                    { name: 'rate', type: dataType_1.default.uint16 },
                    { name: 'minimum', type: dataType_1.default.uint16 },
                    { name: 'maximum', type: dataType_1.default.uint16 },
                ],
            },
            stepColorTemp: {
                ID: 76,
                parameters: [
                    { name: 'stepmode', type: dataType_1.default.uint8 },
                    { name: 'stepsize', type: dataType_1.default.uint16 },
                    { name: 'transtime', type: dataType_1.default.uint16 },
                    { name: 'minimum', type: dataType_1.default.uint16 },
                    { name: 'maximum', type: dataType_1.default.uint16 },
                ],
            },
            tuyaMoveToHueAndSaturationBrightness2: {
                ID: 225,
                parameters: [
                    { name: 'hue', type: dataType_1.default.uint16 },
                    { name: 'saturation', type: dataType_1.default.uint16 },
                    { name: 'brightness', type: dataType_1.default.uint16 },
                ],
            },
            tuyaRgbMode: {
                ID: 240,
                parameters: [
                    { name: 'enable', type: dataType_1.default.uint8 },
                ]
            },
            tuyaOnStartUp: {
                ID: 249,
                parameters: [
                    { name: 'mode', type: dataType_1.default.uint16 },
                    { name: 'data', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            tuyaDoNotDisturb: {
                ID: 250,
                parameters: [
                    { name: 'enable', type: dataType_1.default.uint8 },
                ],
            },
            tuyaOnOffTransitionTime: {
                ID: 251,
                parameters: [
                    { name: 'unknown', type: dataType_1.default.uint8 },
                    { name: 'onTransitionTime', type: buffaloZclDataType_1.default.BIG_ENDIAN_UINT24 },
                    { name: 'offTransitionTime', type: buffaloZclDataType_1.default.BIG_ENDIAN_UINT24 },
                ],
            },
        },
        commandsResponse: {},
    },
    lightingBallastCfg: {
        ID: 769,
        attributes: {
            physicalMinLevel: { ID: 0, type: dataType_1.default.uint8 },
            physicalMaxLevel: { ID: 1, type: dataType_1.default.uint8 },
            ballastStatus: { ID: 2, type: dataType_1.default.bitmap8 },
            minLevel: { ID: 16, type: dataType_1.default.uint8 },
            maxLevel: { ID: 17, type: dataType_1.default.uint8 },
            powerOnLevel: { ID: 18, type: dataType_1.default.uint8 },
            powerOnFadeTime: { ID: 19, type: dataType_1.default.uint16 },
            intrinsicBallastFactor: { ID: 20, type: dataType_1.default.uint8 },
            ballastFactorAdjustment: { ID: 21, type: dataType_1.default.uint8 },
            lampQuantity: { ID: 32, type: dataType_1.default.uint8 },
            lampType: { ID: 48, type: dataType_1.default.charStr },
            lampManufacturer: { ID: 49, type: dataType_1.default.charStr },
            lampRatedHours: { ID: 50, type: dataType_1.default.uint24 },
            lampBurnHours: { ID: 51, type: dataType_1.default.uint24 },
            lampAlarmMode: { ID: 52, type: dataType_1.default.bitmap8 },
            lampBurnHoursTripPoint: { ID: 53, type: dataType_1.default.uint24 },
            elkoControlMode: { ID: 0xE000, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.ELKO },
            wiserControlMode: { ID: 0xE000, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
        },
        commands: {},
        commandsResponse: {},
    },
    msIlluminanceMeasurement: {
        ID: 1024,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.uint16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.uint16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.uint16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
            lightSensorType: { ID: 4, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    msIlluminanceLevelSensing: {
        ID: 1025,
        attributes: {
            levelStatus: { ID: 0, type: dataType_1.default.enum8 },
            lightSensorType: { ID: 1, type: dataType_1.default.enum8 },
            illuminanceTargetLevel: { ID: 16, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    msTemperatureMeasurement: {
        ID: 1026,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.int16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.int16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.int16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
            minPercentChange: { ID: 16, type: dataType_1.default.unknown },
            minAbsoluteChange: { ID: 17, type: dataType_1.default.unknown },
            BatteryVoltage: { ID: 0x0101, type: dataType_1.default.uint16 },
            DelayRefreshMeas: { ID: 0x0102, type: dataType_1.default.uint16 },			
            Luminosity: { ID: 0x0300, type: dataType_1.default.uint16 },
            Pressure:   { ID: 0x0301, type: dataType_1.default.uint16 },	
			Humidity:   { ID: 0x0302, type: dataType_1.default.uint16 },
			TemperatureEnv: { ID: 0x0303, type: dataType_1.default.int16 },			
			AirQuality: { ID: 0x0304, type: dataType_1.default.uint8 },
			Co2:        { ID: 0x0305, type: dataType_1.default.uint16 },
			Tvoc:        { ID: 0x0306, type: dataType_1.default.uint16 },			
			R1:     { ID: 0x0307, type: dataType_1.default.uint32 },
			R2:     { ID: 0x0308, type: dataType_1.default.uint32 },
			R3:     { ID: 0x0309, type: dataType_1.default.uint32 },
			R4:     { ID: 0x030A, type: dataType_1.default.uint32 },
			WhiteLuminosity: { ID: 0x030B, type: dataType_1.default.uint16 },
			TankLevel: { ID: 0x030C, type: dataType_1.default.uint8 },	
			PlantTemperature1:      { ID: 0x0310, type: dataType_1.default.int16 },
            PlantMACDS1:            { ID: 0x0311, type: dataType_1.default.uint64 },	
			PlantSoilMoisture1:     { ID: 0x0312, type: dataType_1.default.uint8 },
			PlantWaterAlimentation1: { ID: 0x0313, type: dataType_1.default.uint16 },			
			PlantWaterAlimentationState1: { ID: 0x0314, type: dataType_1.default.uint8 },
			PlantTemperature2:      { ID: 0x0320, type: dataType_1.default.int16 },
            PlantMACDS2:            { ID: 0x0321, type: dataType_1.default.uint64 },	
			PlantSoilMoisture2:     { ID: 0x0322, type: dataType_1.default.uint8 },
			PlantWaterAlimentation2: { ID: 0x0323, type: dataType_1.default.uint16 },			
			PlantWaterAlimentationState2: { ID: 0x0324, type: dataType_1.default.uint8 },
			PlantTemperature3:      { ID: 0x0330, type: dataType_1.default.int16 },
            PlantMACDS3:            { ID: 0x0331, type: dataType_1.default.uint64 },	
			PlantSoilMoisture3:     { ID: 0x0332, type: dataType_1.default.uint8 },
			PlantWaterAlimentation3: { ID: 0x0333, type: dataType_1.default.uint16 },			
			PlantWaterAlimentationState3: { ID: 0x0334, type: dataType_1.default.uint8 },
			PlantLight: { ID: 0x0340, type: dataType_1.default.uint8 },			
            sprutTemperatureOffset: { ID: 0x6600, type: dataType_1.default.int16, manufacturerCode: manufacturerCode_1.default.SprutDevice },
	},
        commands: {},
        commandsResponse: {},
    },
    msPressureMeasurement: {
        ID: 1027,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.int16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.int16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.int16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
            scaledValue: { ID: 0x0010, type: dataType_1.default.int16 },
            minScaledValue: { ID: 0x0011, type: dataType_1.default.int16 },
            maxScaledValue: { ID: 0x0012, type: dataType_1.default.int16 },
            scaledTolerance: { ID: 0x0013, type: dataType_1.default.uint16 },
            scale: { ID: 0x0014, type: dataType_1.default.int8 },
        },
        commands: {},
        commandsResponse: {},
    },
    msFlowMeasurement: {
        ID: 1028,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.uint16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.uint16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.uint16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    msRelativeHumidity: {
        ID: 1029,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.uint16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.uint16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.uint16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
            sprutHeater: { ID: 0x6600, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.SprutDevice },
        },
        commands: {},
        commandsResponse: {},
    },
    msOccupancySensing: {
        ID: 1030,
        attributes: {
            occupancy: { ID: 0, type: dataType_1.default.bitmap8 },
            occupancySensorType: { ID: 1, type: dataType_1.default.enum8 },
            pirOToUDelay: { ID: 16, type: dataType_1.default.uint16 },
            pirUToODelay: { ID: 17, type: dataType_1.default.uint16 },
            pirUToOThreshold: { ID: 18, type: dataType_1.default.uint8 },
            ultrasonicOToUDelay: { ID: 32, type: dataType_1.default.uint16 },
            ultrasonicUToODelay: { ID: 33, type: dataType_1.default.uint16 },
            ultrasonicUToOThreshold: { ID: 34, type: dataType_1.default.uint8 },
            elkoOccupancyDfltOperationMode: { ID: 0xE000, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoOccupancyOperationMode: { ID: 0xE001, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoForceOffTimeout: { ID: 0xE002, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.ELKO },
            elkoOccupancySensitivity: { ID: 0xE003, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.ELKO },
            sprutOccupancyLevel: { ID: 0x6600, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SprutDevice },
            sprutOccupancySensitivity: { ID: 0x6601, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SprutDevice },
        },
        commands: {},
        commandsResponse: {},
    },
    msSoilMoisture: {
        ID: 1032,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.uint16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.uint16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.uint16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    pHMeasurement: {
        ID: 1033,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.uint16 },
            minMeasuredValue: { ID: 1, type: dataType_1.default.uint16 },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.uint16 },
            tolerance: { ID: 3, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    msCO2: {
        ID: 1037,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.singlePrec },
            minMeasuredValue: { ID: 1, type: dataType_1.default.singlePrec },
            maxMeasuredValue: { ID: 2, type: dataType_1.default.singlePrec },
            sprutCO2Calibration: { ID: 0x6600, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.SprutDevice },
            sprutCO2AutoCalibration: { ID: 0x6601, type: dataType_1.default.boolean, manufacturerCode: manufacturerCode_1.default.SprutDevice },
        },
        commands: {},
        commandsResponse: {},
    },
    pm25Measurement: {
        ID: 0x042a,
        attributes: {
            //IKEA Vindstyrka: measured value is reported as float
            measuredValueIkea: { ID: 0x0000, type: dataType_1.default.singlePrec, manufacturerCode: manufacturerCode_1.default.IKEA_OF_SWEDEN },
            //default cluster spec: values reported as uint16
            measuredValue: { ID: 0x0000, type: dataType_1.default.uint16 },
            measuredMinValue: { ID: 0x0001, type: dataType_1.default.uint16 },
            measuredMaxValue: { ID: 0x0002, type: dataType_1.default.uint16 },
            measuredTolerance: { ID: 0x0003, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    ssIasZone: {
        ID: 1280,
        attributes: {
            zoneState: { ID: 0, type: dataType_1.default.enum8 },
            zoneType: { ID: 1, type: dataType_1.default.enum16 },
            zoneStatus: { ID: 2, type: dataType_1.default.bitmap16 },
            iasCieAddr: { ID: 16, type: dataType_1.default.ieeeAddr },
            zoneId: { ID: 17, type: dataType_1.default.uint8 },
            numZoneSensitivityLevelsSupported: { ID: 18, type: dataType_1.default.uint8 },
            currentZoneSensitivityLevel: { ID: 19, type: dataType_1.default.uint8 },
            develcoAlarmOffDelay: { ID: 0x8001, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.DEVELCO },
        },
        commands: {
            enrollRsp: {
                ID: 0,
                parameters: [
                    { name: 'enrollrspcode', type: dataType_1.default.uint8 },
                    { name: 'zoneid', type: dataType_1.default.uint8 },
                ],
            },
            initNormalOpMode: {
                ID: 1,
                parameters: [],
            },
            initTestMode: {
                ID: 2,
                parameters: [],
            },
            boschTestTamper: {
                ID: 0xF3,
                parameters: [
                    { name: 'data', type: dataType_1.default.uint8 },
                ],
            },
        },
        commandsResponse: {
            statusChangeNotification: {
                ID: 0,
                parameters: [
                    { name: 'zonestatus', type: dataType_1.default.uint16 },
                    { name: 'extendedstatus', type: dataType_1.default.uint8 },
                ],
            },
            enrollReq: {
                ID: 1,
                parameters: [
                    { name: 'zonetype', type: dataType_1.default.uint16 },
                    { name: 'manucode', type: dataType_1.default.uint16 },
                ],
            },
        },
    },
    ssIasAce: {
        ID: 1281,
        attributes: {},
        commands: {
            arm: {
                ID: 0,
                response: 0,
                parameters: [
                    { name: 'armmode', type: dataType_1.default.uint8 },
                    { name: 'code', type: dataType_1.default.charStr },
                    { name: 'zoneid', type: dataType_1.default.uint8 },
                ],
            },
            bypass: {
                ID: 1,
                parameters: [
                    { name: 'numofzones', type: dataType_1.default.uint8 },
                    { name: 'zoneidlist', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            emergency: {
                ID: 2,
                parameters: [],
            },
            fire: {
                ID: 3,
                parameters: [],
            },
            panic: {
                ID: 4,
                parameters: [],
            },
            getZoneIDMap: {
                ID: 5,
                response: 1,
                parameters: [],
            },
            getZoneInfo: {
                ID: 6,
                response: 2,
                parameters: [
                    { name: 'zoneid', type: dataType_1.default.uint8 },
                ],
            },
            getPanelStatus: {
                ID: 7,
                response: 5,
                parameters: [],
            },
            getBypassedZoneList: {
                ID: 8,
                parameters: [],
            },
            getZoneStatus: {
                ID: 9,
                response: 8,
                parameters: [
                    { name: 'startzoneid', type: dataType_1.default.uint8 },
                    { name: 'maxnumzoneid', type: dataType_1.default.uint8 },
                    { name: 'zonestatusmaskflag', type: dataType_1.default.uint8 },
                    { name: 'zonestatusmask', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {
            armRsp: {
                ID: 0,
                parameters: [
                    { name: 'armnotification', type: dataType_1.default.uint8 },
                ],
            },
            getZoneIDMapRsp: {
                ID: 1,
                parameters: [
                    { name: 'zoneidmapsection0', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection1', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection2', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection3', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection4', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection5', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection6', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection7', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection8', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection9', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection10', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection11', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection12', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection13', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection14', type: dataType_1.default.uint16 },
                    { name: 'zoneidmapsection15', type: dataType_1.default.uint16 },
                ],
            },
            getZoneInfoRsp: {
                ID: 2,
                parameters: [
                    { name: 'zoneid', type: dataType_1.default.uint8 },
                    { name: 'zonetype', type: dataType_1.default.uint16 },
                    { name: 'ieeeaddr', type: dataType_1.default.ieeeAddr },
                    { name: 'zonelabel', type: dataType_1.default.charStr },
                ],
            },
            zoneStatusChanged: {
                ID: 3,
                parameters: [
                    { name: 'zoneid', type: dataType_1.default.uint8 },
                    { name: 'zonestatus', type: dataType_1.default.uint16 },
                    { name: 'audiblenotif', type: dataType_1.default.uint8 },
                    { name: 'zonelabel', type: dataType_1.default.charStr },
                ],
            },
            panelStatusChanged: {
                ID: 4,
                parameters: [
                    { name: 'panelstatus', type: dataType_1.default.uint8 },
                    { name: 'secondsremain', type: dataType_1.default.uint8 },
                    { name: 'audiblenotif', type: dataType_1.default.uint8 },
                    { name: 'alarmstatus', type: dataType_1.default.uint8 },
                ],
            },
            getPanelStatusRsp: {
                ID: 5,
                parameters: [
                    { name: 'panelstatus', type: dataType_1.default.uint8 },
                    { name: 'secondsremain', type: dataType_1.default.uint8 },
                    { name: 'audiblenotif', type: dataType_1.default.uint8 },
                    { name: 'alarmstatus', type: dataType_1.default.uint8 },
                ],
            },
            setBypassedZoneList: {
                ID: 6,
                parameters: [
                    { name: 'numofzones', type: dataType_1.default.uint8 },
                    { name: 'zoneid', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            bypassRsp: {
                ID: 7,
                parameters: [
                    { name: 'numofzones', type: dataType_1.default.uint8 },
                    { name: 'bypassresult', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            getZoneStatusRsp: {
                ID: 8,
                parameters: [
                    { name: 'zonestatuscomplete', type: dataType_1.default.uint8 },
                    { name: 'numofzones', type: dataType_1.default.uint8 },
                    { name: 'zoneinfo', type: buffaloZclDataType_1.default.LIST_ZONEINFO },
                ],
            },
        },
    },
    ssIasWd: {
        ID: 1282,
        attributes: {
            maxDuration: { ID: 0, type: dataType_1.default.uint16 },
        },
        commands: {
            startWarning: {
                ID: 0,
                parameters: [
                    { name: 'startwarninginfo', type: dataType_1.default.uint8 },
                    { name: 'warningduration', type: dataType_1.default.uint16 },
                    { name: 'strobedutycycle', type: dataType_1.default.uint8 },
                    { name: 'strobelevel', type: dataType_1.default.uint8 },
                ],
            },
            squawk: {
                ID: 1,
                parameters: [
                    { name: 'squawkinfo', type: dataType_1.default.uint8 },
                ],
            },
        },
        commandsResponse: {},
    },
    piGenericTunnel: {
        ID: 1536,
        attributes: {
            maxIncomeTransSize: { ID: 1, type: dataType_1.default.uint16 },
            maxOutgoTransSize: { ID: 2, type: dataType_1.default.uint16 },
            protocolAddr: { ID: 3, type: dataType_1.default.octetStr },
        },
        commands: {
            matchProtocolAddr: {
                ID: 0,
                parameters: [
                    { name: 'protocoladdr', type: dataType_1.default.charStr },
                ],
            },
        },
        commandsResponse: {
            matchProtocolAddrRsp: {
                ID: 0,
                parameters: [
                    { name: 'devieeeaddr', type: dataType_1.default.ieeeAddr },
                    { name: 'protocoladdr', type: dataType_1.default.charStr },
                ],
            },
            advertiseProtocolAddr: {
                ID: 1,
                parameters: [
                    { name: 'protocoladdr', type: dataType_1.default.charStr },
                ],
            },
        },
    },
    piBacnetProtocolTunnel: {
        ID: 1537,
        attributes: {},
        commands: {
            transferNpdu: {
                ID: 0,
                parameters: [
                    { name: 'npdu', type: dataType_1.default.uint8 },
                ],
            },
        },
        commandsResponse: {},
    },
    piAnalogInputReg: {
        ID: 1538,
        attributes: {
            covIncrement: { ID: 22, type: dataType_1.default.singlePrec },
            deviceType: { ID: 31, type: dataType_1.default.charStr },
            objectId: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            updateInterval: { ID: 118, type: dataType_1.default.uint8 },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piAnalogInputExt: {
        ID: 1539,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            deadband: { ID: 25, type: dataType_1.default.singlePrec },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            highLimit: { ID: 45, type: dataType_1.default.singlePrec },
            limitEnable: { ID: 52, type: dataType_1.default.bitmap8 },
            lowLimit: { ID: 59, type: dataType_1.default.singlePrec },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {
            transferApdu: {
                ID: 0,
                parameters: [],
            },
            connectReq: {
                ID: 1,
                parameters: [],
            },
            disconnectReq: {
                ID: 2,
                parameters: [],
            },
            connectStatusNoti: {
                ID: 3,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    piAnalogOutputReg: {
        ID: 1540,
        attributes: {
            covIncrement: { ID: 22, type: dataType_1.default.singlePrec },
            deviceType: { ID: 31, type: dataType_1.default.charStr },
            objectId: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            updateInterval: { ID: 118, type: dataType_1.default.uint8 },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piAnalogOutputExt: {
        ID: 1541,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            deadband: { ID: 25, type: dataType_1.default.singlePrec },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            highLimit: { ID: 45, type: dataType_1.default.singlePrec },
            limitEnable: { ID: 52, type: dataType_1.default.bitmap8 },
            lowLimit: { ID: 59, type: dataType_1.default.singlePrec },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piAnalogValueReg: {
        ID: 1542,
        attributes: {
            covIncrement: { ID: 22, type: dataType_1.default.singlePrec },
            objectId: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piAnalogValueExt: {
        ID: 1543,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            deadband: { ID: 25, type: dataType_1.default.singlePrec },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            highLimit: { ID: 45, type: dataType_1.default.singlePrec },
            limitEnable: { ID: 52, type: dataType_1.default.bitmap8 },
            lowLimit: { ID: 59, type: dataType_1.default.singlePrec },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piBinaryInputReg: {
        ID: 1544,
        attributes: {
            changeOfStateCount: { ID: 15, type: dataType_1.default.uint32 },
            changeOfStateTime: { ID: 16, type: dataType_1.default.struct },
            deviceType: { ID: 31, type: dataType_1.default.charStr },
            elapsedActiveTime: { ID: 33, type: dataType_1.default.uint32 },
            objectIdentifier: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            timeOfATReset: { ID: 114, type: dataType_1.default.struct },
            timeOfSCReset: { ID: 115, type: dataType_1.default.struct },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piBinaryInputExt: {
        ID: 1545,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            alarmValue: { ID: 6, type: dataType_1.default.boolean },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piBinaryOutputReg: {
        ID: 1546,
        attributes: {
            changeOfStateCount: { ID: 15, type: dataType_1.default.uint32 },
            changeOfStateTime: { ID: 16, type: dataType_1.default.struct },
            deviceType: { ID: 31, type: dataType_1.default.charStr },
            elapsedActiveTime: { ID: 33, type: dataType_1.default.uint32 },
            feedBackValue: { ID: 40, type: dataType_1.default.enum8 },
            objectIdentifier: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            timeOfATReset: { ID: 114, type: dataType_1.default.struct },
            timeOfSCReset: { ID: 115, type: dataType_1.default.struct },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piBinaryOutputExt: {
        ID: 1547,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piBinaryValueReg: {
        ID: 1548,
        attributes: {
            changeOfStateCount: { ID: 15, type: dataType_1.default.uint32 },
            changeOfStateTime: { ID: 16, type: dataType_1.default.struct },
            elapsedActiveTime: { ID: 33, type: dataType_1.default.uint32 },
            objectIdentifier: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            timeOfATReset: { ID: 114, type: dataType_1.default.struct },
            timeOfSCReset: { ID: 115, type: dataType_1.default.struct },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piBinaryValueExt: {
        ID: 1549,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            alarmValue: { ID: 6, type: dataType_1.default.boolean },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piMultistateInputReg: {
        ID: 1550,
        attributes: {
            deviceType: { ID: 31, type: dataType_1.default.charStr },
            objectId: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piMultistateInputExt: {
        ID: 1551,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            alarmValue: { ID: 6, type: dataType_1.default.uint16 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            faultValues: { ID: 37, type: dataType_1.default.uint16 },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piMultistateOutputReg: {
        ID: 1552,
        attributes: {
            deviceType: { ID: 31, type: dataType_1.default.charStr },
            feedBackValue: { ID: 40, type: dataType_1.default.enum8 },
            objectId: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piMultistateOutputExt: {
        ID: 1553,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    piMultistateValueReg: {
        ID: 1554,
        attributes: {
            objectId: { ID: 75, type: dataType_1.default.bacOid },
            objectName: { ID: 77, type: dataType_1.default.charStr },
            objectType: { ID: 79, type: dataType_1.default.enum16 },
            profileName: { ID: 168, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {},
    },
    piMultistateValueExt: {
        ID: 1555,
        attributes: {
            ackedTransitions: { ID: 0, type: dataType_1.default.bitmap8 },
            alarmValue: { ID: 6, type: dataType_1.default.uint16 },
            notificationClass: { ID: 17, type: dataType_1.default.uint16 },
            eventEnable: { ID: 35, type: dataType_1.default.bitmap8 },
            eventState: { ID: 36, type: dataType_1.default.enum8 },
            faultValues: { ID: 37, type: dataType_1.default.uint16 },
            notifyType: { ID: 72, type: dataType_1.default.enum8 },
            timeDelay: { ID: 113, type: dataType_1.default.uint8 },
            eventTimeStamps: { ID: 130, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {},
    },
    pi11073ProtocolTunnel: {
        ID: 1556,
        attributes: {
            deviceidList: { ID: 0, type: dataType_1.default.array },
            managerTarget: { ID: 1, type: dataType_1.default.ieeeAddr },
            managerEndpoint: { ID: 2, type: dataType_1.default.uint8 },
            connected: { ID: 3, type: dataType_1.default.boolean },
            preemptible: { ID: 4, type: dataType_1.default.boolean },
            idleTimeout: { ID: 5, type: dataType_1.default.uint16 },
        },
        commands: {
            transferApdu: {
                ID: 0,
                parameters: [],
            },
            connectReq: {
                ID: 1,
                parameters: [],
            },
            disconnectReq: {
                ID: 2,
                parameters: [],
            },
            connectStatusNoti: {
                ID: 3,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    piIso7818ProtocolTunnel: {
        ID: 1557,
        attributes: {
            status: { ID: 0, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    piRetailTunnel: {
        ID: 1559,
        attributes: {
            manufacturerCode: { ID: 0, type: dataType_1.default.uint16 },
            msProfile: { ID: 1, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    seMetering: {
        ID: 1794,
        attributes: {
            currentSummDelivered: { ID: 0, type: dataType_1.default.uint48 },
            currentSummReceived: { ID: 1, type: dataType_1.default.uint48 },
            currentMaxDemandDelivered: { ID: 2, type: dataType_1.default.uint48 },
            currentMaxDemandReceived: { ID: 3, type: dataType_1.default.uint48 },
            dftSumm: { ID: 4, type: dataType_1.default.uint48 },
            dailyFreezeTime: { ID: 5, type: dataType_1.default.uint16 },
            powerFactor: { ID: 6, type: dataType_1.default.int8 },
            readingSnapshotTime: { ID: 7, type: dataType_1.default.utc },
            currentMaxDemandDeliverdTime: { ID: 8, type: dataType_1.default.utc },
            currentMaxDemandReceivedTime: { ID: 9, type: dataType_1.default.utc },
            defaultUpdatePeriod: { ID: 10, type: dataType_1.default.uint8 },
            fastPollUpdatePeriod: { ID: 11, type: dataType_1.default.uint8 },
            currentBlockPeriodConsumpDelivered: { ID: 12, type: dataType_1.default.uint48 },
            dailyConsumpTarget: { ID: 13, type: dataType_1.default.uint24 },
            currentBlock: { ID: 14, type: dataType_1.default.enum8 },
            profileIntervalPeriod: { ID: 15, type: dataType_1.default.enum8 },
            intervalReadReportingPeriod: { ID: 16, type: dataType_1.default.uint16 },
            presetReadingTime: { ID: 17, type: dataType_1.default.uint16 },
            volumePerReport: { ID: 18, type: dataType_1.default.uint16 },
            flowRestriction: { ID: 19, type: dataType_1.default.uint8 },
            supplyStatus: { ID: 20, type: dataType_1.default.enum8 },
            currentInEnergyCarrierSumm: { ID: 21, type: dataType_1.default.uint48 },
            currentOutEnergyCarrierSumm: { ID: 22, type: dataType_1.default.uint48 },
            inletTempreature: { ID: 23, type: dataType_1.default.int24 },
            outletTempreature: { ID: 24, type: dataType_1.default.int24 },
            controlTempreature: { ID: 25, type: dataType_1.default.int24 },
            currentInEnergyCarrierDemand: { ID: 26, type: dataType_1.default.int24 },
            currentOutEnergyCarrierDemand: { ID: 27, type: dataType_1.default.int24 },
            currentBlockPeriodConsumpReceived: { ID: 29, type: dataType_1.default.uint48 },
            currentBlockReceived: { ID: 30, type: dataType_1.default.uint48 },
            DFTSummationReceived: { ID: 31, type: dataType_1.default.uint48 },
            activeRegisterTierDelivered: { ID: 32, type: dataType_1.default.enum8 },
            activeRegisterTierReceived: { ID: 33, type: dataType_1.default.enum8 },
            currentTier1SummDelivered: { ID: 256, type: dataType_1.default.uint48 },
            currentTier1SummReceived: { ID: 257, type: dataType_1.default.uint48 },
            currentTier2SummDelivered: { ID: 258, type: dataType_1.default.uint48 },
            currentTier2SummReceived: { ID: 259, type: dataType_1.default.uint48 },
            currentTier3SummDelivered: { ID: 260, type: dataType_1.default.uint48 },
            currentTier3SummReceived: { ID: 261, type: dataType_1.default.uint48 },
            currentTier4SummDelivered: { ID: 262, type: dataType_1.default.uint48 },
            currentTier4SummReceived: { ID: 263, type: dataType_1.default.uint48 },
            currentTier5SummDelivered: { ID: 264, type: dataType_1.default.uint48 },
            currentTier5SummReceived: { ID: 265, type: dataType_1.default.uint48 },
            currentTier6SummDelivered: { ID: 266, type: dataType_1.default.uint48 },
            currentTier6SummReceived: { ID: 267, type: dataType_1.default.uint48 },
            currentTier7SummDelivered: { ID: 268, type: dataType_1.default.uint48 },
            currentTier7SummReceived: { ID: 269, type: dataType_1.default.uint48 },
            currentTier8SummDelivered: { ID: 270, type: dataType_1.default.uint48 },
            currentTier8SummReceived: { ID: 271, type: dataType_1.default.uint48 },
            currentTier9SummDelivered: { ID: 272, type: dataType_1.default.uint48 },
            currentTier9SummReceived: { ID: 273, type: dataType_1.default.uint48 },
            currentTier10SummDelivered: { ID: 274, type: dataType_1.default.uint48 },
            currentTier10SummReceived: { ID: 275, type: dataType_1.default.uint48 },
            currentTier11SummDelivered: { ID: 276, type: dataType_1.default.uint48 },
            currentTier11SummReceived: { ID: 277, type: dataType_1.default.uint48 },
            currentTier12SummDelivered: { ID: 278, type: dataType_1.default.uint48 },
            currentTier12SummReceived: { ID: 279, type: dataType_1.default.uint48 },
            currentTier13SummDelivered: { ID: 280, type: dataType_1.default.uint48 },
            currentTier13SummReceived: { ID: 281, type: dataType_1.default.uint48 },
            currentTier14SummDelivered: { ID: 282, type: dataType_1.default.uint48 },
            currentTier14SummReceived: { ID: 283, type: dataType_1.default.uint48 },
            currentTier15SummDelivered: { ID: 284, type: dataType_1.default.uint48 },
            currentTier15SummReceived: { ID: 285, type: dataType_1.default.uint48 },
            status: { ID: 512, type: dataType_1.default.bitmap8 },
            remainingBattLife: { ID: 513, type: dataType_1.default.uint8 },
            hoursInOperation: { ID: 514, type: dataType_1.default.uint24 },
            hoursInFault: { ID: 515, type: dataType_1.default.uint24 },
            extendedStatus: { ID: 516, type: dataType_1.default.bitmap64 },
            unitOfMeasure: { ID: 768, type: dataType_1.default.enum8 },
            multiplier: { ID: 769, type: dataType_1.default.uint24 },
            divisor: { ID: 770, type: dataType_1.default.uint24 },
            summaFormatting: { ID: 771, type: dataType_1.default.bitmap8 },
            demandFormatting: { ID: 772, type: dataType_1.default.bitmap8 },
            historicalConsumpFormatting: { ID: 773, type: dataType_1.default.bitmap8 },
            meteringDeviceType: { ID: 774, type: dataType_1.default.bitmap8 },
            siteId: { ID: 775, type: dataType_1.default.octetStr },
            meterSerialNumber: { ID: 776, type: dataType_1.default.octetStr },
            energyCarrierUnitOfMeas: { ID: 777, type: dataType_1.default.enum8 },
            energyCarrierSummFormatting: { ID: 778, type: dataType_1.default.bitmap8 },
            energyCarrierDemandFormatting: { ID: 779, type: dataType_1.default.bitmap8 },
            temperatureUnitOfMeas: { ID: 780, type: dataType_1.default.enum8 },
            temperatureFormatting: { ID: 781, type: dataType_1.default.bitmap8 },
            moduleSerialNumber: { ID: 782, type: dataType_1.default.octetStr },
            operatingTariffLevel: { ID: 783, type: dataType_1.default.octetStr },
            instantaneousDemand: { ID: 1024, type: dataType_1.default.int24 },
            currentdayConsumpDelivered: { ID: 1025, type: dataType_1.default.uint24 },
            currentdayConsumpReceived: { ID: 1026, type: dataType_1.default.uint24 },
            previousdayConsumpDelivered: { ID: 1027, type: dataType_1.default.uint24 },
            previousdayConsumpReceived: { ID: 1028, type: dataType_1.default.uint24 },
            curPartProfileIntStartTimeDelivered: { ID: 1029, type: dataType_1.default.utc },
            curPartProfileIntStartTimeReceived: { ID: 1030, type: dataType_1.default.utc },
            curPartProfileIntValueDelivered: { ID: 1031, type: dataType_1.default.uint24 },
            curPartProfileIntValueReceived: { ID: 1032, type: dataType_1.default.uint24 },
            currentDayMaxPressure: { ID: 1033, type: dataType_1.default.uint48 },
            currentDayMinPressure: { ID: 1034, type: dataType_1.default.uint48 },
            previousDayMaxPressure: { ID: 1035, type: dataType_1.default.uint48 },
            previousDayMinPressure: { ID: 1036, type: dataType_1.default.uint48 },
            currentDayMaxDemand: { ID: 1037, type: dataType_1.default.int24 },
            previousDayMaxDemand: { ID: 1038, type: dataType_1.default.int24 },
            currentMonthMaxDemand: { ID: 1039, type: dataType_1.default.int24 },
            currentYearMaxDemand: { ID: 1040, type: dataType_1.default.int24 },
            currentdayMaxEnergyCarrDemand: { ID: 1041, type: dataType_1.default.int24 },
            previousdayMaxEnergyCarrDemand: { ID: 1042, type: dataType_1.default.int24 },
            curMonthMaxEnergyCarrDemand: { ID: 1043, type: dataType_1.default.int24 },
            curMonthMinEnergyCarrDemand: { ID: 1044, type: dataType_1.default.int24 },
            curYearMaxEnergyCarrDemand: { ID: 1045, type: dataType_1.default.int24 },
            curYearMinEnergyCarrDemand: { ID: 1046, type: dataType_1.default.int24 },
            maxNumberOfPeriodsDelivered: { ID: 1280, type: dataType_1.default.uint8 },
            currentDemandDelivered: { ID: 1536, type: dataType_1.default.uint24 },
            demandLimit: { ID: 1537, type: dataType_1.default.uint24 },
            demandIntegrationPeriod: { ID: 1538, type: dataType_1.default.uint8 },
            numberOfDemandSubintervals: { ID: 1539, type: dataType_1.default.uint8 },
            demandLimitArmDuration: { ID: 1540, type: dataType_1.default.uint16 },
            genericAlarmMask: { ID: 2048, type: dataType_1.default.bitmap16 },
            electricityAlarmMask: { ID: 2049, type: dataType_1.default.bitmap32 },
            genFlowPressureAlarmMask: { ID: 2050, type: dataType_1.default.bitmap16 },
            waterSpecificAlarmMask: { ID: 2051, type: dataType_1.default.bitmap16 },
            heatCoolSpecificAlarmMASK: { ID: 2052, type: dataType_1.default.bitmap16 },
            gasSpecificAlarmMask: { ID: 2053, type: dataType_1.default.bitmap16 },
            extendedGenericAlarmMask: { ID: 2054, type: dataType_1.default.bitmap48 },
            manufactureAlarmMask: { ID: 2055, type: dataType_1.default.bitmap16 },
            billToDate: { ID: 2560, type: dataType_1.default.uint32 },
            billToDateTimeStamp: { ID: 2561, type: dataType_1.default.utc },
            projectedBill: { ID: 2562, type: dataType_1.default.uint32 },
            projectedBillTimeStamp: { ID: 2563, type: dataType_1.default.utc },
            notificationControlFlags: { ID: 0, type: dataType_1.default.bitmap32 },
            notificationFlags: { ID: 1, type: dataType_1.default.bitmap32 },
            priceNotificationFlags: { ID: 2, type: dataType_1.default.bitmap32 },
            calendarNotificationFlags: { ID: 3, type: dataType_1.default.bitmap32 },
            prePayNotificationFlags: { ID: 4, type: dataType_1.default.bitmap32 },
            deviceManagementFlags: { ID: 5, type: dataType_1.default.bitmap32 },
            changeReportingProfile: { ID: 256, type: dataType_1.default.unknown },
            develcoPulseConfiguration: { ID: 0x0300, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.DEVELCO },
            develcoCurrentSummation: { ID: 0x0301, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.DEVELCO },
            develcoInterfaceMode: { ID: 0x0302, type: dataType_1.default.enum16, manufacturerCode: manufacturerCode_1.default.DEVELCO },
            owonL1PhasePower: { ID: 0x2000, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL2PhasePower: { ID: 0x2001, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL3PhasePower: { ID: 0x2002, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL1PhaseReactivePower: { ID: 0x2100, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL2PhaseReactivePower: { ID: 0x2101, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL3PhaseReactivePower: { ID: 0x2102, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL1PhaseVoltage: { ID: 0x3000, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL2PhaseVoltage: { ID: 0x3001, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL3PhaseVoltage: { ID: 0x3002, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL1PhaseCurrent: { ID: 0x3100, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL2PhaseCurrent: { ID: 0x3101, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL3PhaseCurrent: { ID: 0x3102, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonCurrentSum: { ID: 0x3103, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonLeakageCurrent: { ID: 0x3104, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL1Energy: { ID: 0x4000, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL2Energy: { ID: 0x4001, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL3Energy: { ID: 0x4002, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL1ReactiveEnergy: { ID: 0x4100, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL2ReactiveEnergy: { ID: 0x4101, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonL3ReactiveEnergy: { ID: 0x4102, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonReactiveEnergySum: { ID: 0x4103, type: dataType_1.default.uint48, manufacturerCode: manufacturerCode_1.default.OWON },
            owonFrequency: { ID: 0x5005, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.OWON },
            owonReportMap: { ID: 0x1000, type: dataType_1.default.bitmap8, manufacturerCode: manufacturerCode_1.default.OWON },
            owonReactivePowerSum: { ID: 0x2103, type: dataType_1.default.int24, manufacturerCode: manufacturerCode_1.default.OWON },
            owonLastHistoricalRecordTime: { ID: 0x5000, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.OWON },
            owonOldestHistoricalRecordTime: { ID: 0x5001, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.OWON },
            owonMinimumReportCycle: { ID: 0x5002, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.OWON },
            owonMaximumReportCycle: { ID: 0x5003, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.OWON },
            owonSentHistoricalRecordState: { ID: 0x5004, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.OWON },
            owonAccumulativeEnergyThreshold: { ID: 0x5006, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.OWON },
            owonReportMode: { ID: 0x5007, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.OWON },
            owonPercentChangeInPower: { ID: 0x5007, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.OWON },
            schneiderActiveEnergyTotal: { ID: 0x4010, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactiveEnergyTotal: { ID: 0x4011, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentEnergyTotal: { ID: 0x4012, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialActiveEnergyTotal: { ID: 0x4014, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialReactiveEnergyTotal: { ID: 0x4015, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialApparentEnergyTotal: { ID: 0x4016, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialActiveEnergyL1Phase: { ID: 0x4100, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialReactiveEnergyL1Phase: { ID: 0x4101, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialApparentEnergyL1Phase: { ID: 0x4102, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActiveEnergyL1Phase: { ID: 0x4103, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactiveEnergyL1Phase: { ID: 0x4104, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentEnergyL1Phase: { ID: 0x4105, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialActiveEnergyL2Phase: { ID: 0x4200, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialReactiveEnergyL2Phase: { ID: 0x4201, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialApparentEnergyL2Phase: { ID: 0x4202, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActiveEnergyL2Phase: { ID: 0x4203, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactiveEnergyL2Phase: { ID: 0x4204, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentEnergyL2Phase: { ID: 0x4205, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialActiveEnergyL3Phase: { ID: 0x4300, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialReactiveEnergyL3Phase: { ID: 0x4301, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderPartialApparentEnergyL3Phase: { ID: 0x4302, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActiveEnergyL3Phase: { ID: 0x4303, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactiveEnergyL3Phase: { ID: 0x4304, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentEnergyL3Phase: { ID: 0x4305, type: dataType_1.default.int48, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActiveEnergyMultiplier: { ID: 0x4400, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActiveEnergyDivisor: { ID: 0x4401, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactiveEnergyMultiplier: { ID: 0x4402, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactiveEnergyDivisor: { ID: 0x4403, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentEnergyMultiplier: { ID: 0x4404, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentEnergyDivisor: { ID: 0x4405, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderEnergyResetDateTime: { ID: 0x4501, type: dataType_1.default.utc, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderEnergyCountersReportingPeriod: { ID: 0x4600, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
        },
        commands: {
            getProfile: {
                ID: 0,
                parameters: [],
            },
            reqMirror: {
                ID: 1,
                parameters: [],
            },
            mirrorRem: {
                ID: 2,
                parameters: [],
            },
            reqFastPollMode: {
                ID: 3,
                parameters: [],
            },
            getSnapshot: {
                ID: 4,
                parameters: [],
            },
            takeSnapshot: {
                ID: 5,
                parameters: [],
            },
            mirrorReportAttrRsp: {
                ID: 6,
                parameters: [],
            },
            owonGetHistoryRecord: {
                ID: 0x20,
                parameters: [],
            },
            owonStopSendingHistoricalRecord: {
                ID: 0x21,
                parameters: [],
            },
        },
        commandsResponse: {
            getProfileRsp: {
                ID: 0,
                parameters: [],
            },
            reqMirrorRsp: {
                ID: 1,
                parameters: [],
            },
            mirrorRemRsp: {
                ID: 2,
                parameters: [],
            },
            reqFastPollModeRsp: {
                ID: 3,
                parameters: [],
            },
            getSnapshotRsp: {
                ID: 4,
                parameters: [],
            },
            owonGetHistoryRecordRsp: {
                ID: 0x20,
                parameters: [],
            },
        },
    },
    telecommunicationsInformation: {
        ID: 2304,
        attributes: {
            nodeDescription: { ID: 0, type: dataType_1.default.charStr },
            deliveryEnable: { ID: 1, type: dataType_1.default.boolean },
            pushInformationTimer: { ID: 2, type: dataType_1.default.uint32 },
            enableSecureConfiguration: { ID: 3, type: dataType_1.default.boolean },
            numberOfContents: { ID: 16, type: dataType_1.default.uint16 },
            contentRootID: { ID: 17, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    telecommunicationsVoiceOverZigbee: {
        ID: 2308,
        attributes: {
            codecType: { ID: 0, type: dataType_1.default.enum8 },
            samplingFrequency: { ID: 1, type: dataType_1.default.enum8 },
            codecrate: { ID: 2, type: dataType_1.default.enum8 },
            establishmentTimeout: { ID: 3, type: dataType_1.default.uint8 },
            codecTypeSub1: { ID: 4, type: dataType_1.default.enum8 },
            codecTypeSub2: { ID: 5, type: dataType_1.default.enum8 },
            codecTypeSub3: { ID: 6, type: dataType_1.default.enum8 },
            compressionType: { ID: 7, type: dataType_1.default.enum8 },
            compressionRate: { ID: 8, type: dataType_1.default.enum8 },
            optionFlags: { ID: 9, type: dataType_1.default.bitmap8 },
            threshold: { ID: 10, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    telecommunicationsChatting: {
        ID: 2309,
        attributes: {
            uID: { ID: 0, type: dataType_1.default.uint16 },
            nickname: { ID: 1, type: dataType_1.default.charStr },
            cID: { ID: 16, type: dataType_1.default.uint16 },
            name: { ID: 17, type: dataType_1.default.charStr },
            enableAddChat: { ID: 18, type: dataType_1.default.boolean },
        },
        commands: {},
        commandsResponse: {},
    },
    haApplianceIdentification: {
        ID: 2816,
        attributes: {
            basicIdentification: { ID: 0, type: dataType_1.default.uint56 },
            companyName: { ID: 16, type: dataType_1.default.charStr },
            companyId: { ID: 17, type: dataType_1.default.uint16 },
            brandName: { ID: 18, type: dataType_1.default.charStr },
            brandId: { ID: 19, type: dataType_1.default.uint16 },
            model: { ID: 20, type: dataType_1.default.octetStr },
            partNumber: { ID: 21, type: dataType_1.default.octetStr },
            productRevision: { ID: 22, type: dataType_1.default.octetStr },
            softwareRevision: { ID: 23, type: dataType_1.default.octetStr },
            productTypeName: { ID: 24, type: dataType_1.default.octetStr },
            productTypeId: { ID: 25, type: dataType_1.default.uint16 },
            cecedSpecificationVersion: { ID: 26, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    haMeterIdentification: {
        ID: 2817,
        attributes: {
            companyName: { ID: 0, type: dataType_1.default.charStr },
            meterTypeId: { ID: 1, type: dataType_1.default.uint16 },
            dataQualityId: { ID: 4, type: dataType_1.default.uint16 },
            customerName: { ID: 5, type: dataType_1.default.charStr },
            model: { ID: 6, type: dataType_1.default.charStr },
            partNumber: { ID: 7, type: dataType_1.default.charStr },
            productRevision: { ID: 8, type: dataType_1.default.charStr },
            softwareRevision: { ID: 10, type: dataType_1.default.charStr },
            utilityName: { ID: 11, type: dataType_1.default.charStr },
            pod: { ID: 12, type: dataType_1.default.charStr },
            availablePower: { ID: 13, type: dataType_1.default.int24 },
            powerThreshold: { ID: 14, type: dataType_1.default.int24 },
        },
        commands: {},
        commandsResponse: {},
    },
    haApplianceEventsAlerts: {
        ID: 2818,
        attributes: {},
        commands: {
            getAlerts: {
                ID: 0,
                parameters: [],
            },
        },
        commandsResponse: {
            getAlertsRsp: {
                ID: 0,
                parameters: [
                    { name: 'alertscount', type: dataType_1.default.uint8 },
                    { name: 'aalert', type: buffaloZclDataType_1.default.LIST_UINT24 },
                ],
            },
            alertsNotification: {
                ID: 1,
                parameters: [
                    { name: 'alertscount', type: dataType_1.default.uint8 },
                    { name: 'aalert', type: buffaloZclDataType_1.default.LIST_UINT24 },
                ],
            },
            eventNotification: {
                ID: 2,
                parameters: [
                    { name: 'eventheader', type: dataType_1.default.uint8 },
                    { name: 'eventid', type: dataType_1.default.uint8 },
                ],
            },
        },
    },
    haApplianceStatistics: {
        ID: 2819,
        attributes: {
            logMaxSize: { ID: 0, type: dataType_1.default.uint32 },
            logQueueMaxSize: { ID: 1, type: dataType_1.default.uint8 },
        },
        commands: {
            log: {
                ID: 0,
                parameters: [
                    { name: 'logid', type: dataType_1.default.uint32 },
                ],
            },
            logQueue: {
                ID: 1,
                parameters: [],
            },
        },
        commandsResponse: {
            logNotification: {
                ID: 0,
                parameters: [
                    { name: 'timestamp', type: dataType_1.default.uint32 },
                    { name: 'logid', type: dataType_1.default.uint32 },
                    { name: 'loglength', type: dataType_1.default.uint32 },
                    { name: 'logpayload', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            logRsp: {
                ID: 1,
                parameters: [
                    { name: 'timestamp', type: dataType_1.default.uint32 },
                    { name: 'logid', type: dataType_1.default.uint32 },
                    { name: 'loglength', type: dataType_1.default.uint32 },
                    { name: 'logpayload', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            logQueueRsp: {
                ID: 2,
                parameters: [
                    { name: 'logqueuesize', type: dataType_1.default.uint8 },
                    { name: 'logid', type: buffaloZclDataType_1.default.LIST_UINT32 },
                ],
            },
            statisticsAvailable: {
                ID: 3,
                parameters: [
                    { name: 'logqueuesize', type: dataType_1.default.uint8 },
                    { name: 'logid', type: buffaloZclDataType_1.default.LIST_UINT32 },
                ],
            },
        },
    },
    haElectricalMeasurement: {
        ID: 2820,
        attributes: {
            measurementType: { ID: 0, type: dataType_1.default.bitmap32 },
            dcVoltage: { ID: 256, type: dataType_1.default.int16 },
            dcVoltageMin: { ID: 257, type: dataType_1.default.int16 },
            dcvoltagemax: { ID: 258, type: dataType_1.default.int16 },
            dcCurrent: { ID: 259, type: dataType_1.default.int16 },
            dcCurrentMin: { ID: 260, type: dataType_1.default.int16 },
            dcCurrentMax: { ID: 261, type: dataType_1.default.int16 },
            dcPower: { ID: 262, type: dataType_1.default.int16 },
            dcPowerMin: { ID: 263, type: dataType_1.default.int16 },
            dcPowerMax: { ID: 264, type: dataType_1.default.int16 },
            dcVoltageMultiplier: { ID: 512, type: dataType_1.default.uint16 },
            dcVoltageDivisor: { ID: 513, type: dataType_1.default.uint16 },
            dcCurrentMultiplier: { ID: 514, type: dataType_1.default.uint16 },
            dcCurrentDivisor: { ID: 515, type: dataType_1.default.uint16 },
            dcPowerMultiplier: { ID: 516, type: dataType_1.default.uint16 },
            dcPowerDivisor: { ID: 517, type: dataType_1.default.uint16 },
            acFrequency: { ID: 768, type: dataType_1.default.uint16 },
            acFrequencyMin: { ID: 769, type: dataType_1.default.uint16 },
            acFrequencyMax: { ID: 770, type: dataType_1.default.uint16 },
            neutralCurrent: { ID: 771, type: dataType_1.default.uint16 },
            totalActivePower: { ID: 772, type: dataType_1.default.int32 },
            totalReactivePower: { ID: 773, type: dataType_1.default.int32 },
            totalApparentPower: { ID: 774, type: dataType_1.default.uint32 },
            meas1stHarmonicCurrent: { ID: 775, type: dataType_1.default.int16 },
            meas3rdHarmonicCurrent: { ID: 776, type: dataType_1.default.int16 },
            meas5thHarmonicCurrent: { ID: 777, type: dataType_1.default.int16 },
            meas7thHarmonicCurrent: { ID: 778, type: dataType_1.default.int16 },
            meas9thHarmonicCurrent: { ID: 779, type: dataType_1.default.int16 },
            meas11thHarmonicCurrent: { ID: 780, type: dataType_1.default.int16 },
            measPhase1stHarmonicCurrent: { ID: 781, type: dataType_1.default.int16 },
            measPhase3rdHarmonicCurrent: { ID: 782, type: dataType_1.default.int16 },
            measPhase5thHarmonicCurrent: { ID: 783, type: dataType_1.default.int16 },
            measPhase7thHarmonicCurrent: { ID: 784, type: dataType_1.default.int16 },
            measPhase9thHarmonicCurrent: { ID: 785, type: dataType_1.default.int16 },
            measPhase11thHarmonicCurrent: { ID: 786, type: dataType_1.default.int16 },
            acFrequencyMultiplier: { ID: 1024, type: dataType_1.default.uint16 },
            acFrequencyDivisor: { ID: 1025, type: dataType_1.default.uint16 },
            powerMultiplier: { ID: 1026, type: dataType_1.default.uint32 },
            powerDivisor: { ID: 1027, type: dataType_1.default.uint32 },
            harmonicCurrentMultiplier: { ID: 1028, type: dataType_1.default.int8 },
            phaseHarmonicCurrentMultiplier: { ID: 1029, type: dataType_1.default.int8 },
            instantaneousVoltage: { ID: 1280, type: dataType_1.default.int16 },
            instantaneousLineCurrent: { ID: 1281, type: dataType_1.default.uint16 },
            instantaneousActiveCurrent: { ID: 1282, type: dataType_1.default.int16 },
            instantaneousReactiveCurrent: { ID: 1283, type: dataType_1.default.int16 },
            instantaneousPower: { ID: 1284, type: dataType_1.default.int16 },
            rmsVoltage: { ID: 1285, type: dataType_1.default.uint16 },
            rmsVoltageMin: { ID: 1286, type: dataType_1.default.uint16 },
            rmsVoltageMax: { ID: 1287, type: dataType_1.default.uint16 },
            rmsCurrent: { ID: 1288, type: dataType_1.default.uint16 },
            rmsCurrentMin: { ID: 1289, type: dataType_1.default.uint16 },
            rmsCurrentMax: { ID: 1290, type: dataType_1.default.uint16 },
            activePower: { ID: 1291, type: dataType_1.default.int16 },
            activePowerMin: { ID: 1292, type: dataType_1.default.int16 },
            activePowerMax: { ID: 1293, type: dataType_1.default.int16 },
            reactivePower: { ID: 1294, type: dataType_1.default.int16 },
            apparentPower: { ID: 1295, type: dataType_1.default.uint16 },
            powerFactor: { ID: 1296, type: dataType_1.default.int8 },
            averageRmsVoltageMeasPeriod: { ID: 1297, type: dataType_1.default.uint16 },
            averageRmsOverVoltageCounter: { ID: 1298, type: dataType_1.default.uint16 },
            averageRmsUnderVoltageCounter: { ID: 1299, type: dataType_1.default.uint16 },
            rmsExtremeOverVoltagePeriod: { ID: 1300, type: dataType_1.default.uint16 },
            rmsExtremeUnderVoltagePeriod: { ID: 1301, type: dataType_1.default.uint16 },
            rmsVoltageSagPeriod: { ID: 1302, type: dataType_1.default.uint16 },
            rmsVoltageSwellPeriod: { ID: 1303, type: dataType_1.default.uint16 },
            acVoltageMultiplier: { ID: 1536, type: dataType_1.default.uint16 },
            acVoltageDivisor: { ID: 1537, type: dataType_1.default.uint16 },
            acCurrentMultiplier: { ID: 1538, type: dataType_1.default.uint16 },
            acCurrentDivisor: { ID: 1539, type: dataType_1.default.uint16 },
            acPowerMultiplier: { ID: 1540, type: dataType_1.default.uint16 },
            acPowerDivisor: { ID: 1541, type: dataType_1.default.uint16 },
            dcOverloadAlarmsMask: { ID: 1792, type: dataType_1.default.bitmap8 },
            dcVoltageOverload: { ID: 1793, type: dataType_1.default.int16 },
            dcCurrentOverload: { ID: 1794, type: dataType_1.default.int16 },
            acAlarmsMask: { ID: 2048, type: dataType_1.default.bitmap16 },
            acVoltageOverload: { ID: 2049, type: dataType_1.default.int16 },
            acCurrentOverload: { ID: 2050, type: dataType_1.default.int16 },
            acActivePowerOverload: { ID: 2051, type: dataType_1.default.int16 },
            acReactivePowerOverload: { ID: 2052, type: dataType_1.default.int16 },
            averageRmsOverVoltage: { ID: 2053, type: dataType_1.default.int16 },
            averageRmsUnderVoltage: { ID: 2054, type: dataType_1.default.int16 },
            rmsExtremeOverVoltage: { ID: 2055, type: dataType_1.default.int16 },
            rmsExtremeUnderVoltage: { ID: 2056, type: dataType_1.default.int16 },
            rmsVoltageSag: { ID: 2057, type: dataType_1.default.int16 },
            rmsVoltageSwell: { ID: 2058, type: dataType_1.default.int16 },
            lineCurrentPhB: { ID: 2305, type: dataType_1.default.uint16 },
            activeCurrentPhB: { ID: 2306, type: dataType_1.default.int16 },
            reactiveCurrentPhB: { ID: 2307, type: dataType_1.default.int16 },
            rmsVoltagePhB: { ID: 2309, type: dataType_1.default.uint16 },
            rmsVoltageMinPhB: { ID: 2310, type: dataType_1.default.uint16 },
            rmsVoltageMaxPhB: { ID: 2311, type: dataType_1.default.uint16 },
            rmsCurrentPhB: { ID: 2312, type: dataType_1.default.uint16 },
            rmsCurrentMinPhB: { ID: 2313, type: dataType_1.default.uint16 },
            rmsCurrentMaxPhB: { ID: 2314, type: dataType_1.default.uint16 },
            activePowerPhB: { ID: 2315, type: dataType_1.default.int16 },
            activePowerMinPhB: { ID: 2316, type: dataType_1.default.int16 },
            activePowerMaxPhB: { ID: 2317, type: dataType_1.default.int16 },
            reactivePowerPhB: { ID: 2318, type: dataType_1.default.int16 },
            apparentPowerPhB: { ID: 2319, type: dataType_1.default.uint16 },
            powerFactorPhB: { ID: 2320, type: dataType_1.default.int8 },
            averageRmsVoltageMeasurePeriodPhB: { ID: 2321, type: dataType_1.default.uint16 },
            averageRmsOverVoltageCounterPhB: { ID: 2322, type: dataType_1.default.uint16 },
            averageUnderVoltageCounterPhB: { ID: 2323, type: dataType_1.default.uint16 },
            rmsExtremeOverVoltagePeriodPhB: { ID: 2324, type: dataType_1.default.uint16 },
            rmsExtremeUnderVoltagePeriodPhB: { ID: 2325, type: dataType_1.default.uint16 },
            rmsVoltageSagPeriodPhB: { ID: 2326, type: dataType_1.default.uint16 },
            rmsVoltageSwellPeriodPhB: { ID: 2327, type: dataType_1.default.uint16 },
            lineCurrentPhC: { ID: 2561, type: dataType_1.default.uint16 },
            activeCurrentPhC: { ID: 2562, type: dataType_1.default.int16 },
            reactiveCurrentPhC: { ID: 2563, type: dataType_1.default.int16 },
            rmsVoltagePhC: { ID: 2565, type: dataType_1.default.uint16 },
            rmsVoltageMinPhC: { ID: 2566, type: dataType_1.default.uint16 },
            rmsVoltageMaxPhC: { ID: 2567, type: dataType_1.default.uint16 },
            rmsCurrentPhC: { ID: 2568, type: dataType_1.default.uint16 },
            rmsCurrentMinPhC: { ID: 2569, type: dataType_1.default.uint16 },
            rmsCurrentMaxPhC: { ID: 2570, type: dataType_1.default.uint16 },
            activePowerPhC: { ID: 2571, type: dataType_1.default.int16 },
            activePowerMinPhC: { ID: 2572, type: dataType_1.default.int16 },
            activePowerMaxPhC: { ID: 2573, type: dataType_1.default.int16 },
            reactivePowerPhC: { ID: 2574, type: dataType_1.default.int16 },
            apparentPowerPhC: { ID: 2575, type: dataType_1.default.uint16 },
            powerFactorPhC: { ID: 2576, type: dataType_1.default.int8 },
            averageRmsVoltageMeasPeriodPhC: { ID: 2577, type: dataType_1.default.uint16 },
            averageRmsOverVoltageCounterPhC: { ID: 2578, type: dataType_1.default.uint16 },
            averageUnderVoltageCounterPhC: { ID: 2579, type: dataType_1.default.uint16 },
            rmsExtremeOverVoltagePeriodPhC: { ID: 2580, type: dataType_1.default.uint16 },
            rmsExtremeUnderVoltagePeriodPhC: { ID: 2581, type: dataType_1.default.uint16 },
            rmsVoltageSagPeriodPhC: { ID: 2582, type: dataType_1.default.uint16 },
            rmsVoltageSwellPeriodPhC: { ID: 2583, type: dataType_1.default.uint16 },
            schneiderActivePowerDemandTotal: { ID: 0x4300, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactivePowerDemandTotal: { ID: 0x4303, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentPowerDemandTotal: { ID: 0x4318, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalDuration: { ID: 0x4319, type: dataType_1.default.uint24, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandDateTime: { ID: 0x4320, type: dataType_1.default.utc, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActivePowerDemandPhase1: { ID: 0x4509, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactivePowerDemandPhase1: { ID: 0x450A, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentPowerDemandPhase1: { ID: 0x450B, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalMinimalVoltageL1: { ID: 0x4510, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalMaximalCurrentI1: { ID: 0x4513, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActivePowerDemandPhase2: { ID: 0x4909, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactivePowerDemandPhase2: { ID: 0x490A, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentPowerDemandPhase2: { ID: 0x490B, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalMinimalVoltageL2: { ID: 0x4910, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalMaximalCurrentI2: { ID: 0x4913, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderActivePowerDemandPhase3: { ID: 0x4A09, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderReactivePowerDemandPhase3: { ID: 0x4A0A, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderApparentPowerDemandPhase3: { ID: 0x4A0B, type: dataType_1.default.int32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalMinimalVoltageL3: { ID: 0x4A10, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDemandIntervalMaximalCurrentI3: { ID: 0x4A13, type: dataType_1.default.uint16, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderCurrentSensorMultiplier: { ID: 0x4E00, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
        },
        commands: {
            getProfileInfo: {
                ID: 0,
                parameters: [],
            },
            getMeasurementProfile: {
                ID: 1,
                parameters: [
                    { name: 'attrId', type: dataType_1.default.uint16 },
                    { name: 'starttime', type: dataType_1.default.uint32 },
                    { name: 'numofuntervals', type: dataType_1.default.uint8 },
                ],
            },
        },
        commandsResponse: {
            getProfileInfoRsp: {
                ID: 0,
                parameters: [
                    { name: 'profilecount', type: dataType_1.default.uint8 },
                    { name: 'profileintervalperiod', type: dataType_1.default.uint8 },
                    { name: 'maxnumofintervals', type: dataType_1.default.uint8 },
                    { name: 'numofattrs', type: dataType_1.default.uint8 },
                    { name: 'listofattr', type: buffaloZclDataType_1.default.LIST_UINT16 },
                ],
            },
            getMeasurementProfileRsp: {
                ID: 1,
                parameters: [
                    { name: 'starttime', type: dataType_1.default.uint32 },
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'profileintervalperiod', type: dataType_1.default.uint8 },
                    { name: 'numofintervalsdeliv', type: dataType_1.default.uint8 },
                    { name: 'attrId', type: dataType_1.default.uint16 },
                    { name: 'intervals', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
        },
    },
    haDiagnostic: {
        ID: 2821,
        attributes: {
            numberOfResets: { ID: 0, type: dataType_1.default.uint16 },
            persistentMemoryWrites: { ID: 1, type: dataType_1.default.uint16 },
            macRxBcast: { ID: 256, type: dataType_1.default.uint32 },
            macTxBcast: { ID: 257, type: dataType_1.default.uint32 },
            macRxUcast: { ID: 258, type: dataType_1.default.uint32 },
            macTxUcast: { ID: 259, type: dataType_1.default.uint32 },
            macTxUcastRetry: { ID: 260, type: dataType_1.default.uint16 },
            macTxUcastFail: { ID: 261, type: dataType_1.default.uint16 },
            aPSRxBcast: { ID: 262, type: dataType_1.default.uint16 },
            aPSTxBcast: { ID: 263, type: dataType_1.default.uint16 },
            aPSRxUcast: { ID: 264, type: dataType_1.default.uint16 },
            aPSTxUcastSuccess: { ID: 265, type: dataType_1.default.uint16 },
            aPSTxUcastRetry: { ID: 266, type: dataType_1.default.uint16 },
            aPSTxUcastFail: { ID: 267, type: dataType_1.default.uint16 },
            routeDiscInitiated: { ID: 268, type: dataType_1.default.uint16 },
            neighborAdded: { ID: 269, type: dataType_1.default.uint16 },
            neighborRemoved: { ID: 270, type: dataType_1.default.uint16 },
            neighborStale: { ID: 271, type: dataType_1.default.uint16 },
            joinIndication: { ID: 272, type: dataType_1.default.uint16 },
            childMoved: { ID: 273, type: dataType_1.default.uint16 },
            nwkFcFailure: { ID: 274, type: dataType_1.default.uint16 },
            apsFcFailure: { ID: 275, type: dataType_1.default.uint16 },
            apsUnauthorizedKey: { ID: 276, type: dataType_1.default.uint16 },
            nwkDecryptFailures: { ID: 277, type: dataType_1.default.uint16 },
            apsDecryptFailures: { ID: 278, type: dataType_1.default.uint16 },
            packetBufferAllocateFailures: { ID: 279, type: dataType_1.default.uint16 },
            relayedUcast: { ID: 280, type: dataType_1.default.uint16 },
            phyToMacQueueLimitReached: { ID: 281, type: dataType_1.default.uint16 },
            packetValidateDropCount: { ID: 282, type: dataType_1.default.uint16 },
            averageMacRetryPerApsMessageSent: { ID: 283, type: dataType_1.default.uint16 },
            lastMessageLqi: { ID: 284, type: dataType_1.default.uint8 },
            lastMessageRssi: { ID: 285, type: dataType_1.default.int8 },
            danfossSystemStatusCode: { ID: 0x4000, type: dataType_1.default.bitmap16, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossSystemStatusWater: { ID: 0x4200, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            danfossMultimasterRole: { ID: 0x4201, type: dataType_1.default.enum8, manufacturerCode: manufacturerCode_1.default.DANFOSS },
            schneiderMeterStatus: { ID: 0xFF01, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderDiagnosticRegister1: { ID: 0xFF02, type: dataType_1.default.uint32, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
            schneiderCommunicationQuality: { ID: 0x4000, type: dataType_1.default.uint8, manufacturerCode: manufacturerCode_1.default.SCHNEIDER },
        },
        commands: {},
        commandsResponse: {},
    },
    touchlink: {
        ID: 4096,
        attributes: {},
        commands: {
            scanRequest: {
                ID: 0,
                response: 1,
                parameters: [
                    { name: 'transactionID', type: dataType_1.default.uint32 },
                    { name: 'zigbeeInformation', type: dataType_1.default.bitmap8 },
                    { name: 'touchlinkInformation', type: dataType_1.default.bitmap8 },
                ],
            },
            identifyRequest: {
                ID: 6,
                parameters: [
                    { name: 'transactionID', type: dataType_1.default.uint32 },
                    { name: 'duration', type: dataType_1.default.uint16 },
                ],
            },
            resetToFactoryNew: {
                ID: 7,
                parameters: [
                    { name: 'transactionID', type: dataType_1.default.uint32 },
                ],
            },
        },
        commandsResponse: {
            scanResponse: {
                ID: 1,
                parameters: [
                    { name: 'transactionID', type: dataType_1.default.uint32 },
                    { name: 'rssiCorrection', type: dataType_1.default.uint8 },
                    { name: 'zigbeeInformation', type: dataType_1.default.uint8 },
                    { name: 'touchlinkInformation', type: dataType_1.default.uint8 },
                    { name: 'keyBitmask', type: dataType_1.default.uint16 },
                    { name: 'responseID', type: dataType_1.default.uint32 },
                    { name: 'extendedPanID', type: dataType_1.default.ieeeAddr },
                    { name: 'networkUpdateID', type: dataType_1.default.uint8 },
                    { name: 'logicalChannel', type: dataType_1.default.uint8 },
                    { name: 'panID', type: dataType_1.default.uint16 },
                    { name: 'networkAddress', type: dataType_1.default.uint16 },
                    { name: 'numberOfSubDevices', type: dataType_1.default.uint8 },
                    { name: 'totalGroupIdentifiers', type: dataType_1.default.uint8 },
                    // Below are optional according to the spec, not all devices send these.
                    // e.g. https://github.com/Koenkk/zigbee2mqtt/issues/8535#issuecomment-909199162
                    // Since we don't have a way to deal with optional attributes yet and since we don't
                    // use these attributes anyway, disable them for now.
                    // {name: 'endpointID', type: DataType.uint8},
                    // {name: 'profileID', type: DataType.uint16},
                    // {name: 'deviceID', type: DataType.uint16},
                    // {name: 'version', type: DataType.uint8},
                    // {name: 'groupIdentifierCount', type: DataType.uint8},
                ],
            },
        },
    },
    manuSpecificIkeaAirPurifier: {
        ID: 0xfc7d,
        manufacturerCode: manufacturerCode_1.default.IKEA_OF_SWEDEN,
        attributes: {
            filterRunTime: { ID: 0x0000, type: dataType_1.default.uint32 },
            replaceFilter: { ID: 0x0001, type: dataType_1.default.uint8 },
            filterLifeTime: { ID: 0x0002, type: dataType_1.default.uint32 },
            controlPanelLight: { ID: 0x0003, type: dataType_1.default.boolean },
            particulateMatter25Measurement: { ID: 0x0004, type: dataType_1.default.uint16 },
            childLock: { ID: 0x0005, type: dataType_1.default.boolean },
            fanMode: { ID: 0x0006, type: dataType_1.default.uint8 },
            fanSpeed: { ID: 0x0007, type: dataType_1.default.uint8 },
            deviceRunTime: { ID: 0x0008, type: dataType_1.default.uint32 },
        },
        commands: {},
        commandsResponse: {},
    },
    msIkeaVocIndexMeasurement: {
        ID: 0xfc7e,
        manufacturerCode: manufacturerCode_1.default.IKEA_OF_SWEDEN,
        attributes: {
            measuredValue: { ID: 0x0000, type: dataType_1.default.singlePrec },
            measuredMinValue: { ID: 0x0001, type: dataType_1.default.singlePrec },
            measuredMaxValue: { ID: 0x0002, type: dataType_1.default.singlePrec },
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificClusterAduroSmart: {
        ID: 64716,
        attributes: {},
        commands: {
            cmd0: {
                ID: 0,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    manuSpecificOsram: {
        ID: 64527,
        attributes: {},
        commands: {
            saveStartupParams: {
                ID: 1,
                parameters: [],
            },
            resetStartupParams: {
                ID: 2,
                parameters: [],
            },
        },
        commandsResponse: {
            saveStartupParamsRsp: {
                ID: 0,
                parameters: [],
            },
        },
    },
    manuSpecificPhilips: {
        ID: 0xFC00,
        manufacturerCode: manufacturerCode_1.default.PHILIPS,
        attributes: {
            config: { ID: 49, type: dataType_1.default.bitmap16 },
        },
        commands: {},
        commandsResponse: {
            hueNotification: {
                ID: 0,
                parameters: [
                    { name: 'button', type: dataType_1.default.uint8 },
                    { name: 'unknown1', type: dataType_1.default.uint24 },
                    { name: 'type', type: dataType_1.default.uint8 },
                    { name: 'unknown2', type: dataType_1.default.uint8 },
                    { name: 'time', type: dataType_1.default.uint8 },
                    { name: 'unknown2', type: dataType_1.default.uint8 },
                ],
            },
        },
    },
    manuSpecificPhilips2: {
        ID: 0xFC03,
        manufacturerCode: manufacturerCode_1.default.PHILIPS,
        attributes: {
            state: { ID: 0x0002, type: dataType_1.default.octetStr },
        },
        commands: {
            multiColor: {
                ID: 0,
                parameters: [
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
        },
        commandsResponse: {},
    },
    manuSpecificSinope: {
        ID: 65281,
        manufacturerCode: manufacturerCode_1.default.Sinope,
        attributes: {
            // attribute ID :1's readable
            keypadLockout: { ID: 2, type: dataType_1.default.enum8 },
            // 'firmware number': {ID: 3, type: DataType.unknown},
            firmwareVersion: { ID: 4, type: dataType_1.default.charStr },
            outdoorTempToDisplay: { ID: 16, type: dataType_1.default.int16 },
            outdoorTempToDisplayTimeout: { ID: 17, type: dataType_1.default.uint16 },
            secondScreenBehavior: { ID: 18, type: dataType_1.default.enum8 },
            currentTimeToDisplay: { ID: 32, type: dataType_1.default.uint32 },
            ledIntensityOn: { ID: 82, type: dataType_1.default.uint8 },
            ledIntensityOff: { ID: 83, type: dataType_1.default.uint8 },
            ledColorOn: { ID: 80, type: dataType_1.default.uint24 },
            ledColorOff: { ID: 81, type: dataType_1.default.uint24 },
            onLedIntensity: { ID: 82, type: dataType_1.default.uint8 },
            offLedIntensity: { ID: 83, type: dataType_1.default.uint8 },
            actionReport: { ID: 84, type: dataType_1.default.enum8 },
            minimumBrightness: { ID: 85, type: dataType_1.default.uint16 },
            connectedLoadRM: { ID: 96, type: dataType_1.default.uint16 },
            currentLoad: { ID: 112, type: dataType_1.default.bitmap8 },
            ecoMode: { ID: 113, type: dataType_1.default.int8 },
            ecoMode1: { ID: 114, type: dataType_1.default.uint8 },
            ecoMode2: { ID: 115, type: dataType_1.default.uint8 },
            unknown: { ID: 117, type: dataType_1.default.bitmap32 },
            drConfigWaterTempMin: { ID: 118, type: dataType_1.default.uint8 },
            drConfigWaterTempTime: { ID: 119, type: dataType_1.default.uint8 },
            drWTTimeOn: { ID: 120, type: dataType_1.default.uint16 },
            unknown1: { ID: 128, type: dataType_1.default.uint32 },
            dimmerTimmer: { ID: 160, type: dataType_1.default.uint32 },
            unknown2: { ID: 256, type: dataType_1.default.uint8 },
            floorControlMode: { ID: 261, type: dataType_1.default.enum8 },
            auxOutputMode: { ID: 262, type: dataType_1.default.enum8 },
            ambiantMaxHeatSetpointLimit: { ID: 264, type: dataType_1.default.int16 },
            floorMinHeatSetpointLimit: { ID: 265, type: dataType_1.default.int16 },
            floorMaxHeatSetpointLimit: { ID: 266, type: dataType_1.default.int16 },
            temperatureSensor: { ID: 267, type: dataType_1.default.enum8 },
            floorLimitStatus: { ID: 268, type: dataType_1.default.enum8 },
            timeFormatToDisplay: { ID: 276, type: dataType_1.default.enum8 },
            GFCiStatus: { ID: 277, type: dataType_1.default.enum8 },
            auxConnectedLoad: { ID: 280, type: dataType_1.default.uint16 },
            connectedLoad: { ID: 281, type: dataType_1.default.uint16 },
            pumpProtection: { ID: 296, type: dataType_1.default.uint8 },
            unknown3: { ID: 298, type: dataType_1.default.enum8 },
            currentSetpoint: { ID: 299, type: dataType_1.default.int16 },
            // attribute ID: 300's readable, returns a buffer
            reportLocalTemperature: { ID: 301, type: dataType_1.default.int16 },
            // attribute ID: 512's readable 
            coldLoadPickupStatus: { ID: 643, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificUbisysDeviceSetup: {
        ID: 0xfc00,
        // Doesn't use manufacturerCode: https://github.com/Koenkk/zigbee-herdsman-converters/pull/4412
        attributes: {
            inputConfigurations: { ID: 0x0000, type: dataType_1.default.array },
            inputActions: { ID: 0x0001, type: dataType_1.default.array },
        },
        commands: {},
        commandsResponse: {}
    },
    manuSpecificUbisysDimmerSetup: {
        ID: 0xfc01,
        manufacturerCode: manufacturerCode_1.default.Ubisys,
        attributes: {
            capabilities: { ID: 0x0000, type: dataType_1.default.bitmap8 },
            status: { ID: 0x0001, type: dataType_1.default.bitmap8 },
            mode: { ID: 0x0002, type: dataType_1.default.bitmap8 },
        },
        commands: {},
        commandsResponse: {}
    },
    manuSpecificUbisysHeatingRegulatorThermostat: {
        ID: 0x0201,
        manufacturerCode: manufacturerCode_1.default.Ubisys,
        attributes: {
            classBTemperatureOffset: { ID: 0x0000, type: dataType_1.default.int8 },
            returnFlowTemperatureWeight: { ID: 0x0001, type: dataType_1.default.int8 },
            rawOutdoorTemperature: { ID: 0x0002, type: dataType_1.default.struct },
            rawLocalTemperatureA: { ID: 0x0003, type: dataType_1.default.struct },
            rawLocalTemperatureB: { ID: 0x0004, type: dataType_1.default.struct },
            rawForwardFlowTemperature: { ID: 0x0005, type: dataType_1.default.struct },
            rawReturnFlowTemperature: { ID: 0x0006, type: dataType_1.default.struct },
            installedExtensions: { ID: 0x0007, type: dataType_1.default.bitmap64 },
        },
        commands: {},
        commandsResponse: {}
    },
    manuSpecificUbisysHeatingRegulatorLevelCtrl: {
        ID: 8,
        manufacturerCode: manufacturerCode_1.default.Ubisys,
        attributes: {
            valveType: { ID: 0x0000, type: dataType_1.default.bitmap8 },
            cyclePeriod: { ID: 0x0001, type: dataType_1.default.uint8 },
            season: { ID: 0x0002, type: dataType_1.default.enum8 },
            backupLevel: { ID: 0x0003, type: dataType_1.default.uint8 },
            alternateBackupLevel: { ID: 0x0004, type: dataType_1.default.uint8 },
            lowerRange: { ID: 0x0005, type: dataType_1.default.uint8 },
            upperRange: { ID: 0x0006, type: dataType_1.default.uint8 },
            pumpThresholdOn: { ID: 0x0007, type: dataType_1.default.uint8 },
            pumpThresholdOff: { ID: 0x0008, type: dataType_1.default.uint8 },
            heatingDemandEnableThreshold: { ID: 0x0009, type: dataType_1.default.uint8 },
            heatingDemandDisableThreshold: { ID: 0x000A, type: dataType_1.default.uint8 },
            coolingDemandEnableThreshold: { ID: 0x000B, type: dataType_1.default.uint8 },
            coolingDemandDisableThreshold: { ID: 0x000C, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {}
    },
    manuSpecificLegrandDevices: {
        ID: 0xfc01,
        manufacturerCode: manufacturerCode_1.default.LegrandNetatmo,
        attributes: {
        // attributes seems to vary depending on the device. Can't be static
        },
        commands: {},
        commandsResponse: {}
    },
    manuSpecificLegrandDevices2: {
        ID: 0xfc40,
        manufacturerCode: manufacturerCode_1.default.LegrandNetatmo,
        attributes: {},
        commands: {
            command0: {
                ID: 0,
                parameters: [
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
        },
        commandsResponse: {}
    },
    manuSpecificLegrandDevices3: {
        ID: 0xfc41,
        manufacturerCode: manufacturerCode_1.default.LegrandNetatmo,
        attributes: {},
        commands: {
            command0: {
                ID: 0,
                parameters: [
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
        },
        commandsResponse: {}
    },
    manuSpecificNiko1: {
        ID: 0xfc00,
        manufacturerCode: manufacturerCode_1.default.NIKO_NV,
        attributes: {
            /* WARNING: 0x0000 has different datatypes!
             *          enum8 (switch) vs. bitmap8 (outlet)
             *          unknown usage/function on outlet
             */
            switchOperationMode: { ID: 0x0000, type: dataType_1.default.enum8 },
            outletLedColor: { ID: 0x0100, type: dataType_1.default.uint24 },
            outletChildLock: { ID: 0x0101, type: dataType_1.default.uint8 },
            outletLedState: { ID: 0x0104, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {}
    },
    manuSpecificNiko2: {
        ID: 0xfc01,
        manufacturerCode: manufacturerCode_1.default.NIKO_NV,
        attributes: {
            switchAction: { ID: 0x0002, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {}
    },
    wiserDeviceInfo: {
        ID: 0xFE03,
        attributes: {
            deviceInfo: { ID: 32, type: dataType_1.default.charStr },
        },
        commands: {},
        commandsResponse: {}
    },
    /**
     * Tuya cluster
     *
     * Common parameters:
     *
     *  seq -  Sequence number of transmitted data, range 0-65535, revert to 0 after reaching 65535
     *
     * Official Tuya documentation: https://developer.tuya.com/en/docs/iot-device-dev/tuya-zigbee-universal-docking-access-standard?id=K9ik6zvofpzql#subtitle-6-Private%20cluster
     *
     */
    manuSpecificTuya: {
        ID: 0xEF00,
        attributes: {},
        commands: {
            /**
             * Gateway-side data request
             */
            dataRequest: {
                ID: 0,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'dpValues', type: buffaloZclDataType_1.default.LIST_TUYA_DATAPOINT_VALUES },
                ],
            },
            /**
             * GW send, trigger MCU side to report all current information, no zcl payload.
             * Note: Device side can make a policy, data better not to report centrally
             */
            dataQuery: {
                ID: 3,
                parameters: [],
            },
            /**
             * Gw->Zigbee gateway query MCU version
             */
            mcuVersionRequest: {
                ID: 0x10,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                ],
            },
            /**
             * FIXME: This command is not listed in Tuya zigbee cluster description,
             *  but there is some command 0x04 (description is: Command Issuance)
             *  in `Serial command list` section of the same document
             *  So, need to investigate more information about it
             */
            sendData: {
                ID: 4,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'dpValues', type: buffaloZclDataType_1.default.LIST_TUYA_DATAPOINT_VALUES },
                ],
            },
            /**
             * Gw->Zigbee gateway notifies MCU of upgrade
             */
            mcuOtaNotify: {
                ID: 0x12,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    // FIXME: key is fixed (8 byte) uint8 array
                    //  Ask Koen is there any type to read fixed size uint_8t.
                    //  currently there is `length` property in options but sems it is
                    //  ignored in `writePayloadCluster()` and other methods.
                    //  So, as workaround we use hi/low for key, which is not best solution
                    { name: 'key_hi', type: dataType_1.default.uint32 },
                    { name: 'key_lo', type: dataType_1.default.uint32 },
                    { name: 'version', type: dataType_1.default.uint8 },
                    { name: 'imageSize', type: dataType_1.default.uint32 },
                    { name: 'crc', type: dataType_1.default.uint32 },
                ],
            },
            /**
             * Gw->Zigbee gateway returns the requested upgrade package for MCU
             */
            mcuOtaBlockDataResponse: {
                ID: 0x14,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'key_hi', type: dataType_1.default.uint32 },
                    { name: 'key_lo', type: dataType_1.default.uint32 },
                    { name: 'version', type: dataType_1.default.uint8 },
                    { name: 'offset', type: dataType_1.default.uint32 },
                    { name: 'imageData', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
            /**
             * Time synchronization (bidirectional)
             */
            mcuSyncTime: {
                ID: 0x24,
                parameters: [
                    { name: 'payloadSize', type: dataType_1.default.uint16 },
                    { name: 'payload', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ]
            },
            /**
             * Gateway connection status (bidirectional)
             */
            mcuGatewayConnectionStatus: {
                ID: 0x25,
                parameters: [
                    { name: 'payloadSize', type: dataType_1.default.uint16 },
                    { name: 'payload', type: dataType_1.default.uint8 },
                ]
            }
        },
        commandsResponse: {
            /**
             * Reply to MCU-side data request
             */
            dataResponse: {
                ID: 1,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'dpValues', type: buffaloZclDataType_1.default.LIST_TUYA_DATAPOINT_VALUES },
                ],
            },
            /**
             * MCU-side data active upload (bidirectional)
             */
            dataReport: {
                ID: 2,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'dpValues', type: buffaloZclDataType_1.default.LIST_TUYA_DATAPOINT_VALUES },
                ],
            },
            /**
             * FIXME: This command is not listed in Tuya zigbee cluster description,
             *  but there is some command 0x05 (description is: Status query)
             *  in `Serial command list` section of the same document
             *  So, need to investigate more information about it
             */
            activeStatusReportAlt: {
                ID: 5,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'dpValues', type: buffaloZclDataType_1.default.LIST_TUYA_DATAPOINT_VALUES },
                ],
            },
            /**
             * FIXME: This command is not listed in Tuya zigbee cluster description,
             *  but there is some command 0x06 (description is: Status query)
             *  in `Serial command list` section of the same document
             *  So, need to investigate more information about it
             */
            activeStatusReport: {
                ID: 6,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'dpValues', type: buffaloZclDataType_1.default.LIST_TUYA_DATAPOINT_VALUES },
                ],
            },
            /**
             * Zigbee->Gw MCU return version or actively report version
             */
            mcuVersionResponse: {
                ID: 0x11,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'version', type: dataType_1.default.uint8 },
                ],
            },
            /**
             * Zigbee->Gw requests an upgrade package for the MCU
             */
            mcuOtaBlockDataRequest: {
                ID: 0x13,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'key_hi', type: dataType_1.default.uint32 },
                    { name: 'key_lo', type: dataType_1.default.uint32 },
                    { name: 'version', type: dataType_1.default.uint8 },
                    { name: 'offset', type: dataType_1.default.uint32 },
                    { name: 'size', type: dataType_1.default.uint32 },
                ],
            },
            /**
             * Zigbee->Gw returns the upgrade result for the mcu
             */
            mcuOtaResult: {
                ID: 0x15,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'status', type: dataType_1.default.uint8 },
                    { name: 'key_hi', type: dataType_1.default.uint32 },
                    { name: 'key_lo', type: dataType_1.default.uint32 },
                    { name: 'version', type: dataType_1.default.uint8 },
                ],
            },
            /**
             * Time synchronization (bidirectional)
             */
            mcuSyncTime: {
                ID: 0x24,
                parameters: [
                    { name: 'payloadSize', type: dataType_1.default.uint16 }
                ]
            },
            /**
             * Gateway connection status (bidirectional)
             */
            mcuGatewayConnectionStatus: {
                ID: 0x25,
                parameters: [
                    { name: 'payloadSize', type: dataType_1.default.uint16 }
                ]
            }
        },
    },
    aqaraOpple: {
        ID: 0xFCC0,
        manufacturerCode: manufacturerCode_1.default.LUMI_UNITED_TECH,
        attributes: {
            mode: { ID: 9, type: dataType_1.default.uint8 },
            illuminance: { ID: 0x0112, type: dataType_1.default.uint32 }
        },
        commands: {},
        commandsResponse: {}
    },
    liXeePrivate: {
        ID: 0xFF66,
        manufacturerCode: manufacturerCode_1.default.JENNIC,
        attributes: {
            currentTarif: { ID: 0x0000, type: dataType_1.default.charStr },
            tomorrowColor: { ID: 0x0001, type: dataType_1.default.charStr },
            scheduleHPHC: { ID: 0x0002, type: dataType_1.default.uint8 },
            presencePotential: { ID: 0x0003, type: dataType_1.default.uint8 },
            startNoticeEJP: { ID: 0x0004, type: dataType_1.default.uint8 },
            warnDPS: { ID: 0x0005, type: dataType_1.default.uint16 },
            warnDIR1: { ID: 0x0006, type: dataType_1.default.uint16 },
            warnDIR2: { ID: 0x0007, type: dataType_1.default.uint16 },
            warnDIR3: { ID: 0x0008, type: dataType_1.default.uint16 },
            currentPrice: { ID: 0x0200, type: dataType_1.default.charStr },
            currentIndexTarif: { ID: 0x0201, type: dataType_1.default.uint8 },
            currentDate: { ID: 0x0202, type: dataType_1.default.charStr },
            activeEnerfyOutD01: { ID: 0x0203, type: dataType_1.default.uint32 },
            activeEnerfyOutD02: { ID: 0x0204, type: dataType_1.default.uint32 },
            activeEnerfyOutD03: { ID: 0x0205, type: dataType_1.default.uint32 },
            activeEnerfyOutD04: { ID: 0x0206, type: dataType_1.default.uint32 },
            injectedVA: { ID: 0x0207, type: dataType_1.default.uint16 },
            injectedVAMaxN: { ID: 0x0208, type: dataType_1.default.int16 },
            injectedVAMaxN1: { ID: 0x0209, type: dataType_1.default.int16 },
            injectedActiveLoadN: { ID: 0x0210, type: dataType_1.default.int16 },
            injectedActiveLoadN1: { ID: 0x0211, type: dataType_1.default.int16 },
            drawnVAMaxN1: { ID: 0x0212, type: dataType_1.default.int16 },
            drawnVAMaxN1P2: { ID: 0x0213, type: dataType_1.default.int16 },
            drawnVAMaxN1P3: { ID: 0x0214, type: dataType_1.default.int16 },
            message1: { ID: 0x0215, type: dataType_1.default.charStr },
            message2: { ID: 0x0216, type: dataType_1.default.charStr },
            statusRegister: { ID: 0x0217, type: dataType_1.default.octetStr },
            startMobilePoint1: { ID: 0x0218, type: dataType_1.default.uint8 },
            stopMobilePoint1: { ID: 0x0219, type: dataType_1.default.uint8 },
            startMobilePoint2: { ID: 0x0220, type: dataType_1.default.uint8 },
            stopMobilePoint2: { ID: 0x0221, type: dataType_1.default.uint8 },
            startMobilePoint3: { ID: 0x0222, type: dataType_1.default.uint8 },
            stopMobilePoint3: { ID: 0x0223, type: dataType_1.default.uint8 },
            relais: { ID: 0x0224, type: dataType_1.default.uint16 },
            daysNumberCurrentCalendar: { ID: 0x0225, type: dataType_1.default.uint8 },
            daysNumberNextCalendar: { ID: 0x0226, type: dataType_1.default.uint8 },
            daysProfileCurrentCalendar: { ID: 0x0227, type: dataType_1.default.longOctetStr },
            daysProfileNextCalendar: { ID: 0x0228, type: dataType_1.default.longOctetStr },
            linkyMode: { ID: 0x0300, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificTuya_2: {
        ID: 0xE002,
        attributes: {
            alarm_temperature_max: { ID: 53258, type: dataType_1.default.int16 },
            alarm_temperature_min: { ID: 53259, type: dataType_1.default.int16 },
            alarm_humidity_max: { ID: 53261, type: dataType_1.default.int16 },
            alarm_humidity_min: { ID: 53262, type: dataType_1.default.int16 },
            alarm_humidity: { ID: 53263, type: dataType_1.default.enum8 },
            alarm_temperature: { ID: 53254, type: dataType_1.default.enum8 },
            unknown: { ID: 53264, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificTuya_3: {
        ID: 0xe001,
        attributes: {
            switchType: { ID: 0xd030, type: dataType_1.default.enum8 },
            powerOnBehavior: { ID: 0xd010, type: dataType_1.default.enum8 },
        },
        commands: {
            setOptions1: {
                ID: 0xE5,
                parameters: [
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
            setOptions2: {
                ID: 0xE6,
                parameters: [
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
            setOptions3: {
                ID: 0xE7,
                parameters: [
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
        },
        commandsResponse: {},
    },
    manuSpecificCentraliteHumidity: {
        ID: 0xFC45,
        manufacturerCode: manufacturerCode_1.default.Centralite,
        attributes: {
            measuredValue: { ID: 0, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificSmartThingsArrivalSensor: {
        ID: 0xFC05,
        manufacturerCode: manufacturerCode_1.default.SmartThings,
        attributes: {},
        commands: {},
        commandsResponse: {
            arrivalSensorNotify: {
                ID: 1,
                parameters: [],
            },
        },
    },
    manuSpecificSamsungAccelerometer: {
        ID: 0xFC02,
        manufacturerCode: manufacturerCode_1.default.SmartThings,
        attributes: {
            motion_threshold_multiplier: { ID: 0, type: dataType_1.default.uint8 },
            motion_threshold: { ID: 2, type: dataType_1.default.uint16 },
            acceleration: { ID: 16, type: dataType_1.default.bitmap8 },
            x_axis: { ID: 18, type: dataType_1.default.int16 },
            y_axis: { ID: 19, type: dataType_1.default.int16 },
            z_axis: { ID: 20, type: dataType_1.default.int16 },
        },
        commands: {},
        commandsResponse: {},
    },
    heimanSpecificFormaldehydeMeasurement: {
        // from HS2AQ-3.0海曼智能空气质量检测仪API文档-V01
        ID: 0x042b,
        manufacturerCode: manufacturerCode_1.default.Heiman,
        attributes: {
            measuredValue: { ID: 0x0000, type: dataType_1.default.uint16 },
            measuredMinValue: { ID: 0x0001, type: dataType_1.default.uint16 },
            measuredMaxValue: { ID: 0x0002, type: dataType_1.default.uint16 },
            measuredTolerance: { ID: 0x0003, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    heimanSpecificAirQuality: {
        // from HS2AQ-3.0海曼智能空气质量检测仪API文档-V01
        ID: 0xfc81,
        manufacturerCode: manufacturerCode_1.default.Heiman,
        attributes: {
            language: { ID: 0xf000, type: dataType_1.default.uint8 },
            unitOfMeasure: { ID: 0xf001, type: dataType_1.default.uint8 },
            batteryState: { ID: 0xf002, type: dataType_1.default.uint8 },
            pm10measuredValue: { ID: 0xf003, type: dataType_1.default.uint16 },
            tvocMeasuredValue: { ID: 0xf004, type: dataType_1.default.uint16 },
            aqiMeasuredValue: { ID: 0xf005, type: dataType_1.default.uint16 },
            temperatureMeasuredMax: { ID: 0xf006, type: dataType_1.default.int16 },
            temperatureMeasuredMin: { ID: 0xf007, type: dataType_1.default.int16 },
            humidityMeasuredMax: { ID: 0xf008, type: dataType_1.default.uint16 },
            humidityMeasuredMin: { ID: 0xf009, type: dataType_1.default.uint16 },
            alarmEnable: { ID: 0xf00a, type: dataType_1.default.uint16 },
        },
        commands: {
            setLanguage: {
                ID: 0x011b,
                parameters: [
                    { name: 'languageCode', type: dataType_1.default.uint8 },
                ],
            },
            setUnitOfTemperature: {
                ID: 0x011c,
                parameters: [
                    { name: 'unitsCode', type: dataType_1.default.uint8 },
                ],
            },
            getTime: {
                ID: 0x011d,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    heimanSpecificScenes: {
        // from HS2SS-3.0海曼智能情景开关API文档-V01
        ID: 0xfc80,
        manufacturerCode: manufacturerCode_1.default.Heiman,
        attributes: {},
        commands: {
            cinema: {
                ID: 0xf0,
                parameters: [],
            },
            atHome: {
                ID: 0xf1,
                parameters: [],
            },
            sleep: {
                ID: 0xf2,
                parameters: [],
            },
            goOut: {
                ID: 0xf3,
                parameters: [],
            },
            repast: {
                ID: 0xf4,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    heimanSpecificInfraRedRemote: {
        // from HS2IRC-3.0海曼智能红外转发控制器API-V01文档
        ID: 0xfc82,
        manufacturerCode: manufacturerCode_1.default.Heiman,
        attributes: {},
        commands: {
            sendKey: {
                ID: 0xf0,
                parameters: [
                    { name: 'id', type: dataType_1.default.uint8 },
                    { name: 'keyCode', type: dataType_1.default.uint8 },
                ],
            },
            studyKey: {
                // Total we can have 30 keycode for each device ID (1..30).
                ID: 0xf1,
                // response: 0xf2,
                parameters: [
                    { name: 'id', type: dataType_1.default.uint8 },
                    { name: 'keyCode', type: dataType_1.default.uint8 },
                ],
            },
            deleteKey: {
                ID: 0xf3,
                parameters: [
                    // 1-15 - Delete specific ID, >= 16 - Delete All
                    { name: 'id', type: dataType_1.default.uint8 },
                    // 1-30 - Delete specific keycode, >= 31 - Delete All keycodes for the ID
                    { name: 'keyCode', type: dataType_1.default.uint8 },
                ],
            },
            createId: {
                // Total we can have 15 device IDs (1..15).
                ID: 0xf4,
                // response: 0xf5,
                parameters: [
                    { name: 'modelType', type: dataType_1.default.uint8 },
                ],
            },
            getIdAndKeyCodeList: {
                ID: 0xf6,
                // response: 0xf7,
                parameters: [],
            },
        },
        commandsResponse: {
            studyKeyRsp: {
                ID: 0xf2,
                parameters: [
                    { name: 'id', type: dataType_1.default.uint8 },
                    { name: 'keyCode', type: dataType_1.default.uint8 },
                    { name: 'result', type: dataType_1.default.uint8 }, // 0 - success, 1 - fail
                ],
            },
            createIdRsp: {
                ID: 0xf5,
                parameters: [
                    { name: 'id', type: dataType_1.default.uint8 },
                    { name: 'modelType', type: dataType_1.default.uint8 },
                ],
            },
            getIdAndKeyCodeListRsp: {
                ID: 0xf7,
                parameters: [
                    { name: 'packetsTotal', type: dataType_1.default.uint8 },
                    { name: 'packetNumber', type: dataType_1.default.uint8 },
                    { name: 'packetLength', type: dataType_1.default.uint8 },
                    // HELP for learnedDevicesList data structure:
                    //   struct structPacketPayload {
                    //     uint8_t ID;
                    //     uint8_t ModeType;
                    //     uint8_t KeyNum;
                    //     uint8_t KeyCode[KeyNum];
                    //   } arayPacketPayload[CurentPacketLenght];
                    // }
                    { name: 'learnedDevicesList', type: buffaloZclDataType_1.default.LIST_UINT8 },
                ],
            },
        },
    },
    develcoSpecificAirQuality: {
        ID: 0xFC03,
        manufacturerCode: manufacturerCode_1.default.Develco,
        attributes: {
            measuredValue: { ID: 0x0000, type: dataType_1.default.uint16 },
            minMeasuredValue: { ID: 0x0001, type: dataType_1.default.uint16 },
            maxMeasuredValue: { ID: 0x0002, type: dataType_1.default.uint16 },
            resolution: { ID: 0x0003, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    schneiderSpecificPilotMode: {
        ID: 0xFF23,
        manufacturerCode: manufacturerCode_1.default.SCHNEIDER,
        attributes: {
            pilotMode: { ID: 0x0031, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    elkoOccupancySettingClusterServer: {
        ID: 0xFF19,
        manufacturerCode: manufacturerCode_1.default.ELKO,
        attributes: {
            AmbienceLightThreshold: { ID: 0x0000, type: dataType_1.default.uint16 },
            OccupancyActions: { ID: 0x0001, type: dataType_1.default.enum8 },
            UnoccupiedLevelDflt: { ID: 0x0002, type: dataType_1.default.uint8 },
            UnoccupiedLevel: { ID: 0x0003, type: dataType_1.default.uint8 },
        },
        commands: {},
        commandsResponse: {},
    },
    elkoSwitchConfigurationClusterServer: {
        ID: 0xFF17,
        manufacturerCode: manufacturerCode_1.default.ELKO,
        attributes: {
            SwitchIndication: { ID: 0x0000, type: dataType_1.default.enum8 },
            UpSceneID: { ID: 0x0010, type: dataType_1.default.uint8 },
            UpGroupID: { ID: 0x0011, type: dataType_1.default.uint16 },
            DownSceneID: { ID: 0x0020, type: dataType_1.default.uint8 },
            DownGroupID: { ID: 0x0021, type: dataType_1.default.uint16 },
            SwitchActions: { ID: 0x0001, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    clipsalWiserSwitchConfigurationClusterServer: {
        ID: 0xFF17,
        manufacturerCode: manufacturerCode_1.default.SCHNEIDER,
        attributes: {
            SwitchIndication: { ID: 0x0000, type: dataType_1.default.enum8 },
            SwitchActions: { ID: 0x0001, type: dataType_1.default.enum8 },
        },
        commands: {},
        commandsResponse: {},
    },
    sprutDevice: {
        ID: 26112,
        manufacturerCode: 26214,
        attributes: {
            debug: { ID: 0, type: dataType_1.default.boolean },
        },
        commands: {},
        commandsResponse: {},
    },
    sprutVoc: {
        ID: 26113,
        manufacturerCode: 26214,
        attributes: {
            voc: { ID: 26112, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    sprutNoise: {
        ID: 26114,
        manufacturerCode: 26214,
        attributes: {
            noise: { ID: 26112, type: dataType_1.default.singlePrec },
            noiseDetected: { ID: 26113, type: dataType_1.default.bitmap8 },
            noiseDetectLevel: { ID: 26114, type: dataType_1.default.singlePrec },
            noiseAfterDetectDelay: { ID: 26115, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
    sprutIrBlaster: {
        ID: 26115,
        manufacturerCode: 26214,
        attributes: {},
        commands: {
            playStore: {
                ID: 0x00,
                parameters: [
                    { name: 'param', type: dataType_1.default.uint8 },
                ],
            },
            learnStart: {
                ID: 0x01,
                parameters: [
                    { name: 'value', type: dataType_1.default.uint8 },
                ],
            },
            learnStop: {
                ID: 0x02,
                parameters: [
                    { name: 'value', type: dataType_1.default.uint8 },
                ],
            },
            clearStore: {
                ID: 0x03,
                parameters: [],
            },
            playRam: {
                ID: 0x04,
                parameters: [],
            },
            learnRamStart: {
                ID: 0x05,
                parameters: [],
            },
            learnRamStop: {
                ID: 0x06,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    manuSpecificSiglisZigfred: {
        ID: 0xFC42,
        manufacturerCode: 0x129C,
        attributes: {
            buttonEvent: { ID: 0x0008, type: dataType_1.default.uint32 },
        },
        commands: {
            siglisZigfredButtonEvent: {
                ID: 0x02,
                parameters: [
                    { name: 'button', type: dataType_1.default.uint8 },
                    { name: 'type', type: dataType_1.default.uint8 },
                    { name: 'duration', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {},
    },
    manuSpecificInovelli: {
        ID: 64561,
        manufacturerCode: 0x122f,
        attributes: {
            dimmingSpeedUpRemote: { ID: 0x001, type: dataType_1.default.uint8 },
            dimmingSpeedUpLocal: { ID: 0x0002, type: dataType_1.default.uint8 },
            rampRateOffToOnRemote: { ID: 0x0003, type: dataType_1.default.uint8 },
            rampRateOffToOnLocal: { ID: 0x0004, type: dataType_1.default.uint8 },
            dimmingSpeedDownRemote: { ID: 0x0005, type: dataType_1.default.uint8 },
            dimmingSpeedDownLocal: { ID: 0x0006, type: dataType_1.default.uint8 },
            rampRateOnToOffRemote: { ID: 0x0007, type: dataType_1.default.uint8 },
            rampRateOnToOffLocal: { ID: 0x0008, type: dataType_1.default.uint8 },
            minimumLevel: { ID: 0x0009, type: dataType_1.default.uint8 },
            maximumLevel: { ID: 0x000a, type: dataType_1.default.uint8 },
            invertSwitch: { ID: 0x000b, type: dataType_1.default.boolean },
            autoTimerOff: { ID: 0x000c, type: dataType_1.default.uint16 },
            defaultLevelLocal: { ID: 0x000d, type: dataType_1.default.uint8 },
            defaultLevelRemote: { ID: 0x000e, type: dataType_1.default.uint8 },
            stateAfterPowerRestored: { ID: 0x000f, type: dataType_1.default.uint8 },
            loadLevelIndicatorTimeout: { ID: 0x0011, type: dataType_1.default.uint8 },
            activePowerReports: { ID: 0x0012, type: dataType_1.default.uint8 },
            periodicPowerAndEnergyReports: { ID: 0x0013, type: dataType_1.default.uint16 },
            activeEnergyReports: { ID: 0x0014, type: dataType_1.default.uint16 },
            powerType: { ID: 0x0015, type: dataType_1.default.boolean },
            switchType: { ID: 0x0016, type: dataType_1.default.uint8 },
            higherOutputInNonNeutral: { ID: 0x0019, type: dataType_1.default.boolean },
            nonNeutralAuxMediumGear: { ID: 0x001e, type: dataType_1.default.uint8 },
            nonNeutralAuxLowGear: { ID: 0x001f, type: dataType_1.default.uint8 },
            internalTemperature: { ID: 0x0020, type: dataType_1.default.uint8 },
            overheat: { ID: 0x0021, type: dataType_1.default.boolean },
            buttonDelay: { ID: 0x0032, type: dataType_1.default.uint8 },
            deviceBindNumber: { ID: 0x0033, type: dataType_1.default.uint8 },
            smartBulbMode: { ID: 0x0034, type: dataType_1.default.boolean },
            doubleTapUpToParam55: { ID: 0x0035, type: dataType_1.default.boolean },
            doubleTapDownToParam56: { ID: 0x0036, type: dataType_1.default.boolean },
            brightnessLevelForDoubleTapUp: { ID: 0x0037, type: dataType_1.default.uint8 },
            brightnessLevelForDoubleTapDown: { ID: 0x0038, type: dataType_1.default.uint8 },
            defaultLed1ColorWhenOn: { ID: 0x003c, type: dataType_1.default.uint8 },
            defaultLed1ColorWhenOff: { ID: 0x003d, type: dataType_1.default.uint8 },
            defaultLed1IntensityWhenOn: { ID: 0x003e, type: dataType_1.default.uint8 },
            defaultLed1IntensityWhenOff: { ID: 0x003f, type: dataType_1.default.uint8 },
            defaultLed2ColorWhenOn: { ID: 0x0041, type: dataType_1.default.uint8 },
            defaultLed2ColorWhenOff: { ID: 0x0042, type: dataType_1.default.uint8 },
            defaultLed2IntensityWhenOn: { ID: 0x0043, type: dataType_1.default.uint8 },
            defaultLed2IntensityWhenOff: { ID: 0x0044, type: dataType_1.default.uint8 },
            defaultLed3ColorWhenOn: { ID: 0x0046, type: dataType_1.default.uint8 },
            defaultLed3ColorWhenOff: { ID: 0x0047, type: dataType_1.default.uint8 },
            defaultLed3IntensityWhenOn: { ID: 0x0048, type: dataType_1.default.uint8 },
            defaultLed3IntensityWhenOff: { ID: 0x0049, type: dataType_1.default.uint8 },
            defaultLed4ColorWhenOn: { ID: 0x004b, type: dataType_1.default.uint8 },
            defaultLed4ColorWhenOff: { ID: 0x004c, type: dataType_1.default.uint8 },
            defaultLed4IntensityWhenOn: { ID: 0x004d, type: dataType_1.default.uint8 },
            defaultLed4IntensityWhenOff: { ID: 0x004e, type: dataType_1.default.uint8 },
            defaultLed5ColorWhenOn: { ID: 0x0050, type: dataType_1.default.uint8 },
            defaultLed5ColorWhenOff: { ID: 0x0051, type: dataType_1.default.uint8 },
            defaultLed5IntensityWhenOn: { ID: 0x0052, type: dataType_1.default.uint8 },
            defaultLed5IntensityWhenOff: { ID: 0x0053, type: dataType_1.default.uint8 },
            defaultLed6ColorWhenOn: { ID: 0x0055, type: dataType_1.default.uint8 },
            defaultLed6ColorWhenOff: { ID: 0x0056, type: dataType_1.default.uint8 },
            defaultLed6IntensityWhenOn: { ID: 0x0057, type: dataType_1.default.uint8 },
            defaultLed6IntensityWhenOff: { ID: 0x0058, type: dataType_1.default.uint8 },
            defaultLed7ColorWhenOn: { ID: 0x005a, type: dataType_1.default.uint8 },
            defaultLed7ColorWhenOff: { ID: 0x005b, type: dataType_1.default.uint8 },
            defaultLed7IntensityWhenOn: { ID: 0x005c, type: dataType_1.default.uint8 },
            defaultLed7IntensityWhenOff: { ID: 0x005d, type: dataType_1.default.uint8 },
            ledColorWhenOn: { ID: 0x005f, type: dataType_1.default.uint8 },
            ledColorWhenOff: { ID: 0x060, type: dataType_1.default.uint8 },
            ledIntensityWhenOn: { ID: 0x0061, type: dataType_1.default.uint8 },
            ledIntensityWhenOff: { ID: 0x0062, type: dataType_1.default.uint8 },
            ledBarScaling: { ID: 0x0064, type: dataType_1.default.boolean },
            auxSwitchUniqueScenes: { ID: 0x007b, type: dataType_1.default.boolean },
            bindingOffToOnSyncLevel: { ID: 0x007d, type: dataType_1.default.boolean },
            localProtection: { ID: 0x0100, type: dataType_1.default.boolean },
            remoteProtection: { ID: 0x0101, type: dataType_1.default.boolean },
            outputMode: { ID: 0x0102, type: dataType_1.default.boolean },
            onOffLedMode: { ID: 0x0103, type: dataType_1.default.boolean },
            firmwareUpdateInProgressIndicator: { ID: 0x0104, type: dataType_1.default.boolean },
            relayClick: { ID: 0x105, type: dataType_1.default.boolean },
            doubleTapClearNotifications: { ID: 0x106, type: dataType_1.default.boolean },
            fanLedLevelType: { ID: 0x0107, type: dataType_1.default.uint8 },
        },
        commands: {
            ledEffect: {
                ID: 1,
                parameters: [
                    { name: 'effect', type: dataType_1.default.uint8 },
                    { name: 'color', type: dataType_1.default.uint8 },
                    { name: 'level', type: dataType_1.default.uint8 },
                    { name: 'duration', type: dataType_1.default.uint8 },
                ],
            },
            individualLedEffect: {
                ID: 3,
                parameters: [
                    { name: 'led', type: dataType_1.default.uint8 },
                    { name: 'effect', type: dataType_1.default.uint8 },
                    { name: 'color', type: dataType_1.default.uint8 },
                    { name: 'level', type: dataType_1.default.uint8 },
                    { name: 'duration', type: dataType_1.default.uint8 },
                ]
            }
        },
        commandsResponse: {},
    },
    owonClearMetering: {
        ID: 0xFFE0,
        manufacturerCode: manufacturerCode_1.default.OWON,
        attributes: {},
        commands: {
            owonClearMeasurementData: {
                ID: 0x00,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    zosungIRTransmit: {
        ID: 0xed00,
        attributes: {},
        commands: {
            zosungSendIRCode00: {
                ID: 0,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'length', type: dataType_1.default.uint32 },
                    { name: 'unk1', type: dataType_1.default.uint32 },
                    { name: 'unk2', type: dataType_1.default.uint16 },
                    { name: 'unk3', type: dataType_1.default.uint8 },
                    { name: 'cmd', type: dataType_1.default.uint8 },
                    { name: 'unk4', type: dataType_1.default.uint16 },
                ],
            },
            zosungSendIRCode01: {
                ID: 1,
                parameters: [
                    { name: 'zero', type: dataType_1.default.uint8 },
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'length', type: dataType_1.default.uint32 },
                    { name: 'unk1', type: dataType_1.default.uint32 },
                    { name: 'unk2', type: dataType_1.default.uint16 },
                    { name: 'unk3', type: dataType_1.default.uint8 },
                    { name: 'cmd', type: dataType_1.default.uint8 },
                    { name: 'unk4', type: dataType_1.default.uint16 },
                ],
            },
            zosungSendIRCode02: {
                ID: 2,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'position', type: dataType_1.default.uint32 },
                    { name: 'maxlen', type: dataType_1.default.uint8 },
                ],
            },
            zosungSendIRCode03: {
                ID: 3,
                parameters: [
                    { name: 'zero', type: dataType_1.default.uint8 },
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'position', type: dataType_1.default.uint32 },
                    { name: 'msgpart', type: dataType_1.default.octetStr },
                    { name: 'msgpartcrc', type: dataType_1.default.uint8 },
                ],
            },
            zosungSendIRCode04: {
                ID: 4,
                parameters: [
                    { name: 'zero0', type: dataType_1.default.uint8 },
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'zero1', type: dataType_1.default.uint16 },
                ],
            },
            zosungSendIRCode05: {
                ID: 5,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'zero', type: dataType_1.default.uint16 },
                ],
            },
        },
        commandsResponse: {
            zosungSendIRCode03Resp: {
                ID: 3,
                parameters: [
                    { name: 'zero', type: dataType_1.default.uint8 },
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'position', type: dataType_1.default.uint32 },
                    { name: 'msgpart', type: dataType_1.default.octetStr },
                    { name: 'msgpartcrc', type: dataType_1.default.uint8 },
                ],
            },
            zosungSendIRCode05Resp: {
                ID: 5,
                parameters: [
                    { name: 'seq', type: dataType_1.default.uint16 },
                    { name: 'zero', type: dataType_1.default.uint16 },
                ],
            },
        },
    },
    zosungIRControl: {
        ID: 0xe004,
        attributes: {},
        commands: {
            zosungControlIRCommand00: {
                ID: 0,
                parameters: [
                    // JSON string with a command.
                    { name: 'data', type: buffaloZclDataType_1.default.BUFFER },
                ],
            },
        },
        commandsResponse: {},
    },
    manuSpecificBosch: {
        ID: 0xe000,
        manufacturerCode: manufacturerCode_1.default.Bosch,
        attributes: {
            sensitivity: { ID: 0x4003, type: 0x21 },
        },
        commands: {
            initiateTestMode: {
                ID: 0x00,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    manuSpecificBosch3: {
        ID: 0xe002,
        manufacturerCode: manufacturerCode_1.default.Bosch,
        attributes: {
            humidity: { ID: 0x4000, type: 0x21 },
            unknown1: { ID: 0x4001, type: 0x21 },
            unknown2: { ID: 0x4002, type: 0x21 },
            airpurity: { ID: 0x4003, type: 0x21 },
            temperature: { ID: 0x4004, type: 0x29 },
            illuminance_lux: { ID: 0x4005, type: 0x21 },
            battery: { ID: 0x4006, type: 0x21 },
            unknown3: { ID: 0x4007, type: 0x21 },
            unknown4: { ID: 0x4008, type: 0x21 },
            unknown5: { ID: 0x4009, type: 0x21 },
            unknown6: { ID: 0x400a, type: 0x21 },
            unknown7: { ID: 0x400b, type: 0x21 },
            unknown8: { ID: 0x400c, type: 0x21 },
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificBosch5: {
        ID: 0xe004,
        manufacturerCode: manufacturerCode_1.default.Bosch,
        attributes: {
            unknown_attribute: { ID: 0x4000, type: dataType_1.default.bitmap8 },
            pre_alarm: { ID: 0x4001, type: dataType_1.default.bitmap8 }, // 0,1 on/off
        },
        commands: {},
        commandsResponse: {},
    },
    manuSpecificBosch7: {
        ID: 0xe006,
        manufacturerCode: manufacturerCode_1.default.Bosch,
        attributes: {
            unknown1: { ID: 0x5003, type: 0x28 },
            unknown2: { ID: 0x5004, type: 0x20 },
            heartbeat: { ID: 0x5005, type: dataType_1.default.bitmap8 }, // 0,1 on/off
        },
        commands: {
            pairingCompleted: {
                ID: 0x01,
                parameters: [],
            },
        },
        commandsResponse: {},
    },
    manuSpecificBosch8: {
        ID: 0xe007,
        manufacturerCode: manufacturerCode_1.default.Bosch,
        attributes: {
            alarm_status: { ID: 0x5000, type: dataType_1.default.bitmap32 },
        },
        commands: {
            burglarAlarm: {
                ID: 0x01,
                parameters: [
                    { name: 'data', type: dataType_1.default.uint8 }, // data:1 trips the siren data:0 should stop the siren
                ],
            },
        },
        commandsResponse: {},
    },
    manuSpecificAssaDoorLock: {
        ID: 0xFC00,
        attributes: {
            autoLockTime: { ID: 0x0012, type: dataType_1.default.uint8 },
            wrongCodeAttempts: { ID: 0x0013, type: dataType_1.default.uint8 },
            shutdownTime: { ID: 0x0014, type: dataType_1.default.uint8 },
            batteryLevel: { ID: 0x0015, type: dataType_1.default.uint8 },
            insideEscutcheonLED: { ID: 0x0016, type: dataType_1.default.uint8 },
            volume: { ID: 0x0017, type: dataType_1.default.uint8 },
            lockMode: { ID: 0x0018, type: dataType_1.default.uint8 },
            language: { ID: 0x0019, type: dataType_1.default.uint8 },
            allCodesLockout: { ID: 0x001A, type: dataType_1.default.boolean },
            oneTouchLocking: { ID: 0x001B, type: dataType_1.default.boolean },
            privacyButtonSetting: { ID: 0x001C, type: dataType_1.default.boolean },
            /* enableLogging: {ID: 0x0020, type: DataType.boolean},*/ // marked in C4 driver as not supported
            numberLogRecordsSupported: { ID: 0x0021, type: dataType_1.default.uint16 },
            numberPinsSupported: { ID: 0x0030, type: dataType_1.default.uint8 },
            numberScheduleSlotsPerUser: { ID: 0x0040, type: dataType_1.default.uint8 },
            alarmMask: { ID: 0x0050, type: dataType_1.default.uint8 },
        },
        commands: {
            getLockStatus: {
                ID: 0x10,
                response: 0,
                parameters: [],
            },
            getBatteryLevel: {
                ID: 0x12,
                parameters: [],
            },
            setRFLockoutTime: {
                ID: 0x13,
                parameters: [],
            },
            /* getLogRecord: {
                ID: 0x20,
                parameters: [],
            },*/ // marked in C4 driver as not supported
            userCodeSet: {
                ID: 0x30,
                parameters: [
                    // bit pack ("bbb", slot, status, pinLength) .. pin
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            userCodeGet: {
                ID: 0x31,
                parameters: [
                    // bit pack ("b", slot)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            userCodeClear: {
                ID: 0x32,
                parameters: [
                    // bit pack ("b", slot)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            clearAllUserCodes: {
                ID: 0x33,
                parameters: [],
            },
            setUserCodeStatus: {
                ID: 0x34,
                parameters: [],
            },
            getUserCodeStatus: {
                ID: 0x35,
                parameters: [],
            },
            getLastUserIdEntered: {
                ID: 0x36,
                parameters: [],
            },
            userAdded: {
                ID: 0x37,
                parameters: [],
            },
            userDeleted: {
                ID: 0x38,
                parameters: [],
            },
            setScheduleSlot: {
                ID: 0x40,
                parameters: [
                    // bit pack ("bbbbbbb", 0, slot, weeklyScheduleNumber, startHour, startMinute, hours, minutes)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            getScheduleSlot: {
                ID: 0x41,
                parameters: [
                    // bit pack ("bb", slot, userId)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            setScheduleSlotStatus: {
                ID: 0x42,
                parameters: [
                    // bit pack ("bbb", 0, slot, status)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            reflash: {
                ID: 0x60,
                response: 1,
                parameters: [
                    // bit pack ("bI", version, length)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            reflashData: {
                ID: 0x61,
                response: 2,
                parameters: [
                    // bit pack ("IH", segmentId - 1, length) .. string sub (data, start, finish)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            reflashStatus: {
                ID: 0x62,
                response: 3,
                parameters: [
                    // bit pack ("bI", reflashStatusParameter, 0x00)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            getReflashLock: {
                ID: 0x90,
                parameters: [],
            },
            getHistory: {
                ID: 0xA0,
                parameters: [],
            },
            getLogin: {
                ID: 0xA1,
                parameters: [],
            },
            getUser: {
                ID: 0xA2,
                parameters: [],
            },
            getUsers: {
                ID: 0xA3,
                parameters: [],
            },
            getMandatoryAttributes: {
                ID: 0xB0,
                parameters: [],
            },
            readAttribute: {
                ID: 0xB1,
                parameters: [],
            },
            writeAttribute: {
                ID: 0xB2,
                parameters: [],
            },
            configureReporting: {
                ID: 0xB3,
                parameters: [],
            },
            getBasicClusterAttributes: {
                ID: 0xB4,
                parameters: [],
            },
        },
        commandsResponse: {
            getLockStatusRsp: {
                ID: 0,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            reflashRsp: {
                ID: 1,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            reflashDataRsp: {
                ID: 2,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            reflashStatusRsp: {
                ID: 3,
                parameters: [
                    { name: 'status', type: dataType_1.default.uint8 },
                ],
            },
            /* boltStateRsp: {
                ID: 4,
                parameters: [
                    {name: 'state', type: DataType.uint8},
                ],
            },*/ // C4 driver has this response yet there is no command - maybe a non-specific cluster response?
            /* lockStatusReportRsp: {
                ID: 5,
                parameters: [
                    {name: 'status', type: DataType.uint8},
                ],
            },*/ // C4 driver has this response yet there is no command - maybe a non-specific cluster response?
            /* handleStateRsp: {
                ID: 6,
                parameters: [
                    {name: 'state', type: DataType.uint8},
                ],
            },*/ // C4 driver has this response yet there is no command - maybe a non-specific cluster response?
            /* userStatusRsp: {
                ID: 7,
                parameters: [
                    {name: 'status', type: DataType.uint8},
                ],
            },*/ // C4 driver has this response yet there is no command - maybe a non-specific cluster response?
        },
    },
    manuSpecificDoorman: {
        ID: 0xEACC,
        attributes: {},
        commands: {
            getConfigurationParameter: {
                ID: 0xFC,
                parameters: [
                    // bit pack ("bbb", 0x00, 0x00, configurationId)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            setConfigurationParameter: {
                ID: 0xFD,
                parameters: [
                    // bit pack ("bbbb", 0x00, 0x00, configurationId, value)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            integrationModeActivation: {
                ID: 0x25,
                parameters: [
                    // bit pack ("bbbbb", slot, codeType, string sub (userCode, 1, 2), string sub (userCode, 3, 4), string sub (userCode, 5, 6)) .. String duplicate (0xff, 12)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
            armDisarm: {
                ID: 0x4E,
                parameters: [
                    // bit pack ("bb", lockSequenceNumber, operatingParameter)
                    { name: 'payload', type: dataType_1.default.charStr },
                ],
            },
        },
        commandsResponse: {},
    },
	dfmCard: {
        ID: 0x07D0,
        attributes: {
            TemperatureCard: { ID: 0x0000, type: dataType_1.default.int16 },
            BatteryVoltage: { ID: 0x0001, type: dataType_1.default.uint16 },			
        },
        commands: {},
        commandsResponse: {},
    },
	dfmGyro: {
        ID: 0x07D1,
        attributes: {
            AxeX:   { ID: 0x0000, type: dataType_1.default.int16 },
            AxeY:   { ID: 0x0001, type: dataType_1.default.int16 },	
			AxeZ:   { ID: 0x0002, type: dataType_1.default.int16 },
			SpeedX: { ID: 0x0003, type: dataType_1.default.int16 },
			SpeedY: { ID: 0x0004, type: dataType_1.default.int16 },
			SpeedZ: { ID: 0x0005, type: dataType_1.default.int16 },
			Activate: { ID: 0x0006, type: dataType_1.default.boolean },
        },
        commands: {},
        commandsResponse: {},
    },
	dfmEnvironment: {
        ID: 0x07D2,
        attributes: {
            Luminosity: { ID: 0x0000, type: dataType_1.default.uint16 },
            Pressure:   { ID: 0x0001, type: dataType_1.default.uint16 },	
			Humidity:   { ID: 0x0002, type: dataType_1.default.uint16 },
			TemperatureEnv: { ID: 0x0003, type: dataType_1.default.int16 },			
			AirQuality: { ID: 0x0004, type: dataType_1.default.uint8 },
			Co2:        { ID: 0x0005, type: dataType_1.default.uint16 },
			Tvoc:        { ID: 0x0006, type: dataType_1.default.uint16 },			
			R1:     { ID: 0x0007, type: dataType_1.default.uint32 },
			R2:     { ID: 0x0008, type: dataType_1.default.uint32 },
			R3:     { ID: 0x0009, type: dataType_1.default.uint32 },
			R4:     { ID: 0x000A, type: dataType_1.default.uint32 },
			WhiteLuminosity: { ID: 0x000B, type: dataType_1.default.uint16 },
        },
        commands: {},
        commandsResponse: {},
    },
	dfmPlant: {
        ID: 0x07D3,
        attributes: {
            Temperature:      { ID: 0x0000, type: dataType_1.default.int16 },
            MACDS:            { ID: 0x0001, type: dataType_1.default.uint64 },	
			SoilMoisture:     { ID: 0x0002, type: dataType_1.default.uint8 },
			WaterAlimentation: { ID: 0x0003, type: dataType_1.default.uint16 },			
			WaterAlimentationState: { ID: 0x0004, type: dataType_1.default.uint8 },
			TotalWater:       { ID: 0x0005, type: dataType_1.default.uint32 },			
        },
        commands: {},
        commandsResponse: {},
    },	
};
exports.default = Cluster;
//# sourceMappingURL=cluster.js.map