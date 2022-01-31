import {types} from "mobx-state-tree";
import AppStore from "./App";
import CamerasStore from "./Cameras";
import Nodes from "./Nodes";
const {NodesStore} = Nodes;

const Root = types
	.model("Root", {
		App: AppStore,
		Nodes: NodesStore,
		Cameras: CamerasStore,
	});

export default Root;
