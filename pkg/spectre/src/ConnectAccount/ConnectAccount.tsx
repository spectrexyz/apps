import { RefObject } from "react"
import { css } from "@emotion/react"
import { useConnect } from "wagmi"
import { gu, ButtonArea, Modal, Popup } from "kit"

import metaMask from "./assets/web3-providers/metamask.svg"
import walletConnect from "./assets/web3-providers/walletconnect.svg"

const PROVIDERS = [
  ["MetaMask", metaMask, "injected"],
  ["WalletConnect", walletConnect, "wallet-connect"],
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
  return opener ? (
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
  ) : (
    <Modal visible={visible} onClose={onClose} mode="translucid">
      <ConnectAccountInside />
    </Modal>
  )
}

export function ConnectAccountInside() {
  return (
    <div
      css={({ colors, fonts }) => css`
        padding-top: 2gu;
        h1 {
          margin-bottom: 1gu;
          font-family: ${fonts.families.mono};
          font-size: 24px;
          letter-spacing: -1px;
          white-space: nowrap;
          text-align: center;
        }
        h1 + p {
          font-family: ${fonts.families.sans};
          font-size: 14px;
          text-align: center;
        }
        h1,
        h1 + p {
          color: ${colors.contentHeading};
        }
      `}
    >
      <h1>Connect your account</h1>
      <p>Select one of the available wallets</p>

      <div
        css={css`
          display: grid;
          gap: 1.5gu;
          padding-top: 4gu;
        `}
      >
        {PROVIDERS.map(([name, icon, id], index) => (
          <ProviderButton key={index} name={name} icon={icon} id={id} />
        ))}
      </div>
      <p
        css={({ colors, fonts }) => css`
          margin-top: 3gu;
          text-align: center;
          color: ${colors.contentDimmed};
          font-family: ${fonts.families.sans};
          font-size: 14px;
          a {
            text-decoration: underline;
          }
        `}
      >
        What’s a wallet?{" "}
        <a href="https://ethereum.org/en/wallets/" target="_blank">
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

  return connector ? (
    <ButtonArea
      onClick={() => connect(connector)}
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 6gu;
        padding-left: 2.5gu;
        padding-right: 1.5gu;
        background: ${colors.layer2};
        color: ${colors.contentHeading};
        &:active {
          position: relative;
          top: 1px;
          left: 1px;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          div {
            display: flex;
            align-items: center;
          }
        `}
      >
        <div>{name}</div>
        <div>
          <img src={icon} alt="" width="32" height="32" />
        </div>
      </div>
    </ButtonArea>
  ) : null
}
