import {NodeProps} from "./index";
import {useSpring} from "@react-spring/three";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

const NodeComponent = observer(({ model }: NodeProps) => {

	const { nodeSettings: { position, name } } = model;

	const [spring, set] = useSpring(() => ({ position: [0, 0, 0], config: { friction: 100 } }))

	useEffect(() => {
		set({ position: model.nodeSettings.position });
	}, [model.nodeSettings.position])

	return (
		<group
			name={name}
		>
			<mesh>
				<circleGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
		</group>
	);
})

export default NodeComponent;
