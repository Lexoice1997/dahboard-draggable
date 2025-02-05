import React from "react"

interface SidebarProps {
  onDragStart: (e: React.DragEvent, blockId: number) => void
}

const Sidebar = ({ onDragStart }: SidebarProps) => {
  return (
    <div className='sidebar'>
      <h3>Инструменты</h3>
      <div className='draggable-block' draggable onDragStart={(e) => onDragStart(e, Date.now())}>
        Блок
      </div>
    </div>
  )
}

export default Sidebar
