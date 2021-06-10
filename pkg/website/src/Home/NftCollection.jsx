import React, { useEffect, useRef, useState } from "react"
import { css } from "@emotion/react"
import { animated, useSpring, useTransition, to } from "react-spring"
import {
  ButtonIcon,
  IconArrowDown,
  IconArrowUp,
  IconCards,
  IconCollection,
  theme,
  gu,
  shuffle,
  useMeasure,
} from "kit-legacy"
import { useLayout } from "../styles.js"
import { NftCard } from "./NftCard.jsx"

const GRID_GAP = 4 * gu
const GRID_Y = 100

const CARD_SHIFT_RAND = [20, 20]

const STACK_BOUNDS_DEFAULT = {
  shift: [0, 0],
  cardHeight: -1,
  cardWidth: -1,
  height: -1,
  width: -1,
}

function getGridBounds({ cardWidth, cardHeight, cardsCount, containerWidth }) {
  const cols = Math.min(
    4,
    Math.max(
      1,
      Math.floor((containerWidth - GRID_GAP) / (cardWidth + GRID_GAP))
    )
  )
  const rows = Math.ceil(cardsCount / cols)
  const width = cardWidth * cols + GRID_GAP * cols - GRID_GAP
  const height =
    Math.floor(cardHeight * rows + GRID_GAP * rows - GRID_GAP) + GRID_GAP * 3
  const x = containerWidth / 2 - width / 2
  return { cols, rows, width, height, x, y: GRID_Y }
}

function cardWrapper(
  seed,
  { angleMin = 2, angleMax = 12, xMin = 100, xMax = 220 } = {}
) {
  let cardUid = 0
  return function card({ nft, artist, owner, platform }) {
    const angle = Math.random() * 2
    const leaveX = Math.random() * 2
    return {
      id: cardUid++,
      nft,
      artist,
      owner,
      platform,
      shift: [
        (Math.random() - 0.5) * CARD_SHIFT_RAND[0],
        (Math.random() - 0.5) * CARD_SHIFT_RAND[1],
      ],
      anim: {
        angle:
          angle > 1
            ? angleMin + (angle - 1) * (angleMax - angleMin)
            : -angleMin - angle * (angleMax - angleMin),
        leaveX:
          leaveX > 1
            ? xMin + (leaveX - 1) * (xMax - xMin)
            : -xMin - leaveX * (xMax - xMin),
      },
      position: [0, 0],
    }
  }
}

const card = cardWrapper(1234567)

function useCardsStack(nfts) {
  const [{ cards, direction, picked, peek, grid }, setStack] = useState(() => ({
    cards: nfts.map(card),
    direction: 1,
    picked: false,
    peek: -1,
    grid: false,
  }))

  const pick = (id) => {
    if (grid) return
    setStack(({ cards }) => {
      const index = cards.findIndex((card) => card.id === id)
      return {
        cards: [...cards.slice(index), ...cards.slice(0, index).map(card)],
        direction: 1,
        picked: true,
        peek: -1,
        grid: false,
      }
    })
  }

  const rotate = (backward = false) => {
    setStack(({ cards }) => ({
      grid: false,
      cards: backward
        ? [card(cards[cards.length - 1]), ...cards.slice(0, -1)]
        : [...cards.slice(1), card(cards[0])],
      direction: backward ? -1 : 1,
      picked: false,
      peek: -1,
    }))
  }

  const peekOn = (peek) => {
    if (!grid) {
      setStack((stack) => ({ ...stack, peek }))
    }
  }

  const peekOff = () => {
    setStack((stack) => ({ ...stack, peek: -1 }))
  }

  const toggleGrid = () => {
    setStack((stack) => ({
      ...stack,
      grid: !stack.grid,
      cards: stack.grid ? cards : shuffle(cards),
      peek: stack.grid ? -1 : stack.peek,
    }))
  }

  return {
    cards,
    direction,
    grid,
    peek,
    peekOff,
    peekOn,
    pick,
    picked,
    rotate,
    toggleGrid,
  }
}

