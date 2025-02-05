import React from "react"

import Dashboard from "./components/Dashboard"
import Sidebar from "./components/Sidebar"

import "./styles.css"

const App: React.FC = () => {
  const handleDragStart = (e: React.DragEvent, blockId: number) => {
    e.dataTransfer.setData("blockId", blockId.toString())
  }

  return (
    <div className='App'>
      <Sidebar onDragStart={handleDragStart} />
      <Dashboard />
    </div>
  )
}

export default App
