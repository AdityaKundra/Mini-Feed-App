import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  fullWidth = true,
}: ButtonProps) => {
  const getButtonStyle = () => {
    if (disabled || loading) {
      return [styles.button, styles.disabled, fullWidth && styles.fullWidth, style];
    }
    
    switch (variant) {
      case 'primary':
        return [styles.button, styles.primary, fullWidth && styles.fullWidth, style];
      case 'secondary':
        return [styles.button, styles.secondary, fullWidth && styles.fullWidth, style];
      case 'outline':
        return [styles.button, styles.outline, fullWidth && styles.fullWidth, style];
      default:
        return [styles.button, styles.primary, fullWidth && styles.fullWidth, style];
    }
  };

  const getTextStyle = (): TextStyle => {
    if (disabled || loading) {
      return styles.disabledText;
    }
    
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
      case 'outline':
        return styles.secondaryText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.background : Colors.primary} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Shadows.md,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.textMuted,
    opacity: 0.6,
    ...Shadows.none,
  },
  primaryText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});