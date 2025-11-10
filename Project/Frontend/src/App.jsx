import { useState } from 'react'
import { BrowserRouter } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      {/* <AppRoutes /> */}
      <h1>AnnaMitra</h1>
    </BrowserRouter>
  )
}

export default App
