import { useCallback, useState } from "react"
import { isValidEmail } from "./utils.js"

function formEncode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export function useNetlifyForm() {
  const [{ email, status, errorMessage }, setData] = useState({
    email: "",
    status: "idle", // 'pending', 'success', 'error'
  })

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      if (status === "pending") {
        return
      }

      try {
        if (!email.trim()) {
          throw new Error("Please enter your email.")
        }

        if (!isValidEmail(email.trim())) {
          throw new Error("The email doesn’t seem to be valid, please try again.")
        }

        setData({ email, status: "pending" })

        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formEncode({ "form-name": "contact", email }),
        })

        if (!response.ok) {
          throw new Error("An error happened, please try again.")
        }

        setData({ email, status: "success" })
      } catch (err) {
        setData({ email, status: "error", errorMessage: err.message })
      }
    },
    [email, status]
  )

  const handleEmailChange = useCallback((event) => {
    setData((data) => {
      let status = data.status
      if (status === "pending") return data
      if (status === "error") status = "idle"
      return { status, email: event.target.value }
    })
  }, [])

  return {
    email,
    handleEmailChange,
    handleSubmit,
    status,
    errorMessage,
  }
}
