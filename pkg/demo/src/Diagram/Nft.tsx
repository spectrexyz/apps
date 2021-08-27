import { a, useTransition } from "react-spring"

export function Nft() {
  const items = [<Icon3 />, <Icon2 />, <Icon1 />, <Icon4 />]

  const transition = useTransition(items, {
    trail: 100,
    delay: 200,
    config: {
      mass: 1.5,
      tension: 400,
      friction: 30,
    },
    from: { scale: 0.7, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
  })

  return (
    <g fill="none">
      {transition(({ opacity, scale }, item) => (
        <a.g
          key={items.indexOf(item)}
          opacity={opacity}
          transform-origin="24 24"
          transform={scale.to((v) => `scale(${v})`)}
        >
          {item}
        </a.g>
      ))}
    </g>
  )
}

function Icon1() {
  return (
    <g>
      <path stroke="#C0BBFF" d="M28.5 28.5h22.997v23H28.5z" />
      <path
        d={`
          M34.315 36.224h7.01c.465 0 .91.182 1.24.504.328.323.513.76.513
          1.216v5.16a.426.426 0 0 1-.129.303.442.442 0 0 1-.31.126h-7.01a1.77
          1.77 0 0 1-1.24-.504 1.703 1.703 0 0
          1-.513-1.216v-5.159c0-.114.047-.223.129-.304a.442.442 0 0 1
          .31-.126v0zM43.078 39.019l3.067-1.72v5.16l-3.067-1.72
        `}
        stroke="#C0BBFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

function Icon2() {
  return (
    <g>
      <path stroke="#C0BBFF" d="M28.5.5h23v23h-23z" />
      <path
        d={`
          M43.287 15.762c.884 0 1.6-.674 1.6-1.506s-.716-1.507-1.6-1.507c-.884
          0-1.6.675-1.6 1.507 0 .832.716 1.506 1.6 1.506zM35.972 17.484c.884 0
          1.6-.674 1.6-1.506s-.716-1.507-1.6-1.507c-.884 0-1.6.675-1.6 1.507 0
          .832.716 1.506 1.6 1.506z
        `}
        stroke="#C0BBFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.572 15.978V8.444l7.315-1.722v7.534"
        stroke="#C0BBFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

function Icon3() {
  return (
    <g>
      <path stroke="#C0BBFF" d="M.5.5h22.997v23H.5z" />
      <path
        d={`
          M16.83 7.583H7.19a.434.434 0 0 0-.437.43v7.75c0
          .237.196.43.438.43h9.64a.434.434 0 0 0 .437-.43v-7.75a.434.434 0 0
          0-.438-.43z
        `}
        stroke="#C0BBFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`
          m6.753 14.04 2.757-2.709a.438.438 0 0 1 .31-.126.446.446 0 0 1
          .31.126l2.447 2.405a.44.44 0 0 0 .477.093.44.44 0 0 0
          .143-.093l1.133-1.113a.438.438 0 0 1 .31-.126.446.446 0 0 1
          .31.126l2.318 2.278
        `}
        stroke="#C0BBFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`
          M13.544 11.027c.363 0 .657-.29.657-.646a.652.652 0 0
          0-.657-.646.652.652 0 0 0-.657.646c0 .357.294.646.657.646z
        `}
        fill="#C0BBFF"
      />
    </g>
  )
}

function Icon4() {
  return (
    <g>
      <path stroke="#C0BBFF" d="M.5 28.5h22.997v23H.5z" />
      <path
        d={`
          M12.449 36.874v6.027M17.487 36.874H14.86v6.027M16.83
          39.888H14.86M8.943 39.888h1.315v1.291c0 .457-.185.895-.513 1.218a1.769
          1.769 0 0 1-1.24.504c-.465 0-.91-.181-1.24-.504a1.707 1.707 0 0
          1-.512-1.218v-2.583c0-.419.155-.823.437-1.138a1.777 1.777 0 0 1
          2.299-.287c.353.236.607.59.714.995
        `}
        stroke="#C0BBFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}
