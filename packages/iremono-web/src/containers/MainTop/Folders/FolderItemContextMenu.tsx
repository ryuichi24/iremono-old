import React from 'react';
import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import { useContextMenu } from '@/hooks/use-context-menu';
import { Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { filesService } from '@/services/files-service';
import { RenameFolderItemForm } from './RenameFolderItemForm';
import { useModal } from '@/hooks/use-modal';

interface Props {
  children: React.ReactNode;
  folderItem: any;
}

export const FolderItemContextMenu = ({ children, folderItem }: Props) => {
  const { xPos, yPos, showMenu, handleContextMenu } = useContextMenu();
  const [openRenameFolderItemForm, handleOpenRenameFolderItemForm, handleCloseRenameFolderItemForm] = useModal();
  return (
    <>
      <div style={{ width: 'auto' }} onContextMenu={handleContextMenu}>
        {children}
      </div>

      {showMenu && (
        <ContextMenu yPos={yPos} xPos={xPos}>
          <ContextMenuItem onClick={() => filesService.download({ fileId: folderItem.id, fileName: folderItem.name })}>
            <DownloadOutlinedIcon />
            <Typography>Download</Typography>
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareOutlinedIcon />
            <Typography>Share</Typography>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleOpenRenameFolderItemForm()}>
            <DriveFileRenameOutlineOutlinedIcon />
            <Typography>Rename</Typography>
          </ContextMenuItem>
          <ContextMenuItem style={{ color: 'red' }} onClick={() => console.log('remove')}>
            <DeleteOutlineOutlinedIcon />
            <Typography>Remove</Typography>
          </ContextMenuItem>
        </ContextMenu>
      )}

      <RenameFolderItemForm
        folderItem={folderItem}
        open={openRenameFolderItemForm}
        handleClose={handleCloseRenameFolderItemForm}
      />
    </>
  );
};
