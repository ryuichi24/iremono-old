import React, { useEffect, useState } from 'react';
import { FileItemCard } from '@/components/FileItemCard';
import { filesService } from '@/services/files-service';

interface Props {
  file: any;
}

export const FileItem = ({ file }: Props) => {
  const [thumbnailURL, setThumbnailURL] = useState('');

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
  return <FileItemCard file={file} thumbnailURL={thumbnailURL} />;
};
