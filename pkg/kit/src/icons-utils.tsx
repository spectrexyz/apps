import {
  useInsideButton,
  ICON_SIZE_DEFAULT as BUTTON_ICON_SIZE_DEFAULT,
  ICON_SIZE_DEFAULT_SMALL as BUTTON_ICON_SIZE_DEFAULT_SMALL,
  ICON_SIZE_DEFAULT_COMPACT as BUTTON_ICON_SIZE_DEFAULT_COMPACT,
} from "./Button"
import {
  useInsideButtonText,
  ICON_SIZE_DEFAULT as BUTTON_TEXT_ICON_SIZE_DEFAULT,
} from "./ButtonText"
import { useButtonIconIconSize } from "./ButtonIcon"
import { useInfoTitleIconColor, useInfoTitleIconSize } from "./Info"
import { gu } from "./styles"

export function useIconSize(size?: number): number {
  const isInsideButton = useInsideButton()

  const isInsideButtonText = useInsideButtonText()
  const buttonIconIconSize = useButtonIconIconSize()

  const infoTitleIconSize = useInfoTitleIconSize()

  if (size !== undefined) return size

  if (isInsideButton) {
    if (isInsideButton.size === "small") return BUTTON_ICON_SIZE_DEFAULT_SMALL
    if (isInsideButton.size === "compact")
      return BUTTON_ICON_SIZE_DEFAULT_COMPACT
    return BUTTON_ICON_SIZE_DEFAULT
  }

  if (isInsideButtonText) return BUTTON_TEXT_ICON_SIZE_DEFAULT

  if (buttonIconIconSize !== null) {
    return buttonIconIconSize
  }

  if (infoTitleIconSize !== null) return infoTitleIconSize

  return 4 * gu
}

export function useIconColor(color?: string): string {
  const infoTitleIconColor = useInfoTitleIconColor()

  if (color !== undefined) return color

  if (infoTitleIconColor !== null) return infoTitleIconColor

  return "currentColor"
}
