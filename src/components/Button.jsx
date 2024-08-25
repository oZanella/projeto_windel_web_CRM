import React from 'react';
import { Box, Collapse, IconButton, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import SaveIcon from '@mui/icons-material/Save';


export const IngredientsButton = ({ post, selectInfo, setSelectInfo, handleShowDetails }) => {
  return (
    <Box>
      {/* Botão de ingredientes */}
      <IconButton
        onClick={() => handleShowDetails(post, setSelectInfo, selectInfo)}
        sx={{
          padding: 0,
          color: selectInfo?.id === post.id ? 'primary.main' : 'text.primary',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Typography variant="body2">
          {selectInfo?.id === post.id ? 'Fechar' : 'Ingredientes'}
        </Typography>
      </IconButton>

      {/* Exibe os ingredientes */}
      <Collapse in={selectInfo?.id === post.id}>
        <Box sx={{ padding: 1 }}>
          {post.ingredients.map((ingredient, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '4px 0',
              }}
            >
              <Typography variant="body2">
                {ingredient.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {ingredient.quantity}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export const DeleteButton = ({ post, handleDelete }) => {
  return (
    <IconButton
      color="error"
      onClick={() => handleDelete(post.id)}
      sx={{ color: '' }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export const ButtonRight = ({ handleDeleteSelected, handleSelectAll, selectedPosts, filteredPosts }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteSelected}
        disabled={selectedPosts.length === 0}
        sx={{ marginRight: 2 }}
      >
        Apagar Selecionados
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SelectAllIcon />}
        onClick={handleSelectAll}
      >
        {selectedPosts.length === filteredPosts.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
      </Button>
    </Box>
  );
};

export const ButtonEditModal = ({ handleEditClose, handleSaveModal }) => {
  return (
    <>
      <Button
        onClick={handleEditClose}
        startIcon={<DeleteIcon />}
        variant="contained"
        sx={{
          mr: { xs: 0, sm: 0 },
          ml: { xs: 1, sm: 1 },
          gap: 2,
          flexGrow: { xs: 1, sm: 1 },
          backgroundColor: 'var(--darkblue2)',
          color: 'var(--primary)',
          borderRadius: '0.4rem',
          padding: '0.5rem',
          fontWeight: 'bold',
          transition: 'background-color 0.3s, transform 0.3s',

          // Animação
          '&:hover': {
            transform: 'scale(1.02)',
          },
          '&:active': {
            backgroundColor: 'var(--click)',
          },
        }}
      >
        Cancelar
      </Button>

      <Button
        onClick={handleSaveModal}
        startIcon={<SaveIcon />}
        variant="contained"
        sx={{
          mr: { xs: 0, sm: 0 },
          ml: { xs: 1, sm: 1 },
          gap: 2,
          flexGrow: { xs: 1, sm: 1 },
          backgroundColor: 'var(--darkblue2)',
          color: 'var(--primary)',
          borderRadius: '0.4rem',
          padding: '0.5rem',
          fontWeight: 'bold',
          transition: 'background-color 0.3s, transform 0.3s',

          // Animação
          '&:hover': {
            transform: 'scale(1.02)',
          },
          '&:active': {
            backgroundColor: 'var(--click)',
          },
        }}
      >
        Salvar
      </Button>
    </>
  );
};

