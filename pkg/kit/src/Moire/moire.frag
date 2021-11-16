#version 300 es

precision highp float;

uniform vec2 resolution;
uniform float seed;
uniform float speed;
uniform float time;

out vec4 fragColor;

// [IMPORT_SNOISE]

const vec3 linesColor = vec3(1.0, 1.0, 1.0);
const vec3 backgroundColor = vec3(0.0, 0.0, 0.0);

//  fwidth isolines technique adapted from
//  https://www.shadertoy.com/view/Xt3yDS
void main() {
  float t = time * speed;

  vec2 uv = vec2(-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y * 0.5;

  float shadowNoise = snoise(vec3(uv.x + uv.y / 8.0, uv.y / 8.0, t + seed)) * 0.05;
  float shadow = mod(shadowNoise, 0.1) / 0.1;
  shadow = (min(shadow * 0.4, 1.0) - max(shadow - 0.6, 0.0)) * 4.0;
  shadow = clamp(shadow, 0.0, 1.0);

  float lineSize = 1. / 180.;
  float lineWeight = mix(0.0, 0.8, 1.2);
  float lineNoise = snoise(vec3(uv.x, uv.y, t + seed)) * 0.8;
  lineNoise = mix(lineNoise, dot(uv, vec2(.4, 1.) * .4), 0.9);

  float lines = mod(lineNoise, lineSize) / lineSize;
  lines = min(lines * 2.0, 1.0) - max(lines * 2. - 0.9, 0.0);
  lines = lines / fwidth(lineNoise / lineSize) / 2.0;
  lines -= lineWeight - 1.;
  lines = clamp(lines, 0.0, 1.0);

  vec3 px = mix(
    mix(linesColor, backgroundColor, lines),
    backgroundColor,
    shadow
  );

  lowp float alpha = px.x * (1.0 / 3.0) + px.y * (1.0 / 3.0) + px.z * (1.0 / 3.0);

  fragColor = vec4(1.0, 1.0, 1.0, alpha);
}
