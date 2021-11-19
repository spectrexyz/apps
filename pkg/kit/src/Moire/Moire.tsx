import type { ComponentPropsWithoutRef, ReactNode, RefObject } from "react"

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { css } from "@emotion/react"
import { Box, Mesh, Program, Renderer } from "ogl"
import { noop, raf } from "../utils"

/* eslint-disable import/no-unresolved */
import moireFragment from "./moire.frag?raw"
import moireVertex from "./moire.vert?raw"
import snoise from "./snoise.glsl?raw"
/* eslint-enable import/no-unresolved */

const MoireContext = createContext<{
  addMoire: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
    animate: boolean
  ) => void
  removeMoire: (canvas: HTMLCanvasElement) => void
}>({ addMoire: noop, removeMoire: noop })

function useOglProgram({
  dimensions: [width, height],
  parent,
  speed,
}: {
  dimensions: [width: number, height: number]
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
    resolution: [500, 500],
    seed: Math.random() * 1000,
    speed,
    time: 1,
  })

  useEffect(() => {
    uniforms.current.resolution[0] = 500
    uniforms.current.resolution[1] = 500
    uniforms.current.speed = speed
  }, [height, speed, width])

  useEffect(() => {
    if (!parent.current) return

    const renderer = new Renderer({
      dpr: window.devicePixelRatio ?? 1,
      alpha: true,
    })
    const { gl } = renderer

    parent.current.appendChild(gl.canvas)

    const program = new Program(gl, {
      transparent: true,
      fragment: (moireFragment as string).replace(
        /^\/\/ \[IMPORT_SNOISE\]\n/gm,
        (snoise as string) + "\n"
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
  options?: { animate?: boolean; fps?: number }
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
  const [width, height] = [500, 500]

  const canvasContainer = useRef<HTMLDivElement>(null)

  const activeMoires = useRef<
    Map<
      HTMLCanvasElement,
      {
        animate: boolean
        color: string
        context: CanvasRenderingContext2D
        height: number
        width: number
      }
    >
  >(new Map())

  const { canvas, render } = useOglProgram({
    parent: canvasContainer,
    dimensions: [width, height],
    speed,
  })

  useAnimate(
    useCallback(
      (time) => {
        if (!canvas) return

        render(time)

        activeMoires.current.forEach(
          ({ animate, context, color, width, height }) => {
            if (!animate) {
              return
            }

            const sw = 500
            const sh = 500

            const dw = Math.max(500, width)
            const dh = Math.max(500, height)
            const dx = 0
            const dy = 0

            context.clearRect(0, 0, width, height)
            context.drawImage(canvas, 0, 0, sw, sh, dx, dy, dw, dh)
            context.fillStyle = color
            context.globalCompositeOperation = "source-in"
            context.fillRect(0, 0, width, height)
            context.globalCompositeOperation = "source-over"
          }
        )
      },
      [render, canvas]
    ),
    { animate }
  )

  const addMoire = useCallback(
    (
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      width: number,
      height: number,
      color: string,
      animate: boolean
    ) => {
      activeMoires.current.set(canvas, {
        context,
        width,
        height,
        color,
        animate,
      })
    },
    []
  )

  const removeMoire = useCallback((canvas: HTMLCanvasElement) => {
    activeMoires.current.delete(canvas)
  }, [])

  return (
    <MoireContext.Provider value={{ addMoire, removeMoire }}>
      <div
        ref={canvasContainer}
        {...props}
        css={css`
          position: fixed;
          inset: -500px auto auto -500px;
          canvas {
            display: block;
          }
        `}
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
  const canvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvas.current) {
      removeMoire(canvas.current)

      const ctx = canvas.current.getContext("2d")
      if (ctx) {
        addMoire(
          canvas.current,
          ctx,
          width / scale,
          height / scale,
          linesColor,
          animate
        )
      }
    }
  }, [addMoire, removeMoire, linesColor, width, height, scale, animate])

  return (
    <canvas
      ref={(_canvas) => {
        if (!_canvas && canvas.current) {
          removeMoire(canvas.current)
          canvas.current = null
          return
        }

        const context = _canvas?.getContext("2d")
        if (_canvas && context) {
          addMoire(
            _canvas,
            context,
            width / scale,
            height / scale,
            linesColor,
            animate
          )
          canvas.current = _canvas
        }
      }}
      width={width / scale}
      height={height / scale}
      {...props}
      css={css`
        display: block;
        overflow: hidden;
        width: ${width}px;
        height: ${height}px;
        background: ${backgroundColor || "transparent"};
      `}
    />
  )
})

function formatUniforms(uniforms: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(uniforms).map(([key, value]) => [key, { value }])
  )
}
