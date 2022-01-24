import {NodeSettings} from "./models/nodes/node";

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

const defaultSettings = {
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
