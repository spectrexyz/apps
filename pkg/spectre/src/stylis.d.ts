import { StylisPlugin } from "@emotion/cache"

declare module "stylis" {
  export const prefixer: StylisPlugin
}
