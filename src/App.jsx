import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import './style/GlobalStyles.css'

export function App() {

  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}

