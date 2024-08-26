import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, IconButton, Dialog, DialogContent, DialogActions, TextField, Chip, Paper, Checkbox, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import axios from 'axios';

const API_BASE_URL = 'https://teste-tecnico-front-api.up.railway.app';

export const CardDados = ({ posts, setPosts, handleDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [dataEdit, setDataEdit] = useState({});
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const itensPage = 6;

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
      const newIngredientObject = {
        id: Date.now(),
        name: newIngredient.trim(),
        quantity: 1
      };

      setDataEdit((prevData) => ({
        ...prevData,
        ingredients: [...(prevData.ingredients || []), newIngredientObject],
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setDataEdit((prevData) => ({
      ...prevData,
      ingredients: (prevData.ingredients || []).filter((ingredient) => ingredient.id !== ingredientToRemove.id),
    }));
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(post => post.id));
    }z
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

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itensPage;
  const endIndex = startIndex + itensPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (postToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/posts/${postToDelete.id}`);
        const response = await axios.get(`${API_BASE_URL}/posts`);
        setPosts(response.data);
        setPostToDelete(null);
        setConfirmDialogOpen(false);
      } catch (error) {
        console.error('Error ao apagar o registro:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
    setConfirmDialogOpen(false);
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
            {paginatedPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Carregando informações...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedPosts.map((post) => (
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
                          icon={
                            <StarOutlineIcon sx={{  }} />
                          }
                          sx={{
                            cursor: 'default',
                            ml: 2,
                            backgroundColor: 'transparent',
                          }}
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(posts.length / itensPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      <Dialog open={openModal} onClose={handleEditClose} fullWidth maxWidth="sm">
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
                  >

                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>

          <Button
            onClick={handleEditClose}
            startIcon={<DeleteIcon />}
            variant="contained"
            sx={{
              mr: { xs: 0, sm: 0 },
              ml: { xs: 1, sm: 1 },
              gap: 2,
              flexGrow: { xs: 1, sm: 1 },
              backgroundColor: 'var(--darkblue2)',
              color: 'var(--primary)',
              borderRadius: '0.4rem',
              padding: '0.5rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',

              // Animação
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
            onClick={handleSaveModal}
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              mr: { xs: 0, sm: 0 },
              ml: { xs: 1, sm: 1 },
              gap: 2,
              flexGrow: { xs: 1, sm: 1 },
              backgroundColor: 'var(--darkblue2)',
              color: 'var(--primary)',
              borderRadius: '0.4rem',
              padding: '0.5rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, transform 0.3s',

              // Animação
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

        </DialogActions>
      </Dialog >
    </>
  );
};
