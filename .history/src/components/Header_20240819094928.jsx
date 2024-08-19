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
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 1 },
            justifyContent: { xs: 'center', sm: 'center' },
            '& .MuiButton-root': {
              backgroundColor: 'transparent',
              color: 'var(--primary)',                      
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
              padding: '8px 16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.4s, transform 0.4s',

              // Animação
              '&:hover': {
                backgroundColor: 'var(--animation)',
                transform: 'scale(1.07)',
                border: '1px',
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
