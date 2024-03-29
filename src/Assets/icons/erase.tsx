import * as React from "react"
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const EraseIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"    width={24}
    height={24}
    {...props}
  >
    <Path stroke="#ffffff" d="M10.856 20h.3c.435-.034.86-.218 1.193-.55l.697-.697-7.793-7.793-.697.696a1.9 1.9 0 0 0 0 2.688l5.106 5.105c.333.333.759.517 1.194.551Zm2.357 0H18.5a.5.5 0 1 1 0 1h-7.309a2.918 2.918 0 0 1-.37 0H5.5a.5.5 0 1 1 0-1h3.299l-4.95-4.95a2.9 2.9 0 0 1 0-4.1l7.106-7.106a2.9 2.9 0 0 1 4.101 0l5.106 5.105a2.9 2.9 0 0 1 0 4.102L13.213 20ZM5.96 10.253l7.793 7.793 5.702-5.702a1.9 1.9 0 0 0 0-2.688L14.35 4.551a1.9 1.9 0 0 0-2.687 0L5.96 10.253Z" />
  </Svg>
)
export default EraseIcon
