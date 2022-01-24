import {useSpring} from "@react-spring/three";
import {useEffect} from "react";

export const springPosition = (
	position: [x: number, y: number, z: number],
	config: { friction: number }
) => {
	const initialPosition = position;
	const [spring, set] = useSpring(() => ({ position: initialPosition, config }))

	useEffect(() => {
		set({ position });
	}, [position])

	return [spring];
}
