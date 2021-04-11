/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { useBaseUrl } from "../BaseUrl"

type MoireProps = {
  className?: string
  height?: number
  width?: number
}

export function Moire({ width = 1, height = 1, className }: MoireProps) {
  const moire = useMoireBackground()
  return (
    <div
      className={className}
      css={css`
        width: ${width}gu;
        height: ${height}gu;
        background: url(${moire.url});
      `}
    />
  )
}

export function useMoireBackground() {
  return {
    url: useBaseUrl("Moire/moire.svg"),
    width: 600,
    height: 570,
  }
}
