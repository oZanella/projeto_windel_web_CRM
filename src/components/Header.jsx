import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Logo from '../image/LogoWindel.svg';

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        boxShadow: '0px 0.01px 11px var(--secondary)',
        top: 0,
        left: 0,
        backgroundColor: darkMode ? 'var(--darkblue)' : 'var(--lightgray)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: { xs: '0px', sm: '0px' },
          justifyContent: 'space-between',
          height: '64px',
          minHeight: '64px',
          backgroundColor: 'inherit',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            ml: 2,
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ height: '40px' }}
          />
        </Box>

        {/* Botões Centralizados */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
            '& .MuiButton-root': {
              backgroundColor: darkMode ? 'var(--darkblue2)' : 'var(--roxo)',
              color: darkMode ? 'var(--primary)' : 'var(--white)',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, transform 0.3s',
              '&:hover': {
                backgroundColor: darkMode ? 'var(--darkblue-hover)' : 'var(--new)',

                transform: 'scale(1.07)',
              },
              '&:active': {
                backgroundColor: darkMode ? 'var(--new)' : 'var(--lightclick)',
              },
            },
          }}
        >
          <Button variant="contained" component={Link} to={`/home`}>Home</Button>
          <Button variant="contained" component={Link} to={`/cadastro`}>Cadastro</Button>
          <Button variant="contained" component={Link} to={`/configuracoes`}>Guia de uso</Button>
        </Box>


        {/* Ícone de Alternância de Tema */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mr: 2,
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleThemeToggle}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
