import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from '../components/layout/layout'
import Dashboard from '../pages/Dashboard'
import LayoutProvider  from '../components/layout/LayoutProvider'

const AppRoutes = () => {
  return (
    <Router>
        <LayoutProvider>
        <Routes>
            <Route path='/' element ={<Layout/>}>
            <Route path='/dashboard' element = {<Dashboard/>}/>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
        </LayoutProvider>
    </Router>
  )
}

export default AppRoutes