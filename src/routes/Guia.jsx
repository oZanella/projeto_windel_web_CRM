import { Box, Typography, List, ListItem, ListItemText } from '@mui/material'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import React from 'react'

export const Guia = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '10rem',
        bgcolor: 'var(--white)',
        p: 3,
        borderRadius: '1rem',
      }}
    >
      <NotListedLocationIcon
        sx={{ fontSize: 60, mb: 2 }}
      />

      <Box sx={{ maxWidth: 600, textAlign: 'center' }}>

        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            textTransform: 'uppercase'
          }}
        >
          Guia Rápido de Uso
        </Typography>

        <List>
          
          <ListItem>
            <ListItemText primary="1. Navegue pelas abas usando o menu no topo da página." />
          </ListItem>

          <ListItem>
            <ListItemText primary="2. Utilize a barra de pesquisa para encontrar receitas rapidamente." />
          </ListItem>

          <ListItem>
            <ListItemText primary="3. Altere os dados de uma receita utilizando o ícone de editar que fica a direita da consulta do produto na tabela." />
          </ListItem>
          
          <ListItem>
            <ListItemText
              primary="4. Não é possível remover ou adicionar ingredientes a uma receita já cadastrada. Para alterar a lista de ingredientes, você deve excluir a receita existente e cadastrar uma nova."
            />
          </ListItem>

        </List>
      </Box>
    </Box>
  )
}
