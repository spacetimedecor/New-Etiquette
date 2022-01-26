import {
	OrthographicCameraSettingsType,
	PerspectiveCameraSettingsType
} from "./models/settings/Cameras";
import {generateUUID} from "three/src/math/MathUtils";
import {EnvironmentSettingsType} from "./models/environment";

export enum NodeNames {
	Root,
	Standard,
}

const nodeSettings = {
	id: '',
	color: '#848484',
	name: 'Node',
	type: NodeNames.Standard,
	position: [0, 0, 0],
	springConfig: {friction: 100}
}

const orthographicSettings: OrthographicCameraSettingsType = {
	zoom: 25,
	position: [0, 0, 10],
	near: 0.1,
	far: 10,
}

const perspectiveSettings: PerspectiveCameraSettingsType = {
	zoom: 25,
	position: [-3500, 2000, 3500],
	near: 0.1,
	far: 10000,
}

const environmentSettings: EnvironmentSettingsType = {

}

const defaultSettings = {
	camerasSettings: {
		id: generateUUID(),
		orthographicSettings,
		perspectiveSettings
	},
	appSettings: {
		id: generateUUID(),
		debug: true,
		currentLevel: 0,
	},
	environmentSettings,
	nodeSettings,
	rootNodeSettings: {

	},
}

export default defaultSettings;
