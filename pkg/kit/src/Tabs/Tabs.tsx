import { ReactNode } from "react"

import { useEffect, useRef, useState } from "react"
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
  fullWidth?: boolean
  items: TabItem[]
  onSelect: (index: number) => void
  selected: number
}

export function Tabs({
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

  selected = Math.min(Math.max(0, selected), items.length - 1)

  useEffect(() => {
    setSelectedGeometry(tabsGeometries.current[selected])
    animateBar.current = true
  }, [selected])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFocused.current) return
      if (event.key === "ArrowRight") {
        onSelect((selected + 1) % items.length)
        return
      }
      if (event.key === "ArrowLeft") {
        onSelect(selected === 0 ? items.length - 1 : selected - 1)
        return
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [items, onSelect, selected])

  useEffect(() => {
    if (!isFocused.current) return
    const selectedButton = container.current?.querySelector(
      "[tabindex=\"0\"]",
    ) as HTMLElement
    selectedButton?.focus()
  }, [selected])

  const barSpring = useSpring({
    config: springs.snappy,
    immediate: !animateBar.current,
    transform: `
      translateX(${selectedGeometry[0]}px)
      scaleX(${selectedGeometry[1]})
    `,
  })

  return (
    <div
      ref={container}
      role="tablist"
      css={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: fullWidth ? "100%" : "auto",
        height: "6gu",
      }}
    >
      <div
        css={{
          position: "relative",
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
            fullWidth={fullWidth}
            onGeometry={(left, width) => {
              tabsGeometries.current[index] = [left, width]
              if (index === selected) setSelectedGeometry([left, width])
            }}
            onSelect={() => {
              onSelect(index)
            }}
            selected={index === selected}
            tabItem={tabItem}
          />
        ))}
        <a.div
          style={{ transform: barSpring.transform }}
          css={({ colors }) => ({
            position: "absolute",
            inset: "100% auto auto 0",
            zIndex: 2,
            width: "1px",
            height: "0",
            borderBottom: `2px solid ${colors.accent2}`,
            transformOrigin: "0 0",
          })}
        />
      </div>
      <div
        css={({ colors }) => ({
          position: "absolute",
          inset: "100% 0 auto 0",
          zIndex: 1,
          height: "0",
          borderBottom: `2px solid ${colors.layer2}`,
        })}
      />
    </div>
  )
}

function Tab(
  {
    fullWidth,
    onSelect,
    onGeometry,
    selected,
    tabItem: { label, tabId, panelId },
  }: {
    fullWidth: boolean
    onSelect: () => void
    onGeometry: (left: number, width: number) => void
    selected: boolean
    tabItem: TabItem
  },
) {
  const { entry, observe, width } = useDimensions({ useBorderBoxSize: true })

  const offsetLeft = (entry?.target as HTMLElement)?.offsetLeft ?? 0

  const _onGeometry = useRef(onGeometry)
  useEffect(() => {
    _onGeometry.current(offsetLeft, width)
  }, [offsetLeft, width])

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
        padding: fullWidth ? "0 1gu" : "0 5gu",
        fontSize: "24px",
        fontWeight: selected ? "600" : "400",
        textTransform: "uppercase",
        color: selected ? colors.accent2 : colors.contentDimmed,
        "&:active": {
          color: colors.accent2,
        },
      })}
    >
      {label}
    </ButtonArea>
  )
}
