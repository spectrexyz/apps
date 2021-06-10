import React, { useEffect, useMemo, useRef, useState } from "react"
import { css } from "@emotion/react"
import { animated, useSpring, useTransition, config, to } from "react-spring"
import {
  ButtonIcon,
  IconArrowDown,
  IconArrowUp,
  IconCollection,
  theme,
  gu,
  lerp,
  list,
  shuffle,
  useMeasure,
} from "kit-legacy"
import { NftCard } from "./NftCard"
import nfts from "./nfts"

type Nft = {
  contract: string
  tokenId: string
}

type Card = {
  id: number
  nft: Nft
  shift: [number, number]
  anim: {
    angle: number
    leaveX: number
  }
  position: [number, number]
}

type Stack = {
  cards: Card[]
  direction: number
  picked: boolean
  peek: number
  grid: boolean
}

type StackBounds = {
  shift: [number, number]
  width: number
  height: number
  cardWidth: number
  cardHeight: number
}

const CARD_SHIFT_BASE = [8, 8]
const CARD_SHIFT_RAND = [20, 20]
const GRID_GAP = 4 * gu
const GRID_Y = 100

const STACK_BOUNDS_DEFAULT = {
  shift: [0, 0],
  cardHeight: -1,
  cardWidth: -1,
  height: -1,
  width: -1,
} as StackBounds

function getGridBounds({
  cardWidth,
  cardHeight,
  cardsCount,
  containerWidth,
}: {
  cardWidth: number
  cardHeight: number
  cardsCount: number
  containerWidth: number
}) {
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
  seed: number,
  { angleMin = 2, angleMax = 12, xMin = 100, xMax = 220 } = {}
) {
  let cardUid = 0
  return function card(nft: Nft): Card {
    const angle = Math.random() * 2
    const leaveX = Math.random() * 2
    return {
      id: cardUid++,
      nft,
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

const card = cardWrapper(1234567 + nfts.length)

function useCardsStack() {
  const [{ cards, direction, picked, peek, grid }, setStack] = useState(() => ({
    cards: nfts.map(([contract, tokenId]) => card({ contract, tokenId })),
    direction: 1,
    picked: false,
    peek: -1,
    grid: false,
  }))

  const pick = (id: number) => {
    if (grid) return
    setStack(({ cards }) => {
      const index = cards.findIndex((card) => card.id === id)
      return {
        cards: [
          ...cards.slice(index),
          ...cards.slice(0, index).map(({ nft }) => card(nft)),
        ],
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
        ? [card(cards[cards.length - 1].nft), ...cards.slice(0, -1)]
        : [...cards.slice(1), card(cards[0].nft)],
      direction: backward ? -1 : 1,
      picked: false,
      peek: -1,
    }))
  }

  const peekOn = (peek: number) => {
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

function useActiveCard() {
  const [position, setPosition] = useState(0)
  return useMemo(
    () => ({
      updateActiveCard: setPosition,
      activeCard: position,
    }),
    [position]
  )
}

export function NftCollection() {
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
  } = useCardsStack()

  const gridBounds = getGridBounds({
    cardWidth: stackBounds.cardWidth,
    cardHeight: stackBounds.cardHeight,
    cardsCount: cards.length,
    containerWidth: containerBounds.width,
  })

  const { gridProgress } = useSpring({ gridProgress: Number(grid) })

  return (
    <div
      ref={containerRef}
      css={css`
        display: grid;
        width: 100%;
        min-height: 100%;
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
                5 * gu}px,
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
              <ButtonIcon onClick={toggleGrid} icon={<IconCollection />} />
              <ButtonIcon
                onClick={() => rotate(false)}
                icon={<IconArrowUp />}
              />
              <ButtonIcon
                onClick={() => rotate(true)}
                icon={<IconArrowDown />}
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
                ${gridBounds.x}px,
                ${gridBounds.y - 50}px,
                0
              );
            `}
          >
            <ButtonIcon onClick={toggleGrid} icon={<IconCollection />} />
          </animated.div>
        )}
      </div>
    </div>
  )
}

type NftCardsProps = {
  direction: number
  grid: boolean
  onStackBounds: (bounds: {
    shift: [number, number]
    width: number
    height: number
    cardWidth: number
    cardHeight: number
  }) => void
  peek: number
  peekOff: () => void
  peekOn: (index: number) => void
  pickCard: (index: number) => void
  picked: boolean
  cards: Card[]
  containerBounds: { width: number; height: number }
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
}: NftCardsProps) {
  const [cardRef, cardBounds] = useMeasure()
  const stackBounds = useRef<StackBounds>(STACK_BOUNDS_DEFAULT)

  const xShift = containerBounds.width / 2 - stackBounds.current.cardWidth / 2
  const yShift =
    containerBounds.height / 2 - stackBounds.current.cardHeight / 2 + 50

  const cards = cardsBeforePosition.map((card, stackIndex) => ({
    ...card,
    position: [
      xShift - CARD_SHIFT_BASE[0] * stackIndex + card.shift[0],
      yShift - CARD_SHIFT_BASE[1] * stackIndex + card.shift[1],
    ] as [number, number],
  }))

  const gridBounds = getGridBounds({
    cardWidth: stackBounds.current.cardWidth,
    cardHeight: stackBounds.current.cardHeight,
    cardsCount: cards.length,
    containerWidth: containerBounds.width,
  })

  const transition = useTransition<
    Card,
    {
      opacity: number
      leaving: boolean
      position: [number, number]
      angle: number
      scale: number
    }
  >(cards, {
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
    leave: ({ position: [x, y], id, anim }) => ({
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

  useEffect(() => {
    if (cardBounds.width === 0 || stackBounds.current.cardWidth !== -1) {
      return
    }

    const first = cards[0].position
    const last = cards[cards.length - 1].position

    stackBounds.current = {
      shift: [last[0], last[1]],
      width: cardBounds.width - last[0],
      height: cardBounds.height - last[1],
      cardWidth: cardBounds.width,
      cardHeight: cardBounds.height,
    }

    onStackBounds(stackBounds.current as StackBounds)
  }, [cardBounds, onStackBounds, cards])

  const { cardWidth, cardHeight } = stackBounds.current

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
          { id, nft },
          t,
          index
        ) => {
          return (
            <animated.div
              ref={index === 0 && cardWidth === -1 ? cardRef : null}
              style={{
                background: leaving.to((lf) =>
                  grid || id === cards[0].id || lf
                    ? theme.primary
                    : theme.background
                ),
                transform: to(
                  [position, angle, scale],
                  (position, angle, scale) => `
                    scale3d(${scale}, ${scale}, 1)
                    translate3d(
                      ${(position as [number, number])[0]}px,
                      ${(position as [number, number])[1]}px,
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
              <NftCard nft={nft} active={grid || cards[0].id === id} />
            </animated.div>
          )
        }
      )}
    </div>
  )
}
