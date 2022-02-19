// 1 grid unit = 8px
export const gu = 8

const fontMono = "\"IBM Plex Mono\", monospace"
const fontSans = "Inter, sans-serif"

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
    mono: fontMono,
    sans: fontSans,
  },
  mono: fontMono,
  sans: fontSans,
}

export const colorNames = {
  blackBlue: "#343C50",
  altBlue: "#141D2F",
  brightGreen: "#58FFCA",
  darkBlue: "#050E1F",
  paleMauve: "#C0BBFF",
  darkMauve: "#635AC3",
  whiteGreen: "#AAFFE4",
  whitePink: "#EDFCFF",
}

export const colors = {
  primary: colorNames.brightGreen,
  secondary: colorNames.paleMauve,
  contrast: colorNames.altBlue,
  contentAlt: colorNames.whiteGreen,

  lightBackground: colorNames.whiteGreen,
  lightContent: colorNames.blackBlue,
  lightContentAlt: colorNames.darkMauve,

  // new
  background: "#050E1F",
  layer1: "#242D40",
  layer2: "#141D2F",
  translucid: "#2B2C61",
  outline: "#525B70",
  outline2: "#242D40",
  accent: "#58FFCA",
  accent2: "#C0BBFF",
  accentContent: "#050E1F",
  accent2Content: "#050E1F",
  accentInverted: "#242D40",
  accentInvertedContent: "#AAFFE4",
  link: "#C0BBFF",
  focus: "#C0BBFF",
  content: "#EDFCFF",
  contentHeading: "#FCFAFA",
  contentHeading2: "#AAFFE4",
  contentDimmed: "#A0A8C2",
  positive: "#58FFCA",
  negative: "#FE6D6D",
  warning: "#F7B186",
  warningSurface: "#1E1F2A",
  info: "#EDFFB9",

  // semantic colors
  yellow: "#F8FFA6",
  pink: "#FFBBE4",
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
  sluggish: {
    mass: 0.5,
    tension: 250,
    friction: 50,
  },
}
