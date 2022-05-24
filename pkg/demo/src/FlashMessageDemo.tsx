import { Button, useFlashMessage } from "kit"
import { useState } from "react"

export function FlashMessageDemo() {
  const [counter, setCounter] = useState(1)
  const flash = useFlashMessage()
  const message = `Message ${counter}`
  return (
    <div>
      <Button
        label={`Show “${message}”`}
        onClick={() => {
          flash(message)
          setCounter((v) => v + 1)
        }}
      />
    </div>
  )
}
