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
                        onClick={() => handleDeleteClick(post)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      {post.isFavorite && (
                        <Chip
                          icon={
                            <StarOutlineIcon sx={{ color: '#FFD700 !important' }} />
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

      {/* Modal de confirmação */}
      <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
        <DialogContent>

          <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center' }}>Confirmação</Typography>

          <Typography variant="body1">
            Tem certeza de que deseja excluir o item "{postToDelete?.name}"?
          </Typography>

        </DialogContent>
        <DialogActions>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCancelDelete}
            sx={{
              background: 'var(--darkblue2)',
              fontWeight: 'bold',
              flexGrow: { xs: 1, sm: 1 },
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, transform 0.3s',
              // Animação
              '&:hover': {
                transform: 'scale(1.03)',
              },
              '&:active': {
                backgroundColor: 'var(--click)',
              },
            }}
          >
            Voltar
          </Button>

          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            sx={{
              background: 'var(--delete)',
              fontWeight: 'bold',
              flexGrow: { xs: 1, sm: 1 },
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, transform 0.3s',
              // Animação
              '&:hover': {
                transform: 'scale(1.03)',
              },
              '&:active': {
                backgroundColor: 'var(--click)',
              },
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
