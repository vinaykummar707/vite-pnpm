// App.tsx
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/dashboard' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
