import { FolderItemCard } from '@/components/FolderItemCard';
import React from 'react';

interface Props {
  folderTrashItem: any;
}

export const FolderTrashItem = ({ folderTrashItem }: Props) => {
  return <FolderItemCard folder={folderTrashItem} handleDoubleClick={() => alert(folderTrashItem)} />;
};
