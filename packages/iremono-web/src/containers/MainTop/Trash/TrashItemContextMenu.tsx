import React from 'react';
import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import { useContextMenu } from '@/hooks/use-context-menu';
import { Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import { RestoreTrashItemForm } from './RestoreTrashItemForm';
import { useModal } from '@/hooks/use-modal';
import { DeleteTrashItemForm } from './DeleteTrashItemForm';

interface Props {
  children: React.ReactNode;
  trashItem: any;
}

export const TrashItemContextMenu = ({ children, trashItem }: Props) => {
  const { xPos, yPos, showMenu, handleContextMenu } = useContextMenu();
  const [openRestoreTrashItemItemForm, handleOpenRestoreTrashItemItemForm, handleCloseRestoreTrashItemItemForm] =
    useModal();

  const [openDeleteTrashItemItemForm, handleOpenDeleteTrashItemItemForm, handleCloseDeleteTrashItemItemForm] =
    useModal();

  return (
    <>
      <div style={{ width: 'auto' }} onContextMenu={handleContextMenu}>
        {children}
      </div>

      {showMenu && (
        <ContextMenu yPos={yPos} xPos={xPos} className="trash-item-context-menu">
          <ContextMenuItem onClick={() => handleOpenRestoreTrashItemItemForm()}>
            <RestoreOutlinedIcon />
            <Typography>Restore</Typography>
          </ContextMenuItem>
          <ContextMenuItem style={{ color: 'red' }} onClick={() => handleOpenDeleteTrashItemItemForm()}>
            <DeleteOutlineOutlinedIcon />
            <Typography>Delete</Typography>
          </ContextMenuItem>
        </ContextMenu>
      )}

      <RestoreTrashItemForm
        open={openRestoreTrashItemItemForm}
        handleClose={handleCloseRestoreTrashItemItemForm}
        trashItem={trashItem}
      />

      <DeleteTrashItemForm
        open={openDeleteTrashItemItemForm}
        handleClose={handleCloseDeleteTrashItemItemForm}
        trashItem={trashItem}
      />
    </>
  );
};
