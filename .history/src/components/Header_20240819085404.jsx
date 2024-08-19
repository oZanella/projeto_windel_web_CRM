import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../image/LogoWindel.svg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', link: '/home' },
    { text: 'Cadastro', link: '/cadastro' },
    { text: 'Configurações', link: '/configuracoes' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          width: '100%',
          boxShadow: '0px 0.01px 11px var(--secondary)',
          top: 0,
          left: 0,
          backgroundColor: 'var(--darkblue)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
          }}
        >
          {/* Logo */}
          <IconButton
            to={`/home`}
            sx={{
              cursor: 'default',
              mb: 1, // Add margin-bottom to space out from the buttons
            }}
            component={Link}
            aria-label="logo"
          >
            <img src={Logo} alt="Logo" style={{ width: '50px', height: '40px' }} />
          </IconButton>

          {/* Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Page Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Cooking Cake
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
