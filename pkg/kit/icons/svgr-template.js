function defaultTemplate({ template }, opts, { componentName, jsx, exports }) {
  const typeScriptTpl = template.smart({ plugins: ["jsx", "typescript"] })

  componentName.name = componentName.name.replace(/^Svg/, "Icon")

  const propsTypeName = {
    type: "Identifier",
    name: `${componentName.name}Props`,
  }

  return typeScriptTpl.ast`import type { SVGProps } from 'react'

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

module.exports = defaultTemplate
