import {NodeNames} from "../../defaultSettings";
import NodeComponent from "./Node";
import NodeModel from "../../models/nodes/node";
import RootNodeComponent from "./RootNode";
import React from "react";

const NodeTypeMap = {
	[NodeNames.Standard]: NodeComponent,
	[NodeNames.Root]: RootNodeComponent,
}

export interface NodeProps {
	model: NodeModel;
}

export const NodeTypeSwitch = (props: NodeProps) => {
	const Component = NodeTypeMap[props.model.nodeSettings.type];
	return <Component model={props.model} />
};

