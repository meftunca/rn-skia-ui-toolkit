import { COLORS } from '@/Assets/Colors';

const colors = Object.values(COLORS);
const strokes = Array(8)
  .fill('')
  .map((_, i) => i + 1);
export type DrawingModeTypes = 'draw' | 'erase' | 'select' | 'text';
const modes: DrawingModeTypes[] = ['draw', 'erase', 'select', 'text'];
const modeIcons = {
  erase: 'eraser-variant',
  draw: 'brush',
  select: 'cursor-default-click-outline',
  text: 'format-text',
};
export default {
  colors,
  strokes,
  modes,
  modeIcons,
};
