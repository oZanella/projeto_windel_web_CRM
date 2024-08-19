import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import Logo from '../image/LogoWindel.svg';
import { Link } from 'react-router-dom';
import React from 'react';

export const Header = () => {
  return (

    // Header fundo 1 //
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        boxShadow: '0px 0.01px 11px var(--secondary)',
        top: 0,
        left: 0,
      }}
    >

      {/* Header fundo 2 */}
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: { xs: '0px', sm: '0px' },
          justifyContent: 'space-between',
          height: '64px',
          minHeight: '64px',
          backgroundColor: 'var(--darkblue)',
          boxSizing: 'border-box',
        }}
      >

        {/* Botões */}
        <Box
          sx={{
            mr: { xs: 0, sm: 2 },
            gap: 2,
            display: 'flex',
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 1},
            justifyContent: { xs: 'center' },
            border: 'none',
            '& .MuiButton-root': {
              backgroundColor: 'transparent',
              color: 'var(--primary)',                      
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, transform 0.3s',

              // Animação
              '&:hover': {
                backgroundColor: 'var(--animation)',
                transform: 'scale(1.07)',
              },
              '&:active': {
                backgroundColor: 'var(--click)',
              },
            },
          }}
        >
          <Button variant="contained" component={Link} to={`/home`}>Home</Button>
          <Button variant="contained" component={Link} to={`/cadastro`}>Cadastro</Button>
          <Button variant="contained" component={Link} to={`/configuracoes`}>Configurações</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
