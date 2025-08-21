// App.tsx
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import Signup from './pages/Signup'
import Layout from './components/Layout'
import OnboardingDialysisUnit from './pages/Onboarding/OnboardingDialysisUnit'
import MachinesPage from './pages/Machines/MachinesPage'
import PatientsPage from './pages/Patients/PatientsPage'
import DepartmentsPage from './pages/Departments/DepartmentsPage'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path = "/onboarding" >
        <Route path="/onboarding/dialysis-unit" element={<OnboardingDialysisUnit />} />
        </Route>
      {/* Protected layout with static Sidebar/Navbar */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/machines" element={<MachinesPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
       
        {/* Add more routes here */}
      </Route>
    </Routes>
  )
}

export default App
