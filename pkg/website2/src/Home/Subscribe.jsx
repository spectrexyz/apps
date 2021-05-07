import React from "react"
import { css } from "@emotion/react"
import useInView from "react-cool-inview"
import { Button, GLMoire, TextInput, gu, theme, fonts } from "uikit"
import { subscribeSection } from "../content.js"

export function Subscribe() {
  const { observe, inView } = useInView()
  return (
    <div
      ref={observe}
      id="subscribe"
      css={css`
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding-bottom: 32gu;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 145gu;
          height: 90gu;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            position: relative;
            z-index: 2;
            width: 65gu;
          `}
        >
          <h1
            css={css`
              padding-bottom: 5gu;
              font-size: ${fonts.sizes.xxlarge};
              font-weight: 600;
              line-height: 1.2;
            `}
          >
            {subscribeSection.title}
          </h1>
          <p
            css={css`
              padding-bottom: 10gu;
              font-family: ${fonts.families.sans};
              font-size: ${fonts.sizes.largeSans};
            `}
          >
            {subscribeSection.description}
          </p>

          <form>
            <div
              css={css`
                display: flex;
                gap: 1.5gu;
                width: 100%;
              `}
            >
              <TextInput
                value="your@email.com"
                onChange={() => {}}
                css={css`
                  flex-grow: 1;
                `}
              />
              <Button
                mode="filled-alt"
                label="Send"
                css={css`
                  width: 16gu;
                `}
              />
            </div>
          </form>
        </div>
        <GLMoire
          animate={inView}
          width={90 * gu}
          height={90 * gu}
          linesColor={theme.secondary}
          backgroundColor={theme.background}
          css={css`
            position: absolute;
            z-index: 1;
            top: 0;
            right: 0;
            overflow: hidden;
            border-radius: 50%;
          `}
        />
      </div>
    </div>
  )
}
