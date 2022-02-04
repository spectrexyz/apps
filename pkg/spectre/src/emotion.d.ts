import "@emotion/react"
import { Theme } from "@emotion/react"
import { Interpolation } from "@emotion/serialize"
import { ThemeContext } from "kit"

declare module "@emotion/react" {
  export interface Theme extends ThemeContext {}
}
