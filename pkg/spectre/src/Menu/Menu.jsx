import { css } from "@emotion/react"
import { a, useTransition } from "react-spring"
import { springs } from "kit"
import { menuLinks } from "../content.jsx"

export function Menu({ opened }) {
  const openTransition = useTransition(opened, {
    config: springs.appear,
    from: { opacity: 0, transform: "scale3d(1.1, 1.1, 1)" },
    enter: { opacity: 1, transform: "scale3d(1, 1, 1)" },
    leave: { opacity: 0, transform: "scale3d(1.1, 1.1, 1)" },
  })

  return openTransition(
    ({ opacity, transform }, opened) =>
      opened && (
        <a.div
          style={{ opacity }}
          css={({ colors }) => css`
            position: fixed;
            z-index: 3;
            inset: 8gu 0 0;
            background: ${colors.background};
          `}
        >
          <a.nav
            style={{ transform }}
            css={({ colors }) => css`
              position: absolute;
              z-index: 2;
              inset: 0;
            `}
          >
            <ul
              css={({ colors, fonts }) => css`
                margin: 0;
                padding: 5gu 0 0 3gu;
                list-style: none;
                li {
                  padding-bottom: 2gu;
                  font-family: ${fonts.families.mono};
                  font-size: 32px;
                }
                a {
                  color: ${colors.content};
                }
              `}
            >
              {menuLinks.map(({ label, url }) => (
                <li key={url}>
                  <a href={url}>{label}</a>
                </li>
              ))}
            </ul>
          </a.nav>
        </a.div>
      )
  )
}
