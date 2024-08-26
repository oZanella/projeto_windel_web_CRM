import {
  Box,
  IconButton,
  Dialog,
  TextField,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { ButtonRight } from './Button';
import { ModalEdit } from './ModalEdit';
import { TablePag } from './TablePag';
import axios from 'axios';

export const API_BASE_URL = 'https://teste-tecnico-front-api.up.railway.app';

export const CardDados = ({ posts, setPosts, handleDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [dataEdit, setDataEdit] = useState({});
  const [newIngredient, setNewIngredient] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Snackbar state management
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

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

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      const newIngredientObject = {
        id: Date.now(),
        name: newIngredient.trim(),
        quantity: 1
      };

      setDataEdit(prevData => ({
        ...prevData,
        ingredients: [...(prevData.ingredients || []), newIngredientObject],
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setDataEdit(prevData => ({
      ...prevData,
      ingredients: (prevData.ingredients || []).filter(ingredient => ingredient.id !== ingredientToRemove.id),
    }));
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleDeleteSelected = async () => {
    console.log('IDs selecionados para exclusão:', selectedPosts);
    try {
      const endpoint = `${API_BASE_URL}/recipe/delete-in-batch`;
      const requestBody = { registersId: selectedPosts };

      console.log('Enviando solicitação DELETE para o URL:', endpoint);
      console.log('Corpo da solicitação:', requestBody);

      await axios.post(endpoint, requestBody);

      const response = await axios.get(`${API_BASE_URL}/recipe`);
      console.log('Posts atualizados:', response.data);

      setPosts(response.data); // Update posts state with new data
      setSelectedPosts([]);
      setSnackbarMessage('Exclusão bem-sucedida');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Erro na exclusão:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Erro na exclusão');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.reload(); // Refresh page after 3 seconds
      }, 3000);
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

  const filteredPosts = posts.filter(post =>
    (!showFavoritesOnly || post.isFavorite) &&
    (!selectedCategory || post.category === selectedCategory) &&
    (post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <IconButton position="start">
                <SearchIcon />
              </IconButton>
            ),
          }}
          sx={{ marginRight: 2 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title={showFavoritesOnly ? 'Mostrar todos' : 'Mostrar favoritos apenas'}>
            <IconButton onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
              {showFavoritesOnly ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <ButtonRight
            handleSelectAll={handleSelectAll}
            selectedPosts={selectedPosts}
            filteredPosts={filteredPosts}
            handleDeleteSelected={handleDeleteSelected}
          />
        </Box>
      </Box>
      <TablePag
        paginatedPosts={paginatedPosts}
        selectedPosts={selectedPosts}
        handleSelectPost={handleSelectPost}
        handleEditOpen={handleEditOpen}
        handleDelete={handleDelete}
        page={page}
        itemsPerPage={itemsPerPage}
        handleChangePage={handleChangePage}
        filteredPosts={filteredPosts}
      />
      <Dialog open={openModal} onClose={handleEditClose} fullWidth maxWidth="sm">
        <ModalEdit
          currentPost={currentPost}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
          handleRemoveIngredient={handleRemoveIngredient}
          newIngredient={newIngredient}
          setNewIngredient={setNewIngredient}
          handleAddIngredient={handleAddIngredient}
          onClose={handleEditClose}
        />
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} 
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
