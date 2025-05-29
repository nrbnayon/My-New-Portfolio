"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InteractiveCodeEditor() {
  const [currentExample, setCurrentExample] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const codeExamples = [
    {
      title: "AI-Powered React Hook",
      language: "typescript",
      code: `// Custom hook for AI-powered suggestions
import { useState, useEffect } from 'react'
import { generateText } from 'ai'

export function useAISuggestions(input: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (input.length > 3) {
      setLoading(true)
      generateAISuggestions(input)
    }
  }, [input])

  const generateAISuggestions = async (query: string) => {
    try {
      const result = await generateText({
        model: 'gpt-4',
        prompt: \`Generate 3 suggestions for: \${query}\`
      })
      setSuggestions(result.split('\\n'))
    } finally {
      setLoading(false)
    }
  }

  return { suggestions, loading }
}`,
      output: "✨ AI suggestions generated successfully!\n🚀 Hook ready for production use",
    },
    {
      title: "Neural Network Visualization",
      language: "javascript",
      code: `// Dynamic neural network renderer
class NeuralNetwork {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.nodes = this.generateNodes(50)
    this.animate()
  }

  generateNodes(count) {
    return Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      connections: []
    }))
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.updateNodes()
    this.drawConnections()
    this.drawNodes()
    requestAnimationFrame(() => this.animate())
  }
}

// Initialize the network
const network = new NeuralNetwork(canvas)`,
      output: "🧠 Neural network initialized\n⚡ 50 nodes connected\n🎨 Real-time visualization active",
    },
    {
      title: "Smart API Integration",
      language: "typescript",
      code: `// Intelligent API client with retry logic
export class SmartAPIClient {
  private baseURL: string
  private retryCount = 3
  private cache = new Map()

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const cacheKey = \`\${endpoint}-\${JSON.stringify(options)}\`
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    for (let attempt = 1; attempt <= this.retryCount; attempt++) {
      try {
        const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers
          }
        })

        if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
        
        const data = await response.json()
        this.cache.set(cacheKey, data)
        return data
      } catch (error) {
        if (attempt === this.retryCount) throw error
        await this.delay(Math.pow(2, attempt) * 1000)
      }
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}`,
      output: "🔄 Smart retry logic enabled\n💾 Intelligent caching active\n🛡️ Error handling optimized",
    },
  ]

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    // Simulate code execution
    setTimeout(() => {
      setOutput(codeExamples[currentExample].output)
      setIsRunning(false)
    }, 1500)
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[currentExample].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % codeExamples.length)
    setOutput("")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <span className="text-white/80 font-mono text-sm">{codeExamples[currentExample].title}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={copyCode} variant="ghost" size="sm" className="text-white/60 hover:text-white">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button onClick={runCode} variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Code Area */}
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Code Editor */}
          <div className="p-6 font-mono text-sm">
            <pre className="text-white/90 leading-relaxed overflow-x-auto">
              <code>{codeExamples[currentExample].code}</code>
            </pre>
          </div>

          {/* Output Terminal */}
          <div className="bg-black/50 p-6 border-l border-white/10">
            <div className="mb-3">
              <span className="text-green-400 font-mono text-sm">$ npm run execute</span>
            </div>
            <div className="min-h-[200px] font-mono text-sm">
              {isRunning ? (
                <div className="flex items-center gap-2 text-yellow-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  Executing code...
                </div>
              ) : output ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 whitespace-pre-line"
                >
                  {output}
                </motion.div>
              ) : (
                <div className="text-white/40">Click the play button to run the code</div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-white/10">
          <div className="flex gap-2">
            {codeExamples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExample(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentExample ? "bg-blue-500" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <Button onClick={nextExample} variant="outline" size="sm" className="text-white/80">
            Next Example
          </Button>
        </div>
      </div>
    </div>
  )
}
