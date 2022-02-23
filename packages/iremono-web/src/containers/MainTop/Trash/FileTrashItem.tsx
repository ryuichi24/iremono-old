import React, { useEffect, useState } from 'react';
import { FileItemCard } from '@/components/FileItemCard';
import { filesService } from '@/services/files-service';

interface Props {
  fileTrashItem: any;
}

export const FileTrashItem = ({ fileTrashItem }: Props) => {
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
    <FileItemCard file={fileTrashItem} thumbnailURL={thumbnailURL} handleDoubleClick={() => alert(fileTrashItem)} />
  );
};
