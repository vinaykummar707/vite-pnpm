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
import TechniciansPage from './pages/Technicians/TechniciansPage'
import DialysisRecordsPage from './pages/DialysisRecords/DialysisRecordsPage'
import DialysisRecordDetailsPage from './pages/DialysisRecords/DialysisRecordDetailsPage'
import StopsPage from './pages/stops/StopsPage'
import RouteCreationPage from "@/pages/Routes/RouteCreation/RouteCreationPage.tsx";



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
        <Route path="/stops" element={<StopsPage />} />
        <Route path="/machines" element={<MachinesPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/records" element={<DialysisRecordsPage />} />
        <Route path="/records/:recordId" element={<DialysisRecordDetailsPage />} />
        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/technicians" element={<TechniciansPage />} />
      </Route>
        <Route path="/routes/create" element={<RouteCreationPage />} />
    </Routes>
  )
}

export default App
