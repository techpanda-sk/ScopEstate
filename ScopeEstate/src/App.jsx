import React from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import CompanyAdd from './components/CompanyAdd'
import Superadmin from './components/SuperAdmin'

function App() {

  return (
    <>
    <Navbar/>
<Dashboard/>
<CompanyAdd/>
<Superadmin/>
    </>
  )
}

export default App
