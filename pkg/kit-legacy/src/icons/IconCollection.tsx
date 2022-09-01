import { gu } from "../styles"

export function IconCollection({ size = 6 * gu, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      css={{ display: "block" }}
    >
      <rect x="12" y="30" width="6" height="6" fill={color} />
      <rect x="12" y="21" width="6" height="6" fill={color} />
      <rect x="12" y="12" width="6" height="6" fill={color} />
      <rect x="21" y="30" width="6" height="6" fill={color} />
      <rect x="21" y="21" width="6" height="6" fill={color} />
      <rect x="21" y="12" width="6" height="6" fill={color} />
      <rect x="30" y="30" width="6" height="6" fill={color} />
      <rect x="30" y="21" width="6" height="6" fill={color} />
      <rect x="30" y="12" width="6" height="6" fill={color} />
    </svg>
  )
}
