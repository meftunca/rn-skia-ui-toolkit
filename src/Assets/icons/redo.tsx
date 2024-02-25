import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const RedoIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"    width={24}
    height={24}
    {...props}
  >
  
    <Path
      fill="#ffffff"
      d="M16.82,4,15.4,5.44,17.94,8H8.23a6,6,0,0,0,0,12h2V18h-2a4,4,0,0,1,0-8h9.71L15.4,12.51l1.41,1.41L21.77,9Z"
    />
  </Svg>
)
export default RedoIcon
