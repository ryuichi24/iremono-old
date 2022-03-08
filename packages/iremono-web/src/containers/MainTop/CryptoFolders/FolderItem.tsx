import React from 'react';
import { useNavigate } from 'react-router-dom';
// presentational components
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';
// action hooks
import { useSelectedActions } from '@/store/selected/use-selected-actions';

interface Props {
  folder: any;
  arrangeType: 'grid' | 'list';
}

export const FolderItem = ({ folder, arrangeType }: Props) => {
  const navigate = useNavigate();
  const { setSelectedItem, setSelectedCurrentFolder } = useSelectedActions();

  return (
    <>
      {arrangeType === 'grid' ? (
        <GridItemCard
          item={folder}
          handleClick={() => setSelectedItem({ selectedItem: folder })}
          handleDoubleClick={() => {
            setSelectedCurrentFolder(folder);
            navigate(`/crypto-folders/${folder.id}`);
          }}
        />
      ) : (
        <ListItemCard
          item={folder}
          handleClick={() => setSelectedItem({ selectedItem: folder })}
          handleDoubleClick={() => {
            setSelectedCurrentFolder(folder);
            navigate(`/crypto-folders/${folder.id}`);
          }}
        />
      )}
    </>
  );
};
