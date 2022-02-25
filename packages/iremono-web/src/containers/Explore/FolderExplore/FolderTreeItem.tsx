import React, { useState } from 'react';
import { useFoldersStore } from '@/store/folders/use-folders-store';
import { foldersService } from '@/services/folders-service';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  item: any;
}

export const FolderTreeItem = ({ item }: Props) => {
  const { folderGroupList, addFolderGroup } = useFoldersStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const handleClick = () => {
    setIsOpen(!isOpen);

    const currentFolderGroup = folderGroupList.find((group) => group.parentId === item.id);
    if (!currentFolderGroup)
      foldersService.listItems({ folderId: item.id }).then((result) => {
        addFolderGroup({ folderItems: result.entries, parentId: item.id });
      });
  };

  return (
    <Container>
      <FolderItemWrapper>
        <Selectable onClick={handleClick}>
          {isOpen ? (
            <ExpandMoreIcon sx={{ color: 'text.secondary' }} />
          ) : (
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          )}
          {isOpen ? (
            <FolderOpenIcon sx={{ color: 'text.secondary' }} />
          ) : (
            <FolderIcon sx={{ color: 'text.secondary' }} />
          )}
        </Selectable>
        <FolderName onClick={() => navigate(`/folders/${item.id}`)}>
          <Typography sx={{ color: 'text.secondary', fontWeight: item.id === params.id ? '600' : '' }} noWrap>
            {item.name}
          </Typography>
        </FolderName>
      </FolderItemWrapper>
      <Collapsible isOpen={isOpen}>
        {folderGroupList
          .find((group) => group.parentId === item.id)
          ?.folderItems.filter((item) => item.isFolder)
          .map((item) => (
            <FolderTreeItem item={item} key={item.id} />
          ))}
      </Collapsible>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 20px;
`;

const FolderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

const Selectable = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FolderName = styled.span`
  cursor: pointer;
`;

const Collapsible = styled.div<{ isOpen: boolean }>`
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  overflow: hidden;
`;
