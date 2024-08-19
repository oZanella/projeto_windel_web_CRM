import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, IconButton, TextField, Dialog, DialogContent, DialogActions, FormControlLabel, Switch, Chip, Paper, Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import axios from 'axios';

const API_BASE_URL = 'https://teste-tecnico-front-api.up.railway.app';

export const CardDados = ({
  posts, setPosts, handleDelete
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [dataEdit, setDataEdit] = useState({});
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);

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

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]); // Desmarcar todos
    } else {
      setSelectedPosts(posts.map(post => post.id)); // Selecionar todos
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedPosts.map(id => axios.delete(`${API_BASE_URL}/posts/${id}`)));
      const response = await axios.get(`${API_BASE_URL}/posts`);
      setPosts(response.data);
      setSelectedPosts([]);
    } catch (error) {
      console.error('Error ao apagar os registros:', error);
    }
  };

  const handleSelectPost = (id) => {
    setSelectedPosts(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(postId => postId !== id)
        : [...prevSelected, id]
    );
  };

  const handleFavoriteClick = (id) => {
    
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
          {selectedPosts.length === posts.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
        </Button>
      </Box>

      {/* Tabela onde aparecem os dados */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Descrição</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Categoria</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Ingredientes</TableCell>
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
                  <TableCell sx={{ padding: '8px' }}>
                    {post.name}
                  </TableCell>
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        color="primary"
                      />
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
                      {post.isFavorite && (
                        <Chip
                          label="Favorito"
                          color= sx
                          onClick={() => handleFavoriteClick(post.id)}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de edição */}
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
                    color="primary"
                  />
                }
                label="Favorito"
                sx={{ marginBottom: 2 }}
              />
              <Typography variant="h6">Ingredientes:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <TextField
                  label="Novo Ingrediente"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  fullWidth
                />
                <IconButton color="primary" onClick={handleAddIngredient}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {dataEdit.ingredients && dataEdit.ingredients.length > 0 ? (
                  dataEdit.ingredients.map((ingredient) => (
                    <Box key={ingredient} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>{ingredient}</Typography>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveIngredient(ingredient)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2">Nenhum ingrediente adicionado.</Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveModal} color="primary" startIcon={<SaveIcon />}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
