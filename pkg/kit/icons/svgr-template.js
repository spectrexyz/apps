function template({ componentName, jsx }, { tpl }) {
  componentName = componentName.replace(/^Svg/, "Icon")

  const propsTypeName = {
    type: "Identifier",
    name: `${componentName}Props`,
  }

  return tpl`import type { SVGProps } from 'react'

import { useIconSize, useIconColor } from '../icons-utils'

type ${propsTypeName} = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

// eslint-disable-next-line import/no-default-export
export default function ${componentName}({
  color,
  size,
  ...props
}: ${propsTypeName}): JSX.Element {
  color = useIconColor(color)
  size = useIconSize(size)
  return ${jsx};
}
`
}

module.exports = template
