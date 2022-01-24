import {observable} from "mobx";
import RootNode from "../models/nodes/rootNode";
import Node from "../models/nodes/node";

export class NodesStore {
	@observable rootNode: RootNode | null = null;
	nodeMap: {[id: string]: Node} = {};
}
