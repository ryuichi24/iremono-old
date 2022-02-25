import React, { useEffect, useState } from 'react';
import { FileItemCard } from '@/components/FileItemCard';
import { filesService } from '@/services/files-service';
import { useSelectedStore } from '@/store/selected/use-selected-store';

interface Props {
  file: any;
}

export const FileItem = ({ file }: Props) => {
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
    <FileItemCard
      handleClick={() => setSelectedItem({ selectedItem: file })}
      handleDoubleClick={() => setSelectedViewerItem({ selectedViewerItem: file })}
      file={file}
      thumbnailURL={thumbnailURL}
    />
  );
};
