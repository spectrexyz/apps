import IbmPlexMonoLight from "./assets/IBMPlexMono-Light.ttf"
import IbmPlexMonoMedium from "./assets/IBMPlexMono-Medium.ttf"

export const GU = 16

export const colors = {
  black: "#2b2942",
  challenger: "#1b182c",
  cyan: "#aaffe4",
  green: "#95ffa4",
  white: "#cbe3e7",
}

export const fonts = {
  family: '"IBM Plex Mono", monospace',
  line: "1.5",
  sizes: {
    normal: "14px",
    large: "42px",
  },
  faces: [
    {
      name: "IBM Plex Mono",
      src: IbmPlexMonoLight,
      weight: "400",
    },
    {
      name: "IBM Plex Mono",
      src: IbmPlexMonoMedium,
      weight: "600",
    },
  ],
}

export const springs = {
  appear: {
    mass: 0.5,
    tension: 400,
    friction: 30,
  },
  slowAppear: {
    mass: 1,
    tension: 20,
    friction: 26,
  },
}

export const breakpoints = {
  small: 20 * GU,
  medium: 52 * GU,
}
