import { ComponentPropsWithRef, forwardRef, ReactNode } from "react"

type LinkIconProps = ComponentPropsWithRef<"a"> & {
  icon: ReactNode
  label: ReactNode
}

export const LinkIcon = forwardRef<HTMLAnchorElement, LinkIconProps>(
  function LinkIcon({ icon, label, ...props }, ref) {
    return (
      <a
        ref={ref}
        {...props}
        css={({ colors }) => ({
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
          color: colors.content,
          "&:active": {
            transform: "translate(1px, 1px)",
          },
        })}
      >
        {icon}
        <span>{label}</span>
      </a>
    )
  },
)
