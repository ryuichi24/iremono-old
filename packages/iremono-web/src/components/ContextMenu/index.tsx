import styled from 'styled-components';

export const ContextMenu = styled.div<{ xPos: string; yPos: string }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: 99999;
  background-color: ${(props) => props.theme.palette.background.primary};
  box-shadow: 0 4px 12px 0 rgb(0 0 0 / 10%);
  width: 20rem;
  border-radius: 6px;
  top: ${({ yPos }) => yPos};
  left: ${({ xPos }) => xPos};
`;

export const ContextMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;
  color: ${(props) => props.theme.palette.text.primary};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
  line-height: 1.5;
`;
