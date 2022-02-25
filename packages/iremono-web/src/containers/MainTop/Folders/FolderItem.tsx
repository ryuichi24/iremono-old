import React from 'react';
import { FolderItemCard } from '@/components/FolderItemCard';
import { useNavigate } from 'react-router-dom';
import { useSelectedStore } from '@/store/selected/use-selected-store';

interface Props {
  folder: any;
}

export const FolderItem = ({ folder }: Props) => {
  const navigate = useNavigate();
  const { setSelectedItem } = useSelectedStore();

  return (
    <FolderItemCard
      folder={folder}
      handleClick={() => setSelectedItem({ selectedItem: folder })}
      handleDoubleClick={() => navigate(`/folders/${folder.id}`)}
    />
  );
};
