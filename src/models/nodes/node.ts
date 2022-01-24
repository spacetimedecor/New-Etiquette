import {action, makeObservable, observable} from "mobx";
import {v4 as uuid} from "uuid";
import defaultSettings, {NodeNames} from "../../defaultSettings";
import {rootStore} from "../../stores";

export interface NodeArgs {
	color?: string;
	name?: string;
	type?: NodeNames;
	position?: [x: number, y: number, z: number];
}

export interface NodeSettings {
	id: string;
	name: string;
	color: string;
	type: NodeNames;
	position: [x: number, y: number, z: number];
	springConfig: {friction: number};
}

class Node {
	nodeSettings: NodeSettings;

	constructor(
		{
			nodeArgs
		}: {
			nodeArgs?: NodeArgs
		}
	) {
		const id = uuid();
		this.nodeSettings = {
			...defaultSettings.nodeSettings,
			...(nodeArgs && nodeArgs),
			id
		}

		rootStore.NodesStore.nodeMap[id] = this;

		makeObservable(this, {
			nodeSettings: observable.deep,
			changePosition: action.bound,
		});
	}

	changePosition(to: [x: number, y: number, z: number]) {
		this.nodeSettings.position = to;
	}
}

export default Node;
