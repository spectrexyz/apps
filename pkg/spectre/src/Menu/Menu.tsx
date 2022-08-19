import { springs } from "moire"
import { a, useTransition } from "react-spring"
import { menuLinks } from "../content"

export function Menu({ opened }: { opened: boolean }) {
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
          css={({ colors }) => ({
            position: "fixed",
            zIndex: "3",
            inset: "8gu 0 0",
            background: colors.background,
          })}
        >
          <a.nav
            style={{ transform }}
            css={{
              position: "absolute",
              zIndex: "2",
              inset: "0",
            }}
          >
            <ul
              css={({ colors, fonts }) => ({
                margin: "0",
                padding: "5gu 0 0 3gu",
                listStyle: "none",
                "li": {
                  paddingBottom: "2gu",
                  fontFamily: fonts.mono,
                  fontSize: "32px",
                },
                "a": {
                  color: colors.content,
                },
              })}
            >
              {menuLinks.map(({ label, url }) => (
                <li key={url}>{url && <a href={url}>{label}</a>}</li>
              ))}
            </ul>
          </a.nav>
        </a.div>
      ),
  )
}
