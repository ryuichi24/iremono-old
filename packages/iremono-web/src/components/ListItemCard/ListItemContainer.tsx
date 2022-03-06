import styled from 'styled-components';

export const ListItemContainer = styled.div`
  display: flex;
  padding: 1rem;

  border-bottom: 1px solid ${(props) => props.theme.palette.divider};

  cursor: pointer;

  background-color: ${(props) => props.theme.palette.background.primary};

  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }

  & > :nth-child(1) {
    flex: 2 0 auto;
  }

  & > :nth-child(2) {
    flex: 0 1 auto;
    width: 200px;
  }

  & > :nth-child(3) {
    flex: 0 1 auto;
    width: 200px;
  }
`;
