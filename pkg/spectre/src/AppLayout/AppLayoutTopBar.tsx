import React, { ReactNode, useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import { a, useSpring, useTransition, SpringValue } from "react-spring"
import { Link, useLocation } from "wouter"
import {
  AddressBadge,
  Button,
  ButtonArea,
  FocusTrap,
  IconList,
  IconX,
  gu,
  springs,
} from "kit"
import { useLayout } from "../styles"
import { AccountWindow } from "../Account"
import { ConnectAccount } from "../ConnectAccount/ConnectAccount"
import { Menu } from "../Menu/Menu"
import { menuLinks } from "../content"
import { useAppReady } from "../App/AppReady"
import { useAppScroll } from "../App/AppScroll"
import { useEthereum } from "../Ethereum"

import logo from "./logo.png"

export function AppLayoutTopBar({
  compact,
  autoHideCompact,
}: {
  compact: boolean
  autoHideCompact: boolean
}) {
  return compact ? <TopBarCompact autoHide={autoHideCompact} /> : <TopBar />
}

export function TopBar() {
  const [_, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()
  const [connectAccountOpened, setConnectAccountOpened] = useState(false)
  const [accountOpened, setAccountOpened] = useState(false)
  const connectButtonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const { account } = useEthereum()
  const layout = useLayout()

  useEffect(() => {
    if (account) {
      setConnectAccountOpened(false)
    } else {
      setAccountOpened(false)
    }
  }, [account])

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
        css={css`
          position: relative;
          max-width: ${maxWidth}gu;
          height: ${height}gu;
          margin: 0 auto;
        `}
      >
        {appReadyTransition(
          ({ progress, topBarTransform }, ready) =>
            ready && (
              <a.div
                style={{ opacity: progress, transform: topBarTransform }}
                css={css`
                  position: absolute;
                  inset: 0;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  height: ${height}gu;
                  padding: 0 4gu;
                `}
              >
                <ul
                  css={({ colors }) => css`
                    display: flex;
                    list-style: none;
                    li {
                      padding-left: 4gu;
                    }
                    li:first-of-type {
                      padding: 0;
                    }
                    a {
                      color: ${colors.content};
                    }
                    a.active {
                      color: ${colors.accent};
                    }
                  `}
                >
                  {menuLinks.map(({ label, url }) => (
                    <li key={url}>
                      {url ? (
                        <a href={url}>{label}</a>
                      ) : (
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
                  css={css`
                    position: absolute;
                    inset: 50%;
                    transform: translate(-50%, -50%);
                    align-items: center;
                    height: 100%;
                    padding: 0 10px;
                    outline-offset: -2px;
                  `}
                >
                  <img
                    src={logo}
                    alt=""
                    width="64"
                    height="76"
                    css={css`
                      width: ${logoSize}gu;
                      height: auto;
                    `}
                  />
                </ButtonArea>
                <div>
                  {account ? (
                    <ButtonArea
                      title="Open Account"
                      onClick={() => setAccountOpened(true)}
                    >
                      <AddressBadge address={account} />
                    </ButtonArea>
                  ) : (
                    <Button
                      ref={connectButtonRef}
                      label="Connect account"
                      onClick={() => setConnectAccountOpened(true)}
                    />
                  )}
                </div>
              </a.div>
            )
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
  const [_, setLocation] = useLocation()
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
        css={css`
          position: relative;
          height: 8gu;
        `}
      >
        {appReadyTransition(
          ({ progress, topBarTransform }, ready) =>
            ready && (
              <a.div
                style={{ opacity: progress, transform: topBarTransform }}
                css={css`
                  position: absolute;
                  inset: auto 0 0;
                  height: 100%;
                `}
              >
                <a.div
                  style={{ transform: innerTransform }}
                  css={({ colors }) => css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 100%;
                    border-bottom: 1px solid ${colors.outline2};
                  `}
                >
                  <ButtonArea
                    title="Home"
                    onClick={() => setLocation("/")}
                    css={css`
                      align-items: center;
                      height: 100%;
                      padding: 0 10px;
                      outline-offset: -2px;
                    `}
                  >
                    <img src={logo} alt="" width="40.5" height="48" />
                  </ButtonArea>
                  <ButtonArea
                    title="Menu"
                    onClick={() => setMenuOpened((v) => !v)}
                    css={css`
                      position: relative;
                      align-items: center;
                      width: calc(4gu + 10px * 2);
                      height: 100%;
                      padding: 0 10px;
                      outline-offset: -2px;
                      &:active {
                        transform: translate(1px, 1px);
                      }
                    `}
                  >
                    {menuIconTransition((style, menuOpened) =>
                      menuOpened ? (
                        <MenuIcon style={style} icon={<IconX />} />
                      ) : (
                        <MenuIcon style={style} icon={<IconList />} />
                      )
                    )}
                  </ButtonArea>
                </a.div>
              </a.div>
            )
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
      css={css`
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      {icon}
    </a.div>
  )
}
