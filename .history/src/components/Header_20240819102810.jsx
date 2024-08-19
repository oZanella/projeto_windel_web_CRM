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
            gap: 2,
            display: 'flex',
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 1 },
            justifyContent: { xs: 'center', sm: 'center' },
            '& .MuiButton-root': {
              backgroundColor: 'ligthkgrey',
              borderRadius: '10px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.4s, transform 0.4s',
              border: 'none',

              // Animação
              '&:hover': {
                transform: 'scale(1.06)',
                border: '1px',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '2px', 
                backgroundColor: 'var(--ligthkgrey)',
                transition: 'width 0.4s',
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
