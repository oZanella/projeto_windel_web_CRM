import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox, IconButton, Chip, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {ModalConfirmDelete} from './ModalConfirmDelete'; 

export const TablePag = ({
  paginatedPosts,
  selectedPosts,
  handleSelectPost,
  handleEditOpen,
  handleDelete,
  page,
  itemsPerPage,
  handleChangePage,
  filteredPosts,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const handleOpenModal = (postId) => {
    setPostIdToDelete(postId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPostIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete !== null) {
      handleDelete(postIdToDelete);
    }
    handleCloseModal();
  };

  return (
    <>
      {/* Tabela de exibição */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Descrição</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Categoria</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Ingredientes</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPosts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Nenhum dado encontrado</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.name}</TableCell>
                  <TableCell>{post.description}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      overflowX: 'auto',
                      gap: 1,
                      width: '100%',
                    }}>
                      {post.ingredients && post.ingredients.length > 0 ? (
                        post.ingredients.map((ingredient) => (
                          <Box
                            key={ingredient.id}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              marginRight: 1,
                              marginBottom: 1,
                            }}
                          >
                            <Typography variant="body1">{ingredient.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              Quantidade: {ingredient.quantity}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body2">Nenhum ingrediente</Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        color="primary"
                      />
                      <IconButton
                        color="primary"
                        onClick={() => handleEditOpen(post)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      
                      <IconButton
                        color="error"
                        onClick={() => handleOpenModal(post.id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      {post.isFavorite && (
                        <Chip
                          icon={
                            <StarOutlineIcon sx={{ color: '#FFD700 !important' }} />
                          }
                          sx={{
                            cursor: 'default',
                            ml: 2,
                            backgroundColor: 'transparent',
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(filteredPosts.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>

      {/* Modal de Confirmação de Exclusão */}
      <ModalConfirmDelete
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
