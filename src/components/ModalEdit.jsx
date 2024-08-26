import React from 'react';
import axios from 'axios';
import { Box, TextField, Typography, IconButton, Button, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete'; // Importa o ícone de deletar

import { API_BASE_URL } from './TableHome';

export const ModalEdit = ({
  currentPost,
  dataEdit,
  setDataEdit,
  handleRemoveIngredient,
  newIngredient,
  setNewIngredient,
  handleAddIngredient,
  onClose, 
}) => {

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/recipe/${currentPost.id}`,
        dataEdit,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Atualização bem-sucedida:', response.data);

      
      window.location.reload();

      if (typeof onClose === 'function') {
        onClose(); 
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <DialogContent>
      {currentPost && (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Editar Receita</Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Ingredientes</Typography>
            {dataEdit.ingredients && dataEdit.ingredients.length > 0 ? (
              dataEdit.ingredients.map((ingredient, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    label="Ingrediente"
                    value={ingredient.name}
                    onChange={(e) => {
                      const updatedIngredients = [...dataEdit.ingredients];
                      updatedIngredients[index] = { ...updatedIngredients[index], name: e.target.value };
                      setDataEdit({ ...dataEdit, ingredients: updatedIngredients });
                    }}
                    fullWidth
                    sx={{ marginBottom: 1 }}
                  />
                  <TextField
                    label="Quantidade"
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => {
                      const updatedIngredients = [...dataEdit.ingredients];
                      updatedIngredients[index] = { ...updatedIngredients[index], quantity: parseInt(e.target.value, 10) || 0 };
                      setDataEdit({ ...dataEdit, ingredients: updatedIngredients });
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                    sx={{ marginBottom: 1 }}
                  />
                  <IconButton onClick={() => handleRemoveIngredient(ingredient)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Typography variant="body2">Nenhum ingrediente adicionado</Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
              <TextField
                label="Adicionar ingrediente"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <Button
                startIcon={<AddIcon />}
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

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Button
                onClick={onClose}
                startIcon={<CancelIcon />}
                variant="contained"
                sx={{
                  flex: 1,
                  backgroundColor: 'var(--darkblue2)',
                  color: 'var(--primary)',
                  borderRadius: '0.4rem',
                  padding: '0.5rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, transform 0.3s',
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
                onClick={handleUpdate}
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{
                  flex: 1,
                  backgroundColor: 'var(--darkblue2)',
                  color: 'var(--primary)',
                  borderRadius: '0.4rem',
                  padding: '0.5rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, transform 0.3s',
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
            </Box>
          </Box>
        </Box>
      )}
    </DialogContent>
  );
};
