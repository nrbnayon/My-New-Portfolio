// components/ui/interactive-code-editor.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodingAvatar } from "./coding-avatar";

export function InteractiveCodeEditor() {
  const [currentExample, setCurrentExample] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

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
      output:
        "✨ AI suggestions generated successfully!\n🚀 Hook ready for production use\n💡 Performance optimized",
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
      output:
        "🧠 Neural network initialized\n⚡ 50 nodes connected\n🎨 Real-time visualization active\n🔄 Animation loop running",
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
      output:
        "🔄 Smart retry logic enabled\n💾 Intelligent caching active\n🛡️ Error handling optimized\n📡 API client ready",
    },
  ];

  const runCode = () => {
    setIsRunning(true);
    setOutput("");

    // Simulate code execution
    setTimeout(() => {
      setOutput(codeExamples[currentExample].output);
      setIsRunning(false);
    }, 1500);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[currentExample].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % codeExamples.length);
    setOutput("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg" />
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg" />
            </div>
            <span className="text-white/90 font-mono text-sm font-medium">
              {codeExamples[currentExample].title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={copyCode}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={runCode}
              variant="ghost"
              size="sm"
              className="text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-all"
              disabled={isRunning}
            >
              <Play className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-0 min-h-[500px]">
          {/* Code Editor */}
          <div className="lg:col-span-2 p-6 font-mono text-sm bg-gradient-to-br from-slate-900/50 to-black/50">
            <div className="mb-3 flex items-center gap-2">
              <div className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">
                {codeExamples[currentExample].language}
              </div>
              <div className="text-white/40 text-xs">
                Example {currentExample + 1} of {codeExamples.length}
              </div>
            </div>
            <div className="bg-black/30 rounded-lg p-4 border border-white/10 overflow-x-auto">
              <pre className="text-white/90 leading-relaxed">
                <code>{codeExamples[currentExample].code}</code>
              </pre>
            </div>
          </div>

          {/* Output Terminal with Avatar */}
          <div className="bg-black/60 border-l border-white/10 flex flex-col">
            {/* Terminal Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>$ npm run execute</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-4 flex flex-col">
              <div className="flex-1 font-mono text-sm mb-4">
                {isRunning ? (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <motion.div
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                    <span>Executing code...</span>
                  </div>
                ) : output ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 whitespace-pre-line leading-relaxed"
                  >
                    {output}
                  </motion.div>
                ) : (
                  <div className="text-white/40 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>Click the play button to run the code</span>
                  </div>
                )}
              </div>

              {/* Coding Avatar - Positioned at bottom of terminal */}
              <div className="flex justify-center">
                <CodingAvatar isActive={isRunning || !!output} />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between p-4 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-black/50">
          <div className="flex gap-2">
            {codeExamples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentExample(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentExample
                    ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title={example.title}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-white/60 text-sm">
              {currentExample + 1} / {codeExamples.length}
            </div>
            <Button
              onClick={nextExample}
              variant="outline"
              size="sm"
              className="text-white/80 border-white/20 hover:bg-white/10 transition-all"
            >
              Next Example
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
