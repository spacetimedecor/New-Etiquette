import { useEffect, useState } from 'react';

function useKeyPress(targetKey: string, callback: () => void) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    function downHandler({ key }: { key: string }) {
      if (key === targetKey) {
        setKeyPressed(true);
        callback();
      }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [callback, targetKey]); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default useKeyPress;
