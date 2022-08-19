export function Label({ text, ...props }) {
  return (
    <text textAnchor="middle" fill="white" fontSize="10" {...props}>
      {text}
    </text>
  )
}
