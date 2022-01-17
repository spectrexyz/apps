import { ReactNode } from "react"
import { css } from "@emotion/react"
import { a, TransitionFn } from "react-spring"
import { useViewport } from "@bpierre/use-viewport"
import {
  ButtonArea,
  ButtonText,
  FocusTrap,
  IconArrowSquareOut,
  IconCheck,
  IconCopy,
  IconX,
  Root,
  co,
  gu,
} from "kit"
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
              css={css`
                position: fixed;
                z-index: 2;
                inset: 0 0 calc(8gu - 1px);
              `}
            >
              <a.div
                onClick={onClose}
                style={{ opacity: progress }}
                css={({ colors }) => css`
                  position: absolute;
                  z-index: 1;
                  inset: 0;
                  background: ${co(colors.background).alpha(0.5).toHex()};
                `}
              />
              <FocusTrap
                focusTrapOptions={{
                  onDeactivate: onClose,
                  allowOutsideClick: true,
                }}
              >
                <div
                  css={css`
                    position: absolute;
                    z-index: 2;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                  `}
                >
                  <a.section
                    style={{
                      transform: progress.to(
                        (v: number) => `translate3d(0, ${(1 - v) * 100}%, 0)`
                      ),
                    }}
                    css={({ colors }) => css`
                      pointer-events: ${opened ? "auto" : "none"};
                      position: absolute;
                      bottom: 0;
                      display: flex;
                      width: 100%;
                      height: ${drawerHeight}px;
                      flex-direction: column;
                      background: ${colors.background};
                      border-top: 1px solid ${colors.outline2};
                    `}
                  >
                    <div
                      css={css`
                        overflow: hidden;
                      `}
                    >
                      <a.div
                        style={{
                          transform: progress.to(
                            (v: number) =>
                              `translate3d(0, -${100 * (1 - v)}%, 0)`
                          ),
                        }}
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          height: 7gu;
                          padding: 0 2gu;
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
                      </a.div>
                    </div>
                    <div
                      css={css`
                        padding: 0 2gu;
                      `}
                    >
                      <div>
                        <Transactions />
                      </div>

                      <div
                        css={({ colors }) => css`
                          position: absolute;
                          inset: auto 2gu 1gu;
                          padding-top: 3gu;
                          border-top: 1px solid ${colors.outline2};
                        `}
                      >
                        <h2
                          css={({ colors, fonts }) => css`
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
                            padding-top: 1.5gu;
                          `}
                        >
                          <SyncStatus full />
                        </div>

                        <div
                          css={css`
                            display: flex;
                            gap: 2gu;
                            padding-top: 1.5gu;
                          `}
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
          )
      )}
    </Root>
  )
}

function Transactions() {
  return (
    <section
      css={css`
        position: absolute;
        inset: 6.75gu 2gu 20gu;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1.5gu;
        `}
      >
        <h1
          css={({ colors, fonts }) =>
            css`
              font-family: ${fonts.families.sans};
              font-size: 14px;
              color: ${colors.contentDimmed};
            `
          }
        >
          Recent transactions
        </h1>
        <ButtonText label="Clear all" />
      </div>
      <div
        css={({ colors }) => css`
          overflow-y: auto;
          width: 100%;
          display: grid;
          gap: 1gu;
          &:focus-visible {
            outline: 2px solid ${colors.focus};
          }
        `}
      >
        <Transaction
          action="Spectralized (mint & lock)"
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
          action="Spectralized (mint & lock)"
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
          css={({ colors }) =>
            css`
              color: ${colors.positive};
            `
          }
        />
      )
    }
    if (status === "error") {
      return (
        <IconX
          size={2.75 * gu}
          css={({ colors }) =>
            css`
              color: ${colors.negative};
            `
          }
        />
      )
    }
    return (
      <IconCheck
        size={2.75 * gu}
        css={({ colors }) =>
          css`
            color: ${colors.positive};
          `
        }
      />
    )
  })()

  return (
    <div
      css={({ colors }) => css`
        height: 10gu;
        background: ${colors.layer2};
      `}
    >
      <div
        css={css`
          display: flex;
          height: 100%;
        `}
      >
        <div
          css={css`
            padding: 2gu 0 0 2gu;
            width: 100%;
          `}
        >
          <div
            css={({ colors, fonts }) => css`
              padding-bottom: 0.75gu;
              text-transform: uppercase;
              font-family: ${fonts.families.sans};
              font-size: 12px;
              color: ${colors.contentDimmed};
            `}
          >
            {action}
          </div>
          <div
            css={({ fonts }) => css`
              font-family: ${fonts.families.sans};
              font-size: 14px;
            `}
          >
            <a
              href={url}
              css={css`
                text-decoration: underline;
              `}
            >
              {details}
            </a>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            width: 7gu;
            height: 100%;
            align-items: center;
            justify-content: center;
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
