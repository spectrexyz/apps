declare module "ogl" {
  interface Gl {
    canvas: HTMLCanvasElement
  }

  type Uniforms = Record<string, { value: unknown }>

  class Renderer {
    constructor(options: {
      alpha?: boolean
      antialias?: boolean
      autoClear?: boolean
      canvas?: HTMLCanvasElement
      depth?: boolean
      dpr?: number
      height?: number
      powerPreference?: "high-performance" | "low-power" | "default"
      premultipliedAlpha?: boolean
      preserveDrawingBuffer?: boolean
      stencil?: boolean
      webgl?: 1 | 2
      width?: number
    })
    setSize(width: number, height: number): void
    render({ scene: Mesh }): void
    gl: Gl
  }

  class Mesh {
    constructor(
      gl: Gl,
      options: {
        geometry: Box
        program: Program
      },
    )
  }

  class Program {
    constructor(
      gl: Gl,
      options: {
        transparent: boolean
        fragment: string
        vertex: string
        uniforms: Uniforms
      },
    )
    uniforms: Uniforms
  }

  class Box {
    constructor(
      gl: Gl,
      options: {
        width: number
        height: number
      },
    )
  }
}
