import React, { useState } from 'react';

export const usePopupMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return [open, anchorEl, handleMenuOpen, handleMenuClose] as const;
};
