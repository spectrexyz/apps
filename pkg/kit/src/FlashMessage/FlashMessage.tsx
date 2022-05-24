import type { ReactNode } from "react"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useTransition } from "react-spring"

const FlashMessageContext = createContext({})

export function FlashMessage({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState([])
  const playing = useRef(false)
  const showMessage = useTransition(queue, {})

  useEffect(() => {
    if (queue.length === 0) return

    const message = queue[0]
    // setQueue(message.slice(1))
  }, [queue])

  return (
    <FlashMessageContext.Provider
      value={{
        addMessage: (queue) => {
          setQueue((queue) => [...queue, message])
        },
      }}
    >
      <div css={{ position: "fixed" }}></div>
      {children}
    </FlashMessageContext.Provider>
  )
}

export function useFlashMessage() {
  const context = useContext(FlashMessageContext)
  return context.addMessage
}
