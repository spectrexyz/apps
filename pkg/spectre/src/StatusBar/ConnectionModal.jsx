import { css } from "@emotion/react"
import { useTheme, gu, ButtonArea, IconClose, Modal } from "kit"
import { useEthereum } from "../Ethereum"

import metaMask from "./assets/web3-providers/metamask.svg"
import walletConnect from "./assets/web3-providers/walletconnect.svg"

const PROVIDERS = [
  ["MetaMask", metaMask, "injected"],
  ["WalletConnect", walletConnect, "wallet-connect"],
]

export function ConnectionModal({ onClose, visible }) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div
        css={({ fonts }) => css`
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
    </Modal>
  )
}

function ProviderButton({ name, icon, id }) {
  const { connect } = useEthereum()
  return (
    <ButtonArea
      onClick={() => connect(id)}
      css={({ colors }) => css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 6gu;
        padding-left: 2.5gu;
        padding-right: 1.5gu;
        background: ${colors.layer2};
        color: ${colors.accent};
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
  )
}
