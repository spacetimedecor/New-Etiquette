import {NodeNames} from "../../defaultSettings";
import NodeComponent from "./Node";
import RootNodeComponent from "./RootNode";
import React from "react";
import {NodeType} from "../../stores/Nodes";

const NodeTypeMap = {
	[NodeNames.Standard]: NodeComponent,
	[NodeNames.Root]: RootNodeComponent,
}

export interface NodeProps {
	model: NodeType;
}

export const NodeTypeSwitch = ({model, model: {type}}: NodeProps) => {
	const Component = NodeTypeMap[type];
	return <Component model={model} />
};

