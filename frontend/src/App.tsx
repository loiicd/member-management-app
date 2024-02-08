import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard'
import UserPage from './pages/user'
import LoginPage from './pages/login'
import { RequireAuth } from 'react-auth-kit'
import SettingsPage from './pages/settings'
import RegisterPage from './pages/register'
import LandingPage from './pages/landing'
import UsersPage from './pages/users'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth loginPath='/login'><LandingPage /></RequireAuth>} />
        <Route path='*' element={<RequireAuth loginPath='/login'><LandingPage /></RequireAuth>} />
        <Route path=':accountId/dashboard' element={<RequireAuth loginPath='/login'><DashboardPage /></RequireAuth>} />
        <Route path=':accountId/settings' element={<RequireAuth loginPath='/login'><SettingsPage /></RequireAuth>} />
        <Route path=':accountId/users' element={<RequireAuth loginPath='/login'><UsersPage /></RequireAuth>} />
        <Route path=':accountId/user/:id' element={<RequireAuth loginPath='/login'><UserPage /></RequireAuth>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
