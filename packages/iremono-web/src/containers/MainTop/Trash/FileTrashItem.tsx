import React, { useEffect, useState } from 'react';
import { filesService } from '@/services/files-service';
import { ListItemCard } from '@/components/ListItemCard';
import { GridItemCard } from '@/components/GridItemCard';
import { useAppSelector } from '@/store/redux-hooks';
import { clientEncryptionKeySelector } from '@/store/auth/auth-slice';
import { useSearchParams } from 'react-router-dom';

interface Props {
  fileTrashItem: any;
  arrangeType: 'grid' | 'list';
}

export const FileTrashItem = ({ fileTrashItem, arrangeType }: Props) => {
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [searchParams] = useSearchParams();
  const folderType = (searchParams.get('type') || 'normal') as 'normal' | 'crypto';
  const encryptionKey = useAppSelector(clientEncryptionKeySelector);

  useEffect(() => {
    if (fileTrashItem.hasThumbnail) {
      filesService
        .downloadThumbnail({
          fileId: fileTrashItem.id,
          encryptionKey: folderType === 'crypto' ? encryptionKey : undefined,
        })
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
