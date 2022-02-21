import React from 'react';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

interface PopupMenuItem {
  text: string;
  icon: any;
  action: React.MouseEventHandler<HTMLLIElement>;
}

interface Props {
  menuItems: PopupMenuItem[];
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  handleClose: () => void;
  open: boolean;
}

export const PopupMenu = ({ menuItems, anchorEl, handleClose, open }: Props) => {
  return (
    <Menu id="basic-menu" open={open} anchorEl={anchorEl} onClose={handleClose}>
      <MenuList sx={{ width: '180px' }}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.action}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CloseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Close</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
