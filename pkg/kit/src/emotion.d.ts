import "@emotion/react"

type StringDict = {
  [name: string]: string
}

declare module "@emotion/react" {
  export interface Theme {
    colors: StringDict
    fonts: {
      line: string
      sizes: StringDict
      families: StringDict
    }
  }
}
