import type { Property as CssP } from "csstype"
import type { ReactNode } from "react"

import { MoireLabel, useTheme } from "moire"
import { useLayout } from "../styles"

type NftImageProps = {
  actionButtons: ReactNode
  image: string
  label: string
  labelDisplay: ReactNode
  navigationButtons: ReactNode
}

export function NftImage({
  actionButtons,
  image,
  label,
  labelDisplay,
  navigationButtons,
}: NftImageProps) {
  const layout = useLayout()
  const { colors } = useTheme()

  const buttonsGap = layout.value({
    small: "1.5gu",
    xlarge: "2gu",
  })
  const navButtonsInset = layout.value({
    small: "2gu auto auto 2gu",
    xlarge: "8gu auto auto 0",
  })
  const actionButtonsInset = layout.value({
    small: "auto 2gu 2gu auto",
    xlarge: "auto 0 3gu auto",
  })
  const actionButtonsDirection = layout.value<CssP.FlexDirection>({
    small: "row",
    xlarge: "column",
  })

  const imgMaxWidth = layout.value({
    small: "calc(100% - 4gu)",
    xlarge: "100%",
  })

  return (
    <>
      <div
        css={{
          position: "absolute",
          margin: "0 auto",
          inset: "0 auto",
          width: "100%",
          maxWidth: "160gu",
        }}
      >
        <div
          css={{
            position: "absolute",
            inset: layout.below("xlarge")
              ? "auto auto 2gu 2gu"
              : "8gu 0 auto auto",
          }}
        >
          <MoireLabel
            background={colors.layer2}
            label={labelDisplay}
            labelColor={colors.background}
            linesColor={colors.accent2}
            title={label}
          />
        </div>
        <div
          css={{
            position: "absolute",
            inset: navButtonsInset,
            display: "flex",
            flexDirection: "row",
            gap: buttonsGap,
          }}
        >
          {navigationButtons}
        </div>
        <div
          css={{
            position: "absolute",
            inset: actionButtonsInset,
            display: "flex",
            flexDirection: actionButtonsDirection,
            gap: buttonsGap,
          }}
        >
          {actionButtons}
        </div>
      </div>
      <div
        css={{
          position: "relative",
          "img": {
            display: "block",
            margin: "0 auto",
            maxWidth: imgMaxWidth,
            maxHeight: "100%",
            width: "100%",
            height: "auto",
            minHeight: "60gu",
          },
        }}
      >
        <img alt="" src={image} />
      </div>
    </>
  )
}
