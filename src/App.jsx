import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import "./styles/main.css"

import { useUserContext } from './contexts/UserContext'

import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Report from './pages/Report';

function App() {
  

  
  const { invLoaded } = useUserContext()
  if (!invLoaded) {
    return <>Loading...</>
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path='/report' element={<Report />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
