import { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { blogFetch } from '../axios/config'; // Certifique-se de que o caminho está correto
import SaveIcon from '@mui/icons-material/Save';

export const Cadastro = () => {
  const [newPost, setNewPost] = useState({
    name: '',
    description: '',
    category: '',
    isFavorite: false,
    ingredients: []
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleAddOpen = () => setOpenAddDialog(true);
  const handleAddClose = () => setOpenAddDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const newPostFormatted = {
        name: newPost.name,
        description: newPost.description,
        ingredients: [], // Adicione os ingredientes conforme necessário
        category: newPost.category,
        isFavorite: newPost.isFavorite
      };

      const response = await blogFetch.post("/recipe", newPostFormatted);
      console.log('Post adicionado com sucesso', response.data);
      handleAddClose();
    } catch (error) {
      console.error('Erro ao adicionar o post', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Cadastro de Novo Produto
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddOpen}>
            Adicionar Novo Produto
          </Button>
        </Grid>
      </Grid>

      {/* Dialog para Adicionar Novo Produto */}
      <Dialog open={openAddDialog} onClose={handleAddClose}>
        <DialogTitle>Adicionar Novo Produto</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Nome"
            value={newPost.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="description"
            label="Descrição"
            value={newPost.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="category"
            label="Categoria"
            value={newPost.category}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="isFavorite"
            label="Favorito (true/false)"
            value={newPost.isFavorite}
            onChange={(e) => setNewPost({ ...newPost, isFavorite: e.target.value === 'true' })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            startIcon={<SaveIcon />}
            sx={{ marginTop: 2 }}
          >
            Salvar
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};


