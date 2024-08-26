import React from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Chip, Button, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel'; // Importa o ícone de cancelar

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
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar:', error.response ? error.response.data : error.message);
    }
  };

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
          </Box>

          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
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
      )}
    </DialogContent>
  );
};
