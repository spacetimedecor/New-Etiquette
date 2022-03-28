import React, { useRef, useState } from 'react';
import { a } from '@react-spring/three';
import { observer } from 'mobx-react-lite';
import { BoxHelper, Object3D } from 'three';
import { useHelper } from '@react-three/drei/native';
import { useCursor } from '@react-three/drei';
import { NodeType } from '../../stores/Nodes';
import { rootStore, useStore } from '../../stores';
import springPosition from '../../hooks/springPosition';
import { NodeProps } from './index';

const NodeComponent = observer((props: NodeProps) => {
  const { History } = useStore();
  const { name, position } = props.model as NodeType;
  const { changePosition } = rootStore.Cameras.orthographicCameraSettings;

  const groupRef = useRef<Object3D>();
  const [hovered, setHover] = useState(false);

  useCursor(hovered, 'pointer', 'auto');
  // useHelper(groupRef, BoxHelper, 1, "yellow");
  const [spring] = springPosition([position[0], position[1], position[2]], {
    friction: 25,
  });

  return (
    <a.group
      {...spring}
      name={name}
      ref={groupRef}
      onClick={() => {
        // NodeModel.changePosition([-10, -10, 0]);
        changePosition([10, 20, 30]);
      }}
      onDoubleClick={() => {
        if (History.canUndo) History.undo();
      }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh>
        <circleGeometry args={[1, 32, 32]} />
        {/* <meshStandardMaterial color={"orange"} /> */}
      </mesh>
    </a.group>
  );
});

export default NodeComponent;
