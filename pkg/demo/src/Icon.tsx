import { css } from "@emotion/react"
import {
  IconArrowCounterClockwise,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowSquareOut,
  IconArrowUp,
  IconArrowsDownUp,
  IconCheck,
  IconCheckBold,
  IconChecks,
  IconCopy,
  IconFlame,
  IconFlameFilled,
  IconGearSix,
  IconHeartStraightFilled,
  IconLifebuoy,
  IconLifebuoyFilled,
  IconList,
  IconMagnifyingGlassMinus,
  IconMagnifyingGlassPlus,
  IconNut,
  IconNutFilled,
  IconSquaresFour,
  IconUploadSimple,
  IconX,
  gu,
} from "kit"

const icons = Object.entries({
  IconArrowCounterClockwise,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowSquareOut,
  IconArrowUp,
  IconArrowsDownUp,
  IconCheck,
  IconCheckBold,
  IconChecks,
  IconCopy,
  IconFlame,
  IconFlameFilled,
  IconGearSix,
  IconHeartStraightFilled,
  IconLifebuoy,
  IconLifebuoyFilled,
  IconList,
  IconMagnifyingGlassMinus,
  IconMagnifyingGlassPlus,
  IconNut,
  IconNutFilled,
  IconSquaresFour,
  IconUploadSimple,
  IconX,
})

export function Icon() {
  return (
    <div
      css={css`
        padding: 4gu 0 8gu;
        table {
          border-spacing: 0;
        }
        th {
          font-weight: 400;
          padding: 0 4gu 2gu;
          &:first-child {
            text-align: left;
          }
          &:last-child {
            text-align: right;
          }
        }
        td {
          padding: 1.5gu 4gu;
          text-align: center;
          vertical-align: middle;
          background: rgba(255, 255, 255, 0.05);
        }
        td:first-of-type {
          text-align: left;
        }
        tbody tr:first-of-type {
          td {
            padding-top: 3gu;
          }
          td:first-of-type {
            border-top-left-radius: 1gu;
          }
          td:last-of-type {
            border-top-right-radius: 1gu;
          }
        }
        tbody tr:last-of-type {
          td {
            padding-bottom: 3gu;
          }
          td:first-of-type {
            border-bottom-left-radius: 1gu;
          }
          td:last-of-type {
            border-bottom-right-radius: 1gu;
          }
        }
      `}
    >
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>4gu</th>
            <th>3gu</th>
            <th>2gu</th>
          </tr>
        </thead>
        <tbody>
          {icons.map(([name, Icon]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <Icon size={4 * gu} />
              </td>
              <td>
                <Icon size={3 * gu} />
              </td>
              <td>
                <Icon size={2 * gu} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
