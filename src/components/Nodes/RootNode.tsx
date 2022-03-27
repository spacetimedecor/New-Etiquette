import {a, useSpring} from "@react-spring/three";
import {NodeProps, NodeTypeSwitch} from "./index";
import {observer} from "mobx-react-lite";
import {springPosition} from "../../utils/hooks/springPosition";
import {useEffect, useRef, useState} from "react";
import {BoxHelper, Object3D} from "three";
import {useHelper} from "@react-three/drei/native";
import {RootNodeType, NodeType} from "../../stores/Nodes";
import {useCursor} from "@react-three/drei";
import { useGesture } from "react-use-gesture";
import {useStore} from "../../stores";
import {useThree} from "@react-three/fiber";
import {arraysEqual} from "../../utils";
import useKeyPress from "../../utils/hooks/useKeyPress";

const RootNodeComponent = observer((props: NodeProps) => {
	const {History} = useStore();
	const groupRef = useRef<Object3D>();
	const [hovered, setHover] = useState(false);
	const [dragging, setDragging] = useState(false);
	const springs = useSpring({ color: hovered ? '#666666' : '#333333'});
	const { size, viewport } = useThree();
	const aspect = size.width / viewport.width

	const RootNodeModel = props.model as RootNodeType;
	const { name, position, children } = RootNodeModel;

	const [spring] = springPosition(
		[position[0], position[1], position[2]],
		{friction: 25}
	);

	const bind = useGesture({
		onDragStart: () => History.startGroup(() => {}),
		onDrag: ({ down, xy: [x, y] }) => {
			setDragging(down);
			const newPosition: [x: number, y: number, z: number] = [
				(x / aspect) - (viewport.width / 2),
				(-y / aspect) + (viewport.height / 2),
				0
			];

			if (!arraysEqual(position, newPosition)) {
				RootNodeModel.changePosition(newPosition);
			}
		},
		onDragEnd: () => { History.stopGroup() },
		onHover: ({ hovering }) => setHover(hovering),
	})

	useKeyPress("h", () => {
		console.log("H");
		History.canUndo && History.undo();
	});

	useCursor(hovered, 'grab', 'auto');
	useCursor(dragging, 'grabbing', 'grab');
	// useHelper(groupRef, BoxHelper, 1, "yellow");

	return (
		// @ts-ignore
		<a.group
			{...bind()}
			{...spring}
			name={name}
			ref={groupRef}
		>

			{/*Circular background*/}
			<mesh>
				<circleGeometry attach="geometry" args={[1, 100]} />
				<a.meshBasicMaterial color={springs.color} />
			</mesh>

			{/*Border*/}
			<mesh>
				<ringGeometry args={[1, 1.01, 100]} />
				<meshBasicMaterial color="white"/>
			</mesh>

			{/*Children*/}
			{
				children.map((childNode: NodeType) =>
					<NodeTypeSwitch model={childNode} />
				)
			}
		</a.group>
	);
});


export default RootNodeComponent;
