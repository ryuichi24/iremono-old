import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// mui components
import Typography from '@mui/material/Typography';
// mui icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FolderIcon from '@mui/icons-material/Folder';
// // presentational components
import { PopupMenu } from '@/components/PopupMenu';
// hooks
import { usePopupMenu } from '@/hooks/use-popup-menu';
// selectors
import { useAppSelector } from '@/store/redux-hooks';
import { ancestorsByFolderIdSelector } from '@/store/folders/folders-slice';

interface Props {
  currentFolder: any;
}

export const FolderPathNav = ({ currentFolder }: Props) => {
  const ancestorsByFolderId =
    (useAppSelector((state) => ancestorsByFolderIdSelector(state, currentFolder?.id)) as any[]) || [];
  const navigate = useNavigate();
  const [openMenu, anchorEl, handleOpenMenu, handleCloseMenu] = usePopupMenu();

  return (
    <Container>
      {ancestorsByFolderId?.length < 4 ? (
        ancestorsByFolderId?.map((ancestor) => (
          <FolderPathItem key={ancestor.id}>
            <FolderPathName>
              <Typography
                onClick={() => navigate(`/folders/${ancestor.id}`)}
                sx={{ color: 'text.secondary', cursor: 'pointer' }}
                variant="h5"
                component="h2"
              >
                {ancestor.name}
              </Typography>
            </FolderPathName>

            <DividerItem>
              <Typography sx={{ color: 'text.secondary' }} variant="h5" component="h2">
                {'>'}
              </Typography>
            </DividerItem>
          </FolderPathItem>
        ))
      ) : (
        <FolderPathItem>
          <FolderPathName>
            <Typography
              onClick={() => navigate(`/folders/${ancestorsByFolderId[0]?.id}`)}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
              variant="h5"
              component="h2"
            >
              {ancestorsByFolderId[0]?.name}
            </Typography>
          </FolderPathName>

          <DividerItem>
            <Typography sx={{ color: 'text.secondary' }} variant="h5" component="h2">
              {'>'}
            </Typography>
          </DividerItem>

          <MoreHorizIcon onClick={handleOpenMenu as any} sx={{ color: 'text.secondary', cursor: 'pointer' }} />
          <PopupMenu
            menuItems={ancestorsByFolderId
              ?.filter((ancestor, index) => index !== 0 && index !== ancestorsByFolderId?.length - 1)
              .map((ancestor) => ({
                text: ancestor.name,
                icon: <FolderIcon fontSize="small" />,
                action: () => {
                  handleCloseMenu();
                  navigate(`/folders/${ancestor.id}`);
                },
              }))}
            anchorEl={anchorEl}
            handleClose={handleCloseMenu}
            open={openMenu}
          />

          <DividerItem>
            <Typography sx={{ color: 'text.secondary' }} variant="h5" component="h2">
              {'>'}
            </Typography>
          </DividerItem>

          <FolderPathName>
            <Typography
              onClick={() => navigate(`/folders/${ancestorsByFolderId[ancestorsByFolderId?.length - 1]?.id}`)}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
              variant="h5"
              component="h2"
            >
              {ancestorsByFolderId[ancestorsByFolderId?.length - 1]?.name}
            </Typography>
          </FolderPathName>

          <DividerItem>
            <Typography sx={{ color: 'text.secondary' }} variant="h5" component="h2">
              {'>'}
            </Typography>
          </DividerItem>
        </FolderPathItem>
      )}

      <FolderPathName>
        <Typography sx={{ color: 'text.primary', cursor: 'pointer' }} variant="h5" component="h2">
          {currentFolder?.name}
        </Typography>
      </FolderPathName>
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  gap: 1rem;
`;

const FolderPathItem = styled('div')`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FolderPathName = styled('div')`
  border-radius: ${(props) => props.theme.shape.borderRadius};
  padding: 0.2rem;
  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
`;

const DividerItem = styled('div')`
  padding: 0.2rem;
`;
