import {NodeSettings} from "./models/nodes/node";
import {OrthographicSettings, PerspectiveSettings} from "./stores/cameras";

export enum NodeNames {
	Root,
	Standard,
}

const nodeSettings: NodeSettings = {
	id: '',
	color: '#848484',
	name: 'Node',
	type: NodeNames.Standard,
	position: [0, 0, 0],
	springConfig: {friction: 100}
}

const orthographicSettings: OrthographicSettings = {
	zoom: 25,
	position: [0, 0, 10],
	near: 0.1,
	far: 10,
}

const perspectiveSettings: PerspectiveSettings = {
	zoom: 25,
	position: [-3500, 2000, 3500],
	near: 0.1,
	far: 10000,
}

const defaultSettings = {
	cameraStore: {
		orthographicSettings,
		perspectiveSettings
	},
	appSettings: {
		debug: true,
		initialLevel: 0,
	},
	nodeSettings,
	rootNodeSettings: {

	},
	environmentSettings: {

	}
}

export default defaultSettings;
