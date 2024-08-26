import { Box, IconButton, Dialog, TextField, Tooltip } from '@mui/material';
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
  
     
      setPosts(response.data);
      setSelectedPosts([]);
      console.log('Exclusão bem-sucedida.');
    } catch (error) {
      // Detailed error logging
      if (error.response) {
        // Se a resposta da API contém um erro
        console.error('Erro na resposta da API:', error.response.data);
      } else if (error.request) {
        // Se a solicitação foi feita mas não houve resposta
        console.error('Erro na solicitação:', error.request);
      } else {
        // Se houve um erro ao configurar a solicitação
        console.error('Erro ao configurar a solicitação:', error.message);
      }
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

  // Logica de paginação
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>

        {/* Caixa de busca */}
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

        {/* Filtros adicionais */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Tooltip title={showFavoritesOnly ? 'Mostrar todos' : 'Mostrar favoritos apenas'}>
            <IconButton onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}>
              {showFavoritesOnly ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>

        </Box>

        {/* Botões no lado direito */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <ButtonRight
            handleSelectAll={handleSelectAll}
            selectedPosts={selectedPosts}
            filteredPosts={filteredPosts}
            handleDeleteSelected={handleDeleteSelected}
          />
        </Box>
      </Box>

      {/* Tabela de exibição */}
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

      {/* Modal de Edição */}
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
    </Box>
  );
};
