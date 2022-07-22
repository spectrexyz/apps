import type { ReactNode } from "react"

import { gu } from "../styles"

export function DiscsChain({
  images,
}: {
  images: Array<readonly [alt: string, url: string] | ReactNode>
}) {
  return (
    <div
      css={{
        display: "flex",
        marginLeft: "1.5gu",
        "> img": {
          marginLeft: "-1.5gu",
          borderRadius: "50%",
        },
        "> div": {
          display: "flex",
          marginLeft: "-1.5gu",
        },
      }}
    >
      {images.map((image, index) =>
        Array.isArray(image)
          ? (
            <img
              key={`${index}${image[1]}`}
              alt={image[0]}
              height={4 * gu}
              src={image[1]}
              title={image[0]}
              width={4 * gu}
            />
          )
          : (
            <div key={index}>
              {image}
            </div>
          )
      )}
    </div>
  )
}
