import { useMemo } from "react"
import { Kit } from "kit"
import { QueryClient, QueryClientProvider } from "react-query"
import { useLocation } from "wouter"
import { BlockNumber, Ethereum } from "../Ethereum"
import { TopBar } from "../TopBar/TopBar.jsx"
import { StatusBar } from "../StatusBar/StatusBar.jsx"
import { AppLayout } from "./AppLayout.jsx"
import { AppReady } from "./AppReady.jsx"
import { AppScreen } from "./AppScreen.jsx"
import { AppScroll } from "./AppScroll.jsx"
import { AppViewport } from "./AppViewport.jsx"

function App() {
  const [location] = useLocation()

  const matchLocation = (path) =>
    (location === "/" ? "/" : location.replace(/\/$/, "")) === path

  return (
    <AppProviders>
      <AppScreen header={<div>header</div>}>
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index} style={{ padding: "10px 0" }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
          </p>
        ))}
      </AppScreen>
    </AppProviders>
  )
}

function AppProviders({ children }) {
  const queryClient = useMemo(() => new QueryClient(), [])
  return (
    <Kit baseUrl="/kit/">
      <QueryClientProvider client={queryClient}>
        <Ethereum>
          <BlockNumber>
            <AppScroll>
              <AppReady>
                <AppViewport>
                  <AppLayout topBar={<TopBar />} bottomBar={<StatusBar />}>
                    {children}
                  </AppLayout>
                </AppViewport>
              </AppReady>
            </AppScroll>
          </BlockNumber>
        </Ethereum>
      </QueryClientProvider>
    </Kit>
  )
}

export default App
