/** @jsx jsx */
import type { ReactNode } from "react"

import { jsx } from "@emotion/react"
import { createContext, useCallback, useContext, useState } from "react"
import ReactDOM from "react-dom"

const RootContext = createContext(null)

type RootEntryPointProps = {
  children: ReactNode
}

export function RootEntryPoint({ children }: RootEntryPointProps): JSX.Element {
  const [element, setElement] = useState(null)

  const ref = useCallback((element) => {
    if (element !== null) {
      setElement(element)
    }
  }, [])

  return (
    <RootContext.Provider value={element}>
      <div ref={ref}>{element ? children : null}</div>
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
