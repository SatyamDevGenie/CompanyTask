import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Tailwind is Working! 🎉</h1>

      <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Test Button
      </button>
    </div>
    </>
  )
}

export default App
