import {
  useInsideButtonText,
  ICON_SIZE_DEFAULT as BUTTON_TEXT_ICON_SIZE_DEFAULT,
} from "./ButtonText"
import { gu } from "./styles"

export function useIconSize(size?: number): number {
  if (size !== undefined) {
    return size
  }
  if (useInsideButtonText()) {
    return BUTTON_TEXT_ICON_SIZE_DEFAULT
  }
  return 4 * gu
}
