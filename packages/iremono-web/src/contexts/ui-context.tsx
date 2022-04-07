import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const SIDEBAR_POSITION = 'sidebarPosition';

interface UIState {
  isSidebarPositionLeft: boolean;
  toggleSidebarPosition: () => void;
}

const UIContext = createContext<UIState>({
  isSidebarPositionLeft: false,
  toggleSidebarPosition: () => {
    return;
  },
});

interface Props {
  children: ReactNode;
}

export const UIContextProvider = ({ children }: Props): JSX.Element => {
  const [isSidebarPositionLeft, setIsSidebarPositionLeft] = useState(false);

  const toggleSidebarPosition = () => {
    localStorage.setItem(SIDEBAR_POSITION, isSidebarPositionLeft ? 'right' : 'left');
    setIsSidebarPositionLeft(!isSidebarPositionLeft);
  };

  useEffect(() => {
    setIsSidebarPositionLeft(localStorage.getItem(SIDEBAR_POSITION) === 'left');
  }, []);

  return <UIContext.Provider value={{ isSidebarPositionLeft, toggleSidebarPosition }}>{children}</UIContext.Provider>;
};

export const useUIContext = (): UIState => useContext(UIContext);
