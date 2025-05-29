"use client"

import { useEffect, useRef } from "react"

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Neural network nodes
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      connections: number[]
      pulse: number
      pulseSpeed: number
    }> = []

    // Create nodes
    for (let i = 0; i < 80; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = node.x - nodes[j].x
        const dy = node.y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150 && Math.random() > 0.7) {
          node.connections.push(j)
        }
      }
    })

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        node.pulse += node.pulseSpeed

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))

        // Draw connections
        node.connections.forEach((connectionIndex) => {
          const connectedNode = nodes[connectionIndex]
          if (connectedNode) {
            const dx = node.x - connectedNode.x
            const dy = node.y - connectedNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(connectedNode.x, connectedNode.y)

              const opacity = (1 - distance / 150) * 0.3
              const hue = 200 + Math.sin(node.pulse) * 60
              ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`
              ctx.lineWidth = 0.5 + Math.sin(node.pulse) * 0.5
              ctx.stroke()

              // Data pulse effect
              if (Math.sin(node.pulse * 2) > 0.8) {
                const pulseX = node.x + (connectedNode.x - node.x) * 0.5
                const pulseY = node.y + (connectedNode.y - node.y) * 0.5

                ctx.beginPath()
                ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
                ctx.fillStyle = `hsla(${hue}, 100%, 80%, 0.8)`
                ctx.fill()
              }
            }
          }
        })

        // Draw node
        const pulseSize = node.size + Math.sin(node.pulse) * 1
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)

        const hue = 200 + Math.sin(node.pulse) * 60
        const saturation = 70 + Math.sin(node.pulse * 1.5) * 30
        const lightness = 50 + Math.sin(node.pulse * 2) * 20
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
        ctx.fill()

        // Glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize * 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%)",
      }}
    />
  )
}
