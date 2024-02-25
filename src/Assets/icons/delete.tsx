import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DeleteIcon = (props: SvgProps) => (
  <Svg
  width={24}
  height={24}
  fill="currentColor"
  stroke="currentColor"
  strokeWidth={0}
  viewBox="0 0 24 24"
  {...props}
>
  <Path fill="none" stroke="none" d="M0 0h24v24H0V0z" />
  <Path
    stroke="none"
    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4h-3.5z"
  />
</Svg>
)
export default DeleteIcon
