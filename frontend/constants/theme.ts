import { Platform } from 'react-native';
import Constants from 'expo-constants';

const themeColors = {
  light: {
    primary: '#6366F1',
    primaryLight: '#A5B4FC',
    primaryDark: '#4338CA',
    // Backgrounds
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#F8FAFC',

    text: '#1E293B',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',

    border: '#E2E8F0',
    separator: '#F1F5F9',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',

    like: '#EF4444',
    comment: '#6366F1',

    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowLight: 'rgba(0, 0, 0, 0.05)',
  },
  dark: {
    primary: '#818CF8',
    primaryLight: '#C7D2FE',
    primaryDark: '#6366F1',


    background: '#0F172A',
    surface: '#1E293B',
    surfaceVariant: '#334155',


    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textMuted: '#64748B',


    border: '#334155',
    separator: '#334155',
    accent: '#FBBF24',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',


    like: '#F87171',
    comment: '#818CF8',

    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowLight: 'rgba(0, 0, 0, 0.2)'
  },
};

export const Colors = {
  ...themeColors.light,
  light: themeColors.light,
  dark: themeColors.dark,


  primary: '#6366F1',
  background: '#FAFAFA',
  border: '#E2E8F0',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  separator: '#F1F5F9',
};


export const FontSize = {

  displayLarge: 32,
  displayMedium: 28,
  displaySmall: 24,

  headlineLarge: 22,
  headlineMedium: 20,
  headlineSmall: 18,

  titleLarge: 16,
  titleMedium: 14,
  titleSmall: 12,

  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,

  labelLarge: 14,
  labelMedium: 12,
  labelSmall: 11,

  heading: 28,
  title: 18,
  body: 16,
  label: 14,
  caption: 12,
};

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,

  tiny: 2,
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  xxlarge: 24,
};

export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,

  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  fullLegacy: '100%',
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const __DEV__ = true;

// Use http when backend is running without TLS on local network
export const API_BASE_URI = 'http://172.16.3.219:4000';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
};

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 32,
  TITLE_MAX_LENGTH: 70,
  DESCRIPTION_MAX_LENGTH: 200,
  COMMENT_MAX_LENGTH: 200,
};
