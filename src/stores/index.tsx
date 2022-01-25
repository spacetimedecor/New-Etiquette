import {createContext, useContext, ReactNode} from "react";
import {NodesStore} from "./nodes";
import RootNode from "../models/nodes/rootNode";
import {NodeNames} from "../defaultSettings";
import {AppStore} from "./app";
import {injectStores} from "@mobx-devtools/tools";
import {CamerasStore} from "./cameras";

export class RootStore {
	NodesStore;
	AppStore;
	CamerasStore;

	constructor() {
		this.NodesStore = new NodesStore(this);
		this.AppStore = new AppStore(this);
		this.CamerasStore = new CamerasStore(this);
	}
}

export const rootStore = new RootStore();

injectStores({ rootStore });

rootStore.NodesStore.rootNode = new RootNode({
	nodeArgs: {
		type: NodeNames.Root,
		name: "Root Node",
	}
});

rootStore.NodesStore.rootNode.changePosition([10, 10, 0]);

const StoreContext = createContext(rootStore);
export const useStore = () => useContext(StoreContext);
export const StoreProvider = ({store, children}: {store: RootStore; children: ReactNode}) =>
	<StoreContext.Provider value={store}>{children}</StoreContext.Provider>;


