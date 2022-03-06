import React from 'react';
import { ListFileItemCard } from './ListFileItemCard';
import { ListFolderItemCard } from './ListFolderItemCard';

interface Props {
  item: any;
  thumbnailURL?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ListItemCard = ({ item, handleClick, handleDoubleClick, thumbnailURL }: Props) => {
  return (
    <>
      {item.isFolder ? (
        <ListFolderItemCard folder={item} handleClick={handleClick} handleDoubleClick={handleDoubleClick} />
      ) : (
        <ListFileItemCard
          file={item}
          handleClick={handleClick}
          handleDoubleClick={handleDoubleClick}
          thumbnailURL={thumbnailURL}
        />
      )}
    </>
  );
};
