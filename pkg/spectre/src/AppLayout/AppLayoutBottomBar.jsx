import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { AddressBadge, Button, ButtonArea, springs } from "kit"
import { a, useSpring, useTransition } from "react-spring"
import { useEthereum } from "../Ethereum"
import { ConnectAccount } from "../ConnectAccount/ConnectAccount.jsx"
import { AccountDrawer } from "../StatusBar/AccountDrawer.jsx"
import { SyncStatus } from "../SyncStatus"
import { Actions } from "../Actions/Actions.jsx"
import { useAppReady } from "../App/AppReady.jsx"

export function AppLayoutBottomBar({ compact }) {
  return compact ? <BottomBarCompact /> : <BottomBarLarge />
}

function BottomBarLarge() {
  const { appReadyTransition } = useAppReady()
  return (
    <div
      css={css`
        position: relative;
        max-width: 160gu;
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
  const { account, wallet, disconnect } = useEthereum()
  const { appReadyTransition } = useAppReady()

  useEffect(() => {
    if (account) {
      setConnectAccountOpened(false)
    }
  }, [account])

  const drawerSpringConfig = springs.appear
  // const drawerSpringConfig = { mass: 1, tension: 10, friction: 40 }

  const drawerTransition = useTransition(drawerOpened, {
    config: drawerSpringConfig,
    from: { progress: 0 },
    enter: { progress: 1 },
    leave: { progress: 0 },
  })

  const { progress: drawerProgress } = useSpring({
    config: drawerSpringConfig,
    to: { progress: Number(drawerOpened) },
  })

  return (
    <>
      <div
        css={({ colors }) => css`
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
                  account={account}
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
  account,
  drawerOpened,
  onConnect,
  onDisconnect,
  onOpenDrawer,
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
        onClick={account && !drawerOpened && onOpenDrawer}
        start={() =>
          account ? (
            <AddressBadge address={account} />
          ) : (
            <Button label="Connect account" onClick={onConnect} size="small" />
          )
        }
        end={() => {
          if (!account) {
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

function ButtonBar({ end, onClick, start }) {
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
