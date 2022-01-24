import { Subject } from 'rxjs';
import { AllEventTypes } from "./events";
import {action, makeObservable, observable} from "mobx";
import defaultSettings from "../defaultSettings";

export interface EnvironmentArgs {

}

export interface EnvironmentSettings {

}

export class Environment {
	environmentSettings: EnvironmentSettings;
	flow: Subject<AllEventTypes>;

	constructor(
		{
			environmentArgs
		}: {
			environmentArgs?: EnvironmentArgs
		}
	) {
		this.environmentSettings = {
			...defaultSettings.environmentSettings,
			...(environmentArgs && environmentArgs),
		}
		this.flow = new Subject<AllEventTypes>();

		makeObservable(this, {
			environmentSettings: observable.deep,
		})
	}
}
