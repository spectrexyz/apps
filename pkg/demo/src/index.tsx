import { createRoot } from "react-dom/client"
import { App } from "./App"

const elt = document.getElementById("root")

if (elt) {
  createRoot(elt).render(<App />)
}
