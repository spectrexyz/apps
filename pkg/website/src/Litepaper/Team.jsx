import React from "react"
import { css } from "@emotion/react"
import { theme, gu, fonts } from "kit-legacy"
import { useLayout } from "../styles.js"
import { team } from "../content.jsx"

import iconEmail from "./icons/email.svg"
import iconTwitter from "./icons/twitter.svg"
import iconUrl from "./icons/url.svg"

export function Team() {
  const layout = useLayout()
  return (
    <section
      css={css`
        display: grid;
        gap: 3.5gu;
        grid-template-columns: repeat(${layout.name === "small" ? 1 : 2}, 1fr);
        margin-top: 2gu;
        padding-bottom: 8gu;
      `}
    >
      {team.map(({ description, email, name, picture, twitter, web }) => (
        <div
          key={name}
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 3gu;
            background: ${theme.contrast + 'BE'};
          `}
        >
          <div>
            <div
              css={css`
                display: flex;
              `}
            >
              <div
                css={css`
                  overflow: hidden;
                  width: 8gu;
                  height: 8gu;
                  margin-right: 3gu;
                  border-radius: 50%;
                `}
              >
                <img src={picture} width={8 * gu} height={8 * gu} alt="" />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  justify-content: space-between;
                `}
              >
                <div
                  css={css`
                    font-size: 20px;
                  `}
                >
                  {name}
                </div>
                <div
                  css={css`
                    font-size: 18px;
                    font-family: ${fonts.families.mono};
                  `}
                >
                  <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noreferrer">
                    @{twitter}
                  </a>
                </div>
              </div>
            </div>
            <div
              css={css`
                padding-top: 4gu;
                line-height: 1.4;
                font-size: 16px;
                .nowrap {
                  white-space: nowrap;
                }
              `}
            >
              {description}
            </div>
          </div>
          <div
            css={css`
              display: flex;
              gap: 2gu;
              padding-top: 3gu;
            `}
          >
            {[
              [web, iconUrl, "Website"],
              [`mailto:${email}`, iconEmail, "Mail"],
              [`https://twitter.com/${twitter}`, iconTwitter, "Twitter"],
            ].map(
              ([url, icon, label]) =>
                url && (
                  <a href={url} target="_blank" key={url} rel="noreferrer">
                    <img src={icon} alt={label} />
                  </a>
                )
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
