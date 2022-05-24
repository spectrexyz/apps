import type { ReactNode } from "react"
import type { TransitionFn } from "react-spring"

import { springs } from "kit"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { a, useTransition } from "react-spring"

import logo from "./splash-logo.png"

export type AppReadyTransition = TransitionFn<
  boolean,
  {
    progress: number
    topBarTransform: string
    bottomBarTransform: string
    screenTransform: string
  }
>

type AppReadyContext = {
  addTransitionEndCb: (cb: () => void) => void
  appReady: boolean
  appReadyTransition: AppReadyTransition
  removeTransitionEndCb: (cb: () => void) => void
  transitionEnded: boolean
}

const AppReadyContext = createContext<AppReadyContext>({} as AppReadyContext)

type AppReadyProps = { children: ReactNode }

export function AppReady({ children }: AppReadyProps) {
  const [{ ready, transitionEnded }, setReadyState] = useState({
    ready: false,
    transitionEnded: false,
  })

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

  const transitionEndCbs = useRef<(() => void)[] | null>([])
  const addTransitionEndCb = useCallback((cb: () => void) => {
    if (transitionEndCbs.current) {
      transitionEndCbs.current.push(cb)
    } else {
      cb()
    }
  }, [])
  const removeTransitionEndCb = useCallback((cb: () => void) => {
    if (transitionEndCbs.current) {
      transitionEndCbs.current = transitionEndCbs.current.filter(
        (_cb) => _cb === cb,
      )
    }
  }, [])

  const splashTransition = useTransition(!ready, {
    config: springs.appear,
    from: {
      opacity: 1,
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
    onRest: () => {
      if (ready) {
        transitionEndCbs.current?.forEach((cb) => cb())
        transitionEndCbs.current = null
        setReadyState((s) => ({ ...s, transitionEnded: true }))
      }
    },
  })

  useEffect(() => {
    const id = setTimeout(
      () => setReadyState((s) => ({ ...s, ready: true })),
      400,
    )
    return () => clearTimeout(id)
  }, [])

  return (
    <AppReadyContext.Provider
      value={{
        addTransitionEndCb,
        appReady: ready,
        appReadyTransition,
        removeTransitionEndCb,
        transitionEnded,
      }}
    >
      {splashTransition(
        ({ opacity, logoTransform }, loading) =>
          loading && (
            <a.div
              style={{ opacity }}
              css={({ colors }) => ({
                position: "fixed",
                zIndex: "9",
                inset: "0",
                display: "grid",
                placeItems: "center",
                background: colors.background,
              })}
            >
              <a.img
                style={{ transformOrigin: "50% 50%", transform: logoTransform }}
                src={logo}
                alt=""
                width="40.5"
                height="48"
              />
            </a.div>
          ),
      )}
      {children}
    </AppReadyContext.Provider>
  )
}

export function useAppReady(
  { onTransitionEnd }: { onTransitionEnd?: () => void } = {},
) {
  const {
    appReady,
    appReadyTransition,
    transitionEnded,
    addTransitionEndCb,
    removeTransitionEndCb,
  } = useContext(AppReadyContext)

  useEffect(() => {
    if (!onTransitionEnd) return
    addTransitionEndCb(onTransitionEnd)
    return () => {
      removeTransitionEndCb(onTransitionEnd)
    }
  }, [addTransitionEndCb, onTransitionEnd, removeTransitionEndCb])

  return {
    appReady,
    appReadyTransition,
    transitionEnded,
  }
}
