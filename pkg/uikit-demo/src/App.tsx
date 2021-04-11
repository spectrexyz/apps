import { useState, useEffect } from "react"
import { Uikit, Button } from "uikit"
import { css } from "@emotion/react"
import { Router, Link, Route } from "wouter"

import { Spectre } from "./Spectre"

function currentLocation() {
  return window.location.hash.replace(/^#/, "") || "/"
}

function navigate(to) {
  window.location.hash = to
}

function useHashLocation() {
  const [loc, setLoc] = useState(currentLocation())
  useEffect(() => {
    const handler = () => setLoc(currentLocation())
    window.addEventListener("hashchange", handler)
    return () => {
      window.removeEventListener("hashchange", handler)
    }
  }, [])
  return [loc, navigate]
}

export function App() {
  return (
    <Router hook={useHashLocation}>
      <Uikit baseUrl="/uikit/">
        <div
          css={css`
            display: grid;
            place-items: center;
            width: 100vw;
            height: 100vh;
          `}
        >
          <Route path="/">
            <ul>
              <li>
                <Link href="/button">button</Link>
              </li>
              <li>
                <Link href="/spectre">spectre</Link>
              </li>
            </ul>
          </Route>
          <Route path="/:any">
            <div
              css={css`
                position: absolute;
                top: 1gu;
                left: 2gu;
              `}
            >
              <Link href="/">back</Link>
            </div>
          </Route>
          <Route path="/spectre">
            <Spectre />
          </Route>
          <Route path="/button">
            <Button label="Enable account" />
          </Route>
        </div>
      </Uikit>
    </Router>
  )
}
