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
        {/* Logo da principal */}
        <IconButton
          to={`/home`}
          edge="start"
          sx={{
            ml: { xs: 0 },
            cursor: 'default',
          }}
          component={Link}
          aria-label="logo"
        >
          <img src={Logo} alt="Logo" style={{ width: '50px', height: '40px' }} />
        </IconButton>

        {/* Titulo da pagina */}
        <Typography
          variant="h6"
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: 'var(--primary)',
            fontWeight: 'bold',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',                 //text em maiusculo 
            textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
            fontFamily: 'Arial, serif',
            flexGrow: 1,
          }}
        >
          Cooking Cake
        </Typography>

        {/* Botões da direita */}
        <Box
          sx={{
            mr: { xs: 0, sm: 2 },
            gap: 2,
            display: 'flex',
            alignItems: 'center',
            flexGrow: { xs: 1, sm: 0 },
            justifyContent: { xs: 'center' },
            '& .MuiButton-root': {
              backgroundColor: 'var(--blueceledron)',
              color: 'var(--primary)',                      
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
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
          <Button variant="contained" component={Link} to={`/editar`}>Editar</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
