import React, { MouseEventHandler, useState } from "react"

import { BlockModel } from "../types/blockModel"

interface BlockProps {
  block: BlockModel
  setBlocks: React.Dispatch<React.SetStateAction<BlockModel[]>>
}

const Block: React.FC<BlockProps> = ({ block, setBlocks }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0 })

  const startDrag: MouseEventHandler = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - block.x, y: e.clientY - block.y })
  }

  const dragBlock: MouseEventHandler = (e) => {
    if (!isDragging) return
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    updateBlock({ ...block, x: newX, y: newY })
  }

  const stopDrag = () => {
    setIsDragging(false)
  }

  const startResize: MouseEventHandler = () => {
    setIsResizing(true)
    setResizeStart({ width: block.width, height: block.height })
  }

  const resizeBlock: MouseEventHandler = (e) => {
    if (!isResizing) return
    const newWidth = resizeStart.width + (e.clientX - block.x)
    const newHeight = resizeStart.height + (e.clientY - block.y)
    updateBlock({ ...block, width: newWidth, height: newHeight })
  }

  const stopResize = () => {
    setIsResizing(false)
  }

  const updateBlock = (newBlock: BlockModel) => {
    setBlocks((prevBlocks) => prevBlocks.map((b) => (b.id === block.id ? newBlock : b)))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = URL.createObjectURL(e.target.files[0])
      updateBlock({ ...block, image: newImage })
    }
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className='block'
        style={{
          position: "absolute",
          top: block.y,
          left: block.x,
          width: block.width,
          height: block.height,
          border: "1px solid black",
          backgroundColor: "#f0f0f0",
        }}
        onMouseDown={startDrag}
        onMouseMove={dragBlock}
        onMouseUp={stopDrag}
      >
        <div
          className='resize-handle'
          onMouseDown={startResize}
          onMouseMove={resizeBlock}
          onMouseUp={stopResize}
        ></div>
        <input type='file' accept='image/*' onChange={handleImageChange} />
      </div>
    </div>
  )
}

export default Block
