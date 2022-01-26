import {types} from "mobx-state-tree";
import {EnvironmentModel} from "../models/environment";

// Mixins
const WithEnvironment = types
	.model({
		environment: EnvironmentModel
	});

// Spring config
const SpringConfig = types.model({
	friction: 25
})

// Node types
const Node = types
	.model("Node", {
		id: types.identifier,
		name: types.string,
		color: types.string,
		position: types.array(types.number),
		springConfig: types.map(SpringConfig)
	})
	.actions((self) => ({
		changePosition(to: [x: number, y: number, z: number]) {
			self.position[0] = to[0];
			self.position[1] = to[1];
			self.position[2] = to[2];
		}
	}));

let StandardNode = types
	.compose(
		Node,
		types.model( {

		})
	)
	.named("Standard Node");

let RootNode = types
	.compose(
		Node,
		types.model( {

		})
	)
	.named("Root Node");

// Adding children functionality after node type def so that we avoid circular refs
const Children = types
	.model("Children", {
		children: types.array(
			types.union(
				Node,
				StandardNode
			)
		)
	});

RootNode = types.compose(RootNode, Children, WithEnvironment);
StandardNode = types.compose(StandardNode, Children, WithEnvironment);

// Nodes
const NodesStore = types.model("Nodes", {
	id: types.identifier,
	rootNode: types.reference(RootNode),
})

export default { NodesStore, RootNode, StandardNode };
