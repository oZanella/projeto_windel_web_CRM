import React from 'react';
import { Box, Collapse, Link, List, ListItem, Typography } from '@mui/material';

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
          borderRadius: 1.4,
          padding: 0.5,
          borderColor: 'var(--ligthkgrey)',
          color: 'var(--black)',
          transition: 'all 6s ease-in-out',
          ':hover': {
            backgroundColor: 'var(--click)',
            borderColor: 'var(--ligthkgrey)',
          },
          textDecoration: 'none',
        }}
      >
        {selectInfo?.id === post.id ? 'Fechar' : 'Ingredientes'}
      </Link>

      {/* Exibe os ingredientes */}
      <Collapse in={selectInfo?.id === post.id}>
        <Box sx={{ padding: 0.5 }}>
          <List sx={{ listStyleType: 'disc', paddingLeft: 3 }}>
            {post.ingredients.map((ingredient) => (
              <ListItem
                key={ingredient.id}
                sx={{ display: 'list-item', paddingLeft: 0 }}
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
