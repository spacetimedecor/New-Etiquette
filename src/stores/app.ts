import {action, observable} from "mobx";
import defaultSettings from "../defaultSettings";
import {RootStore} from "./index";

const {initialLevel, debug} = defaultSettings.appSettings;

export class AppStore {
	rootStore;

	@observable.deep currentLevel: number = initialLevel;
	@observable.deep debug: boolean = debug;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@action.bound setCurrentLevel(to: number) {
		this.currentLevel = to;
	}

	@action.bound setDebug(to: boolean) {
		this.debug = to;
	}
}
