import {
  ICON_SIZE_DEFAULT as BUTTON_ICON_SIZE_DEFAULT,
  ICON_SIZE_DEFAULT_COMPACT as BUTTON_ICON_SIZE_DEFAULT_COMPACT,
  ICON_SIZE_DEFAULT_SMALL as BUTTON_ICON_SIZE_DEFAULT_SMALL,
  useInsideButton,
} from "./Button"
import { useButtonIconIconSize } from "./ButtonIcon"
import {
  ICON_SIZE_DEFAULT as BUTTON_TEXT_ICON_SIZE_DEFAULT,
  useInsideButtonText,
} from "./ButtonText"
import { useInfoTitleIconColor, useInfoTitleIconSize } from "./Info"
import { gu } from "./styles"
import { useTipIconSize } from "./Tip"

export function useIconSize(size?: number): number {
  const isInsideButton = useInsideButton()

  const isInsideButtonText = useInsideButtonText()
  const buttonIconIconSize = useButtonIconIconSize()

  const infoTitleIconSize = useInfoTitleIconSize()

  const tipIconSize = useTipIconSize()

  if (size !== undefined) return size

  if (isInsideButton) {
    if (isInsideButton.size === "small") return BUTTON_ICON_SIZE_DEFAULT_SMALL
    if (isInsideButton.size === "compact") {
      return BUTTON_ICON_SIZE_DEFAULT_COMPACT
    }
    return BUTTON_ICON_SIZE_DEFAULT
  }

  if (isInsideButtonText) {
    return BUTTON_TEXT_ICON_SIZE_DEFAULT
  }

  if (buttonIconIconSize !== null) {
    return buttonIconIconSize
  }

  if (tipIconSize !== null) {
    return tipIconSize
  }

  if (infoTitleIconSize !== null) {
    return infoTitleIconSize
  }

  return 4 * gu
}

export function useIconColor(color?: string): string {
  const infoTitleIconColor = useInfoTitleIconColor()

  if (color !== undefined) return color

  if (infoTitleIconColor !== null) return infoTitleIconColor

  return "currentColor"
}
