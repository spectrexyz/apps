import type { SpringValue } from "react-spring"

import { memo } from "react"
import { a, useSpring } from "react-spring"
import { Label } from "./Label"
import { Nft } from "./Nft"
import { spSlow, WIDTH } from "./shared"

type Props = { progress: SpringValue<number> }

export const Item3 = memo(function Item3({ progress }: Props) {
  const text = useSpring({
    delay: 400,
    config: spSlow,
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
  })

  const lineLength = 108 * 2 + 94 + 86
  const { dashoffset, lockProgress } = useSpring({
    delay: 200,
    config: {
      mass: 1,
      tension: 400,
      friction: 90,
    },
    from: { dashoffset: lineLength, lockProgress: 0 },
    to: { dashoffset: 0, lockProgress: 1 },
  })
  return (
    <a.g transform={`translate(${WIDTH - 110 - 75}, 107)`}>
      <g transform="translate(50, -21)">
        <a.g opacity={text.opacity} transform={text.transform}>
          <Label text="Locked ERC721" />
        </a.g>
      </g>
      <a.path
        stroke="#C0BBFF"
        strokeWidth="2"
        fill="transparent"
        strokeDasharray={lineLength}
        strokeDashoffset={dashoffset}
        opacity={lockProgress}
        d="
          M94  108
          L0   108
          L0   0
          L108 0
          L108 86
        "
      />
      <g transform="translate(98, 91)">
        <a.g
          transform-origin="10 10"
          transform={lockProgress.to((v) => `scale(${v})`)}
          opacity={lockProgress}
        >
          <Lock />
        </a.g>
      </g>
      <a.rect
        x={110 / 2 - 90 / 2 - 1}
        y={110 / 2 - 90 / 2 - 1}
        width="90"
        height="90"
        fill={"#343C50"}
        opacity={progress}
        transform-origin="50 50"
        transform={progress.to([0, 1], [0.7, 1]).to((v) => `scale(${v})`)}
      />
      <g transform={`translate(${55 / 2}, ${55 / 2})`}>
        <Nft />
      </g>
    </a.g>
  )
})

function Lock() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d={`
          M16.25 7.125H13.4375V4.9375C13.4375 4.02582 13.0753 3.15148 12.4307
          2.50682C11.786 1.86216 10.9117 1.5 10 1.5C9.08832 1.5 8.21398 1.86216
          7.56932 2.50682C6.92466 3.15148 6.5625 4.02582 6.5625
          4.9375V7.125H3.75C3.4186 7.12538 3.10087 7.2572 2.86654 7.49154C2.6322
          7.72587 2.50038 8.0436 2.5 8.375V17.125C2.50038 17.4564 2.6322 17.7741
          2.86654 18.0085C3.10087 18.2428 3.4186 18.3746 3.75
          18.375H16.25C16.5814 18.3746 16.8991 18.2428 17.1335 18.0085C17.3678
          17.7741 17.4996 17.4564 17.5 17.125V8.375C17.4996 8.0436 17.3678
          7.72587 17.1335 7.49154C16.8991 7.2572 16.5814 7.12538 16.25
          7.125V7.125ZM9.99954 13.6875C9.81412 13.6875 9.63287 13.6325 9.47869
          13.5295C9.32452 13.4265 9.20436 13.2801 9.13341 13.1088C9.06245 12.9375
          9.04388 12.749 9.08006 12.5671C9.11623 12.3852 9.20552 12.2182 9.33663
          12.0871C9.46774 11.956 9.63479 11.8667 9.81664 11.8305C9.9985 11.7943
          10.187 11.8129 10.3583 11.8839C10.5296 11.9548 10.676 12.075 10.779
          12.2292C10.8821 12.3833 10.937 12.5646 10.937 12.75C10.937 12.8731
          10.9128 12.995 10.8657 13.1088C10.8186 13.2225 10.7495 13.3259 10.6625
          13.4129C10.5754 13.5 10.4721 13.569 10.3583 13.6161C10.2446 13.6633
          10.1227 13.6875 9.99954 13.6875V13.6875ZM12.1875
          7.125H7.8125V4.9375C7.8125 4.35734 8.04297 3.80094 8.4532
          3.3907C8.86344 2.98047 9.41984 2.75 10 2.75C10.5802 2.75 11.1366
          2.98047 11.5468 3.3907C11.957 3.80094 12.1875 4.35734 12.1875
          4.9375V7.125Z
        `}
        fill="#C0BBFF"
      />
    </svg>
  )
}
