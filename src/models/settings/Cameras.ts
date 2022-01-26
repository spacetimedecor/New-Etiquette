import {types} from "mobx-state-tree";
import defaultSettings from "../../defaultSettings";

export interface CameraSettingsType {
	zoom: number,
	position: [x: number, y: number, z: number],
	near: number,
	far: number,
}

class CameraSettings implements CameraSettingsType {
	zoom: number;
	near: number;
	far: number;
	position: [x: number, y: number, z: number];

	constructor({zoom, near, far, position}: CameraSettingsType) {
		this.zoom = zoom;
		this.near = near;
		this.far = far;
		this.position = position;
	}

	set<T>(to: Partial<T>) {
		Object.assign(this, to)
	}
}


export interface OrthographicCameraSettingsType extends CameraSettingsType {}

export class OrthographicCameraSettings
	extends CameraSettings
	implements OrthographicCameraSettingsType
{
	constructor(settings: OrthographicCameraSettingsType) {
		super(settings);
	}
}

export interface PerspectiveCameraSettingsType extends CameraSettingsType {}

export class PerspectiveCameraSettings
	extends CameraSettings
	implements PerspectiveCameraSettingsType
{

}

const { camerasSettings: { orthographicSettings } } = defaultSettings;

export const OrthographicCameraSettingsModel = types.custom<string, OrthographicCameraSettings>({
	name: "OrthographicCameraSettingsModel",
	fromSnapshot(snapshot: string, env?: any): OrthographicCameraSettings {
		return JSON.parse(snapshot);
	},
	toSnapshot(value: OrthographicCameraSettings): string {
		return JSON.stringify(value);
	},
	isTargetType(value: OrthographicCameraSettings | string): boolean {
		return value instanceof OrthographicCameraSettings;
	},
	getValidationMessage(snapshot: string): string {
		try {
			new OrthographicCameraSettings(orthographicSettings);
			return ""
		} catch (e) {
			return e.message
		}
	}
});

const { camerasSettings: { perspectiveSettings } } = defaultSettings;

export const PerspectiveCameraSettingsModel = types.custom<string, PerspectiveCameraSettings>({
	name: "PerspectiveCameraSettingsModel",
	fromSnapshot(snapshot: string, env?: any): PerspectiveCameraSettings {
		return JSON.parse(snapshot);
	},
	toSnapshot(value: PerspectiveCameraSettings): string {
		return JSON.stringify(value);
	},
	isTargetType(value: PerspectiveCameraSettings | string): boolean {
		return value instanceof PerspectiveCameraSettings;
	},
	getValidationMessage(snapshot: string): string {
		try {
			new PerspectiveCameraSettings(perspectiveSettings);
			return ""
		} catch (e) {
			return e.message
		}
	}
});

