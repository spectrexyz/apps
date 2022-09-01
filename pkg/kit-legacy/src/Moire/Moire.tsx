import { colord } from "colord"
import React, { useEffect, useRef } from "react"
import {
  createBufferInfoFromArrays,
  createProgramInfo,
  drawBufferInfo,
  setBuffersAndAttributes,
  setUniforms,
} from "twgl.js"
import { raf } from "../utils"

type MoireProps = {
  animate?: boolean
  backgroundColor?: string
  height?: number
  linesColor?: string
  scale?: number
  speed?: number
  width?: number
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
}: MoireProps) {
  const ref = useRef() as React.MutableRefObject<HTMLCanvasElement>
  const seed = useRef(Math.random())

  width = Math.round(width)
  height = Math.round(height)

  const _firstFrameRendered = useRef(false)
  const _animate = useRef(animate)
  useEffect(() => {
    _animate.current = animate
  }, [animate])

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement
    const gl = canvas.getContext("webgl", {
      alpha: false,
    }) as WebGLRenderingContext

    gl.getExtension("OES_standard_derivatives")

    const programInfo = createProgramInfo(gl, [VS, shader])
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    }
    const bufferInfo = createBufferInfoFromArrays(gl, arrays)

    setBuffersAndAttributes(gl, programInfo, bufferInfo)
    gl.useProgram(programInfo.program)

    const _linesColor = shadersColor(linesColor)
    const _backgroundColor = shadersColor(backgroundColor)

    const stopRaf = raf((time) => {
      if (!ref.current) {
        return
      }

      if (!_animate.current && _firstFrameRendered.current) {
        return
      }

      const uniforms = {
        time: time * speed,
        seed: seed.current * 1000 * speed,
        resolution: [400 * scale, 400 * scale],
        linesColor: _linesColor,
        backgroundColor: _backgroundColor,
      }
      setUniforms(programInfo, uniforms)
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      drawBufferInfo(gl, bufferInfo)

      _firstFrameRendered.current = true
    }, 1000 / 60)

    return () => {
      stopRaf()
    }
  }, [width, height, backgroundColor, linesColor, scale, speed])

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      {...props}
      css={{ display: "block" }}
    />
  )
}

const shader = `
#extension GL_OES_standard_derivatives : enable

precision highp float;

uniform vec2 resolution;
uniform float time;
uniform float seed;
uniform vec3 linesColor;
uniform vec3 backgroundColor;

float t = time * 0.0001;

// snoise() license:
// Copyright (C) 2011 Ashima Arts. All rights reserved.
// Distributed under the MIT License.
// See https://github.com/ashima/webgl-noise

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

  // Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients: 7x7 points over a square, mapped onto an octahedron.
  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

//  fwidth isolines technique adapted from
//  https://www.shadertoy.com/view/Xt3yDS
void main() {

  vec2 uv = vec2(-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y * 0.5;

  float shadowNoise = snoise(vec3(uv.x + uv.y / 8.0, uv.y / 8.0, t + seed)) * 0.05;
  float shadow = mod(shadowNoise, 0.1) / 0.1;
  shadow = (min(shadow * 0.4, 1.0) - max(shadow - 0.6, 0.0)) * 4.0;
  shadow = clamp(shadow, 0.0, 1.0);

  float lineSize = 1. / 180.;
  float lineWeight = mix(0.0, 0.8, 1.2);
  float lineNoise = snoise(vec3(uv.x, uv.y, t + seed)) * 0.8;
  lineNoise = mix(lineNoise, dot(uv, vec2(.4, 1.)*.4), 0.9);

  float lines = mod(lineNoise, lineSize) / lineSize;
  lines = min(lines * 2.0, 1.0) - max(lines * 2. - 0.9, 0.0);
  lines = lines / fwidth(lineNoise / lineSize) / 2.0;
  lines -= lineWeight - 1.;
  lines = clamp(lines, 0.0, 1.0);

  gl_FragColor = vec4(
    mix(
      mix(
        linesColor,
        backgroundColor,
        lines
      ),
      backgroundColor,
      shadow),
    1.0);
}
`

const VS = `
  attribute vec4 position;
  void main() {
    gl_Position = position;
  } 
`

function shadersColor(value: string): [number, number, number] {
  const { r, g, b } = colord(value).toRgb()
  return [r / 255, g / 255, b / 255]
}
