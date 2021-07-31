function defaultTemplate({ template }, opts, { componentName, jsx, exports }) {
  const typeScriptTpl = template.smart({ plugins: ["jsx", "typescript"] })

  componentName.name = componentName.name.replace(/^Svg/, "Icon")

  const propsTypeName = {
    type: "Identifier",
    name: `${componentName.name}Props`,
  }

  return typeScriptTpl.ast`import type { SVGProps } from 'react'

import React from 'react'
import { useIconSize, useIconColor } from '../icons-utils'

type ${propsTypeName} = SVGProps<SVGSVGElement> & {
  color?: string
  size?: number
}

export default function ${componentName}({
  color,
  size,
  ...props
}: ${propsTypeName}) {
  color = useIconColor(color)
  size = useIconSize(size)
  return ${jsx};
}
`
}

module.exports = defaultTemplate
