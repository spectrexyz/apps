import type { ComponentPropsWithoutRef, ReactNode, RefObject } from "react"

/* eslint-disable import/no-unresolved */
import { Box, Mesh, Program, Renderer } from "ogl"
/* eslint-enable import/no-unresolved */
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { dpr, noop, raf } from "../utils"

/* eslint-disable import/no-unresolved */
import moireFragment from "./moire.frag?raw"
import moireVertex from "./moire.vert?raw"
import snoise from "./snoise.glsl?raw"
/* eslint-enable import/no-unresolved */

const BASE_SIZE = 500
const Y_SHIFT = 40

type RenderMoireFn = (params: {
  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  baseCanvas: HTMLCanvasElement
}) => void

type Dimensions = [width: number, height: number]

type MoireContext = {
  addMoire: (canvas: HTMLCanvasElement, render: RenderMoireFn) => void
  removeMoire: (canvas: HTMLCanvasElement) => void
}

const MoireContext = createContext<MoireContext>({
  addMoire: noop,
  removeMoire: noop,
})

function useOglProgram({
  dimensions: [width, height],
  parent,
  speed,
}: {
  dimensions: Dimensions
  parent: RefObject<HTMLElement>
  speed: number
}) {
  width = Math.round(width)
  height = Math.round(height)

  const [{ canvas, render, resize }, setFns] = useState<{
    canvas?: HTMLCanvasElement
    render: (time: number) => void
    resize: (width: number, height: number) => void
  }>({ render: noop, resize: noop })

  const uniforms = useRef({
    resolution: [width, height],
    seed: Math.random() * 1000,
    speed,
    time: 1,
  })

  useEffect(() => {
    uniforms.current.resolution[0] = BASE_SIZE
    uniforms.current.resolution[1] = BASE_SIZE
    uniforms.current.speed = speed
  }, [height, speed, width])

  useEffect(() => {
    if (!parent.current) return

    const renderer = new Renderer({ alpha: true, depth: false, dpr })
    const { gl } = renderer

    parent.current.appendChild(gl.canvas)

    const program = new Program(gl, {
      transparent: true,
      fragment: (moireFragment as string).replace(
        /^\/\/ \[IMPORT_SNOISE\]\n/gm,
        (snoise as string) + "\n",
      ),
      vertex: moireVertex as string,
      uniforms: formatUniforms(uniforms.current),
    })

    let mesh: Mesh

    const render = (time: number) => {
      if (!mesh) return
      uniforms.current.time = time * 0.0001
      Object.entries(uniforms.current).forEach(([key, value]) => {
        program.uniforms[key].value = value
      })
      renderer.render({ scene: mesh })
    }

    const resize = (width: number, height: number) => {
      renderer.setSize(width, height)
      mesh = new Mesh(gl, {
        geometry: new Box(gl, { width, height }),
        program,
      })
      render(uniforms.current.time)
    }

    setFns({ render, resize, canvas: gl.canvas })

    return () => {
      gl.canvas.remove()
    }
  }, [parent])

  useEffect(() => {
    resize(width, height)
  }, [resize, width, height])

  return { canvas, render }
}

function useAnimate(
  render: (time: number) => void,
  options?: { animate?: boolean; fps?: number },
) {
  const { animate = true, fps = 60 } = options ?? {}

  const _firstFrameRendered = useRef(false)
  const _animate = useRef(animate)

  useEffect(() => {
    _animate.current = animate
  }, [animate])

  useEffect(() => {
    const stopRaf = raf((time) => {
      if (!_animate.current && _firstFrameRendered.current) {
        return
      }
      render(time)
      _firstFrameRendered.current = true
    }, 1000 / fps)
    return stopRaf
  }, [fps, render])
}

type MoireBaseProps = ComponentPropsWithoutRef<"div"> & {
  animate?: boolean
  children: ReactNode
  speed?: number
}

