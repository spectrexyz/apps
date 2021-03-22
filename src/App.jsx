import React from "react"
import Base from "./Base.jsx"
import Header from "./Header.jsx"
import Summary from "./Summary.jsx"
import ComingSoon from "./ComingSoon.jsx"
import Footer from "./Footer.jsx"
import content from "./content"

function App() {
  return (
    <Base>
      <Header tagline={content.tagline} />
      <Summary items={content.summaryItems} />
      <ComingSoon label={content.comingSoonLabel} />
      <Footer icons={content.icons} />
    </Base>
  )
}

export default App
