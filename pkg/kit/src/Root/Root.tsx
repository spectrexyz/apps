import type { ReactNode } from "react"

import { createContext, useContext, useState } from "react"
import ReactDOM from "react-dom"

const RootContext = createContext<HTMLDivElement | null>(null)

type RootEntryPointProps = {
  children: ReactNode
}

export function RootEntryPoint({ children }: RootEntryPointProps): JSX.Element {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  return (
    <RootContext.Provider value={element}>
      <div ref={setElement}>{element ? children : null}</div>
    </RootContext.Provider>
  )
}

type RootProps = {
  children: ReactNode
}

export function Root({ children }: RootProps): JSX.Element {
  const element = useContext(RootContext)
  if (element === null) {
    throw new Error("RootEntryPoint is missing")
  }
  return ReactDOM.createPortal(children, element)
}