export function MoireBase({
  animate = true,
  children,
  speed = 1,
  ...props
}: MoireBaseProps): JSX.Element {
  const canvasContainer = useRef<HTMLDivElement>(null)

  const [activeMoires, setActiveMoires] = useState<
    Map<
      HTMLCanvasElement,
      { render: RenderMoireFn; context: CanvasRenderingContext2D }
    >
  >(new Map())

  const [moireMaxWidth, moireMaxHeight] = [...activeMoires.keys()].reduce(
    ([width, height], canvas) => [
      Math.max(width, canvas.width / dpr),
      Math.max(height, canvas.height / dpr),
    ],
    [0, 0],
  ).map((v) => v)

  const { canvas, render } = useOglProgram({
    dimensions: [moireMaxWidth, moireMaxHeight + Y_SHIFT],
    parent: canvasContainer,
    speed,
  })

  useAnimate(
    useCallback(
      (time) => {
        if (!canvas) return

        // Render base moire (WebGL canvas)
        render(time)

        // Render children moires (2d canvas)
        activeMoires.forEach(({ render, context }, activeMoireCanvas) => {
          render({ baseCanvas: canvas, canvas: activeMoireCanvas, context })
        })
      },
      [render, canvas, activeMoires],
    ),
    { animate },
  )

  const removeMoire = useCallback((canvas: HTMLCanvasElement) => {
    setActiveMoires((activeMoires) => {
      activeMoires = new Map(activeMoires)
      activeMoires.delete(canvas)
      return activeMoires
    })
  }, [])

  const addMoire = useCallback(
    (canvas: HTMLCanvasElement, render: RenderMoireFn) => {
      removeMoire(canvas)

      const context = canvas.getContext("2d")
      if (context) {
        setActiveMoires((activeMoires) => {
          activeMoires = new Map(activeMoires)
          return activeMoires.set(canvas, { render, context })
        })
      }
    },
    [removeMoire],
  )

  return (
    <MoireContext.Provider
      value={{
        addMoire,
        removeMoire,
      }}
    >
      <div
        ref={canvasContainer}
        {...props}
        css={{ display: "none" }}
      />
      {children}
    </MoireContext.Provider>
  )
}

type MoireProps = ComponentPropsWithoutRef<"canvas"> & {
  animate?: boolean
  backgroundColor?: string
  height: number
  linesColor?: string
  scale?: number
  width: number
}

export const Moire = memo(function Moire({
  animate = true,
  backgroundColor = "transparent",
  height,
  linesColor = "rgb(88, 255, 202)",
  scale = 1,
  width,
  ...props
}: MoireProps): JSX.Element {
  const { addMoire, removeMoire } = useContext(MoireContext)
  const canvas = useRef<HTMLCanvasElement>(null)

  const renderWidth = (width * dpr) / scale
  const renderHeight = (height * dpr) / scale

  const yShift = useRef(-Math.round(Math.random() * Y_SHIFT))

  const render = useCallback(
    ({
      baseCanvas,
      canvas,
      context,
    }: {
      baseCanvas: HTMLCanvasElement
      canvas: HTMLCanvasElement
      context: CanvasRenderingContext2D
    }) => {
      if (!canvas || !context || !animate) {
        return
      }

      const sw = baseCanvas.width
      const sh = baseCanvas.height
      const dw = sw
      const dh = sh
      const dx = 0
      const dy = yShift.current

      context.clearRect(0, 0, renderWidth, renderHeight)
      if (sw > 0 && sh > 0) {
        context.drawImage(baseCanvas, 0, 0, sw, sh, dx, dy, dw, dh)
        context.fillStyle = linesColor
        context.globalCompositeOperation = "source-in"
        context.fillRect(0, 0, renderWidth, renderHeight)
        context.globalCompositeOperation = "source-over"
      }
    },
    [animate, linesColor, renderWidth, renderHeight],
  )

  useEffect(() => {
    if (!canvas.current) return
    const _canvas = canvas.current
    addMoire(_canvas, render)
    return () => removeMoire(_canvas)
  }, [addMoire, render, removeMoire])

  return (
    <canvas
      ref={canvas}
      width={renderWidth}
      height={renderHeight}
      {...props}
      css={{
        display: "block",
        overflow: "hidden",
        width,
        height,
        background: backgroundColor || "transparent",
      }}
    />
  )
})

function formatUniforms(uniforms: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(uniforms).map(([key, value]) => [key, { value }]),
  )
}
