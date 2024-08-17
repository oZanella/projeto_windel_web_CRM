import { Grid, Box, Typography, Link, Collapse, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { blogFetch } from '../axios/config';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectInfo, setselectInfo] = useState(null);

  const getPosts = async () => {
    try {
      const response = await blogFetch.get("/recipe");
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleShowDetails = (post) => {
    setselectInfo(selectInfo?.id === post.id ? null : post);
  };

  return (
    <Box>
      <Grid container spacing={2}>

        {posts.length === 0 ? (
          <Typography variant="body1">Carregando...</Typography>
        ) : (
          posts.map((post) => (

            <Grid item xs={12} sm={6} md={4} key={post.id}>

              <Box sx={{ padding: 2, border: '0.12rem solid var(--ligthkgrey)', borderRadius: 1 }}>

                <Typography variant="h5" sx={{ textTransform: 'uppercase', textShadow: '1px 1px 3px rgba(0,0,0,0.3)', fontWeight: 400, }}>{post.name}</Typography>
                <Typography variant="body1">{post.description}</Typography>
                <Typography variant="body2">Categoria: {post.category}</Typography>

                <Link
                  component="button"
                  onClick={() => handleShowDetails(post)}
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
                    textDecoration: 'none',           // Remove sublinhado 
                  }}
                >
                  {selectInfo?.id === post.id ? 'Fechar' : 'Ingredientes'}
                </Link>

                <Collapse in={selectInfo?.id === post.id}>
                  <Box sx={{
                    padding: 0.5,
                  }}>
                    <List sx={{
                      listStyleType: 'disc',
                      paddingLeft: 3
                    }}>
                      {post.ingredients.map((ingredient) => (
                        <ListItem
                          key={ingredient.id}
                          sx={{
                            display: 'list-item',
                            paddingLeft: 0,
                          }}
                        >
                          <Typography variant="body2">
                            {ingredient.name}: {ingredient.quantity}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Collapse>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box >
  );
};
