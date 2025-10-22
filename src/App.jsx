import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Layout from './layout/Layout'
import HomeLayout from './layout/HomeLayout'
import Lobby from './pages/Lobby'
import GameBoard from './pages/GameBoard'

function App() {

  return (
    <main className='bg-indigo-300/75 pt-8'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Lobby />} />
          <Route index element={<GameBoard />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
