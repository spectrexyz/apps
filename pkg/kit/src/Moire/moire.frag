#version 300 es

precision lowp float;

uniform vec2 resolution;
uniform float seed;
uniform float speed;
uniform float time;
uniform bool shadow;

out vec4 fragColor;

// [IMPORT_SNOISE]

const vec3 linesColor = vec3(1.0, 1.0, 1.0);
const vec3 backgroundColor = vec3(0.0, 0.0, 0.0);

float shadowAlpha(vec2 uv, float t) {
  float noise = snoise(vec3(uv.x + uv.y / 8.0, uv.y / 8.0, t + seed)) * 0.05;
  float alpha = mod(noise, 0.1) / 0.1;
  alpha = (min(alpha * 0.4, 1.0) - max(alpha - 0.6, 0.0)) * 4.0;
  return clamp(alpha, 0.0, 1.0);
}

//  fwidth isolines technique adapted from
//  https://www.shadertoy.com/view/Xt3yDS
void main() {
  float t = time * speed;

  vec2 uv = vec2(-resolution.xy + 2. * gl_FragCoord.xy) / resolution.y * 0.5;

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
    shadow? shadowAlpha(uv, t) : 0.0
  );

  lowp float alpha = px.x * (1.0 / 3.0) + px.y * (1.0 / 3.0) + px.z * (1.0 / 3.0);

  fragColor = vec4(1.0, 1.0, 1.0, alpha);
}
