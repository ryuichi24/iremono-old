import React from 'react';
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';

interface Props {
  folderTrashItem: any;
  arrangeType: 'grid' | 'list';
}

export const FolderTrashItem = ({ folderTrashItem, arrangeType }: Props) => {
  return (
    <div className='folder-trash-item'>
      {arrangeType === 'grid' ? (
        <GridItemCard item={folderTrashItem} handleDoubleClick={() => alert(folderTrashItem)} />
      ) : (
        <ListItemCard item={folderTrashItem} handleDoubleClick={() => alert(folderTrashItem)} />
      )}
    </div>
  );
};
