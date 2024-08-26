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

  //funcao para deletar

  const handleDeleteSelected = async (postsToDelete) => {
    try {
      const response = await fetch('https://teste-tecnico-front-api.up.railway.app/recipe/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: postsToDelete }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na resposta da API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Resposta da API:', data);

      // Atualiza o estado local após a exclusão bem-sucedida
      setPosts(prevPosts => prevPosts.filter(post => !postsToDelete.includes(post.id)));
    } catch (error) {
      console.error('Erro ao excluir posts:', error);
    }
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

