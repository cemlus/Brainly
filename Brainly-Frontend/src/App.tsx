import './App.css'
import SecondBrain from './pages/SecondBrain'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/dashboard' element={<SecondBrain/>}/>
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
