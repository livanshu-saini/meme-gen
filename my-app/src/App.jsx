import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import MemeList from './pages/MemeList'
import MemeEditor from './pages/MemeEditor'
function App() {
  return (
    <div className='bg-slate-700 min-h-screen text-white'>
      <Router>
        <Routes>
          <Route path="/" element={<MemeList/>}></Route>
          <Route path="/edit/:id" element={<MemeEditor/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
