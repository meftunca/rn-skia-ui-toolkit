import * as React from "react"
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const ArrowIcon = (props: SvgProps) => (
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
      d="M19 12H5m7-7l7 7-7 7"
    />
  </Svg>
)
export default ArrowIcon
