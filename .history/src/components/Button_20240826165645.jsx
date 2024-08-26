import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { ModalConfirmDelete } from './ModalConfirmDelete';

export const ButtonRight = ({ handleSelectAll, selectedPosts, filteredPosts, handleDeleteSelected }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    console.log('Posts selecionados para exclusão:', selectedPosts);
    console.log('Chamando handleDeleteSelected com esses IDs:', selectedPosts);
    try {
      await handleDeleteSelected(selectedPosts);
      console.log('Exclusão bem-sucedida.');
    } catch (error) {
      console.error('Erro ao excluir posts:', error);
    }
    handleCloseModal();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleOpenModal}
        disabled={selectedPosts.length === 0}
        sx={{ 
          marginRight: 2, background: 'var(--new)', 
        }}
      >
        Apagar Selecionados
      </Button>

      <Button
        variant="contained"
        startIcon={<SelectAllIcon />}
        onClick={handleSelectAll}
        sx={{
          background: 'var(--roxo)',
          '&:hover': {
            backgroundColor: 'var(--new)',
            transform: 'scale(1.02)',
          },
          '&:active': {
            backgroundColor: 'var(--click)',
          },
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
