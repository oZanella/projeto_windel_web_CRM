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
      {/* AppBar for small screens */}
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
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cooking Cake
          </Typography>
          <IconButton
            to={`/home`}
            sx={{
              cursor: 'default',
            }}
            component={Link}
            aria-label="logo"
          >
            <img src={Logo} alt="Logo" style={{ width: '50px', height: '40px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'var(--darkblue)',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.link} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Permanent Drawer for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: 'var(--darkblue)',
          },
        }}
        open
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.link}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          marginLeft: { sm: '240px' }, // Add margin to main content for larger screens
          padding: '16px',
          mt: '64px', // Adjust margin top to account for AppBar
        }}
      >
        {/* Add your main content here */}
      </Box>
    </>
  );
};