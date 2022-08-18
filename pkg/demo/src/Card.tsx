import { Button, Card, gu, list, Moire } from "moire"
import { useEffect, useState } from "react"

const CARDS_COUNT = 9
const CARD_WIDTH = 50 * gu
const CARD_HEIGHT = 75 * gu
const GRID_COLS = 3
const GRID_GAP = 3 * gu

function CardDemo() {
  const [loading, setLoading] = useState(true)
  const loadingStates = useRandomLoadingStates(CARDS_COUNT, loading)

  useEffect(() => {
    if (loadingStates.every((v) => v === false)) {
      setLoading(false)
    }
  }, [loadingStates])

  return (
    <div
      onClick={() => setLoading((v) => !v)}
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_COLS}, ${CARD_WIDTH}px)`,
        gap: GRID_GAP,
        padding: "10gu 0",
      }}
    >
      {loadingStates.map((loading, index) => (
        <SingleCard
          key={index}
          loading={loading}
        />
      ))}

      {/* prevents any resizing of the global moiré */}
      <div css={{ opacity: 0 }}>
        <Moire width={CARD_WIDTH} height={10 * gu} />
      </div>
    </div>
  )
}

function SingleCard({ loading }: { loading: boolean }) {
  return (
    <div>
      <Card height={CARD_HEIGHT} loading={loading} radius={6}>
        <div
          css={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            background: "colors.layer2",
          }}
        >
          <div
            css={{
              overflow: "hidden",
              aspectRatio: "1",
            }}
          >
            <img
              alt=""
              src={"https://ik.imagekit.io"
                + "/p/rvc6dzh9TPV6aqpbzd"
                + "/https%3A%2F%2Fipfs"
                + ".io%2Fipfs%2FQmTDc78HS1Me5bz6oAiCjSXPnZdLiDaqDKdgyGiyFoYJ7h%2Fimage.jpeg?tr=n-card"}
              css={{
                display: "block",
                width: "100%",
                aspectRatio: "1",
                objectFit: "cover",
              }}
            />
          </div>
          <div css={{ padding: "3gu" }}>
            <div
              css={{
                marginBottom: "2gu",
                fontSize: "28px",
              }}
            >
              Helping Hand
            </div>
            <div
              css={{
                marginBottom: "3gu",
                fontFamily: "fonts.sans",
                fontSize: "16px",
                "a": {
                  textDecoration: "underline",
                },
              }}
            >
              <a>
                Ringo Starr
              </a>
            </div>
            <Button label="Fractionalize" mode="primary" wide />
          </div>
        </div>
      </Card>
    </div>
  )
}

function useRandomLoadingStates(
  count: number,
  loading: boolean,
  min = 1000,
  max = 4000,
) {
  const [loadingStates, setLoadingStates] = useState(list(count, () => loading))

  useEffect(() => {
    setLoadingStates(list(count, () => loading))

    if (!loading) {
      return
    }

    const timeouts = list<[number, null | ReturnType<typeof setTimeout>]>(
      count,
      () => [
        min + Math.random() * (max - min),
        null,
      ],
    )

    timeouts.forEach((timeout, _index) => {
      timeout[1] = setTimeout(() => {
        setLoadingStates((loading) => (
          loading.map((isLoading, index) => (
            index === _index ? false : isLoading
          ))
        ))
      }, timeout[0])
    })

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout[1] !== null) {
          clearTimeout(timeout[1])
        }
      })
    }
  }, [count, loading])

  return loadingStates
}

export { CardDemo as Card }
