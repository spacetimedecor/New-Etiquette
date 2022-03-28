import { types } from 'mobx-state-tree';

import {
  OrthographicCameraSettings,
  OrthographicCameraSettingsType,
  PerspectiveCameraSettings,
  PerspectiveCameraSettingsType,
} from '../models/settings/Cameras';
import { rootStore } from './index';

const Cameras = types
  .model('Cameras', {
    id: types.identifier,
    orthographicCameraSettings: OrthographicCameraSettings,
    perspectiveCameraSettings: PerspectiveCameraSettings,
  })
  .actions(self => ({
    setOrthographicCameraSettings(to: Partial<OrthographicCameraSettingsType>) {
      Object.assign(self.orthographicCameraSettings, to);
    },
    setPerspectiveCameraSettings(to: Partial<PerspectiveCameraSettingsType>) {
      Object.assign(self.perspectiveCameraSettings, to);
    },
  }))
  .views(self => ({
    get orthographicIsDefault(): boolean {
      return !rootStore.App.debug;
    },
    get perspectiveIsDefault(): boolean {
      return rootStore.App.debug;
    },
  }));

export default Cameras;
