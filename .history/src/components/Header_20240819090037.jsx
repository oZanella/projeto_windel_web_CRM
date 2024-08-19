import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
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


      {/* xs Drawer */}
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
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton
            to={`/home`}
            sx={{ cursor: 'default' }}
            component={Link}
            aria-label="logo"
          >
            <img src={Logo} alt="Logo" style={{ width: '80px', height: '60px' }} />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} component={Link} to={item.link} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* sm Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: 230,
            backgroundColor: 'var(--animation)',
          },
        }}
        open
      >
        <Toolbar />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'fixed',
          ml: 8,
          }}>
          <IconButton
            to={`/home`}
            sx={{ cursor: 'default' }}
            component={Link}
            aria-label="logo"
          >
            <img src={Logo} alt="Logo" style={{ width: '80px', height: '60px' }} />
          </IconButton>
        </Box>

        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} component={Link} to={item.link}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
