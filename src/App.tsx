import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'

function App() {

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>Vite + React</h1>
      <Button variant={'outline'}>Click me</Button>
    </>
  )
}

export default App
