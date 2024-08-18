// home.jsx
import { Grid, Box, Typography, Link, Collapse, List, ListItem, Card, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { blogFetch } from '../axios/config';
import { handleShowDetails, handleEdit, handleSave, handleInputChange } from '../components/Handle'; 

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectInfo, setSelectInfo] = useState(null);
  const [modeEdit, setModeEdit] = useState(null);
  const [dataEdit, setDataEdit] = useState({});

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

  return (
    <Box>
      <Grid container spacing={2}>
        {posts.length === 0 ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ padding: 2, border: '0.12rem solid var(--ligthkgrey)', borderRadius: 1 }}>

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
                  <Box>
                    <Typography variant="h5" sx={{ textTransform: 'uppercase', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', fontWeight: 400 }}>
                      {post.name}
                    </Typography>
                    <Typography variant="body1">{post.description}</Typography>
                    <Typography variant="body2">Categoria: {post.category}</Typography>
                  </Box>
                )}

                {/* Botão de ingredientes */}
                {modeEdit !== post.id && (
                  <Link
                    component="button"
                    onClick={() => handleShowDetails(post, modeEdit, setSelectInfo, selectInfo)}
                    sx={{
                      display: 'block',
                      marginTop: 1,
                      cursor: 'pointer',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: 1.4,
                      padding: 0.5,
                      borderColor: 'var(--ligthkgrey)',
                      color: 'var(--black)',
                      transition: 'all 6s ease-in-out',
                      ':hover': {
                        backgroundColor: 'var(--click)',
                        borderColor: 'var(--ligthkgrey)',
                      },
                      textDecoration: 'none',
                    }}
                  >
                    {selectInfo?.id === post.id ? 'Fechar' : 'Ingredientes'}
                  </Link>
                )}

                {/* Exibe os ingredientes */}
                <Collapse in={selectInfo?.id === post.id}>
                  <Box sx={{ padding: 0.5 }}>
                    <List sx={{ listStyleType: 'disc', paddingLeft: 3 }}>
                      {post.ingredients.map((ingredient) => (
                        <ListItem
                          key={ingredient.id}
                          sx={{ display: 'list-item', paddingLeft: 0 }}
                        >
                          <Typography variant="body2">
                            {ingredient.name}: {ingredient.quantity}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Collapse>

                {/* Botões de Editar/Salvar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  {modeEdit === post.id ? (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleSave(post.id)}
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
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
