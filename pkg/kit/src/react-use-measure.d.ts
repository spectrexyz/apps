import "react-use-measure"

import type { Ref } from "react"
import type { Options, RectReadOnly, HTMLOrSVGElement } from "react-use-measure"

declare module "react-use-measure" {
  type Result = [Ref<HTMLOrSVGElement>, RectReadOnly, () => void]
  export function useMeasure(options: Options): Result
}
