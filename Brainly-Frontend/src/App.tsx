import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <button className='text-blue-500 bg-blue-950 px-3 py-2' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        
    </>
  )
}

export default App
