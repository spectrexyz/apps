import type { ThemeContext } from "../Theme"

export function themePlugin(
  _theme: ThemeContext,
): (element: { type: string; value: string }) => void {
  let match: string[] | null = null
  let index: number

  const colorsMatchRe = /colors\.([a-zA-Z0-9]+)/

  return (element: { type: string; value: string }) => {
    if (element.type !== "decl") {
      return
    }

    index = element.value.indexOf("colors.")
    if (index === -1) {
      return
    }

    match = element.value.match(colorsMatchRe)
    if (!match) {
      return
    }

    element.value = element.value.slice(0, index)
      + _theme.colors[match[1]]
      + element.value.slice(index + match[0].length)
  }
}
