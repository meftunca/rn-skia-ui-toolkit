import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DrawIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"    width={24}
    height={24}
    {...props}
  >
    <Path stroke="#ffffff" d="m7.293 18 11.5-11.5L16.5 4.207 5 15.707V18h2.293ZM4 18.5v-3a.5.5 0 0 1 .146-.354l12-12a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-12 12A.5.5 0 0 1 7.5 19h-3a.5.5 0 0 1-.5-.5Zm.5 2.5a.5.5 0 1 1 0-1h10.007a.5.5 0 1 1 0 1H4.5Z" />
  </Svg>
)
export default DrawIcon
