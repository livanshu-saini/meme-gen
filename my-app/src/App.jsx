import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import MemeList from './pages/MemeList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className='bg-[#FFF4FF] min-h-screen text-white'>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
         />
          <Route path="/" element={<MemeList/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
