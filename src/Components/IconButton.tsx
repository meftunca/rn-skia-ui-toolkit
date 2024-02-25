import * as React from "react";
import SelectIcon from "@/Assets/icons/select";
import RedoIcon from "@/Assets/icons/redo";
import TextIcon from "@/Assets/icons/text";
import DrawIcon from "@/Assets/icons/draw";
import EraseIcon from "@/Assets/icons/erase";
import UndoIcon from "@/Assets/icons/undo";
import DeleteIcon from "@/Assets/icons/delete";
import SendIcon from "@/Assets/icons/send";
import StickerEmojiIcon from "@/Assets/icons/stickerSmile";
import ArrowIcon from "@/Assets/icons/Arrow";
import StarIcon from "@/Assets/icons/Star";
import CircleIcon from "@/Assets/icons/Circle";
import SquareIcon from "@/Assets/icons/Square";
import LineIcon from "@/Assets/icons/Line";
import TriangleIcon from "@/Assets/icons/Triangle";
import DrawPenIcon from "@/Assets/icons/DrawPen";
import ShapePlusIcon from "@/Assets/icons/ShapePlus";

import { TouchableOpacity, View, ViewProps, StyleSheet } from "react-native";

type IconButtonProps = TouchableOpacity & {
  color?: string;
  icon:
    | "select"
    | "text"
    | "delete"
    | "draw"
    | "erase"
    | "undo"
    | "redo"
    | "arrow"
    | "star"
    | "circle"
    | "square"
    | "send"
    | "triangle"
    | "line"
    |"sticker-emoji"
    | "format-text-bold";
  size?: number;
  style?: ViewProps["style"];
};

const iconsPath = {
  select:SelectIcon,
  text:TextIcon,
  delete:DeleteIcon,
  draw:DrawIcon,
  erase:EraseIcon,
  undo:UndoIcon,
  redo:RedoIcon,
  "format-text-bold":TextIcon,
  send:SendIcon,
  "sticker-emoji":StickerEmojiIcon,
  arrow:ArrowIcon,
  star:StarIcon,
  circle:CircleIcon,
  square:SquareIcon,
  line:LineIcon,
  triangle:TriangleIcon,
  "draw-pen":DrawPenIcon,
  "shape-plus":ShapePlusIcon

};
const Style = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const IconButton: React.FC<IconButtonProps> = ({
  color="#fff",
  icon,
  size = 24,
  style,
  ...props
}: IconButtonProps) => {
  const RenderedIcon = iconsPath[icon]||View;
  return (
    <TouchableOpacity style={{
      padding:8,
      borderRadius:16
    }} {...props}>
      <View style={[Style.icon, style,{
         tintColor: color,
      }]}>
        <RenderedIcon width={size} height={size} />
      </View>
    </TouchableOpacity>
  );
  }

export default IconButton;