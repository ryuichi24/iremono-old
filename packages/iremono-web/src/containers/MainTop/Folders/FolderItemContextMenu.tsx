import React from 'react';
import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import { useContextMenu } from '@/hooks/use-context-menu';
import styled from 'styled-components';
import { MenuList, Typography } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface Props {
  children: React.ReactNode;
}

export const FolderItemContextMenu = ({ children }: Props) => {
  const { xPos, yPos, showMenu, handleContextMenu } = useContextMenu();
  return (
    <>
      <div style={{ width: 'auto' }} onContextMenu={handleContextMenu}>
        {children}
      </div>
      {showMenu && (
        <ContextMenu yPos={yPos} xPos={xPos}>
          <ContextMenuItem onClick={() => console.log('download')}>
            <DownloadOutlinedIcon />
            <Typography>Download</Typography>
          </ContextMenuItem>
          <ContextMenuItem>
            <ShareOutlinedIcon />
            <Typography>Share</Typography>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => console.log('rename')}>
            <DriveFileRenameOutlineOutlinedIcon />
            <Typography>Rename</Typography>
          </ContextMenuItem>
          <ContextMenuItem style={{ color: 'red' }} onClick={() => console.log('remove')}>
            <DeleteOutlineOutlinedIcon />
            <Typography>Remove</Typography>
          </ContextMenuItem>
        </ContextMenu>
      )}
    </>
  );
};
