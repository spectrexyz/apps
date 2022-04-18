import { AddressBadge, Button, ButtonArea, noop, springs } from "kit"
import { ReactNode, useEffect, useState } from "react"
import { a, useTransition } from "react-spring"
import { useAccount } from "wagmi"
import { Actions } from "../Actions/Actions"
import { useAppReady } from "../App/AppReady"
import { ConnectAccount } from "../ConnectAccount/ConnectAccount"
import { AccountDrawer } from "../StatusBar/AccountDrawer"
import { useLayout } from "../styles"
import { SyncStatus } from "../SyncStatus"

export function AppLayoutBottomBar({ compact }: { compact: boolean }) {
  return compact ? <BottomBarCompact /> : <BottomBar />
}

function BottomBar() {
  const { appReadyTransition } = useAppReady()
  const layout = useLayout()

  const maxWidth = layout.value({
    small: "0",
    large: `${104 + 4 * 2}gu`,
    xlarge: `${160 + 4 * 2}gu`,
  })

  return (
    <div
      css={{
        position: "relative",
        maxWidth,
        height: "14gu",
        padding: "5gu 0",
        margin: "0 auto",
      }}
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
              css={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                height: "4gu",
                padding: "0 4gu",
              }}
            >
              <div>
                <SyncStatus />
              </div>
              <Actions />
            </a.div>
          )
        },
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
        css={{
          position: "relative",
          height: "8gu",
          zIndex: "2",
          overflow: "hidden",
        }}
      >
        {appReadyTransition(
          ({ progress: appReadyProgress, bottomBarTransform }, ready) => {
            if (!ready) {
              return false
            }
            return (
              <a.div
                css={({ colors }) => ({
                  position: "relative",
                  zIndex: "2",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  background: colors.background,
                  borderTop: `1px solid ${colors.outline2}`,
                })}
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
          },
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
      css={({ colors }) => ({
        overflow: "hidden",
        position: "relative",
        zIndex: "2",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background: colors.background,
      })}
    >
      <ButtonBar
        onClick={(address && !drawerOpened && onOpenDrawer) || noop}
        start={() =>
          address
            ? <AddressBadge address={address} ensName={ensName} />
            : (
              <Button
                label="Connect account"
                onClick={onConnect}
                size="small"
              />
            )}
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
  end: ReactNode | (() => ReactNode)
  onClick: () => void
  start: ReactNode | (() => ReactNode)
}) {
  if (typeof start === "function") start = start()
  if (typeof end === "function") end = end()
  return onClick
    ? (
      <ButtonArea
        onClick={onClick}
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "0 2gu",
          outlineOffset: "-2px",
        }}
      >
        {start}
        {end}
      </ButtonArea>
    )
    : (
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "0 2gu",
        }}
      >
        {start}
        {end}
      </div>
    )
}
