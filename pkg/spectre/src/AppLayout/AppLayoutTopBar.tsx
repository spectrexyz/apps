import type { ReactNode } from "react"
import type { SpringValue } from "react-spring"

import {
  AddressBadge,
  Button,
  ButtonArea,
  FocusTrap,
  gu,
  IconList,
  IconX,
  springs,
} from "moire"
import { useEffect, useRef, useState } from "react"
import { a, useSpring, useTransition } from "react-spring"
import { useAccount, useEnsName } from "wagmi"
import { Link, useLocation } from "wouter"
import { AccountWindow } from "../Account"
import { useAppReady } from "../App/AppReady"
import { useAppScroll } from "../App/AppScroll"
import { ConnectAccount } from "../ConnectAccount/ConnectAccount"
import { menuLinks } from "../content"
import { Menu } from "../Menu/Menu"
import { useLayout } from "../styles"

import logo from "./logo.png"

export function AppLayoutTopBar({
  compact,
  autoHideCompact,
}: {
  compact: boolean
  autoHideCompact: boolean
}) {
  return compact
    ? <TopBarCompact autoHide={autoHideCompact} />
    : <TopBar />
}

export function TopBar() {
  const [, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()
  const [connectAccountOpened, setConnectAccountOpened] = useState(false)
  const [accountOpened, setAccountOpened] = useState(false)
  const connectButtonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const layout = useLayout()

  useEffect(() => {
    if (address) {
      setConnectAccountOpened(false)
    } else {
      setAccountOpened(false)
    }
  }, [address])

  const maxWidth = layout.value({
    small: 0,
    large: 104 + 4 * 2,
    xlarge: 160 + 4 * 2,
  })
  const height = layout.value({
    small: 0,
    large: 14,
    xlarge: 16,
  })
  const logoSize = layout.value({
    small: 0,
    large: 6,
    xlarge: 7,
  })

  return (
    <>
      <div
        css={{
          position: "relative",
          maxWidth: `${maxWidth}gu`,
          height: `${height}gu`,
          margin: "0 auto",
        }}
      >
        {appReadyTransition(
          ({ progress, topBarTransform }, ready) =>
            ready && (
              <a.div
                style={{ opacity: progress, transform: topBarTransform }}
                css={{
                  position: "absolute",
                  inset: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: `${height}gu`,
                  padding: "0 4gu",
                }}
              >
                <ul
                  css={({ colors }) => ({
                    display: "flex",
                    listStyle: "none",
                    "li": {
                      paddingLeft: "4gu",
                    },
                    "li:first-of-type": {
                      padding: "0",
                    },
                    "a": {
                      color: colors.content,
                    },
                    "a.active": {
                      color: colors.accent,
                    },
                  })}
                >
                  {menuLinks.map(({ label, url }) => (
                    <li key={url}>
                      {url
                        ? <a href={url}>{label}</a>
                        : (
                          <Link href="/" className="active">
                            {label}
                          </Link>
                        )}
                    </li>
                  ))}
                </ul>
                <ButtonArea
                  title="Home"
                  onClick={() => setLocation("/")}
                  css={{
                    position: "absolute",
                    inset: "50%",
                    transform: "translate(-50%, -50%)",
                    alignItems: "center",
                    height: "100%",
                    padding: "0 10px",
                    outlineOffset: "-2px",
                  }}
                >
                  <img
                    src={logo}
                    alt=""
                    width="64"
                    height="76"
                    css={{
                      width: `${logoSize}gu`,
                      height: "auto",
                    }}
                  />
                </ButtonArea>
                <div>
                  {address
                    ? (
                      <ButtonArea
                        title="Open Account"
                        onClick={() => setAccountOpened(true)}
                      >
                        <AddressBadge address={address} ensName={ensName} />
                      </ButtonArea>
                    )
                    : (
                      <Button
                        ref={connectButtonRef}
                        label="Connect account"
                        onClick={() => setConnectAccountOpened(true)}
                      />
                    )}
                </div>
              </a.div>
            ),
        )}
      </div>
      <ConnectAccount
        opener={connectButtonRef}
        visible={connectAccountOpened}
        onClose={() => setConnectAccountOpened(false)}
      />
      <AccountWindow
        visible={accountOpened}
        onClose={() => setAccountOpened(false)}
      />
    </>
  )
}

export function TopBarCompact({ autoHide }: { autoHide: boolean }) {
  const [, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()

  const [shouldHide, setShouldHide] = useState(false)
  useAppScroll((scroll) => {
    setShouldHide(scroll > 2 * gu)
  })
  const hide = shouldHide && autoHide

  const { innerTransform } = useSpring({
    config: springs.appear,
    innerTransform: hide ? "translate3d(0, -100%, 0)" : "translate3d(0, 0%, 0)",
  })

  const [menuOpened, setMenuOpened] = useState<boolean | null>(null) // null is used to detect the initial value
  const menuIconTransition = useTransition(Boolean(menuOpened), {
    config: springs.appear,
    from: {
      opacity: 0,
      transform: `rotate(${
        menuOpened === null ? 0 : 90 * (menuOpened ? -1 : 1)
      }deg)`,
    },
    enter: { opacity: 1, transform: "rotate(0deg)" },
    leave: {
      opacity: 0,
      transform: menuOpened ? "rotate(90deg)" : "rotate(-90deg)",
    },
  })

  return (
    <FocusTrap
      active={Boolean(menuOpened)}
      focusTrapOptions={{
        onDeactivate() {
          setMenuOpened(false)
        },
      }}
    >
      <div
        css={{
          position: "relative",
          height: "8gu",
        }}
      >
        {appReadyTransition(
          ({ progress, topBarTransform }, ready) =>
            ready && (
              <a.div
                style={{ opacity: progress, transform: topBarTransform }}
                css={{
                  position: "absolute",
                  inset: "auto 0 0",
                  height: "100%",
                }}
              >
                <a.div
                  style={{ transform: innerTransform }}
                  css={({ colors }) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    background: colors.background,
                    borderBottom: `1px solid ${colors.outline2}`,
                  })}
                >
                  <ButtonArea
                    title="Home"
                    onClick={() => setLocation("/")}
                    css={{
                      alignItems: "center",
                      height: "100%",
                      padding: "0 10px",
                      outlineOffset: "-2px",
                    }}
                  >
                    <img src={logo} alt="" width="40.5" height="48" />
                  </ButtonArea>
                  <ButtonArea
                    title="Menu"
                    onClick={() => setMenuOpened((v) => !v)}
                    css={{
                      position: "relative",
                      alignItems: "center",
                      width: "calc(4gu + 10px * 2)",
                      height: "100%",
                      padding: "0 10px",
                      outlineOffset: "-2px",
                      "&:active": {
                        transform: "translate(1px, 1px)",
                      },
                    }}
                  >
                    {menuIconTransition((style, menuOpened) =>
                      menuOpened
                        ? <MenuIcon style={style} icon={<IconX />} />
                        : <MenuIcon style={style} icon={<IconList />} />
                    )}
                  </ButtonArea>
                </a.div>
              </a.div>
            ),
        )}
        <Menu opened={Boolean(menuOpened)} />
      </div>
    </FocusTrap>
  )
}

function MenuIcon({
  icon,
  style,
}: {
  icon: ReactNode
  style: Record<string, SpringValue>
}) {
  return (
    <a.div
      style={style}
      css={{
        position: "absolute",
        inset: "0",
        display: "grid",
        placeItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {icon}
    </a.div>
  )
}
