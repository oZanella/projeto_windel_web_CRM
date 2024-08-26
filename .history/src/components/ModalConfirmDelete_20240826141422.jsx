import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Snackbar, Alert } from '@mui/material';

export const ModalConfirmDelete = ({ open, onClose, onConfirm }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setSnackbarOpen(true);
    onClose();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
            Confirmar Exclusão
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Tem certeza que deseja excluir este item?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                mr: { xs: 0, sm: 0 },
                ml: { xs: 1, sm: 1 },
                gap: 2,
                flexGrow: { xs: 1, sm: 1 },
                backgroundColor: 'var(--darkblue2)',
                color: 'var(--primary)',
                borderRadius: '0.4rem',
                padding: '0.5rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
                '&:active': {
                  backgroundColor: 'var(--click)',
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{
                mr: { xs: 0, sm: 0 },
                ml: { xs: 1, sm: 1 },
                gap: 2,
                flexGrow: { xs: 1, sm: 1 },
                backgroundColor: 'var(--delete)',
                color: 'var(--primary)',
                borderRadius: '0.4rem',
                padding: '0.5rem',
                fontWeight: 'bold',
                transition: 'background-color 0.3s, transform 0.3s',
                '&:hover': {
                  backgroundColor: 'var(--reddark)',
                  transform: 'scale(1.02)',
                },
                '&:active': {
                  backgroundColor: 'var(--click)',
                },
              }}
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="Excluído com sucesso"
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Excluído com sucesso
        </Alert>
      </Snackbar>
    </>
  );
};
