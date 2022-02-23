import React from 'react';
import { FolderItemCard } from '@/components/FolderItemCard';
import { useNavigate } from 'react-router-dom';

interface Props {
  folder: any;
}

export const FolderItem = ({ folder }: Props) => {
  const navigate = useNavigate();

  return <FolderItemCard folder={folder} handleDoubleClick={() => navigate(`/folders/${folder.id}`)} />;
};
