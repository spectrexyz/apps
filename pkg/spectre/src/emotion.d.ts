import "@emotion/react"
import { Interpolation } from "@emotion/serialize"
import { Theme } from "@emotion/react"
import { ThemeContext } from "kit"

declare module "@emotion/react" {
  export interface Theme extends ThemeContext {}
}
