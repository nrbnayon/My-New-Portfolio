// "use client";

// import { useEffect, useRef } from "react";

// export default function IntelligentNeuralBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId: number;
//     let time = 0;
//     let mouseX = canvas.width / 2;
//     let mouseY = canvas.height / 2;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Mouse interaction
//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = canvas.getBoundingClientRect();
//       mouseX = e.clientX - rect.left;
//       mouseY = e.clientY - rect.top;
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     // Hexagonal grid-based intelligent network
//     const neurons: Array<{
//       x: number;
//       y: number;
//       targetX: number;
//       targetY: number;
//       layer: number;
//       activation: number;
//       voltage: number;
//       frequency: number;
//       phase: number;
//       connections: Array<{
//         to: number;
//         weight: number;
//         strength: number;
//         lastSignal: number;
//       }>;
//       dendrites: Array<{
//         angle: number;
//         length: number;
//         branches: Array<{ angle: number; length: number }>;
//       }>;
//       synapses: Array<{
//         x: number;
//         y: number;
//         size: number;
//         charge: number;
//       }>;
//     }> = [];

//     // Create intelligent network topology
//     const layers = 7;
//     const neuronsPerLayer = [12, 18, 24, 20, 16, 14, 8];
//     let neuronIndex = 0;

//     for (let layer = 0; layer < layers; layer++) {
//       const count = neuronsPerLayer[layer];
//       const layerY = (canvas.height / (layers + 1)) * (layer + 1);

//       for (let i = 0; i < count; i++) {
//         const angle = (i / count) * Math.PI * 2;
//         const radius = 80 + layer * 60 + Math.sin(i * 0.5) * 30;
//         const x = canvas.width / 2 + Math.cos(angle) * radius;
//         const y = layerY + Math.sin(angle) * 40;

//         const neuron = {
//           x,
//           y,
//           targetX: x,
//           targetY: y,
//           layer,
//           activation: Math.random() * 0.3,
//           voltage: 0,
//           frequency: 0.5 + Math.random() * 2,
//           phase: Math.random() * Math.PI * 2,
//           connections: [] as any[],
//           dendrites: [] as any[],
//           synapses: [] as any[],
//         };

//         // Create dendrites
//         const dendriteCount = 3 + Math.floor(Math.random() * 4);
//         for (let d = 0; d < dendriteCount; d++) {
//           const dendrite = {
//             angle: (d / dendriteCount) * Math.PI * 2 + Math.random() * 0.5,
//             length: 20 + Math.random() * 40,
//             branches: [] as any[],
//           };

//           // Add branches to dendrites
//           const branchCount = 2 + Math.floor(Math.random() * 3);
//           for (let b = 0; b < branchCount; b++) {
//             dendrite.branches.push({
//               angle: dendrite.angle + (Math.random() - 0.5) * Math.PI * 0.5,
//               length: 10 + Math.random() * 20,
//             });
//           }

//           neuron.dendrites.push(dendrite);
//         }

//         // Create synapses
//         const synapseCount = 4 + Math.floor(Math.random() * 6);
//         for (let s = 0; s < synapseCount; s++) {
//           neuron.synapses.push({
//             x: neuron.x + (Math.random() - 0.5) * 80,
//             y: neuron.y + (Math.random() - 0.5) * 80,
//             size: 1 + Math.random() * 2,
//             charge: 0,
//           });
//         }

//         neurons.push(neuron);
//         neuronIndex++;
//       }
//     }

//     // Create intelligent connections
//     neurons.forEach((neuron, i) => {
//       const maxConnections = Math.min(8, neurons.length - 1);
//       const connectionTargets = new Set<number>();

