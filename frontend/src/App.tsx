import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard'
import UserPage from './pages/user'
import LoginPage from './pages/login'
import { RequireAuth } from 'react-auth-kit'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth loginPath='/login'><DashboardPage /></RequireAuth>} />
        <Route path='*' element={<RequireAuth loginPath='/login'><DashboardPage /></RequireAuth>} />
        <Route path='/user/:id' element={<RequireAuth loginPath='/login'><UserPage /></RequireAuth>} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
