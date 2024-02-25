import * as React from "react"
import Svg, { SvgProps, Path, Ellipse } from "react-native-svg"
const StickerEmojiIcon = (props: SvgProps) => (
  <Svg
  width={24}
  height={24}
  fill="currentColor"
  stroke="currentColor"
  strokeWidth={0}
  viewBox="0 0 256 256"
  {...props}
>
  <Path
    stroke="none"
    d="M168 34H88a54.06 54.06 0 0 0-54 54v80a54.06 54.06 0 0 0 54 54h48a5.86 5.86 0 0 0 1.9-.31c25.84-8.61 75.18-57.95 83.79-83.79a5.86 5.86 0 0 0 .31-1.9V88a54.06 54.06 0 0 0-54-54ZM46 168V88a42 42 0 0 1 42-42h80a42 42 0 0 1 42 42v42h-26a54.06 54.06 0 0 0-54 54v26H88a42 42 0 0 1-42-42Zm96 38.67V184a42 42 0 0 1 42-42h22.67c-11.83 21.1-43.57 52.84-64.67 64.67Z"
  />
</Svg>
)
export default StickerEmojiIcon
