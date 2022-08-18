import { Tabs } from "moire"
import { useState } from "react"

const tabs = [
  "Lorem",
  "Ipsum",
  "Dolor",
  "Sit",
].map((label) => ({
  label,
  panelId: "panel-" + label,
  tabId: "tab-" + label,
}))

export function TabsDemo() {
  const [tab, setTab] = useState(0)
  return (
    <div
      css={{
        display: "grid",
        placeItems: "center",
        width: "100vw",
        overflow: "auto",
        padding: "1gu",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "4gu",
          width: "100gu",
        }}
      >
        <Tabs
          items={tabs.slice(-2)}
          onSelect={setTab}
          selected={tab}
        />
        <Tabs
          items={tabs}
          onSelect={setTab}
          selected={tab}
        />
        <Tabs
          fullWidth={true}
          items={tabs}
          onSelect={setTab}
          selected={tab}
        />
      </div>
    </div>
  )
}
