import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import Node, {NodeArgs} from "./node";
import defaultSettings from "../../defaultSettings";
import {Environment, EnvironmentArgs} from "../environment";

interface RootNodeArgs {
}

interface RootNodeSettings {
}

export interface canHaveChildren {
	children: Node[];
}

class RootNode extends Node implements canHaveChildren {
	rootNodeSettings: RootNodeSettings;
	environment: Environment;
	children: Node[] = [];

	constructor(
		{
			nodeArgs,
			rootNodeArgs,
			environmentArgs
		}: {
			nodeArgs?: NodeArgs;
			rootNodeArgs?: RootNodeArgs;
			environmentArgs?: EnvironmentArgs;
		}
	) {
		super({ nodeArgs })
		this.rootNodeSettings = {
			...defaultSettings.rootNodeSettings,
			...(rootNodeArgs && rootNodeArgs),
		}

		this.environment = new Environment({ environmentArgs });
		makeObservable(this, {
			rootNodeSettings: observable.deep,
			environment: observable.deep,
			children: observable.deep,
			addChild: action.bound,
		});
	}

	addChild(newNode: Node) {
		this.children.push(newNode);
	}
}

export default RootNode;
