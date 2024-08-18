import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, IconButton, TextField, Dialog, DialogContent, DialogActions, FormControlLabel, Switch, Chip, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_BASE_URL = 'https://teste-tecnico-front-api.up.railway.app';

export const CardDados = ({
  posts, setPosts, handleDelete
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [dataEdit, setDataEdit] = useState({});
  const [newIngredient, setNewIngredient] = useState('');

  useEffect(() => {
    if (currentPost) {
      setDataEdit({ ...currentPost });
    }
  }, [currentPost]);

  const handleEditOpen = (post) => {
    setCurrentPost(post);
    setOpenModal(true);
  };

  const handleEditClose = () => {
    setOpenModal(false);
    setCurrentPost(null);
    setNewIngredient('');
  };

  const handleSaveModal = async () => {
    if (currentPost) {
      try {
        await axios.put(`${API_BASE_URL}/posts/${currentPost.id}`, dataEdit);
        const response = await axios.get(`${API_BASE_URL}/posts`);
        setPosts(response.data);
        handleEditClose();
      } catch (error) {
        console.error('Error ao salvar:', error);
      }
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      setDataEdit((prevData) => ({
        ...prevData,
        ingredients: [...(prevData.ingredients || []), newIngredient.trim()],
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setDataEdit((prevData) => ({
      ...prevData,
      ingredients: (prevData.ingredients || []).filter((ingredient) => ingredient !== ingredientToRemove),
    }));
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Descrição</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Categoria</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Ingrediente</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Carregando informações...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow sx={{ height: 'auto' }} key={post.id}>
                  <TableCell sx={{ padding: '8px' }}>{post.name}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{post.description}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{post.category}</TableCell>

                  <TableCell sx={{ padding: '8px' }}>
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      overflowX: 'auto',
                      gap: 1,
                      width: '100%',
                    }}>
                      {post.ingredients && post.ingredients.length > 0 ? (
                        post.ingredients.map((ingredient) => (
                          <Box
                            key={ingredient.id}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              marginRight: 1,
                              marginBottom: 1,
                            }}
                          >
                            <Typography variant="body1">{ingredient.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Quantidade: {ingredient.quantity}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2">Nenhum ingrediente disponível</Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(post)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(post.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogContent>
          {currentPost && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Nome"
                value={dataEdit.name || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="description"
                label="Descrição"
                value={dataEdit.description || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, description: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="category"
                label="Categoria"
                value={dataEdit.category || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, category: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={dataEdit.isFavorite || false}
                    onChange={(e) => setDataEdit({ ...dataEdit, isFavorite: e.target.checked })}
                    name="isFavorite"
                    color="primary"
                  />
                }
                label="Favorito"
                sx={{ marginTop: 1 }}
              />
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Ingredientes</Typography>
                {dataEdit.ingredients && dataEdit.ingredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={`${ingredient.name} (${ingredient.quantity})`}
                    onDelete={() => handleRemoveIngredient(ingredient)}
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TextField
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    label="Novo Ingrediente"
                    variant="outlined"
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <IconButton color="primary" onClick={handleAddIngredient}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleEditClose}
            color="secondary"
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
                borderColor: 'transparent',
                color: '#fff',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveModal}
            color="primary"
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
                borderColor: 'transparent',
                color: '#fff',
              },
            }}
            startIcon={<SaveIcon />}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
