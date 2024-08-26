import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';

import { ModalConfirmDelete } from './ModalConfirmDelete';

export const ButtonRight = ({ handleSelectAll, selectedPosts, filteredPosts }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteSelected(selectedPosts);
    handleCloseModal();
  };

  const handleDeleteSelected = (postsToDelete) => {
    fetch('https://teste-tecnico-front-api.up.railway.app/recipe/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: postsToDelete }),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error('Erro na resposta da API: ' + response.status + ' - ' + text);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Resposta da API:', data);
        setPosts(prevPosts => prevPosts.filter(post => !postsToDelete.includes(post.id)));
      })
      .catch(error => {
        console.error('Erro ao excluir posts:', error);
        console.log(data)
      });
  };


  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleOpenModal}
        disabled={selectedPosts.length === 0}
        sx={{ marginRight: 2 }}
      >
        Apagar Selecionados
      </Button>


      <Button
        variant="contained"
        startIcon={<SelectAllIcon />}
        onClick={handleSelectAll}
        sx={{
          background: 'var(--roxo)'
        }}
      >
        {selectedPosts.length === filteredPosts.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
      </Button>

      {/* Modal de Confirmação */}
      <ModalConfirmDelete
        open={modalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

