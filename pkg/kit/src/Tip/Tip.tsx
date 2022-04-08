import { IconHeartbeat } from "../icons"

export function Tip(
  { children, title }: {
    children: ReactNode
    title: ReactNode
  },
) {
  return (
    <section
      css={({ colors, fonts }) => ({
        padding: "2gu",
        color: colors.accent2,
        fontFamily: fonts.sans,
        background: "#1F244D",
        borderRadius: "6px",
      })}
    >
      <h1
        css={{
          display: "flex",
          gap: "1gu",
          alignItems: "center",
          paddingBottom: "1.5gu",
          textTransform: "uppercase",
        }}
      >
        <span css={{ display: "flex", transform: "translateY(1px)" }}>
          <IconHeartbeat width="18" height="18" />
        </span>
        {title}
      </h1>
      <div>
        {children}
      </div>
    </section>
  )
}
