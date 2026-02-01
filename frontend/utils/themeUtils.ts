import { Colors } from '@/constants/theme';

export type ThemeMode = 'light' | 'dark';

export const getThemeColors = (mode: ThemeMode) => {
  return mode === 'dark' ? Colors.dark : Colors.light;
};
