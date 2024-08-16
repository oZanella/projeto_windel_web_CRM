import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import './style/GlobalStyles.css'

export function App() {

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, marginTop: { xs: 8, sm: 8} }}>
      <Header />
      <Box >
        <Outlet />
      </Box>
    </Box>
  );
}

