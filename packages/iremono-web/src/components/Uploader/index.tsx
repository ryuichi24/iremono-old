import React from 'react';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Uploader = React.forwardRef<HTMLInputElement, Props>(({ onChange }, ref): JSX.Element => {
  return (
    <>
      <input type="file" onChange={onChange} ref={ref} style={{ display: 'none' }} />
    </>
  );
});

Uploader.displayName = 'Uploader';

export { Uploader };
