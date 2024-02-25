import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const CircleIcon = (props: SvgProps) => (
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
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
    />
  </Svg>
)
export default CircleIcon
