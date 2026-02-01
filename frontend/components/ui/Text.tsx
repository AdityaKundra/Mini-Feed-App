import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import {Colors, BorderRadius, FontSize, Spacing} from '@/constants/theme';

interface TextProps {
    children: React.ReactNode,
    variant?: 'heading' | 'title' | 'body' | 'label' | 'caption',
    style?: TextStyle,
    color?: string,
    bold?: boolean,
}

export const Text = ({
    children,
    variant = 'body',
    style,
    color,
    bold
}: TextProps)=>{

    const getTextStyle = ()=>{
        const baseStyle = styles[variant];

        return {
            ...baseStyle,
            ...(color && { color }),
            ...(bold && { fontWeight: 'bold' }),
            ...style
        }
    }

    return (
        <RNText style={getTextStyle() as TextStyle}>
            {children}
        </RNText>
    )

}

const styles = StyleSheet.create({
    heading: {
      fontSize: FontSize.heading,
      fontWeight: 'bold',
      color: Colors.textPrimary,
    },
    title: {
      fontSize: FontSize.title,
      fontWeight: '600',
      color: Colors.textPrimary,
    },
    body: {
      fontSize: FontSize.body,
      color: Colors.textPrimary,
    },
    label: {
      fontSize: FontSize.label,
      color: Colors.textSecondary,
    },
    caption: {
      fontSize: FontSize.caption,
      color: Colors.textSecondary,
    },
  });