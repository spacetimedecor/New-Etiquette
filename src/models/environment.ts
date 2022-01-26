import {types} from "mobx-state-tree";
import defaultSettings from "../defaultSettings";
import {Subject} from "rxjs";
import {AllEventTypes} from "./events";

export interface EnvironmentSettingsType {

}

class Environment implements EnvironmentSettingsType {

	flow: Subject<AllEventTypes>;

	constructor({}: EnvironmentSettingsType) {
		this.flow = new Subject<AllEventTypes>();
	}

	set<EnvironmentSettingsType>(to: Partial<EnvironmentSettingsType>) {
		Object.assign(this, to)
	}
}

const { environmentSettings } = defaultSettings;

export const EnvironmentModel = types.custom<string, Environment>({
	name: "EnvironmentModel",
	fromSnapshot(snapshot: string, env?: any): Environment {
		return JSON.parse(snapshot);
	},
	toSnapshot(value: Environment): string {
		return JSON.stringify(value);
	},
	isTargetType(value: Environment | string): boolean {
		return value instanceof Environment;
	},
	getValidationMessage(snapshot: string): string {
		try {
			new Environment(environmentSettings);
			return ""
		} catch (e) {
			return e.message
		}
	}
})
