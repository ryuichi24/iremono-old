import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FolderIcon from '@mui/icons-material/Folder';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { usePopupMenu } from '@/hooks/use-popup-menu';
import { PopupMenu } from '@/components/PopupMenu';

interface Props {
  currentFolder: any;
}

export const FolderPathNav = ({ currentFolder }: Props) => {
  const { folderGroupList } = useFoldersStore();
  const [ancestors, setAncestors] = useState<any[]>([]);
  const navigate = useNavigate();
  const [openMenu, anchorEl, handleOpenMenu, handleCloseMenu] = usePopupMenu();

  useEffect(() => {
    if (!currentFolder) return;

    const ancestorFolders = folderGroupList?.find((group) => group.parentId === currentFolder?.id)?.ancestors;

    if (!ancestorFolders) return;

    setAncestors(ancestorFolders);
  }, [folderGroupList, currentFolder]);

  return (
    <Container>
      {ancestors.length < 4 ? (
        ancestors.map((ancestor) => (
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
              onClick={() => navigate(`/folders/${ancestors[0]?.id}`)}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
              variant="h5"
              component="h2"
            >
              {ancestors[0]?.name}
            </Typography>
          </FolderPathName>

          <DividerItem>
            <Typography sx={{ color: 'text.secondary' }} variant="h5" component="h2">
              {'>'}
            </Typography>
          </DividerItem>

          <MoreHorizIcon onClick={handleOpenMenu as any} sx={{ color: 'text.secondary', cursor: 'pointer' }} />
          <PopupMenu
            menuItems={ancestors
              .filter((ancestor, index) => index !== 0 && index !== ancestors.length - 1)
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
              onClick={() => navigate(`/folders/${ancestors[ancestors?.length - 1]?.id}`)}
              sx={{ color: 'text.secondary', cursor: 'pointer' }}
              variant="h5"
              component="h2"
            >
              {ancestors[ancestors?.length - 1]?.name}
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
