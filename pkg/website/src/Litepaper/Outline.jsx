import React from "react"
import { css } from "@emotion/react"
import { fonts, theme, gu } from "uikit"
import { useLayout } from "../styles.js"
import { kebabCase } from "../utils.js"

export function Outline({ items }) {
  const layout = useLayout()
  if (layout.name === "small") {
    return null
  }
  return (
    <div
      css={css`
        flex-shrink: 0;
      `}
    >
      <ul
        css={css`
          position: ${layout.name === "xlarge" ? "sticky" : "static"};
          top: 1.5gu;
          flex-shrink: 0;
          display: grid;
          grid-template-columns: ${layout.name === "xlarge"
            ? "repeat(1, 100%)"
            : "repeat(2, 50%)"};
          gap: 1.5gu;
          width: ${layout.name === "xlarge" ? `${33 * gu}px` : "100%"};
          font-family: ${fonts.families.mono};
          font-size: ${fonts.sizes.normalMono};
          padding-bottom: ${layout.name === "xlarge" ? `0` : css`6gu`};
          li {
            list-style: none;
          }
          li a {
            width: ${layout.name === "xlarge" ? "auto" : "100%"};
          }
        `}
      >
        {items.map((label) => (
          <Item key={label} label={label} id={kebabCase(label)} />
        ))}
      </ul>
    </div>
  )
}

function Item({ id, label }) {
  return (
    <li>
      <a
        href={`#${id}`}
        css={css`
          display: inline-flex;
          align-items: center;
          height: 5gu;
          padding: 0 2.5gu;
          color: ${theme.content};
          background: ${theme.contrast};
        `}
      >
        <span
          css={css`
            &:before {
              content: "» ";
            }
          `}
        >
          {label}
        </span>
      </a>
    </li>
  )
}
