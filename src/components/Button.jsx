import React from 'react';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      sx={{ color: 'text.primary' }}
    >
      <DeleteIcon />
    </IconButton>
  );
};
