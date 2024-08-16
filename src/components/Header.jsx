import { AppBar, Toolbar, Typography, Box, Button, IconButton, Grid } from '@mui/material';
import Logo from '../image/LogoWindel.svg';
import { Link } from 'react-router-dom';
import React from 'react';

export const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',                                                                      // Garante que o AppBar ocupe toda a largura da tela
        backgroundColor: 'var(--LigthGray)',
        boxShadow: '0px 0.01px 11px var(--secondary)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          textAlign: 'left',
          alignItems: 'center',
          padding: { xs: '0px', sm: '0px' },                                                 // Padding constante
          flexDirection: { xs: 'row', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          height: { xs: '64px', sm: '64px' },                                                // Define a altura constante em todas as resoluções
          minHeight: { xs: '64px', sm: '64px' },                                             // Garante a altura mínima constante
        }}
      >

        {/* Logo da principal */}
        <IconButton
          to={`/home`}
          edge="start"
          sx={{
            ml: { xs: 0 },
            cursor: 'default'
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
            flexGrow: 1,
            cursor: 'default',                                                              
            display: { xs: 'none', sm: 'block' },                                           // Esconde o título em resoluções menores que 600px
            color: 'var(--FontHeader)',                                                      
            fontWeight: 'bold',                                                             // Deixa o texto em negrito para dar mais destaque
            letterSpacing: '0.05em',                                                        // Espaçamento entre as letras
            textTransform: 'uppercase',                                                     // Texto em letras maiúsculas
            textShadow: '1px 1px 3px rgba(0,0,0,0.5)',                                      // Adiciona sombra
            fontFamily: 'Roboto, sans-serif',                                               // Utiliza uma fonte profissional e moderna
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
            cursor: 'pointer',
            flexGrow: { xs: 1, sm: 0 },                                                     //Ocupa o espaço restante
            justifyContent: { xs: 'center' },
            flexDirection: { xs: 'row', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-end' },
            '& .MuiButton-root': { color: 'var(--primary)' },                               // Define a cor do texto dos botões
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



