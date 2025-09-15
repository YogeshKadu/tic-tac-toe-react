import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import HomeLayout from './layout/HomeLayout'
import Lobby from './pages/Lobby'

function App() {

  return (
    <div className='bg-slate-800'>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<Lobby />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