export function NftCollection({ nfts }) {
  const [containerRef, containerBounds] = useMeasure()
  const [stackBounds, setStackBounds] = useState(STACK_BOUNDS_DEFAULT)
  const {
    direction,
    peek,
    peekOff,
    peekOn,
    pick,
    picked,
    rotate,
    cards,
    grid,
    toggleGrid,
  } = useCardsStack(nfts)

  const gridBounds = getGridBounds({
    cardWidth: stackBounds.cardWidth,
    cardHeight: stackBounds.cardHeight,
    cardsCount: cards.length,
    containerWidth: containerBounds.width,
  })

  const { gridProgress } = useSpring({ gridProgress: Number(grid) })

  const layout = useLayout()

  return (
    <animated.div
      ref={containerRef}
      style={{
        height: gridProgress
          .to([0, 1], [stackBounds.cardHeight * 1.2, gridBounds.height])
          .to((v) => v + "px"),
      }}
      css={css`
        display: grid;
        width: 100%;
        height: 100gu;
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          opacity: ${Number(stackBounds.width !== -1)};
        `}
      >
        <div
          css={css`
            position: relative;
            z-index: 1;
            padding: 4gu 0;
          `}
        >
          <NftCards
            direction={direction}
            grid={grid}
            onStackBounds={setStackBounds}
            peek={peek}
            peekOff={peekOff}
            peekOn={peekOn}
            pickCard={pick}
            picked={picked}
            cards={cards}
            containerBounds={containerBounds}
          />
        </div>
        {!grid && (
          <animated.div
            style={{
              opacity: gridProgress.to([0, 1], [1, 0]),
            }}
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              transform: translate3d(
                ${containerBounds.width / 2 +
                stackBounds.cardWidth / 2 +
                (layout.name === "small" ? 2 : 5) * gu}px,
                ${containerBounds.height / 2}px,
                0
              );
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 1gu;
              `}
            >
              <ButtonIcon
                size={layout.name === "small" ? "small" : "medium"}
                onClick={toggleGrid}
                icon={
                  <IconCollection
                    size={layout.name === "small" ? 4 * gu : 6 * gu}
                  />
                }
                mode="outline"
              />
              <ButtonIcon
                size={layout.name === "small" ? "small" : "medium"}
                onClick={() => rotate(false)}
                icon={
                  <IconArrowUp
                    size={layout.name === "small" ? 4 * gu : 6 * gu}
                  />
                }
                mode="outline"
              />
              <ButtonIcon
                size={layout.name === "small" ? "small" : "medium"}
                onClick={() => rotate(true)}
                icon={
                  <IconArrowDown
                    size={layout.name === "small" ? 4 * gu : 6 * gu}
                  />
                }
                mode="outline"
              />
            </div>
          </animated.div>
        )}
        {grid && (
          <animated.div
            style={{
              opacity: gridProgress,
            }}
            css={css`
              position: absolute;
              top: 0;
              left: 0;
              z-index: 2;
              transform: translate3d(
                ${gridBounds.x + gridBounds.width - 6 * gu}px,
                ${gridBounds.y - 50}px,
                0
              );
            `}
          >
            <ButtonIcon
              size={layout.name === "small" ? "small" : "medium"}
              onClick={toggleGrid}
              icon={
                <IconCards size={layout.name === "small" ? 4 * gu : 6 * gu} />
              }
              mode="outline"
            />
          </animated.div>
        )}
      </div>
    </animated.div>
  )
}

function NftCards({
  direction,
  grid,
  onStackBounds,
  peek,
  peekOff,
  peekOn,
  pickCard,
  picked,
  cards: cardsBeforePosition,
  containerBounds,
}) {
  const [cardRef, cardBounds] = useMeasure()
  const stackBounds = useRef(STACK_BOUNDS_DEFAULT)

  const layout = useLayout()
  const shiftBase = layout.name === "small" ? [3, 3] : [8, 8]

  const xShift = containerBounds.width / 2 - stackBounds.current.cardWidth / 2
  const yShift =
    containerBounds.height / 2 - stackBounds.current.cardHeight / 2 + 50

  const cards = cardsBeforePosition.map((card, stackIndex) => ({
    ...card,
    position: [
      xShift - shiftBase[0] * stackIndex + card.shift[0],
      yShift - shiftBase[1] * stackIndex + card.shift[1],
    ],
  }))

  const gridBounds = getGridBounds({
    cardWidth: stackBounds.current.cardWidth,
    cardHeight: stackBounds.current.cardHeight,
    cardsCount: cards.length,
    containerWidth: containerBounds.width,
  })

  const transition = useTransition(cards, {
    keys: ({ id }) => id,
    config: { mass: 1, tension: 500, friction: 60 },
    trail: picked || peek > -1 ? 0 : 20,
    initial: ({ position }) => ({
      opacity: 1,
      position,
      angle: 0,
      scale: 1,
      leaving: false,
    }),
    from: ({ position, anim }) => ({
      opacity: 0,
      position,
      angle: direction === 1 ? 5 : anim.angle,
      scale: direction === 1 ? 1 : 1.2,
      leaving: false,
    }),
    enter: ({ position }) => ({
      opacity: 1,
      position,
      angle: 0,
      scale: 1,
      leaving: false,
    }),
    update: ({ position }, index) => {
      const styles = {
        opacity: 1,
        angle: peek === index && index > 0 ? -2 : 0,
        scale: 1,
        leaving: false,
        position,
      }

      if (!grid) {
        return peek === index && index > 0
          ? { ...styles, position: [position[0] - 5, position[1] - 5] }
          : styles
      }

      const xIndex = index % gridBounds.cols
      const yIndex = Math.floor(index / gridBounds.cols)

      const cardX = xIndex * stackBounds.current.cardWidth + xIndex * GRID_GAP
      const cardY = yIndex * stackBounds.current.cardHeight + yIndex * GRID_GAP

      return {
        ...styles,
        position: [gridBounds.x + cardX, gridBounds.y + cardY],
      }
    },
    leave: ({ position: [x, y], anim }) => ({
      opacity: 0,
      position: [
        direction === 1 && !picked ? x + anim.leaveX : x,
        direction === 1 ? y + 300 : y,
      ],
      angle: direction === 1 ? (picked ? -10 : anim.angle * 2) : 0,
      scale: 1,
      leaving: true,
    }),
  })

  const previousCardWidth = useRef(-1)

  useEffect(() => {
    if (
      cardBounds.width === 0 ||
      (cardBounds.width === previousCardWidth.current &&
        stackBounds.current.cardWidth !== -1)
    ) {
      return
    }
    previousCardWidth.current = cardBounds.width

    const last = cards[cards.length - 1].position

    stackBounds.current = {
      shift: [last[0], last[1]],
      width: cardBounds.width - last[0],
      height: cardBounds.height - last[1],
      cardWidth: cardBounds.width,
      cardHeight: cardBounds.height,
    }

    onStackBounds(stackBounds.current)
  }, [cardBounds, onStackBounds, cards])

  const { cardWidth } = stackBounds.current

  return (
    <div
      css={css`
        opacity: ${cardWidth > 0 ? 1 : 0};
        height: ${grid ? gridBounds.height : 0}px;
      `}
    >
      {transition(
        (
          { leaving, opacity, position, angle, scale },
          { id, nft, artist, owner, platform },
          t,
          index
        ) => {
          return (
            <animated.div
              ref={index === 0 && cardWidth === -1 ? cardRef : null}
              style={{
                background: leaving.to((lf) =>
                  !grid && (id === cards[0].id || lf)
                    ? theme.lightBackground
                    : theme.contrast
                ),
                transform: to(
                  [position, angle, scale],
                  (position, angle, scale) => `
                    scale3d(${scale}, ${scale}, 1)
                    translate3d(
                      ${position[0]}px,
                      ${position[1]}px,
                      0
                    )
                    rotate3d(0, 0, 1, ${angle}deg)
                  `
                ),
                opacity:
                  direction === 1
                    ? to(opacity, [0, 0.5, 1], [0, 1, 1])
                    : to(opacity, [0, 0.7, 1], [0, 1, 1]),
                zIndex: cards.length - index,
                position: "absolute",
                transformOrigin: "50% 100%",
              }}
              onClick={() => pickCard(id)}
              onMouseEnter={() => peekOn(index)}
              onMouseLeave={peekOff}
            >
              <NftCard
                contract={nft.contract}
                tokenId={nft.tokenId}
                artist={artist}
                owner={owner}
                platform={platform}
                inFront={!grid && cards[0].id === id}
                gridMode={grid}
              />
            </animated.div>
          )
        }
      )}
    </div>
  )
}
