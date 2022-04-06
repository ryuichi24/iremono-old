import { useCallback, useEffect, useState } from 'react';

interface Output {
  xPos: string;
  yPos: string;
  showMenu: boolean;
  handleContextMenu: any;
}

export const useContextMenu = (): Output => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      // in case other context menus are open
      document.querySelector('body')?.click();

      e.preventDefault();

      const x = e.clientX;
      const y = e.clientY;

      setXPos(`${x}px`);
      setYPos(`${y}px`);
      setShowMenu(true);
    },
    [setXPos, setYPos],
  ) as any;

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return { xPos, yPos, showMenu, handleContextMenu };
};
