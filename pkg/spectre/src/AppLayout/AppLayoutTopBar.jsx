import { useState } from "react"
import { css } from "@emotion/react"
import { a, useSpring, useTransition } from "react-spring"
import { Link, useLocation } from "wouter"
import {
  Button,
  ButtonArea,
  FocusTrap,
  IconList,
  IconX,
  gu,
  springs,
} from "kit"
import { menuLinks } from "../content.jsx"
import { Menu } from "../Menu/Menu.jsx"
import { useAppReady } from "../App/AppReady.jsx"
import { useAppScroll } from "../App/AppScroll.jsx"

import logo from "./logo.png"

export function AppLayoutTopBar({ compact }) {
  return compact ? <TopBarCompact /> : <TopBarLarge />
}

export function TopBarLarge() {
  const [_, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()
  return (
    <div
      css={css`
        position: relative;
        max-width: calc(160gu + 4gu * 2);
        height: 16gu;
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
                inset: 3gu 0 3gu;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 10gu;
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
                <img src={logo} alt="" width="64" height="76" />
              </ButtonArea>
              <div>
                <Button
                  label="Connect account"
                  onClick={() => {}}
                />
              </div>
            </a.div>
          )
      )}
    </div>
  )
}

export function TopBarCompact() {
  const [_, setLocation] = useLocation()
  const { appReadyTransition } = useAppReady()

  const [hide, setHide] = useState(false)
  useAppScroll((scroll) => {
    setHide(scroll > 2 * gu)
  })

  const { innerTransform } = useSpring({
    config: springs.appear,
    innerTransform: hide ? "translate3d(0, -100%, 0)" : "translate3d(0, 0%, 0)",
  })

  const [menuOpened, setMenuOpened] = useState(null) // null is used to detect the initial value
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

function MenuIcon({ icon, style }) {
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
