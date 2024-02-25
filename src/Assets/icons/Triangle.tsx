import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TriangleIcon = (props: SvgProps) => (
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
      d="M12 4L5 20h14L12 4Z"
    />
  </Svg>
)
export default TriangleIcon
