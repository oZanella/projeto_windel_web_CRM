import { Grid, Box, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'; // Importando o ícone
import React from 'react'

export const Configuracoes = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '10rem', 
        bgcolor: 'background.default', 
      }}
    >
      <InfoIcon 
        sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} // Tamanho e cor do ícone
      />
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Esta página está em desenvolvimento. Volte em breve para mais informações!
      </Typography>
    </Box>
  )
}
