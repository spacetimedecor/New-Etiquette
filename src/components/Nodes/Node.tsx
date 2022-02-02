import {a} from "@react-spring/three";
import {NodeProps} from "./index";
import {observer} from "mobx-react-lite";
import {springPosition} from "../../utils/hooks/springPosition";
import {useRef, useState} from "react";
import {BoxHelper, Object3D} from "three";
import {useHelper} from "@react-three/drei/native";
import {NodeType} from "../../stores/Nodes";
import {rootStore, useStore} from "../../stores";
import {useCursor} from "@react-three/drei";

const NodeComponent = observer((props: NodeProps) => {
	const { History } = useStore();
	const { name, position } = (props.model as NodeType);
	const { changePosition } = rootStore.Cameras.orthographicCameraSettings;

	const groupRef = useRef<Object3D>();
	const [hovered, setHover] = useState(false);

	useCursor(hovered, 'pointer', 'auto');
	useHelper(groupRef, BoxHelper, 1, "yellow");
	const [spring] = springPosition([position[0], position[1], position[2]], { friction: 25 });

	return (
		<a.group
			{...spring}
			name={name}
			ref={groupRef}
			onClick={() => {
				// NodeModel.changePosition([-10, -10, 0]);
				changePosition([10, 20, 30]);
			}}
			onDoubleClick={() => {
				History.canUndo && History.undo();
			}}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}
		>
			<mesh>
				<circleGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
		</a.group>
	);
});


export default NodeComponent;
