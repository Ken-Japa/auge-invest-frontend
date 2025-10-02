import 'vis-network/styles/vis-network.css'

import React, { useEffect, useRef } from 'react'
import { DataSet } from 'vis-data/standalone'
import { Network, NetworkEvents } from 'vis-network/standalone'
import { Edge, Node, Options } from 'vis-network/standalone'

interface GraphProps {
  graph: {
    nodes: Node[]
    edges: Edge[]
  }
  options: Options
  events: Partial<Record<NetworkEvents, (params: any) => void>>
  networkRef?: React.MutableRefObject<Network | null>
  onGraphReady?: () => void
}

export const CustomGraph: React.FC<GraphProps> = ({
  graph,
  options,
  events,
  networkRef: propNetworkRef,
  onGraphReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const internalNetworkRef = useRef<Network | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initNetwork = async () => {
      try {
        // Create datasets
        // Add id to edges if not present
        const edgesWithIds = graph.edges.map((edge, index) => ({
          ...edge,
          id: edge.id || `${edge.from}-${edge.to}-${index}`,
        }))

        const nodes = new DataSet<Node>(graph.nodes)
        const edges = new DataSet<Edge>(edgesWithIds)

        // Create network
        const network = new Network(containerRef.current!, { nodes, edges }, options)

        // Register events
        if (events) {
          Object.entries(events).forEach(([eventName, callback]) => {
            // Cast eventName to NetworkEvents to satisfy TypeScript
            network.on(eventName as NetworkEvents, callback)
          })
        }

        internalNetworkRef.current = network
        if (propNetworkRef) {
          propNetworkRef.current = network
        }

        if (onGraphReady) {
          network.once('afterDrawing', onGraphReady)
        }
      } catch (error) {
        console.error('Erro ao inicializar rede:', error)
      }
    }

    initNetwork()

    // Cleanup function
    return () => {
      if (internalNetworkRef.current) {
        internalNetworkRef.current.destroy()
        internalNetworkRef.current = null
      }
      if (propNetworkRef) {
        propNetworkRef.current = null
      }
    }
  }, [graph, options, events, propNetworkRef, onGraphReady])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}
