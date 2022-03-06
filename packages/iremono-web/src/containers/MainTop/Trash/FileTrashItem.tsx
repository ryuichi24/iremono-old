import React, { useEffect, useState } from 'react';
import { filesService } from '@/services/files-service';
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';

interface Props {
  fileTrashItem: any;
  arrangeType: 'grid' | 'list';
}

export const FileTrashItem = ({ fileTrashItem, arrangeType }: Props) => {
  const [thumbnailURL, setThumbnailURL] = useState('');

  useEffect(() => {
    if (fileTrashItem.hasThumbnail) {
      filesService
        .downloadThumbnail({ fileId: fileTrashItem.id })
        .then((result) => {
          setThumbnailURL(result);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      {arrangeType === 'grid' ? (
        <GridItemCard item={fileTrashItem} thumbnailURL={thumbnailURL} handleDoubleClick={() => alert(fileTrashItem)} />
      ) : (
        <ListItemCard item={fileTrashItem} thumbnailURL={thumbnailURL} handleDoubleClick={() => alert(fileTrashItem)} />
      )}
    </>
  );
};
