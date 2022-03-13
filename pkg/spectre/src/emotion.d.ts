import { ThemeContext } from "kit"

declare module "@emotion/react" {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Theme extends ThemeContext {}
  /* eslint-enable @typescript-eslint/no-empty-interface */
}
