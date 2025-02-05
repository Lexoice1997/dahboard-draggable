import React, { useEffect, useRef, useState } from "react"

import { BlockModel } from "../types/blockModel"
import Block from "./Block"

const Dashboard: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockModel[]>([])
  const dashboardRef = useRef<HTMLDivElement>(null)

  const isIntersecting = (newBlock: BlockModel) => {
    return blocks.some((block) => {
      return (
        newBlock.x < block.x + block.width &&
        newBlock.x + newBlock.width > block.x &&
        newBlock.y < block.y + block.height &&
        newBlock.y + newBlock.height > block.y
      )
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!dashboardRef.current) return

    const { clientX, clientY } = e
    const dashboardRect = dashboardRef.current.getBoundingClientRect()

    if (
      clientX >= dashboardRect.left &&
      clientX <= dashboardRect.right &&
      clientY >= dashboardRect.top &&
      clientY <= dashboardRect.bottom
    ) {
      const newBlock: BlockModel = {
        id: self.crypto.randomUUID() as string,
        x: clientX - dashboardRect.left - 100,
        y: clientY - dashboardRect.top - 100,
        width: 200,
        height: 200,
        image: null,
      }

      if (!isIntersecting(newBlock)) {
        setBlocks([...blocks, newBlock])
      } else {
        alert("Этот блок не может быть размещен здесь, так как он пересекается с другим блоком.")
      }
    }
  }

  const saveDashboard = () => {
    localStorage.setItem("blocks", JSON.stringify(blocks))
    alert("Успешно сохранён!")
  }

  useEffect(() => {
    const savedBlocks = localStorage.getItem("blocks")
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks))
    }
  }, [])

  return (
    <div ref={dashboardRef} className='dashboard' onDragOver={handleDragOver} onDrop={handleDrop}>
      <button onClick={saveDashboard}>Сохранить</button>
      {blocks.map((block) => (
        <Block key={block.id} block={block} setBlocks={setBlocks} />
      ))}
    </div>
  )
}

export default Dashboard
