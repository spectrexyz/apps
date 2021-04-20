import React, { useEffect, useMemo, useRef, useState } from "react"
import { css } from "@emotion/react"
import {
  animated,
  useSpring,
  useSprings,
  useTransition,
  config,
  to,
} from "react-spring"
import {
  ButtonArea,
  IconArrowDown,
  IconArrowUp,
  list,
  useMeasure,
  colors,
} from "uikit"
import { NftCard } from "./NftCard"
import nfts from "./nfts"

const CARD_SHIFT_BASE = [8, 8]
const CARD_SHIFT_RAND = [16, 16]

const STACK_BOUNDS_DEFAULT = {
  shift: [0, 0],
  cardHeight: -1,
  cardWidth: -1,
  height: -1,
  width: -1,
}

const _nfts = nfts.map(([contract, tokenId, url]) => ({
  contract,
  tokenId,
  url,
}))

function cardWrapper(
  seed,
  { angleMin = 2, angleMax = 10, xMin = 100, xMax = 200 } = {}
) {
  let cardUid = 0
  return function card(nft) {
    const angle = Math.random * 2
    const leaveX = Math.random * 2
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
    }
  }
}

const card = cardWrapper(1234567 + _nfts.length)

function useCardsStack() {
  const [{ cards, direction }, setStack] = useState(() => ({
    cards: nfts.map(([contract, tokenId, url]) =>
      card({ contract, tokenId, url })
    ),
    direction: 1,
  }))

  const pick = (id) => {
    setStack(({ cards }) => {
      const index = cards.findIndex((card) => card.id === id)
      return {
        cards: [
          ...cards.slice(index),
          ...cards.slice(0, index).map(({ nft }) => card(nft)),
        ],
        direction: 1,
      }
    })
  }

  const rotate = (backward = false) => {
    setStack(({ cards }) => ({
      cards: backward
        ? [card(cards[cards.length - 1].nft), ...cards.slice(0, -1)]
        : [...cards.slice(1), card(cards[0].nft)],
      direction: backward ? -1 : 1,
    }))
  }

  return {
    direction,
    rotate,
    stack: cards,
    pick,
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
  const [stackBounds, setStackBounds] = useState(STACK_BOUNDS_DEFAULT)
  const { rotate, stack, direction, pick } = useCardsStack()

  return (
    <div
      css={css`
        position: relative;
        display: flex;
        opacity: ${Number(stackBounds.width !== -1)};
        left: ${-(stackBounds.width - stackBounds.cardWidth) / 2 -
        stackBounds.shift[0]}px;
        top: ${-(stackBounds.height - stackBounds.cardHeight) / 2 -
        stackBounds.shift[1]}px;
      `}
    >
      <div
        css={css`
          position: relative;
          z-index: 1;
        `}
      >
        <NftCards
          stack={stack}
          onStackBounds={setStackBounds}
          direction={direction}
          pickCard={pick}
        />
      </div>
      <div
        css={css`
          position: absolute;
          z-index: 2;
          top: ${stackBounds.shift[1] + stackBounds.height / 2}px;
          left: calc(5gu + ${stackBounds.shift[0] + stackBounds.width}px);
          transform: translateY(-50%);
        `}
      >
        <Controls onUp={() => rotate()} onDown={() => rotate(true)} />
      </div>
    </div>
  )
}

function NftCards({ direction, stack, onStackBounds, pickCard }) {
  const [cardRef, cardBounds] = useMeasure()
  const stackBounds = useRef(STACK_BOUNDS_DEFAULT)

  const cards = stack.map((card, stackIndex) => ({
    ...card,
    position: [
      -CARD_SHIFT_BASE[0] * stackIndex + card.shift[0],
      -CARD_SHIFT_BASE[1] * stackIndex + card.shift[1],
    ],
  }))

  const transition = useTransition(cards, {
    keys: ({ id }) => id,
    config: { mass: 1, tension: 500, friction: 60 },
    trail: 20,
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
    update: ({ position }) => ({
      opacity: 1,
      position,
      angle: 0,
      scale: 1,
      leaving: false,
    }),
    leave: ({ position: [x, y], id, anim }) => ({
      opacity: 0,
      position: [
        direction === 1 ? x + anim.leaveX : x,
        direction === 1 ? y + 200 : y,
      ],
      angle: direction === 1 ? anim.angle : 0,
      scale: direction === 1 ? 1 : 0.8,
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

    onStackBounds(stackBounds.current)
  }, [cardBounds, onStackBounds, cards])

  const { cardWidth, cardHeight } = stackBounds.current

  return (
    <div
      css={css`
        position: relative;
        width: ${cardWidth}px;
        height: ${cardHeight}px;
        opacity: ${cardWidth > 0 ? 1 : 0};
      `}
    >
      {transition(
        (
          { leaving, background, opacity, position, angle, scale },
          { id, nft },
          t,
          index
        ) => {
          return (
            <animated.div
              ref={index === 0 && cardWidth === -1 ? cardRef : null}
              style={{
                background: leaving.to((lf) =>
                  id === cards[0].id || lf ? colors.primary : colors.background
                ),
                transform: to(
                  [position, angle, scale],
                  ([x, y], angle, scale) => `
                    scale3d(${scale}, ${scale}, 1)
                    translate3d(${x}px, ${y}px, 0)
                    rotate3d(0, 0, 1, ${angle}deg)
                  `
                ),
                opacity:
                  direction === 1
                    ? to(opacity, [0, 0.6, 1], [0, 1, 1])
                    : to(opacity, [0, 0.7, 1], [0, 1, 1]),
                zIndex: cards.length - index,
                position: "absolute",
                transformOrigin: "50% 100%",
              }}
              onClick={() => pickCard(id)}
            >
              <NftCard nft={nft} active={stack[0].id === id} />
            </animated.div>
          )
        }
      )}
    </div>
  )
}

function Controls({ onUp, onDown }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1gu;
      `}
    >
      <ButtonArea
        onClick={onUp}
        css={css`
          color: ${colors.background};
          background: ${colors.primary};
          &:active {
            transform: translate(1px, 1px);
          }
        `}
      >
        <IconArrowUp />
      </ButtonArea>
      <ButtonArea
        onClick={onDown}
        css={css`
          color: ${colors.primary};
          background: ${colors.background};
          border: 3px solid ${colors.primary};
          &:active {
            transform: translate(1px, 1px);
          }
        `}
      >
        <IconArrowDown />
      </ButtonArea>
    </div>
  )
}
