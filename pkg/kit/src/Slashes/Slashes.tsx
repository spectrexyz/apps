import { css } from "@emotion/react"

type SlashesProps = {
  color?: string
}

function slashSvgData(color: string): string {
  return (
    "data:image/svg+xml;utf8,"
    + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" fill="none">
        <path d="M0 11 3.875 1h.802L.802 11H0z" fill="${color}"/>
      </svg>`,
    )
  )
}

export function Slashes({ color }: SlashesProps): JSX.Element {
  return (
    <div
      css={({ colors }) =>
        css`
        width: 100%;
        height: 12px;
        background-image: url(${slashSvgData(color ?? colors.accent)});
        background-repeat: round;
      `}
    />
  )
}
