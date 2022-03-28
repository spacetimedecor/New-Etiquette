import { useState } from 'react';
import { useCursor } from '@react-three/drei';
import { useGesture } from 'react-use-gesture';
import { useThree } from '@react-three/fiber';
import { arraysEqual } from '../utils';
import { useStore } from '../stores';
import { NodeType } from '../stores/Nodes';

const useDragAndDroppable = (model: NodeType) => {
  // Position:
  const { position } = model;

  // Three State:
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // History:
  const { History } = useStore();

  // Cursor Flags:
  const [hovered, setHover] = useState(false);
  const [dragging, setDragging] = useState(false);
  useCursor(hovered, 'grab', 'auto');
  useCursor(dragging, 'grabbing', 'grab');

  // Gesture Binds:
  const bindGestures = useGesture({
    onDragStart: () => History.startGroup(() => {}),
    onDrag: ({ down, xy: [x, y] }) => {
      setDragging(down);
      const newPosition: [x: number, y: number, z: number] = [
        x / aspect - viewport.width / 2,
        -y / aspect + viewport.height / 2,
        0,
      ];

      if (!arraysEqual(position, newPosition)) {
        model.changePosition(newPosition);
      }
    },
    onDragEnd: () => {
      History.stopGroup();
    },
    onHover: ({ hovering }) => setHover(hovering),
  });

  return [bindGestures, hovered, dragging];
};

export default useDragAndDroppable;
