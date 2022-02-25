import { MoireLabel, useTheme } from "kit"
import { ReactNode } from "react"
import { useLayout } from "../styles"

type NftImageProps = {
  actionButtons: ReactNode
  image: { url: string; width: number; height: number }
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
    large: "2gu",
  })
  const navButtonsInset = layout.value({
    small: "2gu auto auto 2gu",
    large: "8gu auto auto 0",
  })
  const actionButtonsInset = layout.value({
    small: "auto 2gu 2gu auto",
    large: "auto 0 3gu auto",
  })
  const actionButtonsDirection = layout.value({
    small: "row",
    large: "column",
  })

  const imgMaxWidth = layout.value({
    small: "calc(100% - 4gu)",
    large: "100%",
  })

  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
        padding: "8gu 0",
        background: colors.layer2,
      }}
    >
      <div
        css={{
          position: "absolute",
          margin: "0 auto",
          inset: "0 auto",
          width: "100%",
          maxWidth: "160gu",
        }}
      >
        {layout.above("medium") && (
          <div
            css={{
              position: "absolute",
              inset: "8gu 0 auto auto",
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
        )}
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
            width: image.width,
            height: "auto",
          },
        }}
      >
        <img alt="" src={image.url} width={image.width} height={image.height} />
      </div>
    </div>
  )
}
