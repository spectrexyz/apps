import { useEffect, useState } from "react"
import { useTrail } from "react-spring"
import { springs } from "./styles"

export function useAppear(items, opts = {}) {
  const [progress, setProgress] = useState(0)
  useEffect(() => setProgress(1), [])
  return useTrail(items, { progress, config: springs.appear, ...opts })
}
