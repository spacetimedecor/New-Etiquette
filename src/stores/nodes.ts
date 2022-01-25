import {observable} from "mobx";
import RootNode from "../models/nodes/rootNode";
import Node from "../models/nodes/node";
import {RootStore} from "./index";

export class NodesStore {
	rootStore;

	nodeMap: {[id: string]: Node} = {};
	@observable.deep rootNode: RootNode | null = null;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}
}
