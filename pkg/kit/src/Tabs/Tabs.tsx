import { ReactNode, useCallback } from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import useDimensions from "react-cool-dimensions"
import { a, useSpring } from "react-spring"
import { ButtonArea } from "../ButtonArea"
import { gu, springs } from "../styles"

type TabItem = {
  label: ReactNode
  panelId: string
  tabId: string
}

type TabsProps = {
  align?: "center" | "start" | "end"
  bordered?: boolean
  fullWidth?: boolean
  items: TabItem[]
  onSelect: (index: number) => void
  selected: number
}

export function Tabs({
  align = "center",
  bordered = false,
  fullWidth = false,
  items,
  onSelect,
  selected,
}: TabsProps): JSX.Element {
  const container = useRef<HTMLDivElement>(null)
  const isFocused = useRef(false)
  const [selectedGeometry, setSelectedGeometry] = useState([0, 0])
  const tabsGeometries = useRef<Array<[number, number]>>([])
  const animateBar = useRef(false)

  const select = useCallback((index) => {
    onSelect(index)
    setSelectedGeometry(tabsGeometries.current[index])
    animateBar.current = true
  }, [onSelect])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFocused.current) {
        return
      }
      if (event.key === "ArrowRight") {
        select((selected + 1) % items.length)
        return
      }
      if (event.key === "ArrowLeft") {
        select(selected === 0 ? items.length - 1 : selected - 1)
        return
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [items, select, selected])

  useEffect(() => {
    if (!isFocused.current) {
      return
    }

    const selectedButton = container.current?.querySelector(
      "[tabindex=\"0\"]",
    ) as HTMLElement
    selectedButton?.focus()
  }, [selected])

  const justifyContent = useMemo(() => {
    if (align === "start") return "flex-start"
    if (align === "end") return "flex-end"
    return "center"
  }, [align])

  const barSpring = useSpring({
    config: springs.snappy,
    immediate: !animateBar.current,
    transform: `
      translateX(${selectedGeometry[0]}px)
      scaleX(${selectedGeometry[1] + 5 * gu * 2})
    `,
  })

  return (
    <div
      ref={container}
      role="tablist"
      css={({ colors }) => ({
        position: "relative",
        display: "flex",
        justifyContent: justifyContent,
        alignItems: "center",
        width: fullWidth ? "100%" : "auto",
        height: "calc(6gu + 2px)",
        paddingBottom: "2px",
        "&:after": {
          content: "\"\"",
          position: "absolute",
          zIndex: 1,
          inset: "auto 0 0 0",
          height: bordered ? 2 : 0,
          background: colors.layer2,
        },
      })}
    >
      <a.div
        style={{ transform: barSpring.transform }}
        css={({ colors }) => ({
          position: "absolute",
          zIndex: 2,
          inset: "auto auto 0 0",
          width: "1px",
          height: "2px",
          background: colors.accent2,
          transformOrigin: "0 0",
        })}
      />
      <div
        css={{
          display: "flex",
          alignItems: "center",
          width: fullWidth ? "100%" : "auto",
          height: "6gu",
        }}
        onFocus={() => {
          isFocused.current = true
        }}
        onBlur={() => {
          isFocused.current = false
        }}
      >
        {items.map((tabItem, index) => (
          <Tab
            key={tabItem.tabId}
            tabItem={tabItem}
            selected={index === selected}
            onSelect={() => {
              select(index)
            }}
            onGeometry={(left, width) => {
              tabsGeometries.current[index] = [left, width]
              if (index === selected) {
                setSelectedGeometry([left, width])
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

function Tab(
  {
    onSelect,
    onGeometry,
    selected,
    tabItem: { label, tabId, panelId },
  }: {
    onSelect: () => void
    onGeometry: (left: number, width: number) => void
    selected: boolean
    tabItem: TabItem
  },
) {
  const { entry, observe, width } = useDimensions()

  const _onGeometry = useRef(onGeometry)
  useEffect(() => {
    _onGeometry.current(
      (entry?.target as HTMLElement)?.offsetLeft ?? 0,
      width,
    )
  }, [entry, width])

  return (
    <ButtonArea
      ref={observe}
      aria-controls={panelId}
      aria-selected={selected}
      id={tabId}
      onClick={onSelect}
      role="tab"
      tabIndex={selected ? 0 : -1}
      css={({ colors }) => ({
        position: "relative",
        zIndex: 3,
        flex: "1 1 0",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "0 5gu",
        fontSize: "24px",
        fontWeight: selected ? "600" : "400",
        textTransform: "uppercase",
        color: selected ? colors.accent2 : colors.contentDimmed,
      })}
    >
      {label}
    </ButtonArea>
  )
}
