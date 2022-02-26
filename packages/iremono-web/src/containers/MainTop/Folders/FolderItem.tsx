import React from 'react';
import { FolderItemCard } from '@/components/FolderItemCard';
import { useNavigate } from 'react-router-dom';
import { useSelectedStore } from '@/store/selected/use-selected-store';

interface Props {
  folder: any;
}

export const FolderItem = ({ folder }: Props) => {
  const navigate = useNavigate();
  const { setSelectedItem, setSelectedCurrentFolder } = useSelectedStore();

  return (
    <FolderItemCard
      folder={folder}
      handleClick={() => setSelectedItem({ selectedItem: folder })}
      handleDoubleClick={() => {
        setSelectedCurrentFolder(folder);
        navigate(`/folders/${folder.id}`);
      }}
    />
  );
};
