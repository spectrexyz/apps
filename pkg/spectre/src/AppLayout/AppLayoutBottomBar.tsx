import React, { useEffect, useState, ReactNode } from "react"
import { css } from "@emotion/react"
import { useAccount } from "wagmi"
import { a, useTransition } from "react-spring"
import { AddressBadge, Button, ButtonArea, springs, noop } from "kit"
import { AccountDrawer } from "../StatusBar/AccountDrawer"
import { Actions } from "../Actions/Actions"
import { ConnectAccount } from "../ConnectAccount/ConnectAccount"
import { SyncStatus } from "../SyncStatus"
import { useAppReady } from "../App/AppReady"
import { useLayout } from "../styles"

export function AppLayoutBottomBar({ compact }: { compact: boolean }) {
  return compact ? <BottomBarCompact /> : <BottomBar />
}

function BottomBar() {
  const { appReadyTransition } = useAppReady()
  const layout = useLayout()

  const maxWidth = layout.value({
    small: 0,
    large: 104 + 4 * 2,
    xlarge: 160 + 4 * 2,
  })

  return (
    <div
      css={css`
        position: relative;
        max-width: ${maxWidth}gu;
        height: 14gu;
        padding: 5gu 0;
        margin: 0 auto;
      `}
    >
      {appReadyTransition(
        ({ progress: appReadyProgress, bottomBarTransform }, ready) => {
          if (!ready) {
            return false
          }
          return (
            <a.div
              style={{
                opacity: appReadyProgress,
                transform: bottomBarTransform,
              }}
              css={css`
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 4gu;
                padding: 0 4gu;
              `}
            >
              <div>
                <SyncStatus />
              </div>
              <Actions />
            </a.div>
          )
        }
      )}
    </div>
  )
}

function BottomBarCompact() {
  const [connectAccountOpened, setConnectAccountOpened] = useState(false)
  const [drawerOpened, setDrawerOpened] = useState(false)
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true })
  const { appReadyTransition } = useAppReady()

  const address = accountData?.address
  const ensName = accountData?.ens?.name

  useEffect(() => {
    if (address) {
      setConnectAccountOpened(false)
    }
  }, [address])

  const drawerSpringConfig = springs.appear

  const drawerTransition = useTransition(drawerOpened, {
    config: drawerSpringConfig,
    from: { progress: 0 },
    enter: { progress: 1 },
    leave: { progress: 0 },
  })

  return (
    <>
      <div
        css={css`
          position: relative;
          height: 8gu;
          z-index: 2;
          overflow: hidden;
        `}
      >
        {appReadyTransition(
          ({ progress: appReadyProgress, bottomBarTransform }, ready) => {
            if (!ready) {
              return false
            }
            return (
              <a.div
                css={({ colors }) => css`
                  position: relative;
                  z-index: 2;
                  display: flex;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  background: ${colors.background};
                  border-top: 1px solid ${colors.outline2};
                `}
                style={{
                  opacity: appReadyProgress,
                  transform: bottomBarTransform,
                }}
              >
                <AccountDrawer
                  onClose={() => setDrawerOpened(false)}
                  opened={drawerOpened}
                  transition={drawerTransition}
                />

                <BarArea
                  address={address}
                  ensName={ensName}
                  drawerOpened={drawerOpened}
                  onOpenDrawer={() => setDrawerOpened(true)}
                  onConnect={() => setConnectAccountOpened(true)}
                  onDisconnect={() => {
                    setDrawerOpened(false)
                    setConnectAccountOpened(false)
                    disconnect()
                  }}
                />
              </a.div>
            )
          }
        )}
      </div>
      <ConnectAccount
        visible={connectAccountOpened}
        onClose={() => setConnectAccountOpened(false)}
      />
    </>
  )
}

// The bar area is always visible, at the bottom
function BarArea({
  address,
  drawerOpened,
  ensName,
  onConnect,
  onDisconnect,
  onOpenDrawer,
}: {
  address?: string
  drawerOpened: boolean
  ensName?: string
  onConnect: () => void
  onDisconnect: () => void
  onOpenDrawer: () => void
}) {
  return (
    <a.div
      css={({ colors }) => css`
        overflow: hidden;
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background: ${colors.background};
      `}
    >
      <ButtonBar
        onClick={(address && !drawerOpened && onOpenDrawer) || noop}
        start={() =>
          address ? (
            <AddressBadge address={address} ensName={ensName} />
          ) : (
            <Button label="Connect account" onClick={onConnect} size="small" />
          )
        }
        end={() => {
          if (!address) {
            return <Actions />
          }
          if (drawerOpened) {
            return (
              <Button
                label="Disconnect"
                mode="flat"
                onClick={onDisconnect}
                size="small"
              />
            )
          }
          return <SyncStatus />
        }}
      />
    </a.div>
  )
}

function ButtonBar({
  end,
  onClick,
  start,
}: {
  end: ReactNode
  onClick: () => void
  start: ReactNode
}) {
  if (typeof start === "function") start = start()
  if (typeof end === "function") end = end()
  return onClick ? (
    <ButtonArea
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 2gu;
        outline-offset: -2px;
      `}
    >
      {start}
      {end}
    </ButtonArea>
  ) : (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 2gu;
      `}
    >
      {start}
      {end}
    </div>
  )
}
