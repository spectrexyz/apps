import React, { useMemo } from "react"
import { css } from "@emotion/react"
import { useInView } from "react-cool-inview"
import { Button, Moire, TextInput, gu, theme, fonts } from "kit-legacy"
import { subscribeSection } from "./content.jsx"
import { useLayout } from "./styles.js"
import { useNetlifyForm } from "./netlify-form.js"

function useStyles() {
  const layout = useLayout()
  return useMemo(() => {
    if (layout.name === "small") {
      return {
        fonts: [28, 16],
        moireSize: 38 * gu,
        paddingTop: 28 * gu,
        spacingTop: 10 * gu,
        paddingBottom: 10 * gu,
        titleSpacing: 2 * gu,
        inputSpacing: 4 * gu,
      }
    }
    if (layout.name === "medium") {
      return {
        fonts: [44, 20],
        moireSize: 55 * gu,
        paddingTop: 0,
        spacingTop: 0,
        paddingBottom: 10 * gu,
        titleSpacing: 5 * gu,
        inputSpacing: 10 * gu,
      }
    }
    if (layout.name === "large") {
      return {
        fonts: [44, 20],
        moireSize: 60 * gu,
        paddingTop: 0,
        spacingTop: 0,
        paddingBottom: 15 * gu,
        titleSpacing: 5 * gu,
        inputSpacing: 10 * gu,
      }
    }
    return {
      fonts: [64, 24],
      moireSize: 90 * gu,
      paddingTop: 0,
      spacingTop: 0,
      paddingBottom: 22 * gu,
      titleSpacing: 5 * gu,
      inputSpacing: 10 * gu,
    }
  }, [layout])
}

export const Subscribe = React.memo(function Subscribe() {
  const { observe, inView } = useInView()
  const styles = useStyles()
  const layout = useLayout()
  const {
    email,
    errorMessage,
    handleEmailChange,
    handleSubmit,
    status,
  } = useNetlifyForm()

  return (
    <div
      ref={observe}
      id="subscribe"
      css={css`
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding-top: ${styles.spacingTop}px;
        padding-bottom: ${styles.paddingBottom}px;
        max-width: ${layout.content ? `${layout.content}px` : "unset"};
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: ${layout.name === "small" ? "auto" : `${styles.moireSize}px`};
          padding-top: ${styles.paddingTop}px;
        `}
      >
        <div
          css={css`
            position: relative;
            z-index: 2;
            width: ${layout.name === "small" ? "100%" : "50%"};
            text-align: ${layout.name === "small" ? "center" : "left"};
          `}
        >
          <h1
            css={css`
              padding-bottom: ${styles.titleSpacing}px;
              font-size: ${styles.fonts[0]}px;
              font-weight: 600;
              line-height: 1.2;
              color: #edfcff;
            `}
          >
            {subscribeSection.title}
          </h1>
          <p
            css={css`
              padding-bottom: ${styles.inputSpacing}px;
              font-family: ${fonts.families.sans};
              font-size: ${styles.fonts[1]}px;
              color: #fcfafa;
            `}
          >
            {subscribeSection.description}
          </p>

          {status === "success" ? (
            <p
              css={css`
                font-family: ${fonts.families.sans};
                font-size: ${styles.fonts[1]}px;
              `}
            >
              Thank you!
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                css={css`
                  position: relative;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    gap: 1.5gu;
                    width: 100%;
                  `}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <TextInput
                    disabled={status === "pending"}
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    css={css`
                      flex-grow: 1;
                    `}
                  />
                  <Button
                    disabled={status === "pending"}
                    type="submit"
                    mode="filled-alt"
                    label={status === "pending" ? "Sending…" : "Send"}
                    css={css`
                      width: 16gu;
                    `}
                  />
                </div>
                {status === "error" && (
                  <p
                    css={css`
                      position: absolute;
                      padding-top: 1gu;
                      bottom: -4gu;
                    `}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
        <Moire
          animate={inView}
          width={styles.moireSize}
          height={styles.moireSize}
          linesColor={theme.secondary}
          backgroundColor={theme.background}
          css={css`
            position: absolute;
            z-index: 1;
            top: 0;
            right: ${layout.name === "small" ? "50%" : "0"};
            transform: translateX(${layout.name === "small" ? "50%" : "0"});
            opacity: 0.65;
            overflow: hidden;
            border-radius: 50%;
          `}
        />
      </div>
    </div>
  )
})
