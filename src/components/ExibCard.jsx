import React, { useState, useEffect } from 'react';
import {
  Grid, Card, Typography, Box, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControlLabel, Switch
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IngredientsButton, DeleteButton } from './Button';
import axios from 'axios'; // Ensure Axios is imported

// Define the API base URL
const API_BASE_URL = 'https://teste-tecnico-front-api.up.railway.app';

export const CardDados = ({
  posts, setPosts, handleDelete, modeEdit, setModeEdit, handleInputChange, selectInfo, setSelectInfo, handleShowDetails
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    if (currentPost) {
      setDataEdit({ ...currentPost }); // Update dataEdit when currentPost changes
    }
  }, [currentPost]);

  const handleEditOpen = (post) => {
    setCurrentPost(post);
    setOpenModal(true);
  };

  const handleEditClose = () => {
    setOpenModal(false);
    setCurrentPost(null);
  };

  const handleSaveModal = async () => {
    if (currentPost) {
      try {
        // Update the post data via the API
        await axios.put(`${API_BASE_URL}/posts/${currentPost.id}`, dataEdit);

        // Refresh the posts list
        const response = await axios.get(`${API_BASE_URL}/posts`);
        setPosts(response.data);

        handleEditClose(); // Close the modal after saving
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {posts.length === 0 ? (
          <Typography variant="body1" sx={{ width: '100%', textAlign: 'center' }}>Loading...</Typography>
        ) : (
          posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
              <Card sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                backgroundColor: 'background.paper',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {post.name}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(post)}
                      sx={{
                        mr: 1,
                        visibility: modeEdit !== post.id ? 'visible' : 'hidden',
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <DeleteButton
                      post={post}
                      handleDelete={handleDelete}
                      sx={{ visibility: modeEdit !== post.id ? 'visible' : 'hidden' }}
                    />
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {post.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {post.category}
                  </Typography>
                </Box>

                <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', mt: 'auto' }}>
                  <IngredientsButton
                    post={post}
                    selectInfo={selectInfo}
                    setSelectInfo={setSelectInfo}
                    handleShowDetails={handleShowDetails}
                  />
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Edit Modal */}
      <Dialog open={openModal} onClose={handleEditClose}>

        <DialogContent>
          {currentPost && (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Name"
                value={dataEdit.name || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="description"
                label="Description"
                value={dataEdit.description || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, description: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="category"
                label="Category"
                value={dataEdit.category || ''}
                onChange={(e) => setDataEdit({ ...dataEdit, category: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={dataEdit.isFavorite || false}
                    onChange={(e) => setDataEdit({ ...dataEdit, isFavorite: e.target.checked })}
                    name="isFavorite"
                    color="primary"
                  />
                }
                label="Favorite"
                sx={{ marginTop: 1 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleEditClose}
            color="secondary"
            sx={{
              display: 'block',
              marginTop: 1,
              cursor: 'pointer',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: 1,
              padding: '8px 16px',
              borderColor: 'rgba(0, 0, 0, 0.2)',
              color: 'text.primary',
              fontWeight: 500,
              textAlign: 'center',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'primary.main',
                borderColor: 'primary.main',
                color: 'background.paper',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveModal}
            startIcon={<SaveIcon />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 1,
              cursor: 'pointer',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              borderRadius: 1,
              padding: '8px 16px',
              borderColor: 'rgba(0, 0, 0, 0.2)',
              color: 'text.primary',
              fontWeight: 500,
              textAlign: 'center',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
                borderColor: 'primary.dark',
                color: 'background.paper',
              },
              
              '& .MuiButton-startIcon': {
                marginRight: 1, 
              },
              '& .MuiButton-label': {
                justifyContent: 'center', 
              },
            }}
          >
            Save
          </Button>
        </DialogActions>

      </Dialog>
    </>
  );
};
