import { a } from "@react-spring/three";
import {useEffect, useRef} from "react";
import {CameraHelper} from "three";
import {useHelper} from "@react-three/drei";
import {useStore} from "../stores";
import {springPosition} from "../utils/hooks/springPosition";
import {Camera, useThree} from "@react-three/fiber";
import {observer} from "mobx-react-lite";

const Cameras = observer(() => {
	const {
		Cameras: {
			orthographicCameraSettings,
			perspectiveCameraSettings,
		},
		App: {
			currentLevel
		}
	} = useStore();

	const orthRef = useRef<Camera>();
	const persRef = useRef<Camera>();

	// useHelper(orthRef, CameraHelper, 1, 'red');

	const [perspectiveX, perspectiveY, perspectiveZ] = perspectiveCameraSettings.position;
	const [orthographicX, orthographicY, orthographicZ] = orthographicCameraSettings.position;

	const [spring] = springPosition(
		[orthographicX, orthographicY, orthographicZ],
		{friction: 25}
	);

	// const set = useThree((state) => state.set);
	//
	// useEffect(() => {
	// 	if (!persRef.current || !orthRef.current) return;
	// 	set({ camera: persRef.current! });
	// 	persRef.current!.lookAt(orthRef.current!.position);
	// }, [persRef])

	return <>
		<a.orthographicCamera
			ref={orthRef}
			{...spring}
			near={orthographicCameraSettings.near}
			far={orthographicCameraSettings.far}
			zoom={orthographicCameraSettings.zoom}
		/>
		{/*<a.perspectiveCamera*/}
		{/*	ref={persRef}*/}
		{/*	position={[perspectiveX, perspectiveY, perspectiveZ]}*/}
		{/*	near={perspectiveCameraSettings.near}*/}
		{/*	far={perspectiveCameraSettings.far}*/}
		{/*	zoom={perspectiveCameraSettings.zoom}*/}
		{/*/>*/}
	</>
})

export default Cameras;
