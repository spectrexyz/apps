import { css } from "@emotion/react"
import { a, useTransition } from "react-spring"
import { colord } from "colord"
import {
  AddressBadge,
  Button,
  ButtonArea,
  ButtonText,
  FocusTrap,
  IconArrowSquareOut,
  IconCopy,
  IconX,
  Root,
  checkBackdropFilterSupport,
  gu,
  springs,
} from "kit"
import { useEthereum } from "../Ethereum"

export function AccountWindow({ visible, onClose }) {
  const { account, disconnect } = useEthereum()

  const visibility = useTransition(visible, {
    config: springs.swift,
    from: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
    enter: [{ opacity: 1, transform: "scale3d(1, 1, 1)" }, { blur: 1 }],
    leave: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
  })

  const supportsBackdropFilters = checkBackdropFilterSupport()

  return (
    <Root>
      {visibility(({ blur, opacity, transform }, item) => {
        if (!item) {
          return null
        }
        return (
          <FocusTrap
            focusTrapOptions={{
              onDeactivate: onClose,
              allowOutsideClick: true,
              clickOutsideDeactivates: true,
            }}
          >
            <a.div
              style={{
                opacity,
                pointerEvents: visible ? "auto" : "none",
                transform,
              }}
              css={({ colors }) => css`
                position: absolute;
                z-index: 2;
                inset: 5.25gu 5.25gu auto auto;
                width: 61gu;
                padding: 2.5gu 3gu;

                background: ${colord(colors.translucid)
                  .alpha(supportsBackdropFilters ? 0.6 : 1)
                  .toHex()};
                backdrop-filter: blur(40px);
                border-radius: 6px;
              `}
            >
              <a.div
                style={{
                  opacity: blur.to((v) => 1 - v),
                }}
                css={css`
                  display: ${supportsBackdropFilters ? "block" : "none"};
                  position: absolute;
                  z-index: 1;
                  inset: 0;
                  background: rgb(43, 44, 97);
                  border-radius: 6px;
                `}
              />
              <div
                css={css`
                  position: relative;
                  z-index: 2;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 3gu;
                  `}
                >
                  <h1
                    css={css`
                      text-transform: uppercase;
                    `}
                  >
                    Account
                  </h1>
                  <ButtonArea
                    onClick={onClose}
                    css={({ colors }) => css`
                      position: relative;
                      display: flex;
                      width: 2.5gu;
                      height: 2.5gu;
                      color: ${colors.contentDimmed};
                      &:active {
                        top: 1px;
                        left: 1px;
                      }
                    `}
                  >
                    <IconX size={2.5 * gu} />
                  </ButtonArea>
                </div>
                <h2
                  css={({ colors, fonts }) => css`
                    padding-bottom: 1.25gu;
                    font-size: 14px;
                    color: ${colors.contentDimmed};
                    font-family: ${fonts.families.sans};
                  `}
                >
                  Connected with MetaMask
                </h2>
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <AddressBadge
                    address={account}
                    size="large"
                    transparent={true}
                  />
                  <Button
                    label="Disconnect"
                    mode="flat"
                    onClick={disconnect}
                    size="small"
                    css={css`
                      text-transform: uppercase;
                    `}
                  />
                </div>
                <div
                  css={css`
                    display: flex;
                    gap: 2gu;
                    padding-top: 3.5gu;
                  `}
                >
                  <ButtonText icon={<IconCopy />} label="Copy address" />
                  <ButtonText
                    icon={<IconArrowSquareOut />}
                    label="Etherscan"
                    href={`https://etherscan.io/address/${account}`}
                    external
                  />
                </div>
              </div>
            </a.div>
          </FocusTrap>
        )
      })}
    </Root>
  )
}
