import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard'
import UserPage from './pages/user'
import LoginPage from './pages/login'
import { RequireAuth } from 'react-auth-kit'
import SettingsGeneralPage from './pages/settingsGeneral'
import LandingPage from './pages/landing'
import UsersPage from './pages/users'
import SetPasswordPage from './pages/setPassword'
import SettingsQualificationPage from './pages/settingsQualification'
import RegisterUserPage from './pages/registerUser'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RequireAuth loginPath='/login'><LandingPage /></RequireAuth>} />
        <Route path='*' element={<RequireAuth loginPath='/login'><LandingPage /></RequireAuth>} />
        <Route path=':accountId/dashboard' element={<RequireAuth loginPath='/login'><DashboardPage /></RequireAuth>} />
        <Route path=':accountId/settings' element={<RequireAuth loginPath='/login'><SettingsGeneralPage /></RequireAuth>} />
        <Route path=':accountId/settings/general' element={<RequireAuth loginPath='/login'><SettingsGeneralPage /></RequireAuth>} />
        <Route path=':accountId/settings/qualification' element={<RequireAuth loginPath='/login'><SettingsQualificationPage /></RequireAuth>} />
        <Route path=':accountId/users' element={<RequireAuth loginPath='/login'><UsersPage /></RequireAuth>} />
        <Route path=':accountId/user/:id' element={<RequireAuth loginPath='/login'><UserPage /></RequireAuth>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterUserPage />} />
        <Route path='/setpassword/:userId' element={<SetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
