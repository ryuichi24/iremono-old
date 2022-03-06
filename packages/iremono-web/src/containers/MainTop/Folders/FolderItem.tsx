import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelectedStore } from '@/store/selected/use-selected-store';
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';

interface Props {
  folder: any;
  arrangeType: 'grid' | 'list';
}

export const FolderItem = ({ folder, arrangeType }: Props) => {
  const navigate = useNavigate();
  const { setSelectedItem, setSelectedCurrentFolder } = useSelectedStore();

  return (
    <>
      {arrangeType === 'grid' ? (
        <GridItemCard
          item={folder}
          handleClick={() => setSelectedItem({ selectedItem: folder })}
          handleDoubleClick={() => {
            setSelectedCurrentFolder(folder);
            navigate(`/folders/${folder.id}`);
          }}
        />
      ) : (
        <ListItemCard
          item={folder}
          handleClick={() => setSelectedItem({ selectedItem: folder })}
          handleDoubleClick={() => {
            setSelectedCurrentFolder(folder);
            navigate(`/folders/${folder.id}`);
          }}
        />
      )}
    </>
  );
};
