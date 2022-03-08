import React, { useState } from 'react';
import { useFoldersActions } from '@/store/folders/use-folders-actions';
import { foldersService } from '@/services/folders-service';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelectedActions } from '@/store/selected/use-selected-actions';
import { useFilesActions } from '@/store/files/use-files-actions';
import { useAppSelector } from '@/store/redux-hooks';
import { folderGroupByIdSelector } from '@/store/folders/folders-slice';

interface Props {
  item: any;
}

export const CryptoFolderTreeItem = ({ item }: Props) => {
  const { addFolderGroup } = useFoldersActions();
  const { addFileGroup } = useFilesActions();
  const { setSelectedCurrentCryptoFolder } = useSelectedActions();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const currentFolderGroup = useAppSelector((state) => folderGroupByIdSelector(state, item.id));

  const handleClick = async () => {
    setIsOpen(!isOpen);

    if (currentFolderGroup) return;

    const folderItems = (await foldersService.listItems({ folderId: item.id })).entries;
    const folders = folderItems.filter((item: any) => item.isFolder);
    const files = folderItems.filter((item: any) => !item.isFolder);

    const ancestors = (await foldersService.listAllAncestors({ folderId: item.id })).entries;

    addFolderGroup({ folderItems: folders, folder: item, ancestors });
    addFileGroup({ fileItems: files, parentId: item.id });
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
        <FolderName
          onClick={() => {
            setSelectedCurrentCryptoFolder({ selectedCurrentCryptoFolder: item });
            navigate(`/crypto-folders/${item.id}`);
          }}
        >
          <Typography sx={{ color: 'text.secondary', fontWeight: item.id === params.id ? '600' : '' }} noWrap>
            {item.name}
          </Typography>
        </FolderName>
      </FolderItemWrapper>
      <Collapsible isOpen={isOpen}>
        {currentFolderGroup?.folderItems
          ?.filter((item) => item.isFolder)
          .map((item) => (
            <CryptoFolderTreeItem item={item} key={item.id} />
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