//       // Connect to next layer primarily
//       const nextLayerNeurons = neurons.filter(
//         (n) => n.layer === neuron.layer + 1
//       );
//       nextLayerNeurons.forEach((target, targetIndex) => {
//         if (connectionTargets.size < maxConnections && Math.random() > 0.3) {
//           const targetNeuronIndex = neurons.indexOf(target);
//           const distance = Math.hypot(neuron.x - target.x, neuron.y - target.y);
//           neuron.connections.push({
//             to: targetNeuronIndex,
//             weight: 0.3 + Math.random() * 0.7,
//             strength: Math.max(0.1, 1 - distance / 300),
//             lastSignal: 0,
//           });
//           connectionTargets.add(targetNeuronIndex);
//         }
//       });

//       // Some lateral connections within layer
//       const sameLayerNeurons = neurons.filter(
//         (n) => n.layer === neuron.layer && neurons.indexOf(n) !== i
//       );
//       sameLayerNeurons.forEach((target) => {
//         if (connectionTargets.size < maxConnections && Math.random() > 0.85) {
//           const targetNeuronIndex = neurons.indexOf(target);
//           const distance = Math.hypot(neuron.x - target.x, neuron.y - target.y);
//           neuron.connections.push({
//             to: targetNeuronIndex,
//             weight: 0.2 + Math.random() * 0.3,
//             strength: Math.max(0.05, 1 - distance / 200),
//             lastSignal: 0,
//           });
//           connectionTargets.add(targetNeuronIndex);
//         }
//       });
//     });

//     // Signal propagation system
//     const signals: Array<{
//       from: number;
//       to: number;
//       progress: number;
//       intensity: number;
//       frequency: number;
//       type: "excitatory" | "inhibitory";
//     }> = [];

//     const createSignal = (from: number, to: number, intensity: number) => {
//       signals.push({
//         from,
//         to,
//         progress: 0,
//         intensity,
//         frequency: neurons[from].frequency,
//         type: Math.random() > 0.2 ? "excitatory" : "inhibitory",
//       });
//     };

//     // Thought patterns - emergent behavior
//     const thoughtWaves: Array<{
//       x: number;
//       y: number;
//       radius: number;
//       intensity: number;
//       frequency: number;
//       color: number;
//     }> = [];

//     const animate = () => {
//       time += 0.016;

//       // Dynamic background with neural activity influence
//       const totalActivation =
//         neurons.reduce((sum, n) => sum + n.activation, 0) / neurons.length;
//       const bgIntensity = 0.02 + totalActivation * 0.03;

//       ctx.fillStyle = `rgba(0, 2, 8, ${0.95 - bgIntensity})`;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       // Mouse influence on network
//       const mouseInfluence = 150;
//       neurons.forEach((neuron, i) => {
//         const distToMouse = Math.hypot(neuron.x - mouseX, neuron.y - mouseY);
//         if (distToMouse < mouseInfluence) {
//           const influence = (1 - distToMouse / mouseInfluence) * 0.3;
//           neuron.activation = Math.min(1, neuron.activation + influence);

//           // Create ripple effect
//           if (Math.random() > 0.95 && distToMouse < 80) {
//             thoughtWaves.push({
//               x: mouseX,
//               y: mouseY,
//               radius: 0,
//               intensity: 0.8,
//               frequency: 2 + Math.random() * 3,
//               color: 180 + Math.random() * 60,
//             });
//           }
//         }
//       });

//       // Update neurons
//       neurons.forEach((neuron, i) => {
//         neuron.phase += neuron.frequency * 0.02;
//         neuron.voltage = Math.sin(neuron.phase) * neuron.activation;

//         // Adaptive positioning
//         const targetShift = Math.sin(time * neuron.frequency * 0.1) * 2;
//         neuron.targetX += (Math.random() - 0.5) * 0.5;
//         neuron.targetY += (Math.random() - 0.5) * 0.5;
//         neuron.x += (neuron.targetX - neuron.x) * 0.02;
//         neuron.y += (neuron.targetY - neuron.y) * 0.02;

//         // Decay activation naturally
//         neuron.activation *= 0.995;

