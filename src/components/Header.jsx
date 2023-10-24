import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box mb={3}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Скупка</MenuItem>
            <MenuItem onClick={handleClose}>Расходы</MenuItem>
          </Menu>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0.1 }}>
            Разработка
          </Typography>
          <Button color="inherit" >Расходы</Button>
          <Button color="inherit">Скупка</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Войти</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
