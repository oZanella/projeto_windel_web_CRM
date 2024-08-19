import { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { blogFetch } from '../axios/config'; 

export const Cadastro = () => {
  const [newPost, setNewPost] = useState({
    name: '',
    description: '',
    category: '',
    isFavorite: false,
    ingredients: [{ name: '', quantity: 0 }] 
  });
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleAddOpen = () => setOpenAddDialog(true);
  const handleAddClose = () => setOpenAddDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...newPost.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setNewPost({ ...newPost, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setNewPost({ ...newPost, ingredients: [...newPost.ingredients, { name: '', quantity: 0 }] });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = newPost.ingredients.filter((_, i) => i !== index);
    setNewPost({ ...newPost, ingredients: newIngredients });
  };

  const handleAdd = async () => {
    try {
      const newPostFormatted = {
        name: newPost.name,
        description: newPost.description,
        ingredients: newPost.ingredients.filter(ingredient => ingredient.name.trim() !== '' && ingredient.quantity > 0), 
        category: newPost.category,
        isFavorite: newPost.isFavorite
      };

      const response = await blogFetch.post("/recipe", newPostFormatted);
      console.log('Post adicionado com sucesso', response.data);
      handleAddClose();
    } catch (error) {
      console.error('Erro ao adicionar o post', error.response?.data || error.message);
    }
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" color="primary" onClick={handleAddOpen}>
            Adicionar Novo Produto
          </Button>
        </Grid>
      </Grid>

      {/* Adicionar Novo Produto */}
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
            value={newPost.isFavorite ? 'true' : 'false'}
            onChange={(e) => setNewPost({ ...newPost, isFavorite: e.target.value === 'true' })}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Ingredientes</Typography>
          {newPost.ingredients.map((ingredient, index) => (
            <Grid container spacing={1} alignItems="center" key={index}>
              <Grid item xs={5}>
                <TextField
                  label={`Ingrediente ${index + 1}`}
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label={`Quantidade ${index + 1}`}
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', parseInt(e.target.value, 10) || 0)}
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemoveIngredient(index)} color="error">
                  <RemoveCircleIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddIngredient}
            startIcon={<AddCircleIcon />}
            sx={{ marginTop: 1, marginBottom: 2 }}
          >
            Adicionar Ingrediente
          </Button>
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
