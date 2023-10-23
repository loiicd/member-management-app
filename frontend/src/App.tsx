import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard'
import UserPage from './pages/user'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='*' element={<DashboardPage />} />
        <Route path='/user/:id' element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
