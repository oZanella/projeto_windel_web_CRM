import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../image/LogoWindel.svg';

export const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'var(--HeaderTop)', // cor do Header
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Imagem à esquerda */}
        <IconButton
          edge="start"
          aria-label="logo"
          sx={{ mr: 2 }}
          component={Link} 
          to={`/`}
        >
          <img src={Logo} alt="Logo" style={{ width: '40px', height: '40px' }} to={`/`} />
        </IconButton>

        {/* Botões com espaçamento */}
        <Typography sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" component={Link} to={`/home`}>Home</Button>
            <Button variant="contained" component={Link} to={`/cad`}>Cadastro</Button>
            <Button variant="contained" component={Link} to={`/edi`}>Editar</Button>
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


