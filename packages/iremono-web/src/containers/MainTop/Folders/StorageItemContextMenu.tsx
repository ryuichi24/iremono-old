import React from 'react';
import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import { useContextMenu } from '@/hooks/use-context-menu';
import { Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { filesService } from '@/services/files-service';
import { RenameStorageItemForm } from './RenameStorageItemForm';
import { useModal } from '@/hooks/use-modal';
import { RemoveStorageItemForm } from './RemoveStorageItemForm';

interface Props {
  children: React.ReactNode;
  storageItem: any;
}

export const StorageItemContextMenu = ({ children, storageItem }: Props) => {
  const { xPos, yPos, showMenu, handleContextMenu } = useContextMenu();
  const [openRenameStorageItemForm, handleOpenRenameStorageItemForm, handleCloseRenameStorageItemForm] = useModal();
  const [openRemoveStorageItemForm, handleOpenRemoveStorageItemForm, handleCloseRemoveStorageItemForm] = useModal();
  return (
    <>
      <div style={{ width: 'auto' }} onContextMenu={handleContextMenu}>
        {children}
      </div>

      {showMenu && (
        <ContextMenu yPos={yPos} xPos={xPos}>
          <ContextMenuItem
            onClick={() => filesService.download({ fileId: storageItem.id, fileName: storageItem.name })}
          >
            <DownloadOutlinedIcon />
            <Typography>Download</Typography>
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareOutlinedIcon />
            <Typography>Share</Typography>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleOpenRenameStorageItemForm()}>
            <DriveFileRenameOutlineOutlinedIcon />
            <Typography>Rename</Typography>
          </ContextMenuItem>
          <ContextMenuItem style={{ color: 'red' }} onClick={() => handleOpenRemoveStorageItemForm()}>
            <DeleteOutlineOutlinedIcon />
            <Typography>Remove</Typography>
          </ContextMenuItem>
        </ContextMenu>
      )}

      <RenameStorageItemForm
        storageItem={storageItem}
        open={openRenameStorageItemForm}
        handleClose={handleCloseRenameStorageItemForm}
      />

      <RemoveStorageItemForm
        storageItem={storageItem}
        open={openRemoveStorageItemForm}
        handleClose={handleCloseRemoveStorageItemForm}
      />
    </>
  );
};
