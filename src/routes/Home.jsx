
import { Grid, Box, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {

  const [posts, setPosts] = useState([])

  const getPosts = async () => {

    try {

      const response = await axios.get("https://teste-tecnico-front-api.up.railway.app/recipe");

      // https://jsonplaceholder.typicode.com/posts
      // https://teste-tecnico-front-api.up.railway.app/recipe

      console.log(response);


    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    getPosts()

  }, [])

  return (
    <Box>
    <Grid item xs>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Teste de response - Home
      </Typography>
    </Grid>
  </Box>
  )
}
