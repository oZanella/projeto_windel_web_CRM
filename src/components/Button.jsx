import React from 'react';
import { Box, Collapse, IconButton, Link, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const IngredientsButton = ({ post, selectInfo, setSelectInfo, handleShowDetails }) => {
  return (
    <Box>
      {/* Botão de ingredientes */}
      <Link
        component="button"
        onClick={() => handleShowDetails(post, setSelectInfo, selectInfo)}
        sx={{
          display: 'block',
          marginTop: 1,
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: 1,
          padding: '8px 16px',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: 'text.primary',
          fontWeight: 500,
          textAlign: 'center',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          textDecoration: 'none',
          '&:hover': {
            backgroundColor: 'primary.main',
            borderColor: 'primary.main',
            color: 'background.paper',
          },
        }}
      >
        {selectInfo?.id === post.id ? 'Fechar' : 'Ingredientes'}
      </Link>

      {/* Exibe os ingredientes */}
      <Collapse in={selectInfo?.id === post.id}>
        <Box sx={{ padding: 2, backgroundColor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
          <List sx={{ listStyleType: 'disc', paddingLeft: 3 }}>
            {post.ingredients.map((ingredient) => (
              <ListItem
                key={ingredient.id}
                sx={{ paddingLeft: 0 }}
              >
                <Typography variant="body2">
                  {ingredient.name}: {ingredient.quantity}
                </Typography>
              </ListItem>
            ))}
          </List>
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
      sx={{ color: 'var(--black)' }}
    >
      <DeleteIcon />
    </IconButton>
  );
};