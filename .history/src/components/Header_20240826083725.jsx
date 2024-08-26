import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Popover, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from '../image/LogoWindel.svg';

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleNotificationMouseEnter = (event) => {
    setNotificationMessage('Você tem uma nova notificação!');
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          boxShadow: '0px 0.01px 11px var(--secondary)',
          top: 0,
          left: 0,
          backgroundColor: 'var(--lightgray)', // Alterado para a cor desejada
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
                backgroundColor: 'var(--roxo)', // Alterar cor de acordo com seu tema
                color: 'var(--white)', // Alterar cor de acordo com seu tema
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  backgroundColor: 'var(--new)',
                  transform: 'scale(1.07)',
                },
                '&:active': {
                  backgroundColor: 'var(--lightclick)',
                },
              },
            }}
          >
            <Button variant="contained" component={Link} to={`/home`}>Home</Button>
            <Button variant="contained" component={Link} to={`/cadastro`}>Cadastro</Button>
            <Button variant="contained" component={Link} to={`/configuracoes`}>Guia de uso</Button>
          </Box>

          {/* Ícone de Notificação com Popover */}
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
              onMouseEnter={handleNotificationMouseEnter}
              onMouseLeave={handleNotificationMouseLeave}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Configuração do Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleNotificationMouseLeave}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{ p: 2 }}
      >
        <Typography>{notificationMessage}</Typography>
      </Popover>
    </>
  );
};