//         // Spike generation
//         if (neuron.voltage > 0.7 && Math.random() > 0.8) {
//           neuron.activation = 1;
//           neuron.connections.forEach((conn) => {
//             if (Math.random() > 0.4) {
//               createSignal(i, conn.to, conn.strength * neuron.activation);
//               conn.lastSignal = time;
//             }
//           });
//         }

//         // Update synapses
//         neuron.synapses.forEach((synapse) => {
//           synapse.charge *= 0.9;
//           if (neuron.activation > 0.5) {
//             synapse.charge = Math.min(1, synapse.charge + 0.1);
//           }
//         });
//       });

//       // Update and render signals
//       signals.forEach((signal, index) => {
//         signal.progress += 0.03 + signal.intensity * 0.05;

//         if (signal.progress >= 1) {
//           const targetNeuron = neurons[signal.to];
//           if (targetNeuron) {
//             const effect =
//               signal.type === "excitatory"
//                 ? signal.intensity
//                 : -signal.intensity * 0.5;
//             targetNeuron.activation = Math.max(
//               0,
//               Math.min(1, targetNeuron.activation + effect)
//             );
//           }
//           signals.splice(index, 1);
//           return;
//         }

//         const fromNeuron = neurons[signal.from];
//         const toNeuron = neurons[signal.to];
//         if (!fromNeuron || !toNeuron) return;

//         const x = fromNeuron.x + (toNeuron.x - fromNeuron.x) * signal.progress;
//         const y = fromNeuron.y + (toNeuron.y - fromNeuron.y) * signal.progress;

//         // Quantum-like signal rendering
//         const hue =
//           signal.type === "excitatory" ? 200 + signal.frequency * 30 : 300;
//         const size = 2 + signal.intensity * 3;
//         const alpha = (1 - signal.progress) * signal.intensity;

//         // Signal core
//         ctx.beginPath();
//         ctx.arc(x, y, size, 0, Math.PI * 2);
//         ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${alpha})`;
//         ctx.fill();

//         // Signal trail
//         for (let t = 1; t <= 3; t++) {
//           const trailProgress = Math.max(0, signal.progress - t * 0.1);
//           const trailX =
//             fromNeuron.x + (toNeuron.x - fromNeuron.x) * trailProgress;
//           const trailY =
//             fromNeuron.y + (toNeuron.y - fromNeuron.y) * trailProgress;

//           ctx.beginPath();
//           ctx.arc(trailX, trailY, size * (1 - t * 0.2), 0, Math.PI * 2);
//           ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${alpha * (1 - t * 0.3)})`;
//           ctx.fill();
//         }
//       });

//       // Render connections with intelligence
//       neurons.forEach((neuron, i) => {
//         neuron.connections.forEach((conn) => {
//           const target = neurons[conn.to];
//           if (!target) return;

//           const recentActivity =
//             time - conn.lastSignal < 1 ? 1 - (time - conn.lastSignal) : 0;
//           const connectionStrength = conn.strength + recentActivity * 0.5;

//           if (connectionStrength > 0.1) {
//             ctx.beginPath();
//             ctx.moveTo(neuron.x, neuron.y);
//             ctx.lineTo(target.x, target.y);

//             const hue = 220 + connectionStrength * 40;
//             const alpha = connectionStrength * 0.4;
//             ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
//             ctx.lineWidth = 0.5 + connectionStrength * 2;
//             ctx.stroke();

//             // Synaptic terminals
//             if (recentActivity > 0.5) {
//               const midX = (neuron.x + target.x) / 2;
//               const midY = (neuron.y + target.y) / 2;

//               ctx.beginPath();
//               ctx.arc(midX, midY, 1 + recentActivity * 2, 0, Math.PI * 2);
//               ctx.fillStyle = `hsla(${hue + 30}, 100%, 80%, ${recentActivity})`;
//               ctx.fill();
//             }
//           }
//         });
//       });

