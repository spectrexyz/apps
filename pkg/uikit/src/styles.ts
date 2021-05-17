// 1 grid unit = 8 (px)
export const gu = 8

export const colors = {
  blackBlue: "#343C50",
  altBlue: "#141D2F",
  brightGreen: "#58FFCA",
  darkBlue: "#050E1F",
  paleMauve: "#C0BBFF",
  darkMauve: "#635AC3",
  whiteGreen: "#AAFFE4",
  whitePink: "#EDFCFF",
}

export const theme = {
  primary: colors.brightGreen,
  secondary: colors.paleMauve,
  background: colors.darkBlue,
  contrast: colors.altBlue,
  content: colors.whitePink,
  contentAlt: colors.whiteGreen,
  link: colors.paleMauve,

  lightBackground: colors.whiteGreen,
  lightContent: colors.blackBlue,
  lightContentAlt: colors.darkMauve,
}

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
    mono: '"IBM Plex Mono", monospace',
    sans: "Inter, sans-serif",
  },
}
