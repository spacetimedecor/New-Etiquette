import {Canvas, useFrame} from "@react-three/fiber";
import {rootStore, StoreProvider, useStore} from './src/stores';
import {NodeTypeSwitch} from "./src/components/Nodes";
import {OrbitControls, OrthographicCamera, PerspectiveCamera, useHelper} from '@react-three/drei';
// import {CameraHelper} from "three";

import "./App.css";
import {createRef, useEffect, useRef} from "react";
import {BoxHelper, CameraHelper, Object3D, Vector3} from "three";
import {VertexNormalsHelper} from "three/examples/jsm/helpers/VertexNormalsHelper";
import Cameras from "./src/components/Cameras";


// const [light, set] = useState()
// return (
//   <>
//     <light ref={set} />
//     {light && <foo light={light} />

export default function App() {
  return (
    <StoreProvider store={rootStore} >
      <Canvas >
        <Cameras />
        <gridHelper args={[100, 25, 10]} />
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

