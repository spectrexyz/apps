import { Button, IconDiscordLogo, IconEye } from "moire"
import { PanelSection } from "./PanelSection"

export function NftProvenance() {
  return (
    <PanelSection title="Provenance">
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: "2gu",
        }}
      >
        {[
          ["View on Etherscan", "https://etherscan.io/"],
          ["View on IPFS", "https://ipfs.io/"],
          ["Community Discord", "https://discord.com/"],
        ].map(([label, url]) => (
          <div key={label + url}>
            <Button
              external
              href={url}
              icon={/^https:\/\/discord\.com\//.test(url)
                ? <IconDiscordLogo />
                : <IconEye />}
              label={label}
              mode="flat"
              size="compact"
              uppercase
            />
          </div>
        ))}
      </div>
    </PanelSection>
  )
}
