import React, { useEffect, useRef, useMemo } from "react"
import { css } from "@emotion/react"
import { Moire, theme, fonts, gu } from "kit-legacy"
import { useNft } from "use-nft"
import { useLayout } from "../styles.js"

function useStyles() {
  const layout = useLayout()
  return useMemo(() => {
    if (layout.name === "small") {
      return {
        cardWidth: 24 * gu,
        innerPadding: 2 * gu,
        descriptionHeight: 6 * gu,
        descriptionFontSize: 13,
        footerFontSize: 11,
        tag: { fontSize: 12, height: 3 * gu, padding: 1 * gu, shift: 2 },
      }
    }
    if (layout.name === "medium") {
      return {
        cardWidth: 36 * gu,
        innerPadding: 3 * gu,
        descriptionHeight: 9 * gu,
        descriptionFontSize: 15,
        footerFontSize: 11,
        tag: { fontSize: 15, height: 4 * gu, padding: 2 * gu, shift: 2 },
      }
    }
    if (layout.name === "large") {
      return {
        cardWidth: 36 * gu,
        innerPadding: 2 * gu,
        descriptionHeight: 9 * gu,
        descriptionFontSize: 15,
        footerFontSize: 11,
        tag: { fontSize: 15, height: 4 * gu, padding: 2 * gu, shift: 2 },
      }
    }
    return {
      cardWidth: 44 * gu,
      innerPadding: 3 * gu,
      descriptionHeight: 11 * gu,
      descriptionFontSize: 16,
      footerFontSize: 12,
      tag: { fontSize: 17, height: 4.5 * gu, padding: 2.5 * gu, shift: 3 },
    }
  }, [layout])
}

export const NftCard = React.memo(function NftCard({
  inFront,
  contract,
  tokenId,
  artist,
  owner,
  platform,
  gridMode,
}) {
  const { nft = { image: "", name: "", description: "" } } = useNft(
    contract,
    tokenId
  )

  const styles = useStyles()
  const layout = useLayout()

  const artUrl = platform?.url ?? owner?.url
  const artName = platform?.name ?? owner?.name
  const artDisplayName = platform?.displayName ?? owner?.displayName ?? artName
  const artProviderLabel = platform ? "Available on" : "Owned by"

  return (
    <div
      css={css`
        width: ${styles.cardWidth}px;
        color: ${inFront ? theme.background : theme.content};
        border: ${gridMode ? 0 : 2}px solid ${theme.lightBackground};
        font-size: ${fonts.sizes.small};
      `}
    >
      <Visual
        src={nft.image}
        pause={!inFront}
        css={css`
          display: block;
          width: 100%;
          height: ${styles.cardWidth / 1.1}px;
          object-fit: cover;
          object-position: 50% 50%;
          background: ${theme.background};
          border: ${gridMode ? 0 : 2}px solid ${theme.lightBackground};
          image-rendering: ${inFront || gridMode ? "auto" : "crisp-edges"};
        `}
      />

      <div
        css={css`
          padding: ${styles.innerPadding}px;
        `}
      >
        <Tag label={nft.name || "Untitled"} gridMode={gridMode} />

        <div
          css={css`
            margin-top: -${styles.tag.shift * 2}px;
            padding-top: ${styles.innerPadding}px;
            font-family: ${fonts.families.sans};
            font-size: ${styles.descriptionFontSize}px;
            color: ${gridMode ? theme.content : "#525b70"};
            a {
              color: #635ac3;
              text-decoration: underline;
            }
          `}
        >
          <p
            css={css`
              // truncating
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              height: ${styles.descriptionHeight}px;
              line-height: ${styles.descriptionHeight / 3}px;
            `}
          >
            {nft.description || "−"}
          </p>

          <div
            css={css`
              display: flex;
              flex-direction: ${layout.name === "small" ? "column" : "row"};
              justify-content: space-between;
              margin-top: ${styles.innerPadding}px;
              label {
                display: block;
                text-transform: uppercase;
                font-size: ${styles.footerFontSize}px;
                white-space: nowrap;
              }
              label + div {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            `}
          >
            <div>
              <label>Artist</label>
              <div>
                <a href={artist.url} target="_blank" rel="noreferrer">
                  {artist.name}
                </a>
              </div>
            </div>
            <div
              css={css`
                margin-top: ${layout.name === "small" ? 1 * gu : 0}px;
                text-align: ${layout.name === "small" ? "left" : "right"};
              `}
            >
              <label>{artProviderLabel}</label>
              <div>
                <a
                  href={artUrl}
                  target="_blank"
                  rel="noreferrer"
                  title={artDisplayName === artName ? undefined : artName}
                >
                  {artDisplayName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

function Tag({ gridMode, label }) {
  const styles = useStyles()
  return (
    <div
      css={css`
        position: relative;
        display: inline-grid;
        place-items: center;
        height: ${styles.tag.height}px;
        text-align: center;
        white-space: nowrap;
      `}
    >
      <span
        css={css`
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          max-width: 100%;
          height: 100%;
          padding: 0 ${styles.tag.padding}px;
          color: ${gridMode ? theme.background : theme.primary};
          background: ${gridMode ? theme.primary : theme.background};

          // truncating
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: ${styles.tag.fontSize}px;
            position: relative;
            top: -1px;
          }
        `}
      >
        <span>{label}</span>
      </span>
      <div
        css={css`
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translate(${styles.tag.shift}px, ${styles.tag.shift}px);
          pointer-events: none;
        `}
      >
        <Moire mode={gridMode ? "dark" : "light"} />
      </div>
    </div>
  )
}

function Visual({ pause, src, ...props }) {
  if (src.endsWith(".mp4")) {
    return <LoopVideo pause={pause} type="video/mp4" src={src} {...props} />
  }
  return <img src={src} alt="" {...props} />
}

function LoopVideo({ pause, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el === null) return
    el.muted = true
    el.loop = true
    el.setAttribute("autoplay", "")
    el.setAttribute("playsinline", "")
  }, [])

  useEffect(() => {
    const el = ref.current
    if (el === null) return
    el[pause ? "pause" : "play"]()
  }, [pause])

  return <video ref={ref} tabIndex={-1} {...props} />
}
