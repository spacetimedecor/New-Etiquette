import {action, observable} from "mobx";
import defaultSettings from "../defaultSettings";

const {initialLevel, debug} = defaultSettings.appSettings;

export class AppStore {
	@observable.deep currentLevel: number = initialLevel;
	@observable.deep debug: boolean = debug;

	@action.bound setCurrentLevel(to: number) {
		this.currentLevel = to;
	}

	@action.bound setDebug(to: boolean) {
		this.debug = to;
	}
}
