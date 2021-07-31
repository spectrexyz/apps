import { createContext, useContext, useEffect, useState } from "react"
import { a, useTransition } from "react-spring"
import { css } from "@emotion/react"
import { springs } from "kit"

import logo from "./splash-logo.png"

const AppReadyContext = createContext()

export function AppReady({ children }) {
  const [ready, setReady] = useState(false)

  const appReadyTransition = useTransition(ready, {
    config: springs.lazy,
    from: {
      progress: 0,
      topBarTransform: "translate3d(0, -100%, 0)",
      bottomBarTransform: "translate3d(0, 100%, 0)",
      screenTransform: "scale3d(0.9, 0.9, 1)",
    },
    enter: {
      progress: 1,
      topBarTransform: "translate3d(0, 0, 0)",
      bottomBarTransform: "translate3d(0, 0, 0)",
      screenTransform: "scale3d(1, 1, 1)",
    },
    leave: {
      progress: 0,
      topBarTransform: "translate3d(0, -100%, 0)",
      bottomBarTransform: "translate3d(0, 100%, 0)",
      screenTransform: "scale3d(0.9, 0.9, 1)",
    },
  })

  const splashTransition = useTransition(!ready, {
    config: springs.appear,
    from: {
      opacity: 0,
      logoTransform: "scale3d(0.9, 0.9, 1) rotate3d(0, 0, 1, -180deg)",
    },
    enter: {
      opacity: 1,
      logoTransform: "scale3d(1, 1, 1) rotate3d(0, 0, 1, 0deg)",
    },
    leave: {
      opacity: 0,
      logoTransform: "scale3d(2, 2, 1) rotate3d(0, 0, 1, 0deg)",
    },
  })

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(id)
  }, [])

  return (
    <AppReadyContext.Provider value={{ appReady: ready, appReadyTransition }}>
      {splashTransition(
        ({ opacity, logoTransform }, loading) =>
          loading && (
            <a.div
              style={{ opacity }}
              css={({ colors }) => css`
                position: fixed;
                z-index: 9;
                inset: 0;
                display: grid;
                place-items: center;
                background: ${colors.background};
              `}
            >
              <a.img
                style={{ transformOrigin: "50% 50%", transform: logoTransform }}
                src={logo}
                alt=""
                width="40.5"
                height="48"
              />
            </a.div>
          )
      )}
      {children}
    </AppReadyContext.Provider>
  )
}

export function useAppReady() {
  return useContext(AppReadyContext)
}
