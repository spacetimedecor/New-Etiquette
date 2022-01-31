export enum NodeNames {
	Root = "Root",
	Standard = "Standard",
}

const nodeSettings = {
	id: '',
	color: '#848484',
	name: 'Node',
	type: NodeNames.Standard,
	position: [0, 0, 0],
	// springConfig: {friction: 100}
}

const orthographicSettings = {
	zoom: 25,
	position: [0, 0, 10],
	near: 0.1,
	far: 10,
}

const perspectiveSettings = {
	zoom: 25,
	position: [-3500, 2000, 3500],
	near: 0.1,
	far: 10000,
}

const defaultSettings = {
	camerasSettings: {
		orthographicSettings,
		perspectiveSettings
	},
	appSettings: {
		debug: true,
		currentLevel: 0,
	},
	nodeSettings,
	rootNodeSettings: {

	},
}

export default defaultSettings;
