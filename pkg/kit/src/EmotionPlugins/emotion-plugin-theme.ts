import type { ThemeContext } from "../Theme"

type FontsKeys = "mono" | "sans"
type ColorsKeys = keyof ThemeContext["colors"]

export function themePlugin(
  theme: ThemeContext,
): (element: { type: string; value: string }) => void {
  const replaceThemeValue = (
    matchRe: RegExp,
    property: "colors" | "fonts",
    value: string,
  ) => {
    const index = value.indexOf(`${property}.`)
    if (index === -1) {
      return undefined
    }

    const match = value.match(matchRe)
    if (!match) {
      return undefined
    }

    const groupProperty: ColorsKeys | FontsKeys = match[1]

    const themeGroup =
      theme[property] as (typeof groupProperty extends ColorsKeys
        ? ThemeContext["colors"]
        : ThemeContext["fonts"])

    const themeValue = themeGroup[groupProperty]

    return ""
      + value.slice(0, index)
      + themeValue
      + value.slice(index + match[0].length)
  }

  const colorsRe = /colors\.([a-zA-Z0-9]+)/
  const fontsRe = /fonts\.(mono|sans)/

  return (element: { type: string; value: string }) => {
    if (element.type === "decl") {
      return
    }

    const newValue = replaceThemeValue(colorsRe, "colors", element.value)
      ?? replaceThemeValue(fontsRe, "fonts", element.value)

    if (newValue) {
      element.value = newValue
    }
  }
}
