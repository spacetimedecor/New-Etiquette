import { a, useSpring } from '@react-spring/three';
import { observer } from 'mobx-react-lite';
import React, { memo, useRef } from 'react';
import { BoxHelper, Object3D } from 'three';
import { useHelper } from '@react-three/drei/native';
import { RootNodeType, NodeType } from 'stores/Nodes';
import springPosition from 'hooks/springPosition';
import dragAndDroppable from 'hooks/dragAndDroppable';
import { NodeProps, NodeTypeSwitch } from './index';

const RootNodeComponent = observer((props: NodeProps) => {
  // Model:
  const RootNodeModel = props.model as RootNodeType;
  const { name, position, children } = RootNodeModel;

  // Element Ref:
  const groupRef = useRef<Object3D>();

  // Drag and Drop:
  const [bindGestures, hovered] = dragAndDroppable(RootNodeModel);

  // Style Interpolations:
  const style = useSpring({ color: hovered ? '#666666' : '#333333' });

  // Position Interpolations:
  const [spring] = springPosition([position[0], position[1], position[2]], {
    friction: 15,
  });

  // Box Helper:
  useHelper(groupRef, BoxHelper);

  return (
    // @ts-ignore
    <a.group {...bindGestures()} {...spring} name={name} ref={groupRef}>
      {/* Circular background */}
      <mesh>
        <circleGeometry attach="geometry" args={[1, 100]} />
        <a.meshBasicMaterial color={style.color} />
      </mesh>

      {/* Border */}
      <mesh>
        <ringGeometry args={[1, 1.01, 100]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Children */}
      {children.map((childNode: NodeType) => (
        <NodeTypeSwitch model={childNode} />
      ))}
    </a.group>
  );
});

export default memo(RootNodeComponent);