//       // Render neurons with biological detail
//       neurons.forEach((neuron, i) => {
//         const activationGlow = neuron.activation * 0.8;
//         const pulseSize =
//           3 + neuron.layer * 0.5 + Math.sin(neuron.phase) * activationGlow * 2;

//         // Dendrites
//         neuron.dendrites.forEach((dendrite) => {
//           const endX = neuron.x + Math.cos(dendrite.angle) * dendrite.length;
//           const endY = neuron.y + Math.sin(dendrite.angle) * dendrite.length;

//           ctx.beginPath();
//           ctx.moveTo(neuron.x, neuron.y);
//           ctx.lineTo(endX, endY);
//           ctx.strokeStyle = `hsla(240, 60%, 40%, ${0.3 + activationGlow * 0.4})`;
//           ctx.lineWidth = 0.5 + activationGlow;
//           ctx.stroke();

//           // Dendritic branches
//           dendrite.branches.forEach((branch) => {
//             const branchEndX = endX + Math.cos(branch.angle) * branch.length;
//             const branchEndY = endY + Math.sin(branch.angle) * branch.length;

//             ctx.beginPath();
//             ctx.moveTo(endX, endY);
//             ctx.lineTo(branchEndX, branchEndY);
//             ctx.strokeStyle = `hsla(240, 50%, 35%, ${0.2 + activationGlow * 0.3})`;
//             ctx.lineWidth = 0.3;
//             ctx.stroke();
//           });
//         });

//         // Neuron glow field
//         const gradient = ctx.createRadialGradient(
//           neuron.x,
//           neuron.y,
//           0,
//           neuron.x,
//           neuron.y,
//           pulseSize * 3
//         );
//         gradient.addColorStop(
//           0,
//           `hsla(${200 + neuron.layer * 10}, 80%, 60%, ${activationGlow * 0.3})`
//         );
//         gradient.addColorStop(
//           0.5,
//           `hsla(${200 + neuron.layer * 10}, 60%, 50%, ${activationGlow * 0.1})`
//         );
//         gradient.addColorStop(1, "transparent");

//         ctx.beginPath();
//         ctx.arc(neuron.x, neuron.y, pulseSize * 3, 0, Math.PI * 2);
//         ctx.fillStyle = gradient;
//         ctx.fill();

//         // Cell body
//         ctx.beginPath();
//         ctx.arc(neuron.x, neuron.y, pulseSize, 0, Math.PI * 2);
//         const hue = 200 + neuron.layer * 15 + neuron.voltage * 30;
//         ctx.fillStyle = `hsla(${hue}, 70%, ${50 + activationGlow * 30}%, ${0.7 + activationGlow * 0.3})`;
//         ctx.fill();

//         // Nucleus
//         if (neuron.activation > 0.3) {
//           ctx.beginPath();
//           ctx.arc(neuron.x, neuron.y, pulseSize * 0.4, 0, Math.PI * 2);
//           ctx.fillStyle = `hsla(${hue + 40}, 90%, 80%, ${activationGlow})`;
//           ctx.fill();
//         }

//         // Synapses
//         neuron.synapses.forEach((synapse) => {
//           if (synapse.charge > 0.1) {
//             ctx.beginPath();
//             ctx.arc(
//               synapse.x,
//               synapse.y,
//               synapse.size * synapse.charge,
//               0,
//               Math.PI * 2
//             );
//             ctx.fillStyle = `hsla(${hue + 60}, 100%, 70%, ${synapse.charge})`;
//             ctx.fill();
//           }
//         });
//       });

//       // Render thought waves
//       thoughtWaves.forEach((wave, index) => {
//         wave.radius += wave.frequency;
//         wave.intensity *= 0.98;

//         if (wave.intensity < 0.01) {
//           thoughtWaves.splice(index, 1);
//           return;
//         }

