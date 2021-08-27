import type { ReactNode } from "react"

import { ThemeProvider } from "@emotion/react"
import React, { createContext, useContext, useMemo } from "react"
import { fonts } from "../styles"

const colorNames = {
  blackBlue: "#343C50",
  altBlue: "#141D2F",
  brightGreen: "#58FFCA",
  darkBlue: "#050E1F",
  paleMauve: "#C0BBFF",
  darkMauve: "#635AC3",
  whiteGreen: "#AAFFE4",
  whitePink: "#EDFCFF",
}

const colors = {
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
  link: "#C0BBFF",
  focus: "#C0BBFF",
  content: "#EDFCFF",
  contentHeading: "#FCFAFA",
  contentHeading2: "#AAFFE4",
  contentDimmed: "#A0A8C2",
  positive: "#58FFCA",
  negative: "#FE6D6D",

  // semantic colors
  yellow: "#F8FFA6",
  pink: "#FFBBE4",
}

export type Palette<T> = { [name: string]: T }

export type ThemeContextValue = {
  colors: Palette<string>
  fonts: {
    line: string
    sizes: {
      [size: string]: string
    }
    families: {
      [alias: string]: string
    }
  }
}

const ThemeContext = createContext<ThemeContextValue>({ colors, fonts })

export function Theme({ children }: { children: ReactNode }): JSX.Element {
  const context = useMemo(() => ({ colors, fonts }), [])
  return (
    <ThemeProvider theme={context as ThemeContextValue}>
      <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  )
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}
