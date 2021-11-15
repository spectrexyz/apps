import type { ComponentPropsWithoutRef, RefObject } from "react"

import { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import { Box, Color, Mesh, Program, Renderer } from "ogl"
import { colord } from "colord"
import { raf } from "../utils"

import moireFragment from "./moire.frag?raw"
import moireVertex from "./moire.vert?raw"
import snoise from "./snoise.glsl?raw"

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

  const [{ render, resize }, setFns] = useState<{
    render: (time: number) => void
    resize: (width: number, height: number) => void
  }>({
    render: () => {},
    resize: () => {},
  })

  const uniforms = useRef({
    backgroundColor: scolor(backgroundColor),
    linesColor: scolor(linesColor),
    resolution: [width * scale, height * scale],
    seed: Math.random() * 1000,
    speed,
    time: 1,
  })

  useEffect(() => {
    uniforms.current.resolution[0] = width * scale
    uniforms.current.resolution[1] = height * scale
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

    setFns({ render, resize })
    return () => gl.canvas.remove()
  }, [parent])

  useEffect(() => {
    resize(width, height)
  }, [resize, width, height])

  return render
}

type MoireProps = ComponentPropsWithoutRef<"div"> & {
  animate?: boolean
  backgroundColor?: string
  height?: number
  linesColor?: string
  scale?: number
  speed?: number
  width?: number
}

function useAnimate(animate: boolean, render: (time: number) => void) {
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
    }, 1000 / 60)
    return stopRaf
  }, [render])
}

export function Moire({
  animate = true,
  backgroundColor = "rgb(4, 19, 31)",
  height = 500,
  linesColor = "rgb(88, 255, 202)",
  scale = 1,
  speed = 1,
  width = 500,
  ...props
}: MoireProps): JSX.Element {
  const canvasContainer = useRef<HTMLDivElement>(null)

  const render = useOglProgram({
    parent: canvasContainer,
    dimensions: [width, height],
    speed,
    scale,
    linesColor,
    backgroundColor,
  })

  useAnimate(animate, render)

  return (
    <div
      ref={canvasContainer}
      {...props}
      css={css`
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
