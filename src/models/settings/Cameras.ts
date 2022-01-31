import {Instance, types} from "mobx-state-tree";

const CameraSettings = types.model("CameraSettings", {
	zoom: types.number,
	near: types.number,
	far: types.number,
	position: types.array(types.number)
});

export type CameraSettingsType = Instance<typeof CameraSettings>

export const OrthographicCameraSettings = types.compose(CameraSettings, types.model({}));
export const PerspectiveCameraSettings = types.compose(CameraSettings, types.model({}));

export type OrthographicCameraSettingsType = Instance<typeof OrthographicCameraSettings>
export type PerspectiveCameraSettingsType = Instance<typeof PerspectiveCameraSettings>
