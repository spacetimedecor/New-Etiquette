import {types} from "mobx-state-tree";
import AppStore from "./App";
import CamerasStore from "./Cameras";
import Nodes from "./Nodes";
const {NodesStore} = Nodes;

const Root = types
	.model("Root", {
		App: types.reference(AppStore),
		Cameras: types.reference(CamerasStore),
		Nodes: types.reference(NodesStore)
	});

export default Root;
