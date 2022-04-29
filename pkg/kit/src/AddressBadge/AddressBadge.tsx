import { useCallback, useEffect, useRef, useState } from "react"
import { a, useTransition } from "react-spring"
import { ButtonIcon } from "../ButtonIcon"
import { EthIcon } from "../EthIcon"
import { IconArrowSquareOut, IconCopy } from "../icons"
import { gu, springs } from "../styles"
import { useTheme } from "../Theme"
import { shortenAddress } from "../utils"

type AddressBadgeProps = {
  address: string
  ensName?: string
  error?: boolean
  rounded?: boolean
  showCopy?: boolean
  showExplore?: boolean
  size?: "medium" | "large"
  transparent?: boolean
}

export function AddressBadge({
  address,
  ensName,
  error = false,
  rounded = false,
  showCopy = false,
  showExplore = false,
  size = "medium",
  transparent = false,
}: AddressBadgeProps): JSX.Element {
  let iconSize = rounded ? 3 * gu : 2.5 * gu
  if (size === "large") iconSize = 4 * gu
  const { colors } = useTheme()
  return (
    <div
      css={({ colors }) => ({
        display: "flex",
        alignItems: "center",
        height: "4gu",
        padding: transparent ? "0" : `0 1gu`,
        userSelect: "none",
        color: colors.accent,
        background: error
          ? colors.negative
          : transparent
          ? "none"
          : colors.layer1,
        borderRadius: rounded ? "10gu" : "0",
      })}
    >
      <div
        css={{
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          width: iconSize,
          height: iconSize,
          marginLeft: rounded ? "-0.5gu" : "0",
          marginRight: size === "large" ? "2gu" : "1.25gu",
          borderRadius: rounded ? "50%" : "0",
        }}
      >
        <EthIcon address={address} size={iconSize} />
      </div>
      <div
        title={address}
        css={({ fonts }) => ({
          fontFamily: fonts.mono,
          fontSize: size === "large" ? "24px" : "16px",
          whiteSpace: "nowrap",
        })}
      >
        {ensName ?? shortenAddress(address)}
      </div>
      {(showCopy || showExplore) && (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "0.5gu",
            paddingLeft: "1gu",
          }}
        >
          {showCopy && <ButtonCopy value={address} />}
          {showExplore && (
            <ButtonIcon
              external
              href={`https://etherscan.io/address/${address}`}
              icon={<IconArrowSquareOut color={colors.contentDimmed} />}
              label="See on Etherscan"
              size="small"
            />
          )}
        </div>
      )}
    </div>
  )
}

function ButtonCopy({ value }: { value: string }) {
  const { colors } = useTheme()
  const [showIndicator, setShowIndicator] = useState(false)

  const indicatorTimer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (indicatorTimer.current !== undefined) {
        clearTimeout(indicatorTimer.current)
      }
    }
  }, [showIndicator])

  const indicatorAnim = useTransition(showIndicator, {
    config: springs.swift,
    from: { progress: 0 },
    enter: { progress: 1 },
    leave: { progress: 0 },
    onRest() {
      if (indicatorTimer.current !== undefined) {
        clearTimeout(indicatorTimer.current)
      }
      indicatorTimer.current = setTimeout(() => {
        setShowIndicator(false)
      }, 500)
    },
  })

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setShowIndicator(true)
    } catch (err) {
      // TODO
    }
  }, [value])

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ButtonIcon
        icon={<IconCopy color={colors.contentDimmed} />}
        label="Copy"
        size="small"
        onClick={copy}
      />
      {indicatorAnim(({ progress }, show) =>
        show && (
          <a.div
            style={{
              opacity: progress,
              transform: progress.to([0, 1], [0.9, 1]).to((scale) => `
                translate(-50%, -50%)
                scale(${scale})
              `),
            }}
            css={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "0.25gu 0.5gu",
              fontSize: "14px",
              textTransform: "uppercase",
              background: colors.background,
            }}
          >
            Copied
          </a.div>
        )
      )}
    </div>
  )
}
