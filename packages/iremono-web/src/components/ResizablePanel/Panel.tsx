import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Panel = React.forwardRef<HTMLDivElement, Props>(({ children, style }, ref): JSX.Element => {
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
});

// otherwise, it has no display name for the component
// https://github.com/yannickcr/eslint-plugin-react/issues/2269
Panel.displayName = 'Panel';

export { Panel };
