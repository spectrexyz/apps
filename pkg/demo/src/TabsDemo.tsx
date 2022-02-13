import { Tabs } from "kit"
import { useState } from "react"

const tabs = [
  "Lorem",
  "Ipsum",
  "Dolor",
  "Sit",
  "Amet",
].map((label) => ({
  label,
  panelId: "panel-" + label,
  tabId: "tab-" + label,
}))

export function TabsDemo() {
  const [tab, setTab] = useState(0)
  return (
    <div>
      <Tabs
        align="center"
        bordered
        items={tabs}
        onSelect={setTab}
        selected={tab}
      />
    </div>
  )
}
