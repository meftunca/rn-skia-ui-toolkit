import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const StarIcon = (props: SvgProps) => (
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
      d="M12 2l2.371 7.262h7.629l-6.171 4.5 2.371 7.238-6.371-4.738-6.171 4.5 2.371-7.238-6.171-4.5h7.629L12 2Z"
    />
  </Svg>
)
export default StarIcon
