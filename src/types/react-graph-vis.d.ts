declare module 'react-graph-vis' {
  import { Component } from 'react'

  export interface Node {
    id: string
    label: string
    title?: string
    color?:
      | string
      | {
          background?: string
          border?: string
          highlight?: {
            background?: string
            border?: string
          }
          opacity?: number
        }
    size?: number
    font?: {
      size?: number
      color?: string
    }
    url?: string
  }

  export interface Edge {
    from: string
    to: string
    color?:
      | string
      | {
          color?: string
          opacity?: number
          highlight?: string
        }
    width?: number
    smooth?:
      | boolean
      | {
          enabled?: boolean
          type?: string
          roundness?: number
        }
    physics?: boolean
  }

  export interface GraphData {
    nodes: Node[]
    edges: Edge[]
  }

  export interface EventParams {
    nodes: string[]
    edges: string[]
    pointer: {
      DOM: { x: number; y: number }
      canvas: { x: number; y: number }
    }
    event: MouseEvent
  }

  export interface GraphEvents {
    select?: (params: EventParams) => void
    click?: (params: EventParams) => void
    doubleClick?: (params: EventParams) => void
    hoverNode?: (params: EventParams) => void
    blurNode?: (params: EventParams) => void
    dragStart?: (params: EventParams) => void
    dragging?: (params: EventParams) => void
    dragEnd?: (params: EventParams) => void
    // Add other events as needed
  }

  export interface GraphOptions {
    nodes?: any
    edges?: any
    physics?: any
    interaction?: any
    height?: string
    width?: string
    background?: string
  }

  export interface GraphProps {
    graph: GraphData
    options?: GraphOptions
    events?: GraphEvents
    style?: React.CSSProperties
  }

  export default class Graph extends Component<GraphProps> {}
}
