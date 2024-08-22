import { Box, Typography, TextField, Button, IconButton, Snackbar, Alert, FormControlLabel, Switch } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { blogFetch } from '../axios/config';
import { useState } from 'react';

// Dados da API para ser preenchido
export const Cadastro = () => {
  const [newPost, setNewPost] = useState({
    name: '',
    description: '',
    category: '',
    isFavorite: false,
    ingredients: [{ name: '', quantity: 0 }]
  });

  // Dados para apresentar aviso de sucesso ou erro
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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

      // Limpa os campos do formulário
      setNewPost({
        name: '',
        description: '',
        category: '',
        isFavorite: false,
        ingredients: [{ name: '', quantity: 0 }]
      });

      // Mostrar mensagem de sucesso
      setSnackbarMessage('Registro realizado com sucesso');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {

      // Mostrar mensagem de erro
      setSnackbarMessage('Não foi possível realizar o cadastro. Verifique os dados inseridos.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (

    // Adicionar os dados do produto
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>

      <Typography variant="h6" sx={{ mb: 2, display: 'flex', justifyContent: 'center', }}>Adicionar nova receita</Typography>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <FormControlLabel
          control={
            <Switch
              checked={newPost.isFavorite}
              onChange={(e) => setNewPost({ ...newPost, isFavorite: e.target.checked })}
              color="primary"
            />
          }
          label="Favorito"
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>Ingredientes</Typography>
        {newPost.ingredients.length > 0 ? (
          newPost.ingredients.map((ingredient, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

              <TextField
                label="Ingrediente"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                fullWidth
                sx={{ marginBottom: 1 }}
              />

              <TextField
                label="Quantidade"
                type="number"
                onChange={(e) => handleIngredientChange(index, 'quantity', parseInt(e.target.value, 10) || 0)}
                InputProps={{ inputProps: { min: 0 } }}
                value={ingredient.quantity}
                sx={{ marginBottom: 1 }}
                fullWidth
              />

              {/* Remove o ingrediente inserido */}
              <IconButton sx={{ mb: 1 }} onClick={() => handleRemoveIngredient(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        ) : (

          // aviso de nenhum ingrediente
          <Typography variant="body2">Sem ingredientes</Typography>
        )}

        {/* Botão para adicionar Ingrediente e Salvar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
          <Button
            sx={{
              background: 'var(--darkblue2)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, transform 0.3s',
              // Animação
              '&:hover': {
                transform: 'scale(1.07)',
              },
              '&:active': {
                backgroundColor: 'var(--click)',
              },
            }}
            variant="contained"
            color="primary"
            onClick={handleAddIngredient}
            startIcon={<AddCircleIcon />}
          >
            Adicionar
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            sx={{
              background: 'var(--darkblue2)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s, transform 0.3s',
              // Animação
              '&:hover': {
                transform: 'scale(1.07)',
              },
              '&:active': {
                backgroundColor: 'var(--click)',
              },
            }}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleAdd}
          >
            Salvar
          </Button>
        </Box>

        {/* //configuração do aviso */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          transitionDuration={350}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
