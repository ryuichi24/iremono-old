import React, { useEffect, useState } from 'react';
// presentational components
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';
// action hooks
import { useSelectedActions } from '@/store/selected/use-selected-actions';
// services
import { filesService } from '@/services/files-service';

interface Props {
  file: any;
  arrangeType: 'grid' | 'list';
}

export const FileItem = ({ file, arrangeType }: Props) => {
  const [thumbnailURL, setThumbnailURL] = useState('');
  const { setSelectedItem, setSelectedViewerItem } = useSelectedActions();

  useEffect(() => {
    if (file.hasThumbnail) {
      filesService
        .downloadThumbnail({ fileId: file.id })
        .then((result) => {
          setThumbnailURL(result);
        })
        .catch((err) => {
          console.log(err);
          setThumbnailURL('');
        });
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
