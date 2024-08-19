import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../image/LogoWindel.svg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home'; // Exemplo de ícone
import EditIcon from '@mui/icons-material/Edit'; // Exemplo de ícone
import SettingsIcon from '@mui/icons-material/Settings'; // Exemplo de ícone

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', link: '/home', icon: <HomeIcon /> },
    { text: 'Cadastro', link: '/cadastro', icon: <EditIcon /> },
    { text: 'Configurações', link: '/configuracoes', icon: <SettingsIcon /> },
  ];

  return (
    <>
      {/* Mobile AppBar */}
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
            sx={{ cursor: 'default' }}
            component={Link}
            aria-label="logo"
          >
            <img src={Logo} alt="Logo" style={{ width: '50px', height: '40px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
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
            <ListItem
              key={item.text}
              component={Link}
              to={item.link}
              onClick={toggleDrawer(false)}
              sx={{
                color: 'white', // Cor do texto
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)', // Cor de fundo ao passar o mouse
                },
                padding: '10px 20px', // Padding personalizado
              }}
            >
              {item.icon}
              <ListItemText primary={item.text} sx={{ marginLeft: 1 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Desktop Drawer */}
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
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link}
                to={item.link}
                sx={{
                  color: 'black', // Cor do texto para o menu lateral permanente
                  '&:hover': {
                    backgroundColor: 'var(--click)', // Cor de fundo ao passar o mouse
                  },
                  padding: '10px 20px', // Padding personalizado
                }}
              >
                {item.icon}
                <ListItemText primary={item.text} sx={{ marginLeft: 1 }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
