import { useViewport } from "@bpierre/use-viewport"
import {
  ButtonArea,
  ButtonText,
  co,
  FocusTrap,
  gu,
  IconArrowSquareOut,
  IconCheck,
  IconCopy,
  IconX,
  Root,
} from "kit"
import { ReactNode } from "react"
import { a, TransitionFn } from "react-spring"
import { SyncStatus } from "../SyncStatus"

type Status = "error" | "success"

export function AccountDrawer({
  opened,
  onClose,
  transition,
}: {
  opened: boolean
  onClose: () => void
  transition: TransitionFn<
    boolean,
    {
      progress: number
    }
  >
}) {
  const { height } = useViewport()
  const drawerHeight = height - 18 * gu

  return (
    <Root>
      {transition(
        ({ progress }, _opened: boolean) =>
          _opened && (
            <div
              css={{
                position: "fixed",
                zIndex: "2",
                inset: "0 0 calc(8gu - 1px)",
              }}
            >
              <a.div
                onClick={onClose}
                style={{ opacity: progress }}
                css={({ colors }) => ({
                  position: "absolute",
                  zIndex: "1",
                  inset: "0",
                  background: co(colors.background).alpha(0.5).toHex(),
                })}
              />
              <FocusTrap
                focusTrapOptions={{
                  onDeactivate: onClose,
                  allowOutsideClick: true,
                }}
              >
                <div
                  css={{
                    position: "absolute",
                    zIndex: "2",
                    inset: "0",
                    overflow: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  <a.section
                    style={{
                      transform: progress.to(
                        (v: number) => `translate3d(0, ${(1 - v) * 100}%, 0)`,
                      ),
                    }}
                    css={({ colors }) => ({
                      pointerEvents: opened ? "auto" : "none",
                      position: "absolute",
                      bottom: "0",
                      display: "flex",
                      width: "100%",
                      height: `${drawerHeight}px`,
                      flexDirection: "column",
                      background: colors.background,
                      borderTop: `1px solid ${colors.outline2}`,
                    })}
                  >
                    <div
                      css={{
                        overflow: "hidden",
                      }}
                    >
                      <a.div
                        style={{
                          transform: progress.to(
                            (v: number) =>
                              `translate3d(0, -${100 * (1 - v)}%, 0)`,
                          ),
                        }}
                        css={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "7gu",
                          padding: "0 2gu",
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
                      </a.div>
                    </div>
                    <div
                      css={{
                        padding: "0 2gu",
                      }}
                    >
                      <div>
                        <Transactions />
                      </div>

                      <div
                        css={({ colors }) => ({
                          position: "absolute",
                          inset: "auto 2gu 1gu",
                          paddingTop: "3gu",
                          borderTop: `1px solid ${colors.outline2}`,
                        })}
                      >
                        <h2
                          css={({ colors, fonts }) => ({
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
                            paddingTop: "1.5gu",
                          }}
                        >
                          <SyncStatus full />
                        </div>

                        <div
                          css={{
                            display: "flex",
                            gap: "2gu",
                            paddingTop: "1.5gu",
                          }}
                        >
                          <ButtonText
                            icon={<IconCopy />}
                            label="Copy address"
                          />
                          <ButtonText
                            icon={<IconArrowSquareOut />}
                            label="Etherscan"
                          />
                        </div>
                      </div>
                    </div>
                  </a.section>
                </div>
              </FocusTrap>
            </div>
          ),
      )}
    </Root>
  )
}

function Transactions() {
  return (
    <section
      css={{
        position: "absolute",
        inset: "6.75gu 2gu 20gu",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "1.5gu",
        }}
      >
        <h1
          css={({ colors, fonts }) => ({
            fontFamily: fonts.sans,
            fontSize: "14px",
            color: colors.contentDimmed,
          })}
        >
          Recent transactions
        </h1>
        <ButtonText label="Clear all" />
      </div>
      <div
        css={({ colors }) => ({
          overflowY: "auto",
          width: "100%",
          display: "grid",
          gap: "1gu",
          "&:focus-visible": {
            outline: `2px solid ${colors.focus}`,
          },
        })}
      >
        <Transaction
          action="Fractionalized (mint & lock)"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="error"
        />
        <Transaction
          action="Swapped"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
        <Transaction
          action="Minted & pooled"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
        <Transaction
          action="Buyout proposed"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
        <Transaction
          action="Fractionalized (mint & lock)"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
        <Transaction
          action="Swapped"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
        <Transaction
          action="Minted & pooled"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
        <Transaction
          action="Buyout proposed"
          details="10 ETH for 60,429.98 SPCTR"
          url="https://etherscan.io/tx/0x709c03175c3e897ec12f2279857fada4511222c4673a970b3747bfac182398d9"
          status="success"
        />
      </div>
    </section>
  )
}

function Transaction({
  action,
  details,
  status,
  url,
}: {
  action: ReactNode
  details: ReactNode
  status: Status
  url: string
}) {
  const icon = (() => {
    if (status === "success") {
      return (
        <IconCheck
          size={2.75 * gu}
          css={({ colors }) => ({
            color: colors.positive,
          })}
        />
      )
    }
    if (status === "error") {
      return (
        <IconX
          size={2.75 * gu}
          css={({ colors }) => ({
            color: colors.negative,
          })}
        />
      )
    }
    return (
      <IconCheck
        size={2.75 * gu}
        css={({ colors }) => ({
          color: colors.positive,
        })}
      />
    )
  })()

  return (
    <div
      css={({ colors }) => ({
        height: "10gu",
        background: colors.layer2,
      })}
    >
      <div
        css={{
          display: "flex",
          height: "100%",
        }}
      >
        <div
          css={{
            padding: "2gu 0 0 2gu",
            width: "100%",
          }}
        >
          <div
            css={({ colors, fonts }) => ({
              paddingBottom: "0.75gu",
              textTransform: "uppercase",
              fontFamily: fonts.sans,
              fontSize: "12px",
              color: colors.contentDimmed,
            })}
          >
            {action}
          </div>
          <div
            css={({ fonts }) => ({
              fontFamily: fonts.sans,
              fontSize: "14px",
            })}
          >
            <a
              href={url}
              css={{
                textDecoration: "underline",
              }}
            >
              {details}
            </a>
          </div>
        </div>
        <div
          css={{
            display: "flex",
            width: "7gu",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
