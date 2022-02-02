import {Instance, types} from "mobx-state-tree";

const CameraSettings = types.model("CameraSettings", {
	zoom: types.number,
	near: types.number,
	far: types.number,
	position: types.array(types.number)
})
	.actions((self) => ({
		changePosition(to: [x: number, y: number, z: number]) {
			self.position[0] = to[0];
			self.position[1] = to[1];
			self.position[2] = to[2];
		}
	}));

export type CameraSettingsType = Instance<typeof CameraSettings>

export const OrthographicCameraSettings = types.compose(CameraSettings, types.model({}));
export const PerspectiveCameraSettings = types.compose(CameraSettings, types.model({}));

export type OrthographicCameraSettingsType = Instance<typeof OrthographicCameraSettings>
export type PerspectiveCameraSettingsType = Instance<typeof PerspectiveCameraSettings>
