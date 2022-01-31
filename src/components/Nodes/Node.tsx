import { a } from "@react-spring/three";
import {NodeProps} from "./index";
import {observer} from "mobx-react-lite";
import {springPosition} from "../../utils/hooks/springPosition";
import {useRef} from "react";
import {BoxHelper, Object3D} from "three";
import {useHelper} from "@react-three/drei/native";
import {NodeType} from "../../stores/Nodes";

const NodeComponent = observer((props: NodeProps) => {
	const NodeModel = props.model as NodeType;
	const { name, position } = NodeModel;

	const [spring] = springPosition(
		[position[0], position[1], position[2]],
		{friction: 25}
	);
	const groupRef = useRef<Object3D>();

	useHelper(groupRef, BoxHelper, 1, "yellow");

	return (
		<a.group
			{...spring}
			name={name}
			ref={groupRef}
			onClick={() => {
				NodeModel.changePosition([-10, -10, 0]);
			}}
		>
			<mesh>
				<circleGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
		</a.group>
	);
});


export default NodeComponent;
