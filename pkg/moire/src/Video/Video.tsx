/* eslint jsx-a11y/media-has-caption: "off" */

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import { ButtonArea } from "../ButtonArea"

import playButton from "./play-button.svg"
import stopButton from "./stop-button.svg"

type VideoProps = ComponentPropsWithoutRef<"video"> & {
  poster?: string
  src: string
}

export const Video = function Video({
  poster,
  src,
  ...props
}: VideoProps): JSX.Element {
  const videoElement = useRef<HTMLVideoElement>(null)

  const [playing, setPlaying] = useState(false)

  const playStop = () => {
    const video = videoElement.current
    if (!video) return

    if (playing) {
      video.pause()
      video.currentTime = 0
    } else {
      void video.play()
    }
  }

  useEffect(() => {
    const video = videoElement.current
    if (!video) return

    const play = () => setPlaying(true)
    const stop = () => {
      setPlaying(false)
    }

    video.addEventListener("play", play)
    video.addEventListener("ended", stop)
    video.addEventListener("pause", stop)

    return () => {
      video.removeEventListener("play", play)
      video.removeEventListener("ended", stop)
      video.removeEventListener("pause", stop)
    }
  }, [])

  return (
    <div css={{ position: "relative" }}>
      <video
        ref={videoElement}
        {...props}
        src={src}
        tabIndex={-1}
        autoPlay={false}
        css={{
          display: "block",
          width: "100%",
        }}
      />

      {poster && !playing && (
        <div
          css={{
            position: "absolute",
            inset: "0",
            background: `url(${poster}) no-repeat 50% 50% / cover`,
          }}
        />
      )}

      <ButtonArea
        onClick={playStop}
        css={{
          position: "absolute",
          inset: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          "img": {
            display: playing ? "none" : "block",
          },
          "&:hover img": {
            display: "block",
          },
        }}
        title={playing ? "Stop" : "Play"}
      >
        <img src={playing ? stopButton : playButton} alt="" />
      </ButtonArea>
    </div>
  )
}
