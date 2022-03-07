import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  buttonText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  startIcon?: React.ReactNode;
}

export const PrimaryButton = (props: Props) => {
  return (
    <Button
      variant="outlined"
      startIcon={props.startIcon}
      onClick={props.onClick}
      sx={{
        maxWidth: '110px',
        maxHeight: '50px',
        minWidth: '110px',
        minHeight: '50px',
        backgroundColor: 'background.secondary',
      }}
    >
      {props.buttonText}
    </Button>
  );
};
