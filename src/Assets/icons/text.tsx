import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TextIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"    width={24}
    height={24}
    {...props}
  >
    <Path
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 4v16m9-8v8M6 20h4m5 0h4M13 7V4H3v3m18 7v-2h-8v2"
    />
  </Svg>
)
export default TextIcon
