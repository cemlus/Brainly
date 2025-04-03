import './App.css'
import SecondBrain from './pages/SecondBrain'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { FilterProvider } from './hooks/UseFilterContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <>
      <BrowserRouter>
      <FilterProvider>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path='/' element={<Signup/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/dashboard' element={<SecondBrain/>}/>
          </Routes>
        </DndProvider>
      </FilterProvider>
      </BrowserRouter>
  
    </>
  )
}

export default App
