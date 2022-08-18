import type { ReactNode } from "react"

import { gu } from "../styles"

type RemoteImage = readonly [alt: string, url: string]

function isRemoteImage(
  image: RemoteImage | ReactNode,
): image is RemoteImage {
  return Array.isArray(image) && image.length === 2
    && image.every((v) => typeof v === "string")
}

export function DiscsChain({
  images,
}: {
  images: Array<RemoteImage | ReactNode>
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
        isRemoteImage(image)
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
