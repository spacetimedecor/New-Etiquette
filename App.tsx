import {Canvas, useFrame} from "@react-three/fiber";
import {rootStore, StoreProvider} from './src/stores';
import {NodeTypeSwitch} from "./src/components/Nodes";
import {OrbitControls, OrthographicCamera, useHelper} from '@react-three/drei/native'

import "./App.css";
import {createRef, useEffect, useRef} from "react";
import {BoxHelper, CameraHelper, Object3D} from "three";
import {VertexNormalsHelper} from "three/examples/jsm/helpers/VertexNormalsHelper";

export default function App() {


  // const cameraRef = useRef();
  //
  // useEffect(() => {
  //   const test = cameraRef.current;
  // }, [cameraRef.current])

  // useHelper(cameraRef, CameraHelper, 1, 'hotpink');

  return (
    <StoreProvider store={rootStore} >
      <Canvas orthographic camera={{ zoom: 25, position: [0, 0, 100] }}>
        {/*<fog attach="fog" args={["floralwhite", 0, 20]} />*/}
        {/*<OrthographicCamera ref={cameraRef} zoom={50} position={[0, 0, 100]} />*/}
        <gridHelper args={[30, 30, 30]} />
        <OrbitControls />
        <ambientLight />
        {
          rootStore.NodesStore?.rootNode &&
          <NodeTypeSwitch model={rootStore.NodesStore.rootNode} />
        }
      </Canvas>
    </StoreProvider>
  );
}
