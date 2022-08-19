import type { ReactNode } from "react"

import { createContext, useContext } from "react"
import { addSlash } from "../utils"

type BaseUrlProps = {
  baseUrl: string
  children: ReactNode
}

const BaseUrlContext = createContext("")

export function BaseUrl({ baseUrl, children }: BaseUrlProps): JSX.Element {
  return (
    <BaseUrlContext.Provider value={addSlash(baseUrl)}>
      {children}
    </BaseUrlContext.Provider>
  )
}

export function useBaseUrl(path = ""): string {
  const baseUrl = useContext(BaseUrlContext)
  if (path.startsWith("/")) {
    path = path.slice(1)
  }
  return baseUrl + path
}
