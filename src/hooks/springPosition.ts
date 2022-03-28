import { useSpring } from '@react-spring/three';
import { useEffect } from 'react';

const useSpringPosition = (
  position: [x: number, y: number, z: number],
  config: { friction: number },
) => {
  const initialPosition = position;

  const [spring, set] = useSpring(() => ({
    position: initialPosition,
    config,
  }));

  useEffect(() => {
    set({ position });
  }, [position, set]);

  return [spring];
};

export default useSpringPosition;
