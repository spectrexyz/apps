import "@emotion/react"

type Dict<T> = { [name: string]: T }

declare module "@emotion/react" {
  export interface Theme {
    colors: Dict<string>
    fonts: {
      line: string
      sizes: Dict<string>
      families: Dict<string>
      mono: string
      sans: string
    }
  }
}
