// 1 grid unit = 8px
export const gu = 8

export const fonts = {
  line: "1.5",
  sizes: {
    small: "12px",
    normalMono: "16px",
    normalSans: "18px",
    largeMono: "20px",
    largeSans: "22px",
    xlarge: "44px",
    xxlarge: "64px",
    soSoLarge: "72px",
  },
  families: {
    mono: "\"IBM Plex Mono\", monospace",
    sans: "Inter, sans-serif",
  },
}

export const springs = {
  debug: { mass: 1, tension: 10, friction: 40 },
  swift: {
    mass: 0.5,
    tension: 800,
    friction: 30,
  },
  snappy: {
    mass: 1,
    tension: 1800,
    friction: 80,
  },
  appear: {
    mass: 0.5,
    tension: 400,
    friction: 30,
  },
  lazy: {
    mass: 0.5,
    tension: 350,
    friction: 35,
  },
}
