import { memo } from "react"
import { Moire } from "../Moire"
import { useUid } from "../react-utils"
import { gu } from "../styles"
import { list } from "../utils"

export const Loading = memo(
  function Loading({ background }: { background: string }) {
    console.log("render loading" + Math.random())
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>Loading</div>
        <Dots
          background={background}
          count={3}
          gap={2 * gu}
          radius={1 * gu}
        />
      </div>
    )
  },
)

function Dots(
  {
    background,
    count,
    gap,
    radius,
  }: {
    background: string
    count: number
    gap: number
    radius: number
  },
) {
  const uid = useUid()
  const width = (radius * 2 + gap) * count - gap
  const height = radius * 2
  const padding = 10
  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        width: width + padding * 2,
        height: height + padding * 2,
      }}
    >
      <div css={{ position: "absolute", inset: padding }}>
        <Moire width={width} height={height} />
      </div>
      <svg
        viewBox={`0 0 ${width + padding * 2} ${height + padding * 2}`}
        width={width + padding * 2}
        height={height + padding * 2}
        css={{ position: "absolute", inset: "0" }}
      >
        <mask id={uid}>
          <rect
            width={width + padding * 2}
            height={height + padding * 2}
            fill="white"
          />
          {list(count, (index) => (
            <circle
              key={index}
              cx={padding + radius + index * radius * 2 + gap * index}
              cy="50%"
              r={radius}
              fill="black"
            />
          ))}
        </mask>
        <rect
          width={width + padding * 2}
          height={height + padding * 2}
          fill={background}
          mask={`url(#${uid})`}
        />
      </svg>
    </div>
  )
}
