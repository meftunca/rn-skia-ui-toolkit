import * as React from "react"
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const SquareIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <Path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4h16v16H4V4Z"
    />
  </Svg>
)
export default SquareIcon
