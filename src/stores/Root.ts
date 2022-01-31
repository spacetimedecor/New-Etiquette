import {Instance, types} from "mobx-state-tree";
import AppStore from "./App";
import CamerasStore from "./Cameras";
import Nodes from "./Nodes";
import {UndoManager} from "mst-middlewares";
const {NodesStore} = Nodes;

const Root = types
	.model("Root", {
		App: AppStore,
		Nodes: NodesStore,
		Cameras: CamerasStore,
		History: types.optional(UndoManager, {})
	});

export type RootType =
	Instance<typeof Root>;

export default Root;
