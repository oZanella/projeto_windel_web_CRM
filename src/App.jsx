import { Outlet } from 'react-router-dom'
import HomeBase from './components/HomeBase'

import './style/GlobalStyles.css'

function App() {

  return (
    <div className='App'>
      <HomeBase />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
