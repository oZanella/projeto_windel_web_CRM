import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Snackbar, Alert, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from '../image/LogoWindel.svg';

export const Header = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleNotificationClick = () => {
    setSnackbarMessage('Você tem uma nova notificação!');
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

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

          {/* Ícone de Notificação com Tooltip */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mr: 2,
            }}
          >
            <Tooltip title="Clique para ver notificações" arrow>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleNotificationClick}
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Configuração do aviso */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        transitionDuration={350}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
