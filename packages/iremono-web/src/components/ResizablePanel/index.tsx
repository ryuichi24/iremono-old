import React, { useRef } from 'react';
import { Panel } from './Panel';

interface Props {
  children: React.ReactNode;
  defaultLeftSizeInRatio: number;
  isVertical?: boolean;
  resizerColor?: string;
}

export const ResizablePanel = ({
  children,
  isVertical = false,
  defaultLeftSizeInRatio,
  resizerColor = '#F5F5F5',
}: Props): JSX.Element => {
  const [left, right] = React.Children.toArray(children);

  const leftPanelWidthOrHeight = useRef(0);
  const mousePosition = useRef(0);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const resizerRef = useRef<HTMLDivElement>(null);

  const panelContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    height: '100%',
    width: '100%',
  };

  const verticalStyle: {
    resizer: React.CSSProperties;
    leftPanel: React.CSSProperties;
    rightPanel: React.CSSProperties;
  } = {
    resizer: {
      cursor: 'row-resize',
      padding: '3px',
      backgroundColor: resizerColor,
    },
    leftPanel: {
      height: `${defaultLeftSizeInRatio}%`,
    },
    rightPanel: {
      flex: '1 1 0%',
      height: `${100 - defaultLeftSizeInRatio}%`,
    },
  };

  const horizontalStyle: {
    resizer: React.CSSProperties;
    leftPanel: React.CSSProperties;
    rightPanel: React.CSSProperties;
  } = {
    resizer: {
      cursor: 'col-resize',
      padding: '3px',
      backgroundColor: resizerColor,
    },
    leftPanel: {
      width: `${defaultLeftSizeInRatio}%`,
    },
    rightPanel: {
      flex: '1 1 0%',
      width: `${100 - defaultLeftSizeInRatio}%`,
    },
  };

  const mouseDownHandler = function (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    mousePosition.current = isVertical ? e.clientY : e.clientX;

    const leftRect = (leftRef.current as HTMLDivElement).getBoundingClientRect();
    leftPanelWidthOrHeight.current = isVertical ? leftRect.height : leftRect.width;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    const gap = (isVertical ? e.clientY : e.clientX) - mousePosition.current;

    const parentNode = (leftRef.current as HTMLDivElement).parentNode as HTMLDivElement;

    const newLeftWidth = ((leftPanelWidthOrHeight.current + gap) * 100) / parentNode.getBoundingClientRect().width;
    const newLeftHeight = ((leftPanelWidthOrHeight.current + gap) * 100) / parentNode.getBoundingClientRect().height;

    if (!leftRef.current) return;
    if (!rightRef.current) return;

    isVertical
      ? (leftRef.current.style.height = `${newLeftHeight}%`)
      : (leftRef.current.style.width = `${newLeftWidth}%`);

    isVertical
      ? (rightRef.current.style.height = `${100 - newLeftHeight}%`)
      : (rightRef.current.style.width = `${100 - newLeftWidth}%`);
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  return (
    <div style={panelContainerStyle}>
      <Panel ref={leftRef} style={isVertical ? verticalStyle.leftPanel : horizontalStyle.leftPanel}>
        {left}
      </Panel>
      <div
        role="none"
        onMouseDown={mouseDownHandler}
        ref={resizerRef}
        style={isVertical ? verticalStyle.resizer : horizontalStyle.resizer}
      ></div>
      <Panel ref={rightRef} style={isVertical ? verticalStyle.rightPanel : horizontalStyle.rightPanel}>
        {right}
      </Panel>
    </div>
  );
};
