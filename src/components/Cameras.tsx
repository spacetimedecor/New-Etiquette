import {useRef} from "react";
import {CameraHelper, Object3D} from "three";
import {OrthographicCamera, PerspectiveCamera, useHelper} from "@react-three/drei";
import {useStore} from "../stores";

const Cameras = () => {
	const groupRef = useRef<Object3D>();
	useHelper(groupRef, CameraHelper, 1, 'red');
	const {
		Cameras,
		Cameras: {
			orthographicCameraSettings,
			perspectiveCameraSettings,
		}
	} = useStore();
	const [perspectiveX, perspectiveY, perspectiveZ] = perspectiveCameraSettings.position;
	const [orthographicX, orthographicY, orthographicZ] = orthographicCameraSettings.position;
	return <>
		<PerspectiveCamera
			makeDefault={Cameras.perspectiveIsDefault}
			position={[perspectiveX, perspectiveY, perspectiveZ]}
			near={perspectiveCameraSettings.near}
			far={perspectiveCameraSettings.far}
			zoom={perspectiveCameraSettings.zoom}
		/>
		<OrthographicCamera
			ref={groupRef}
			makeDefault={Cameras.orthographicIsDefault}
			position={[orthographicX, orthographicY, orthographicZ]}
			near={orthographicCameraSettings.near}
			far={orthographicCameraSettings.far}
			zoom={orthographicCameraSettings.zoom}
		/>
	</>
}

export default Cameras;
