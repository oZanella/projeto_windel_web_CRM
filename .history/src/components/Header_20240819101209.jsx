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
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: 'transparent', // Fundo transparente
            border: 'none', // Sem borda
            padding: 0,
            minWidth: 'auto',
            position: 'relative',
            cursor: 'pointer', // Cursor padrão
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: 0,
              height: '2px', // Espessura da linha
              backgroundColor: theme.palette.text.primary, // Cor da linha
              transition: 'width 0.4s', // Transição suave
            },
            '&:hover::after, &:focus::after': {
              width: '100%', // Linha completa ao passar o cursor ou focar
            },
            '&:hover, &:focus': {
              backgroundColor: 'transparent', // Mantém o fundo transparente ao passar o cursor ou focar
              outline: 'none', // Remove o contorno padrão do botão
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
