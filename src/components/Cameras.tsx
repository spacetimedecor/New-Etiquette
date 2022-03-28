import React, { useRef } from 'react';
import { a } from '@react-spring/three';
import { CameraHelper } from 'three';
import { useHelper } from '@react-three/drei';
import springPosition from 'hooks/springPosition';
import { Camera } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';

const Cameras = observer(() => {
  const {
    Cameras: { orthographicCameraSettings, perspectiveCameraSettings },
    App: { currentLevel },
  } = useStore();

  const orthRef = useRef<Camera>();
  const persRef = useRef<Camera>();

  useHelper(orthRef, CameraHelper);

  const [perspectiveX, perspectiveY, perspectiveZ] =
    perspectiveCameraSettings.position;
  const [orthographicX, orthographicY, orthographicZ] =
    orthographicCameraSettings.position;

  const [spring] = springPosition(
    [orthographicX, orthographicY, orthographicZ],
    { friction: 25 },
  );

  // const set = useThree((state) => state.set);
  //
  // useEffect(() => {
  // 	if (!persRef.current || !orthRef.current) return;
  // 	set({ camera: persRef.current! });
  // 	persRef.current!.lookAt(orthRef.current!.position);
  // }, [persRef])

  return (
    <>
      <a.orthographicCamera
        {...spring}
        ref={orthRef}
        near={orthographicCameraSettings.near}
        far={orthographicCameraSettings.far}
        zoom={orthographicCameraSettings.zoom}
      />
      {/* <a.perspectiveCamera */}
      {/*	ref={persRef} */}
      {/*	position={[perspectiveX, perspectiveY, perspectiveZ]} */}
      {/*	near={perspectiveCameraSettings.near} */}
      {/*	far={perspectiveCameraSettings.far} */}
      {/*	zoom={perspectiveCameraSettings.zoom} */}
      {/* /> */}
    </>
  );
});

export default Cameras;
