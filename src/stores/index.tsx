import Root from "./Root";
import App from "./App";
import defaultSettings from "../defaultSettings";
import {injectStores} from "@mobx-devtools/tools";
import {createContext, ReactNode, useContext} from "react";
import {addMiddleware, Instance} from "mobx-state-tree";
import { actionLogger, UndoManager } from "mst-middlewares";
import Cameras from "./Cameras";
import {generateUUID} from "three/src/math/MathUtils";
import Nodes from "./Nodes";
import {OrthographicCameraSettings, PerspectiveCameraSettings} from "../models/settings/Cameras";
const {RootNode, NodesStore } = Nodes;

const {
	appSettings,
	nodeSettings,
	camerasSettings: {
		orthographicSettings,
		perspectiveSettings,
	},
} = defaultSettings;

export const appStore = App.create({
	...appSettings,
	id: generateUUID(),
});
export const camerasStore = Cameras.create({
	id: generateUUID(),
	orthographicCameraSettings: OrthographicCameraSettings.create(orthographicSettings),
	perspectiveCameraSettings: PerspectiveCameraSettings.create(perspectiveSettings),
})

const rootNode = RootNode.create({
	...nodeSettings,
	id: generateUUID()
});

const nodesStore = NodesStore.create({
	id: generateUUID(),
	rootNode: rootNode,
});

export const rootStore = Root.create({
	App: appStore,
	Cameras: camerasStore,
	Nodes: nodesStore,
});

addMiddleware(rootStore, actionLogger);

injectStores({ rootStore });

rootStore.Nodes.rootNode.changePosition([10, 10, 0]);

const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({store, children}: {store: Instance<typeof rootStore>; children: ReactNode}) =>
	<StoreContext.Provider value={store}>{children}</StoreContext.Provider>;




