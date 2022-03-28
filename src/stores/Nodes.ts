import { Instance, types } from 'mobx-state-tree';
import { NodeNames } from '../defaultSettings';

// Spring config
export const SpringConfig = types.model({
  friction: 25,
});

// Node types
const Node = types
  .model('Node', {
    id: types.identifier,
    type: types.enumeration('Type', [...Object.values(NodeNames)]),
    name: types.string,
    color: types.string,
    position: types.array(types.number),
  })
  .actions(self => ({
    changePosition([x, y, z]: [x: number, y: number, z: number]) {
      self.position[0] = x;
      self.position[1] = y;
      self.position[2] = z;
    },
  }));

export type NodeType = Instance<typeof Node>;

let StandardNode = types.compose(Node, types.model({})).named('Standard Node');

let RootNode = types.compose(Node, types.model({})).named('Root Node');

// Adding children functionality after node type def so that we avoid circular refs
const Children = types.model('Children', {
  children: types.optional(types.array(types.union(Node, StandardNode)), []),
});

RootNode = types.compose(RootNode, Children);
StandardNode = types.compose(StandardNode, Children);

export type RootNodeType = Instance<typeof RootNode> &
  Instance<typeof Children>;

export type StandardNodeType = Instance<typeof StandardNode> &
  Instance<typeof Children>;

// Nodes
const NodesStore = types.model('Nodes', {
  id: types.identifier,
  rootNode: RootNode,
});

export default { NodesStore, RootNode, StandardNode };
