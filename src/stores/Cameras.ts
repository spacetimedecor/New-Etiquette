import {types} from "mobx-state-tree";

import {
	OrthographicCameraSettingsModel,
	OrthographicCameraSettingsType,
	PerspectiveCameraSettingsModel,
	PerspectiveCameraSettingsType,
} from "../models/settings/Cameras";
import {rootStore} from "./index";

const Cameras = types
	.model("Cameras", {
		id: types.identifier,
		orthographicCameraSettings: OrthographicCameraSettingsModel,
		perspectiveCameraSettings: PerspectiveCameraSettingsModel,
	})
	.actions((self) => ({
		setOrthographicCameraSettings(to: OrthographicCameraSettingsType){
			self.orthographicCameraSettings.set<OrthographicCameraSettingsType>(to);
		},
		setPerspectiveCameraSettings(to: PerspectiveCameraSettingsType){
			self.perspectiveCameraSettings.set<PerspectiveCameraSettingsType>(to);
		},
	}))
	.views((self) => ({
		get orthographicIsDefault(): boolean {
			return !rootStore.App.debug;
		},
		get perspectiveIsDefault(): boolean {
			return rootStore.App.debug;
		}
	}));

export default Cameras;
