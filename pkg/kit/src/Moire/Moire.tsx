import type { ComponentPropsWithoutRef, ReactNode, RefObject } from "react"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { css } from "@emotion/react"
import { Box, Color, Mesh, Program, Renderer } from "ogl"
import { colord } from "colord"
import { noop, raf } from "../utils"

import moireFragment from "./moire.frag?raw"
import moireVertex from "./moire.vert?raw"
import snoise from "./snoise.glsl?raw"

const MoireContext = createContext<{
  addMoire: (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => void
  removeMoire: (canvas: HTMLCanvasElement) => void
}>({ addMoire: noop, removeMoire: noop })

function useOglProgram({
  backgroundColor,
  dimensions: [width, height],
  linesColor,
  parent,
  scale,
  speed,
}: {
  backgroundColor: Color
  dimensions: [width: number, height: number]
  linesColor: Color
  parent: RefObject<HTMLElement>
  scale: number
  speed: number
}) {
  width = Math.round(width)
  height = Math.round(height)

  const [{ canvas, render, resize }, setFns] = useState<{
    canvas?: HTMLCanvasElement
    render: (time: number) => void
    resize: (width: number, height: number) => void
  }>({
    render: () => {},
    resize: () => {},
  })

  const uniforms = useRef({
    backgroundColor: scolor(backgroundColor),
    linesColor: scolor(linesColor),
    resolution: [500 * scale, 500 * scale],
    seed: Math.random() * 1000,
    speed,
    time: 1,
  })

  useEffect(() => {
    uniforms.current.resolution[0] = 500 * scale
    uniforms.current.resolution[1] = 500 * scale
    uniforms.current.speed = speed
  }, [height, scale, speed, width])

  useEffect(() => {
    uniforms.current.backgroundColor = scolor(backgroundColor)
  }, [backgroundColor])

  useEffect(() => {
    uniforms.current.linesColor = scolor(linesColor)
  }, [linesColor])

  useEffect(() => {
    if (!parent.current) return

    const renderer = new Renderer({
      dpr: window.devicePixelRatio ?? 1,
      alpha: false,
    })
    const { gl } = renderer

    parent.current.appendChild(gl.canvas)

    const program = new Program(gl, {
      transparent: false,
      fragment: moireFragment.replace(
        /^\/\/ \[IMPORT_SNOISE\]\n/gm,
        snoise + "\n"
      ),
      vertex: moireVertex,
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
  }, [render])
}

type MoireBaseProps = ComponentPropsWithoutRef<"div"> & {
  animate?: boolean
  backgroundColor?: string
  children: ReactNode
  linesColor?: string
  scale?: number
  speed?: number
}

export function MoireBase({
  animate = true,
  backgroundColor = "rgb(4, 19, 31)",
  children,
  linesColor = "rgb(88, 255, 202)",
  scale = 1,
  speed = 1,
  ...props
}: MoireBaseProps): JSX.Element {
  const [width, height] = [500, 500]

  const canvasContainer = useRef<HTMLDivElement>(null)

  const activeMoires = useRef<
    Map<
      HTMLCanvasElement,
      { context: CanvasRenderingContext2D; width: number; height: number }
    >
  >(new Map())

  const { canvas, render } = useOglProgram({
    parent: canvasContainer,
    dimensions: [width, height],
    speed,
    scale,
    linesColor,
    backgroundColor,
  })

  useAnimate(
    useCallback(
      (time) => {
        if (!canvas) return

        render(time)
        activeMoires.current.forEach(({ context }) => {
          context.drawImage(canvas, 0, 0, width, height)
        })
      },
      [render, canvas]
    ),
    { animate }
  )

  const addMoire = useCallback((canvas, context, width, height) => {
    activeMoires.current.set(canvas, { context, width, height })
  }, [])

  const removeMoire = useCallback((canvas) => {
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
  height: number
  scale?: number
  width: number
}

export function Moire({
  animate,
  height,
  scale = 1,
  width,
  ...props
}: MoireProps): JSX.Element {
  const { addMoire, removeMoire } = useContext(MoireContext)
  const canvas = useRef<HTMLCanvasElement | null>(null)

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
          addMoire(_canvas, context, width, height)
          canvas.current = _canvas
        }
      }}
      width={width}
      height={height}
      {...props}
      css={css`
        display: block;
        overflow: hidden;
      `}
    />
  )
}

function scolor(value: string): Color {
  return new Color(colord(value).toHex())
}

function formatUniforms(uniforms: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(uniforms).map(([key, value]) => [key, { value }])
  )
}
