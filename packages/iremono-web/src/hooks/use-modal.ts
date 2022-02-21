import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return [open, handleOpen, handleClose] as const;
};
