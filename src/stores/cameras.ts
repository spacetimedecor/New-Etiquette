import {action, computed, observable} from "mobx";

import defaultSettings from "../defaultSettings";
import {RootStore} from "./index";

const {orthographicSettings, perspectiveSettings} = defaultSettings.cameraStore;

export interface OrthographicSettings {
	zoom: number;
	near: number;
	far: number;
	position: [x: number, y: number, z: number];
}

export interface PerspectiveSettings {
	zoom: number;
	near: number;
	far: number;
	position: [x: number, y: number, z: number];
}

export class CamerasStore {
	rootStore;

	@observable.deep orthographicSettings: OrthographicSettings = orthographicSettings;
	@observable.deep perspectiveSettings: PerspectiveSettings = perspectiveSettings;

	@action.bound setOrthographic(to: Partial<OrthographicSettings>) {
		this.orthographicSettings = {
			...this.orthographicSettings,
			...to
		};
	}

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@action.bound setPerspective(to: Partial<PerspectiveSettings>) {
		this.perspectiveSettings = {
			...this.perspectiveSettings,
			...to
		};
	}

	@computed get orthographicIsDefault() {
		return !this.rootStore.AppStore.debug
	}

	@computed get perspectiveIsDefault() {
		return this.rootStore.AppStore.debug
	}
}