//         ctx.beginPath();
//         ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
//         ctx.strokeStyle = `hsla(${wave.color}, 80%, 60%, ${wave.intensity * 0.3})`;
//         ctx.lineWidth = 2;
//         ctx.stroke();

//         // Inner ripple
//         ctx.beginPath();
//         ctx.arc(wave.x, wave.y, wave.radius * 0.6, 0, Math.PI * 2);
//         ctx.strokeStyle = `hsla(${wave.color + 30}, 90%, 70%, ${wave.intensity * 0.5})`;
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       window.removeEventListener("mousemove", handleMouseMove);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className='fixed inset-0 pointer-events-none z-0'
//       style={{
//         background: `
//           radial-gradient(ellipse at 20% 30%, rgba(10, 20, 40, 0.1) 0%, transparent 50%),
//           radial-gradient(ellipse at 80% 70%, rgba(20, 10, 40, 0.1) 0%, transparent 50%),
//           linear-gradient(135deg, #000408 0%, #001122 100%)
//         `,
//       }}
//     />
//   );
// }

"use client";

import { useEffect, useRef } from "react";

export default function EnhancedNeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced neural network nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseSize: number;
      connections: number[];
      pulse: number;
      pulseSpeed: number;
      hue: number;
      energy: number;
      lastActivation: number;
      nodeType: "primary" | "secondary" | "tertiary";
    }> = [];

    // Create nodes with different types
    const nodeCount = 90;
    for (let i = 0; i < nodeCount; i++) {
      const nodeType = i < 20 ? "primary" : i < 50 ? "secondary" : "tertiary";
      const baseSize =
        nodeType === "primary" ? 3 : nodeType === "secondary" ? 2 : 1.5;

      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (nodeType === "primary" ? 0.2 : 0.4),
        vy: (Math.random() - 0.5) * (nodeType === "primary" ? 0.2 : 0.4),
        size: baseSize,
        baseSize: baseSize,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        hue: 180 + Math.random() * 80, // Blue to purple spectrum
        energy: Math.random(),
        lastActivation: 0,
        nodeType,
      });
    }

    // Create intelligent connections
    nodes.forEach((node, i) => {
      const maxConnections =
        node.nodeType === "primary" ? 8 : node.nodeType === "secondary" ? 5 : 3;
      let connectionCount = 0;

      for (let j = 0; j < nodes.length; j++) {
        if (i === j || connectionCount >= maxConnections) continue;

        const dx = node.x - nodes[j].x;
        const dy = node.y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = node.nodeType === "primary" ? 180 : 120;
        const connectionProbability = node.nodeType === "primary" ? 0.3 : 0.5;

        if (distance < maxDistance && Math.random() > connectionProbability) {
          node.connections.push(j);
          connectionCount++;
        }
      }
    });

    // Data packets for transmission
    const dataPackets: Array<{
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
      size: number;
      hue: number;
    }> = [];

    const createDataPacket = (fromIndex: number, toIndex: number) => {
      dataPackets.push({
        fromNode: fromIndex,
        toNode: toIndex,
        progress: 0,
        speed: 0.8 + Math.random() * 1.2,
        size: 1 + Math.random() * 2,
        hue: nodes[fromIndex].hue + (Math.random() - 0.5) * 30,
      });
    };

    const animate = () => {
      time += 0.016;

      // Dynamic background with subtle gradient shifts
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        Math.max(canvas.width, canvas.height) * 0.8
      );
      bgGradient.addColorStop(0, `rgba(5, 5, 15, 0.95)`);
      bgGradient.addColorStop(0.5, `rgba(0, 0, 0, 0.98)`);
      bgGradient.addColorStop(1, `rgba(0, 0, 5, 1)`);

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and render nodes
      nodes.forEach((node, i) => {
        // Update physics
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Enhanced edge bouncing with energy conservation
        if (node.x < node.size || node.x > canvas.width - node.size) {
          node.vx *= -0.8;
          node.x = Math.max(
            node.size,
            Math.min(canvas.width - node.size, node.x)
          );
        }
        if (node.y < node.size || node.y > canvas.height - node.size) {
          node.vy *= -0.8;
          node.y = Math.max(
            node.size,
            Math.min(canvas.height - node.size, node.y)
          );
        }

        // Dynamic size pulsing
        const pulseFactor =
          1 + Math.sin(node.pulse) * 0.3 + Math.sin(node.pulse * 2.7) * 0.15;
        node.size = node.baseSize * pulseFactor;

        // Energy-based activation
        node.energy += (Math.random() - 0.5) * 0.02;
        node.energy = Math.max(0, Math.min(1, node.energy));

        if (node.energy > 0.8 && time - node.lastActivation > 2) {
          node.lastActivation = time;
          // Create data packets to connected nodes
          node.connections.forEach((connectionIndex) => {
            if (Math.random() > 0.7) {
              createDataPacket(i, connectionIndex);
            }
          });
        }

        // Draw connections with enhanced visuals
        node.connections.forEach((connectionIndex) => {
          const connectedNode = nodes[connectionIndex];
          if (!connectedNode) return;

          const dx = node.x - connectedNode.x;
          const dy = node.y - connectedNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);

            const opacity =
              ((1 - distance / maxDistance) *
                0.4 *
                (node.energy + connectedNode.energy)) /
              2;
            const avgHue = (node.hue + connectedNode.hue) / 2;
            const dynamicHue = avgHue + Math.sin(time + distance * 0.01) * 20;

            // Multi-layered connection rendering
            ctx.lineWidth = 0.5 + node.energy * 1.5;
            ctx.strokeStyle = `hsla(${dynamicHue}, 80%, 65%, ${opacity})`;
            ctx.stroke();

            // Inner glow for active connections
            if (node.energy > 0.6 || connectedNode.energy > 0.6) {
              ctx.lineWidth = 0.2;
              ctx.strokeStyle = `hsla(${dynamicHue}, 100%, 85%, ${opacity * 0.5})`;
              ctx.stroke();
            }
          }
        });

        // Enhanced node rendering
        const intensity = 0.5 + node.energy * 0.5;
        const dynamicHue = node.hue + Math.sin(node.pulse + time) * 15;
        const saturation = 70 + node.energy * 30;
        const lightness = 45 + node.energy * 25 + Math.sin(node.pulse * 3) * 10;

        // Outer glow
        const glowSize = node.size * (2 + node.energy * 2);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${dynamicHue}, ${saturation}%, ${lightness}%, ${0.1 * intensity})`;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${dynamicHue}, ${saturation}%, ${lightness}%, ${0.8 + intensity * 0.2})`;
        ctx.fill();

        // Core highlight for primary nodes
        if (node.nodeType === "primary" || node.energy > 0.7) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${dynamicHue + 30}, 100%, 80%, ${0.6 * intensity})`;
          ctx.fill();
        }
      });

      // Render and update data packets
      dataPackets.forEach((packet, index) => {
        packet.progress += packet.speed * 0.01;

        if (packet.progress >= 1) {
          dataPackets.splice(index, 1);
          return;
        }

        const fromNode = nodes[packet.fromNode];
        const toNode = nodes[packet.toNode];

        if (!fromNode || !toNode) return;

        const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

        // Data packet trail
        for (let i = 0; i < 3; i++) {
          const trailProgress = Math.max(0, packet.progress - i * 0.1);
          const trailX = fromNode.x + (toNode.x - fromNode.x) * trailProgress;
          const trailY = fromNode.y + (toNode.y - fromNode.y) * trailProgress;
          const alpha = (1 - i * 0.3) * (1 - packet.progress * 0.5);

          ctx.beginPath();
          ctx.arc(trailX, trailY, packet.size * (1 - i * 0.2), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${packet.hue}, 100%, 75%, ${alpha})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className='fixed inset-0 pointer-events-none z-0' />
  );
}
