import { Grid, Box, Typography, Card, IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { handleShowDetails, handleEdit, handleSave, handleInputChange } from '../components/Handle';
import { blogFetch } from '../axios/config';
import { IngredientsButton } from '../components/Button';

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
        isFavorite: newPost.isFavorite // Utilize o valor selecionado
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

      <Grid container spacing={2}>
        {posts.length === 0 ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ padding: 2, border: '0.12rem solid var(--ligthkgrey)', borderRadius: 1 }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Botão de Exclusão */}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(post.id)}
                    sx={{ color: 'var(--black)' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  {/* Botão de Editar */}
                  <Box>
                    {modeEdit === post.id ? (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleSave(post.id, dataEdit)}
                          sx={{
                            borderColor: 'var(--ligthkgrey)',
                            background: 'var(--)',
                            color: 'var(--black)',
                            ':hover': {
                              backgroundColor: 'var(--click)',
                              borderColor: 'var(--ligthkgrey)',
                            }
                          }}
                          startIcon={<SaveIcon />}
                        >
                          Salvar
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setModeEdit(null)}
                          sx={{
                            borderColor: 'var(--ligthkgrey)',
                            background: 'var(--red)',
                            color: 'var(--black)',
                            ':hover': {
                              backgroundColor: 'var(--click)',
                              borderColor: 'var(--ligthkgrey)',
                            }
                          }}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(post, setModeEdit, setDataEdit)}
                        sx={{ border: 'none', background: 'none', color: 'var(--black)' }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                {/* Inputs de editar depois de apertar no icone */}
                {modeEdit === post.id ? (
                  <Box>
                    <TextField
                      name="name"
                      label="Nome"
                      value={dataEdit.name || ''}
                      onChange={(e) => handleInputChange(e, setDataEdit)}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="description"
                      label="Descrição"
                      value={dataEdit.description || ''}
                      onChange={(e) => handleInputChange(e, setDataEdit)}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      name="category"
                      label="Categoria"
                      value={dataEdit.category || ''}
                      onChange={(e) => handleInputChange(e, setDataEdit)}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                  </Box>
                ) : (
                  <Box>     {/* Apresenta descricao e categoria como sub mensagem */}
                    <Typography variant="h5" sx={{ textTransform: 'uppercase', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', fontWeight: 400 }}>
                      {post.name}
                    </Typography>
                    <Typography variant="body1">{post.description}</Typography>
                    <Typography variant="body2">Categoria: {post.category}</Typography>
                  </Box>
                )}

                {/* Exibi os ingredientes */}
                <IngredientsButton
                  post={post}
                  selectInfo={selectInfo}
                  setSelectInfo={setSelectInfo}
                  handleShowDetails={handleShowDetails}
                />

              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
