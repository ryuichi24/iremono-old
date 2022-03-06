import React, { useEffect, useState } from 'react';
import { filesService } from '@/services/files-service';
import { useSelectedStore } from '@/store/selected/use-selected-store';
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';

interface Props {
  file: any;
  arrangeType: 'grid' | 'list';
}

export const FileItem = ({ file, arrangeType }: Props) => {
  const [thumbnailURL, setThumbnailURL] = useState('');
  const { setSelectedItem, setSelectedViewerItem } = useSelectedStore();

  useEffect(() => {
    if (file.hasThumbnail) {
      filesService
        .downloadThumbnail({ fileId: file.id })
        .then((result) => {
          setThumbnailURL(result);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <>
      {arrangeType === 'grid' ? (
        <GridItemCard
          handleClick={() => setSelectedItem({ selectedItem: file })}
          handleDoubleClick={() => setSelectedViewerItem({ selectedViewerItem: file })}
          item={file}
          thumbnailURL={thumbnailURL}
        />
      ) : (
        <ListItemCard
          handleClick={() => setSelectedItem({ selectedItem: file })}
          handleDoubleClick={() => setSelectedViewerItem({ selectedViewerItem: file })}
          item={file}
          thumbnailURL={thumbnailURL}
        />
      )}
    </>
  );
};
