import type { RefObject } from "react"

import { ButtonArea, gu, Modal, Popup } from "kit"
import { useConnect } from "wagmi"

import metaMask from "./assets/web3-providers/metamask.svg"
import walletConnect from "./assets/web3-providers/walletconnect.svg"

const PROVIDERS = [
  ["MetaMask", metaMask, "injected"],
  ["WalletConnect", walletConnect, "walletConnect"],
]

export function ConnectAccount({
  onClose,
  visible,
  opener = null,
}: {
  onClose: () => void
  visible: boolean
  opener?: null | RefObject<HTMLElement>
}) {
  return opener
    ? (
      <Popup
        closeButton={true}
        focusableContainer={false}
        mode="translucid"
        onClose={onClose}
        opener={opener}
        visible={visible}
        width={45 * gu}
      >
        <ConnectAccountInside />
      </Popup>
    )
    : (
      <Modal visible={visible} onClose={onClose} mode="translucid">
        <ConnectAccountInside />
      </Modal>
    )
}

export function ConnectAccountInside() {
  return (
    <div
      css={({ colors, fonts }) => ({
        paddingTop: "2gu",
        "h1": {
          marginBottom: "1gu",
          fontFamily: fonts.mono,
          fontSize: "24px",
          letterSpacing: "-1px",
          whiteSpace: "nowrap",
          textAlign: "center",
        },
        "h1 + p": {
          fontFamily: fonts.sans,
          fontSize: "14px",
          textAlign: "center",
        },
        "h1, h1 + p": {
          color: colors.contentHeading,
        },
      })}
    >
      <h1>Connect your account</h1>
      <p>Select one of the available wallets</p>

      <div
        css={{
          display: "grid",
          gap: "1.5gu",
          paddingTop: "4gu",
        }}
      >
        {PROVIDERS.map(([name, icon, id], index) => (
          <ProviderButton key={index} name={name} icon={icon} id={id} />
        ))}
      </div>
      <p
        css={({ colors, fonts }) => ({
          marginTop: "3gu",
          textAlign: "center",
          color: colors.contentDimmed,
          fontFamily: fonts.sans,
          fontSize: "14px",
          "a": {
            textDecoration: "underline",
          },
        })}
      >
        What’s a wallet?{" "}
        <a
          href="https://ethereum.org/en/wallets/"
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </p>
    </div>
  )
}

function ProviderButton({
  icon,
  id,
  name,
}: {
  icon: string
  id: string
  name: string
}) {
  const [{ data }, connect] = useConnect()
  const connector = data.connectors.find((connector) => connector.id === id)

  return connector
    ? (
      <ButtonArea
        onClick={() => {
          void connect(connector)
        }}
        css={({ colors }) => ({
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "6gu",
          paddingLeft: "2.5gu",
          paddingRight: "1.5gu",
          background: colors.layer2,
          color: colors.contentHeading,
          "&:active": {
            position: "relative",
            top: "1px",
            left: "1px",
          },
        })}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            "div": {
              display: "flex",
              alignItems: "center",
            },
          }}
        >
          <div>{name}</div>
          <div>
            <img src={icon} alt="" width="32" height="32" />
          </div>
        </div>
      </ButtonArea>
    )
    : null
}
