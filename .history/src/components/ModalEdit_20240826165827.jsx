import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, Button, DialogContent, Snackbar, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { API_BASE_URL } from './TableHome';

export const ModalEdit = ({
  currentPost,
  dataEdit,
  setDataEdit,
  onClose, 
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
      setSnackbarMessage('Atualizado com sucesso'); 
      setSnackbarSeverity('success'); 
      setSnackbarOpen(true); 
      setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose(); 
        }
        window.location.reload(); 
      }, 3000); 
    } catch (error) {
      console.error('Erro ao atualizar:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Erro ao atualizar');
      setSnackbarSeverity('error'); 
      setSnackbarOpen(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleQuantityChange = (index, value) => {
    if (value <= 0) {
      setSnackbarMessage('A quantidade deve ser maior que zero. Verifique!'); 
      setSnackbarSeverity('error'); 
      setSnackbarOpen(true); 
      return;
    }

    const updatedIngredients = [...dataEdit.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], quantity: value };
    setDataEdit({ ...dataEdit, ingredients: updatedIngredients });
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

            <Typography variant="subtitle1" sx={{ mb: 1 }}>Ingredientes</Typography>
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
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10) || 0)}
                    InputProps={{ inputProps: { min: 1 } }} // Define o valor mínimo como 1
                    fullWidth
                    sx={{ marginBottom: 1 }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2">Nenhum ingrediente adicionado</Typography>
            )}

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
                    background: 'var(--)'
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
                  backgroundColor: 'var(--roxo)',
                  color: 'var(--primary)',
                  borderRadius: '0.4rem',
                  padding: '0.5rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, transform 0.3s',
                  '&:hover': {
                    backgroundColor: 'var(--new)',
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
      
      {/* Snackbar para exibir a mensagem de sucesso ou erro */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        transitionDuration={350}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DialogContent>
  );
};
