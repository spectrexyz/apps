import { createContext, useContext, useEffect, useState } from "react"
import { useTransition } from "react-spring"
import { css } from "@emotion/react"
import { springs } from "kit"

const AppReadyContext = createContext()

export function AppReady({ children }) {
  const [ready, setReady] = useState(false)

  const appReadyTransition = useTransition(ready, {
    config: springs.appear,
    from: {
      progress: 0,
      topBarTransform: "translate3d(0, -100%, 0)",
      bottomBarTransform: "translate3d(0, 100%, 0)",
    },
    enter: {
      progress: 1,
      topBarTransform: "translate3d(0, 0, 0)",
      bottomBarTransform: "translate3d(0, 0, 0)",
    },
    leave: {
      progress: 0,
      topBarTransform: "translate3d(0, -100%, 0)",
      bottomBarTransform: "translate3d(0, 100%, 0)",
    },
  })

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <AppReadyContext.Provider value={{ appReady: ready, appReadyTransition }}>
      {children}
    </AppReadyContext.Provider>
  )
}

export function useAppReady() {
  return useContext(AppReadyContext)
}
