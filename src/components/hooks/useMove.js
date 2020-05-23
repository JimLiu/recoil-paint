import { useState, useCallback, useEffect } from 'react';

export default function useMove(func) {
  const [isMoving, setIsMoving] = useState(false);
  const [origin, setOrigin] = useState({ clientX: 0, clientY: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const callback = useCallback((status, isMoving, origin, offset) => {
    func({ status, isMoving, origin, offset  });
  }, [func]);

  const handleMouseDown = useCallback(({ clientX, clientY, metaKey, shiftKey }) => {
    let origin = { clientX, clientY, metaKey, shiftKey };
    setIsMoving(true);
    setOrigin(origin);
    callback('start', true, origin, offset);
  }, [callback, offset]);


  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    if (!isMoving) {
      return;
    }

    const offset = {
      x: clientX - origin.clientX,
      y: clientY - origin.clientY
    };

    setOffset(offset);
    callback('moving', true, origin, offset);
  }, [callback, isMoving, origin]);

  const handleMouseUp = useCallback(() => {
    if (!isMoving) {
      return;
    }
    setIsMoving(false);
    setOffset({ x: 0, y: 0 });
    callback('end', false, origin, offset);
  }, [callback, isMoving, offset, origin]);

  useEffect(() => {

    function addEventListeners() {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    function removeEventListeners() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    if (isMoving) {
      addEventListeners();
    } else {
      removeEventListeners();
    }

    return removeEventListeners;
  }, [handleMouseMove, handleMouseUp, isMoving]);

  return {
    onMouseDown: handleMouseDown,
  }
}
