import React, { createContext, ReactNode, useContext } from 'react';
import { injectStores } from '@mobx-devtools/tools';
import { addMiddleware, Instance } from 'mobx-state-tree';
import { actionLogger } from 'mst-middlewares';
import { generateUUID } from 'three/src/math/MathUtils';
import Cameras from './Cameras';
import defaultSettings, { NodeNames } from '../defaultSettings';
import App from './App';
import Root from './Root';
import Nodes from './Nodes';
import {
  OrthographicCameraSettings,
  PerspectiveCameraSettings,
} from '../models/settings/Cameras';

const { RootNode, NodesStore } = Nodes;

const {
  appSettings,
  nodeSettings,
  camerasSettings: { orthographicSettings, perspectiveSettings },
} = defaultSettings;

export const appStore = App.create({
  ...appSettings,
  id: generateUUID(),
});
export const camerasStore = Cameras.create({
  id: generateUUID(),
  orthographicCameraSettings:
    OrthographicCameraSettings.create(orthographicSettings),
  perspectiveCameraSettings:
    PerspectiveCameraSettings.create(perspectiveSettings),
});

const rootNode = RootNode.create({
  ...nodeSettings,
  type: NodeNames.Root,
  id: generateUUID(),
});

const nodesStore = NodesStore.create({
  id: generateUUID(),
  rootNode,
});

export const rootStore = Root.create({
  App: appStore,
  Cameras: camerasStore,
  Nodes: nodesStore,
});

addMiddleware(rootStore, actionLogger);

injectStores({ rootStore });

const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
export function StoreProvider({
  store,
  children,
}: {
  store: Instance<typeof rootStore>;
  children: ReactNode;
}) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
