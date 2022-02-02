import { a } from "@react-spring/three";
import {NodeProps, NodeTypeSwitch} from "./index";
import {observer} from "mobx-react-lite";
import {springPosition} from "../../utils/hooks/springPosition";
import {useRef, useState} from "react";
import {BoxHelper, Object3D} from "three";
import {useHelper} from "@react-three/drei/native";
import {RootNodeType, NodeType} from "../../stores/Nodes";
import {useCursor} from "@react-three/drei";
import {rootStore, useStore} from "../../stores";

const RootNodeComponent = observer((props: NodeProps) => {
	const {History} = useStore();
	const groupRef = useRef<Object3D>();
	const [hovered, setHover] = useState(false);

	const RootNodeModel = props.model as RootNodeType;
	const { name, position, children } = RootNodeModel;

	const [spring] = springPosition(
		[position[0], position[1], position[2]],
		{friction: 25}
	);

	useCursor(hovered, 'pointer', 'auto');
	useHelper(groupRef, BoxHelper, 1, "yellow");

	return (
		<a.group
			{...spring}
			name={name}
			ref={groupRef}
			onClick={() => {
				// NodeModel.changePosition([-10, -10, 0]);
				rootStore.Cameras.orthographicCameraSettings.changePosition([10, 20, 30]);
			}}
			onDoubleClick={() => {
				History.canUndo && History.undo();
			}}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<mesh
			>
				<circleGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
			{
				children.map((childNode: NodeType) =>
					<NodeTypeSwitch model={childNode} />
				)
			}
		</a.group>
	);
});


export default RootNodeComponent;
