import {
  useInsideButton,
  ICON_SIZE_DEFAULT as BUTTON_ICON_SIZE_DEFAULT,
} from "./Button"
import {
  useInsideButtonText,
  ICON_SIZE_DEFAULT as BUTTON_TEXT_ICON_SIZE_DEFAULT,
} from "./ButtonText"
import {
  useInsideButtonIcon,
  ICON_SIZE_DEFAULT as BUTTON_ICON_ICON_SIZE_DEFAULT,
} from "./ButtonIcon"
import { gu } from "./styles"

export function useIconSize(size?: number): number {
  const isInsideButton = useInsideButton()
  const isInsideButtonText = useInsideButtonText()
  const isInsideButtonIcon = useInsideButtonIcon()

  if (size !== undefined) return size
  if (isInsideButton) return BUTTON_ICON_SIZE_DEFAULT
  if (isInsideButtonText) return BUTTON_TEXT_ICON_SIZE_DEFAULT
  if (isInsideButtonIcon) return BUTTON_ICON_ICON_SIZE_DEFAULT

  return 4 * gu
}
