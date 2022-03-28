import { Instance, types } from 'mobx-state-tree';
import { UndoManager } from 'mst-middlewares';
import AppStore from './App';
import CamerasStore from './Cameras';
import Nodes from './Nodes';

const { NodesStore } = Nodes;

const Root = types.model('Root', {
  App: AppStore,
  Nodes: NodesStore,
  Cameras: CamerasStore,
  History: types.optional(UndoManager, {}),
});

export type RootType = Instance<typeof Root>;

export default Root;
