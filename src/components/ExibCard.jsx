import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography, Box, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControlLabel, Switch, Chip, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const API_BASE_URL = 'https://teste-tecnico-front-api.up.railway.app';

export const CardDados = ({
  posts, setPosts, handleDelete, modeEdit, setModeEdit, handleInputChange, selectInfo, setSelectInfo, handleShowDetails
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1">Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.name}</TableCell>
                  <TableCell>{post.description}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <Box sx={{ maxHeight: 100, overflowY: 'auto', background: 'var(--lightgrey)', padding: 1 }}>
                      <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
                        {post.ingredients && post.ingredients.length > 0 ? (
                          post.ingredients.map((ingredient) => (
                            <li key={ingredient.id} style={{ marginBottom: '8px' }}>
                              {ingredient.name} - Quantidade: {ingredient.quantity}
                            </li>
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">Nenhum ingrediente disponível</Typography>
                        )}
                      </ul>
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

      {/* Modal de edição */}
      <Dialog open={openModal} onClose={handleEditClose}>
        <DialogContent>
          {currentPost && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Name"
                value={dataEdit.name || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="description"
                label="Description"
                value={dataEdit.description || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, description: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="category"
                label="Category"
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
                label="Favorite"
                sx={{ marginTop: 1 }}
              />
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Ingredients</Typography>
                {dataEdit.ingredients && dataEdit.ingredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient(ingredient)}
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TextField
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    label="New Ingredient"
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
                borderColor: 'primary.main',
                color: 'background.paper',
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveModal}
            startIcon={<SaveIcon />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 1,
              cursor: 'pointer',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: 1,
              padding: '8px 16px',
              borderColor: 'rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
