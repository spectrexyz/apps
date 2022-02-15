import { ThemeProvider } from "@emotion/react"
import type { ReactNode } from "react"
import { createContext, useContext, useMemo } from "react"
import { colors, fonts } from "../styles"

export type Palette<T> = { [name: string]: T }

export type ThemeContext = {
  colors: Palette<string>
  fonts: {
    line: string
    sizes: {
      [size: string]: string
    }
    families: {
      [alias: string]: string
    }
    mono: string
    sans: string
  }
}

const ThemeContext = createContext<ThemeContext>({ colors, fonts })

export function Theme({ children }: { children: ReactNode }): JSX.Element {
  const context = useMemo(() => ({ colors, fonts }), [])
  return (
    <ThemeProvider theme={context as ThemeContext}>
      <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  )
}

export function useTheme(): ThemeContext {
  return useContext(ThemeContext)
}
