import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Frontpage from '../Pages/Frontpage'
import Displaypage from '../Pages/Displaypage'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Frontpage/>}/>
      <Route path="/display/:id" element={<Displaypage/>}/>
    </Routes>
  )
}

export default Mainroutes
