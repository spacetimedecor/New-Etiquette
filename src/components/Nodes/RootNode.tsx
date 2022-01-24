import { a } from "@react-spring/three";
import RootNode from "../../models/nodes/rootNode";
import Node from "../../models/nodes/node";
import {NodeProps, NodeTypeSwitch} from "./index";
import {observer} from "mobx-react-lite";
import {springPosition} from "../../utils/hooks/springPosition";
import {useRef} from "react";
import {BoxHelper, Object3D} from "three";
import {useHelper} from "@react-three/drei/native";

const RootNodeComponent = observer((props: NodeProps) => {
	const RootNodeModel: RootNode = props.model as RootNode;
	const { nodeSettings: { name, position, springConfig }, children } = RootNodeModel;

	const [spring] = springPosition(position, springConfig);
	const groupRef = useRef<Object3D>();

	useHelper(groupRef, BoxHelper, 1, "yellow");

	return (
		<a.group
			{...spring}
			name={name}
			ref={groupRef}
			onClick={() => {
				RootNodeModel.changePosition([-10, -10, 0]);
			}}
		>
			<mesh>
				<circleGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
			{
				children.map((childNode: Node) =>
					<NodeTypeSwitch model={childNode} />
				)
			}
		</a.group>
	);
});


export default RootNodeComponent;
