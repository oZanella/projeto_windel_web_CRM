import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import { handleShowDetails, handleEdit, handleSave, handleInputChange } from '../components/Handle';
import { CardDados } from '../components/TableHome';

import { blogFetch } from '../axios/config';


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectInfo, setSelectInfo] = useState(null);
  const [modeEdit, setModeEdit] = useState(null);
  const [dataEdit, setDataEdit] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newPost, setNewPost] = useState({ name: '', description: '', category: '' });

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/recipe");
      const uniqueData = response.data.filter((value, index, self) =>
        index === self.findIndex((t) => t.id === value.id)
      );
      setPosts(uniqueData); // Garante que não tenha dados duplicados
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await blogFetch.delete(`/recipe/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      console.log('Post deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar o post', error);
    }
  };

  const handleAddOpen = () => setOpenAddDialog(true);
  const handleAddClose = () => setOpenAddDialog(false);

  {/* API para envio do novo registro*/ }
  const handleAdd = async () => {
    try {
      const newPostFormatted = {
        name: newPost.name,
        description: newPost.description,
        ingredients: [],
        category: newPost.category,
        isFavorite: newPost.isFavorite                                           // Utilize o valor selecionado
      };

      const response = await blogFetch.post("/recipe", newPostFormatted);
      setPosts([...posts, response.data]);
      setNewPost({ name: '', description: '', category: '', isFavorite: false }); // Adicione o campo isFavorite
      handleAddClose();
      console.log('Post adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar o post', error);
    }
  };

  return (
    <Box>
      {/* Dados para Adicionar Novo Registro */}
      <Dialog open={openAddDialog} onClose={handleAddClose}>
        <DialogTitle>Adicionar Novo Registro</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Nome"
            value={newPost.name}
            onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="description"
            label="Descrição"
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="category"
            label="Categoria"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Favorito</InputLabel>
            <Select
              name="isFavorite"
              value={newPost.isFavorite}
              onChange={(e) => setNewPost({ ...newPost, isFavorite: e.target.value })}
              label="Favorito"
            >
              <MenuItem value={true}>Sim</MenuItem>
              <MenuItem value={false}>Não</MenuItem>

            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancelar</Button>
          <Button onClick={handleAdd}>Adicionar</Button>
        </DialogActions>
      </Dialog>

      <CardDados
        posts={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleSave={handleSave}
        modeEdit={modeEdit}
        setModeEdit={setModeEdit}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        handleInputChange={handleInputChange}
        selectInfo={selectInfo}
        setSelectInfo={setSelectInfo}
        handleShowDetails={handleShowDetails}
      />
    </Box>
  );
};
