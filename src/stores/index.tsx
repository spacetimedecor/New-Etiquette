import Root from "./Root";
import App from "./App";
import defaultSettings from "../defaultSettings";
import {injectStores} from "@mobx-devtools/tools";
import {createContext, ReactNode, useContext} from "react";
import {Instance} from "mobx-state-tree";
import Cameras from "./Cameras";
import {
	OrthographicCameraSettings,
	OrthographicCameraSettingsModel,
	PerspectiveCameraSettings,
	PerspectiveCameraSettingsModel
} from "../models/settings/Cameras";
import {generateUUID} from "three/src/math/MathUtils";
import Nodes from "./Nodes";
const {RootNode, NodesStore, StandardNode } = Nodes;

const {
	appSettings,
	nodeSettings,
	camerasSettings: {
		id: camerasId,
		orthographicSettings,
		perspectiveSettings
	}
} = defaultSettings;

export const appStore = App.create(appSettings);
export const camerasStore = Cameras.create({
	id: camerasId,
	orthographicCameraSettings: OrthographicCameraSettingsModel.create(
		new OrthographicCameraSettings(orthographicSettings)
	),
	perspectiveCameraSettings: PerspectiveCameraSettingsModel.create(
		new PerspectiveCameraSettings(perspectiveSettings)
	),
})


const rootNode = RootNode.create({
	...nodeSettings,
	id: generateUUID()
})

const nodesStore = NodesStore.create({
	id: generateUUID(),
	rootNode: rootNode.id,
});

export const rootStore = Root.create({
	App: appStore.id,
	Cameras: camerasStore.id,
	Nodes: nodesStore.id,
});


injectStores({ rootStore });

rootStore.Nodes.rootNode.changePosition([10, 10, 0]);

const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({store, children}: {store: Instance<typeof rootStore>; children: ReactNode}) =>
	<StoreContext.Provider value={store}>{children}</StoreContext.Provider>;


