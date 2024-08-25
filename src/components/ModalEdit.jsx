import React from 'react';
import { Box, TextField, Typography, Chip, Button, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const ModalEdit = ({
  currentPost,
  dataEdit,
  setDataEdit,
  handleRemoveIngredient,
  newIngredient,
  setNewIngredient,
  handleAddIngredient,
}) => {
  return (
    <DialogContent>
      {currentPost && (
        <Box>
          <TextField
            label="Nome"
            value={dataEdit.name || ''}
            onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Descrição"
            value={dataEdit.description || ''}
            onChange={(e) => setDataEdit({ ...dataEdit, description: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Categoria"
            value={dataEdit.category || ''}
            onChange={(e) => setDataEdit({ ...dataEdit, category: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              Ingredientes
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}>
              {dataEdit.ingredients && dataEdit.ingredients.length > 0 ? (
                dataEdit.ingredients.map((ingredient) => (
                  <Chip
                    key={ingredient.id}
                    label={`${ingredient.name} (${ingredient.quantity})`}
                    onDelete={() => handleRemoveIngredient(ingredient)}
                    sx={{ marginBottom: 1 }}
                  />
                ))
              ) : (
                <Typography variant="body2">Nenhum ingrediente adicionado</Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Adicionar ingrediente"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                sx={{ flexGrow: 1, marginRight: 1 }}
              />

              <Button
                startIcon={<AddIcon sx={{ ml: 1.6 }} />}
                onClick={handleAddIngredient}
                sx={{
                  padding: '0',
                  minWidth: '0.1rem',
                  minHeight: '0.1rem',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:active': {
                    backgroundColor: 'transparent',
                    transform: 'none',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </DialogContent>
  );
};

