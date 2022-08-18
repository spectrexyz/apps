import { colord } from "colord"
import {
  AddressBadge,
  Button,
  ButtonArea,
  ButtonText,
  checkBackdropFilterSupport,
  FocusTrap,
  gu,
  IconArrowSquareOut,
  IconCopy,
  IconX,
  Root,
  springs,
} from "moire"
import { useMemo } from "react"
import { a, useTransition } from "react-spring"
import { useAccount, useDisconnect, useEnsName } from "wagmi"

type AccountWindowProps = {
  onClose: () => void
  visible: boolean
}

export function AccountWindow({ onClose, visible }: AccountWindowProps) {
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  const account = useMemo(() => ({ address, ensName }), [address, ensName])

  const visibility = useTransition(visible && account, {
    config: springs.swift,
    from: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
    enter: [{ opacity: 1, transform: "scale3d(1, 1, 1)" }, { blur: 1 }],
    leave: { blur: 0, opacity: 0, transform: "scale3d(0.9, 0.9, 1)" },
  })

  const supportsBackdropFilters = checkBackdropFilterSupport()

  return (
    <Root>
      {visibility(({ blur, opacity, transform }, account) => {
        if (!account) return null
        const { address, ensName } = account
        return address
          ? (
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
                css={({ colors }) => ({
                  position: "absolute",
                  zIndex: "2",
                  inset: "5.25gu 5.25gu auto auto",
                  width: "61gu",
                  padding: "2.5gu 3gu",
                  background: colord(colors.translucid).alpha(
                    supportsBackdropFilters ? 0.6 : 1,
                  ).toHex(),
                  backdropFilter: "blur(40px)",
                  borderRadius: "6px",
                })}
              >
                <a.div
                  style={{ opacity: blur.to((v) => 1 - v) }}
                  css={{
                    display: supportsBackdropFilters ? "block" : "none",
                    position: "absolute",
                    zIndex: "1",
                    inset: "0",
                    background: "rgb(43, 44, 97)",
                    borderRadius: "6px",
                  }}
                />
                <div
                  css={{
                    position: "relative",
                    zIndex: "2",
                  }}
                >
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "3gu",
                    }}
                  >
                    <h1
                      css={{
                        textTransform: "uppercase",
                      }}
                    >
                      Account
                    </h1>
                    <ButtonArea
                      onClick={onClose}
                      css={({ colors }) => ({
                        position: "relative",
                        display: "flex",
                        width: "2.5gu",
                        height: "2.5gu",
                        color: colors.contentDimmed,
                        "&:active": {
                          top: "1px",
                          left: "1px",
                        },
                      })}
                    >
                      <IconX size={2.5 * gu} />
                    </ButtonArea>
                  </div>
                  <h2
                    css={({ colors, fonts }) => ({
                      paddingBottom: "1.25gu",
                      fontSize: "14px",
                      color: colors.contentDimmed,
                      fontFamily: fonts.sans,
                    })}
                  >
                    Connected with MetaMask
                  </h2>
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <AddressBadge
                      address={address}
                      ensName={ensName}
                      size="large"
                      transparent={true}
                    />
                    <Button
                      label="Disconnect"
                      mode="flat"
                      onClick={disconnect}
                      size="small"
                      css={{
                        textTransform: "uppercase",
                      }}
                    />
                  </div>
                  <div
                    css={{
                      display: "flex",
                      gap: "2gu",
                      paddingTop: "3.5gu",
                    }}
                  >
                    <ButtonText icon={<IconCopy />} label="Copy address" />
                    <ButtonText
                      icon={<IconArrowSquareOut />}
                      label="Etherscan"
                      href={`https://etherscan.io/address/${address}`}
                      external={true}
                    />
                  </div>
                </div>
              </a.div>
            </FocusTrap>
          )
          : null
      })}
    </Root>
  )
}
