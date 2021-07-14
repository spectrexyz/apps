/** @jsx jsx */
import type { ReactNode } from "react"

import { useEffect, useRef } from "react"
import { jsx, css } from "@emotion/react"
import { ButtonArea } from "../ButtonArea"
import { KEY_LEFT, KEY_RIGHT } from "../keys"

type TabItem = {
  label: ReactNode
  panelId: string
  tabId: string
}

type TabsProps = {
  items: TabItem[]
  onSelect: (index: number) => void
  selected: number
}

export function Tabs({ items, selected, onSelect }: TabsProps): JSX.Element {
  const container = useRef<HTMLDivElement>(null)
  const isFocused = useRef(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFocused.current) {
        return
      }
      if (event.keyCode === KEY_RIGHT) {
        onSelect((selected + 1) % items.length)
        return
      }
      if (event.keyCode === KEY_LEFT) {
        onSelect(selected === 0 ? items.length - 1 : selected - 1)
        return
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [items, selected])

  useEffect(() => {
    if (!isFocused.current) {
      return
    }

    const selectedButton = container.current?.querySelector(
      '[tabindex="0"]'
    ) as HTMLElement
    selectedButton?.focus()
  }, [selected])

  return (
    <div
      ref={container}
      role="tablist"
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 5gu;
      `}
    >
      <div
        css={({ colors }) => css`
          display: flex;
          align-items: center;
          height: 100%;
          color: ${colors.accent};
          background: ${colors.background};
          border: 1px solid ${colors.accent};
          .selected {
            color: ${colors.accentContent};
            background: ${colors.accent};
          }
        `}
        onFocus={() => {
          isFocused.current = true
        }}
        onBlur={() => {
          isFocused.current = false
        }}
      >
        {items.map(({ label, panelId, tabId }, index) => (
          <ButtonArea
            key={tabId}
            aria-controls={panelId}
            aria-selected={selected === index}
            className={selected === index ? "selected" : ""}
            id={tabId}
            onClick={() => onSelect(index)}
            role="tab"
            tabIndex={selected === index ? 0 : -1}
            css={({ colors }) => css`
              align-items: center;
              height: 100%;
              padding: 0 4gu;
              border-left: 1px solid ${colors.accent};
              &:first-of-type {
                border-left: 0;
              }
            `}
          >
            {label}
          </ButtonArea>
        ))}
      </div>
    </div>
  )
}
