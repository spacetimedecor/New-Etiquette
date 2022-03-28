import React from 'react';
import { Canvas } from '@react-three/fiber';
import { NodeTypeSwitch } from 'components/Nodes';
import { OrbitControls } from '@react-three/drei';
import Cameras from 'components/Cameras';
import useKeyPress from 'hooks/useKeyPress';
import { rootStore, StoreProvider, useStore } from 'stores';
import './App.css';

export default function App() {
  // History:
  const { History } = useStore();
  useKeyPress('h', () => {
    if (History.canUndo) History.undo();
  });
  return (
    <StoreProvider store={rootStore}>
      <Canvas gl={{ antialias: true }}>
        <Cameras />
        <gridHelper args={[100, 25, 10]} />
        <ambientLight />
        {rootStore.Nodes.rootNode && (
          <NodeTypeSwitch model={rootStore.Nodes.rootNode} />
        )}
        {/* <OrbitControls /> */}
      </Canvas>
    </StoreProvider>
  );
}
