import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../image/LogoWindel.svg';

export const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'var(--LigthGray)',
        boxShadow: '0px 0.01px 11px var(--secondary)',
        width: '100%', // Garante que o AppBar ocupe toda a largura da tela
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // Coluna em dispositivos móveis, linha em telas maiores
          alignItems: 'center',
          justifyContent: 'space-between', // Espaço entre logo, título e botões
          textAlign: { xs: 'center', sm: 'left' }, // Centraliza o texto em dispositivos móveis
        }}
      >
        {/* Logo da esquerda */}
        <IconButton
          edge="start"
          aria-label="logo"
          sx={{ mr: 2, mb: { xs: 2, sm: 0 } }} // Margin-bottom para dispositivos móveis
          component={Link}
          to={`/home`}
        >
          <img src={Logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
        </IconButton>

        {/* Título do centro */}
        <Typography variant="h6" sx={{ flexGrow: 1, mb: { xs: 2, sm: 0 } }}>
          Cooking Cake
        </Typography>

        {/* Botões da direita */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'row', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-end' },
            '& .MuiButton-root': {
              color: 'var(--primary)', // Define a cor do texto dos botões
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

