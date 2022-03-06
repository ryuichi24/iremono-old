import React from 'react';
import { GridFileItemCard } from './GridFileItemCard';
import { GridFolderItemCard } from './GridFolderItemCard';

interface Props {
  item: any;
  thumbnailURL?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
  handleDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const GridItemCard = ({ item, handleClick, handleDoubleClick, thumbnailURL }: Props) => {
  return (
    <>
      {item.isFolder ? (
        <GridFolderItemCard folder={item} handleClick={handleClick} handleDoubleClick={handleDoubleClick} />
      ) : (
        <GridFileItemCard
          file={item}
          handleClick={handleClick}
          handleDoubleClick={handleDoubleClick}
          thumbnailURL={thumbnailURL}
        />
      )}
    </>
  );
};
