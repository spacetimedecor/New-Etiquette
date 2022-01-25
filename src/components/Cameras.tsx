import {useRef} from "react";
import {CameraHelper, Object3D} from "three";
import {OrthographicCamera, PerspectiveCamera, useHelper} from "@react-three/drei";
import {useStore} from "../stores";

const Cameras = () => {
	const groupRef = useRef<Object3D>();
	useHelper(groupRef, CameraHelper, 1, 'red');
	const {
		CamerasStore: {
			perspectiveSettings,
			perspectiveIsDefault,
			orthographicSettings,
			orthographicIsDefault,
		}
	} = useStore();
	return <>
		<PerspectiveCamera
			makeDefault={perspectiveIsDefault}
			position={perspectiveSettings.position}
			near={perspectiveSettings.near}
			far={perspectiveSettings.far}
			zoom={perspectiveSettings.zoom}
		/>
		<OrthographicCamera
			ref={groupRef}
			makeDefault={orthographicIsDefault}
			position={orthographicSettings.position}
			near={orthographicSettings.near}
			far={orthographicSettings.far}
			zoom={orthographicSettings.zoom}
		/>
	</>
}

export default Cameras;
