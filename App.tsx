import {Canvas} from "@react-three/fiber";
import {rootStore, StoreProvider} from './src/stores';
import {NodeTypeSwitch} from "./src/components/Nodes";
import {OrbitControls} from '@react-three/drei';
import Cameras from "./src/components/Cameras";
import "./App.css";

export default function App() {
  return (
    <StoreProvider store={rootStore} >
      <Canvas >
        <Cameras />
        <gridHelper args={[100, 25, 10]} />
        <OrbitControls />
        <ambientLight />
        {
          rootStore.Nodes.rootNode &&
          <NodeTypeSwitch model={rootStore.Nodes.rootNode} />
        }
      </Canvas>
    </StoreProvider>
  );
}

