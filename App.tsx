import {Canvas} from "@react-three/fiber";
import {rootStore, StoreProvider, useStore} from './src/stores';
import {NodeTypeSwitch} from "./src/components/Nodes";
import {OrbitControls} from '@react-three/drei';
import Cameras from "./src/components/Cameras";
import "./App.css";
import useKeyPress from "./src/utils/hooks/useKeyPress";

export default function App() {
  // History:
  const { History } = useStore();
  useKeyPress("h", () => {
    console.log("H");
    History.canUndo && History.undo();
  });
  return (
    <StoreProvider store={rootStore} >
        <Canvas gl={{ antialias: true }} >
          <Cameras />
          <gridHelper args={[100, 25, 10]} />
          <ambientLight />
          {
            rootStore.Nodes.rootNode &&
            <NodeTypeSwitch model={rootStore.Nodes.rootNode} />
          }
          {/*<OrbitControls />*/}
        </Canvas>
    </StoreProvider>
  );
}

