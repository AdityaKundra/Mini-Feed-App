import React, {useState} from "react";
import { View, ViewStyle, TextStyle, StyleSheet, TextInput } from "react-native";
import { Text } from "@/components/ui/Text";
import { Colors, FontSize, Spacing, BorderRadius, Shadows } from '@/constants/theme';

interface InputProps {
    label: string,
    value: string,
    onChangeText: (text: string)=>void,
    placeholder: string,
    isDisable?: boolean,
    error?: string,
    maxLength?: number
    style?: TextStyle,
    isPassword?: boolean,
    multiline?: boolean,
    numberOfLines?: number
}

export const Input =({
    label,
    value,
    onChangeText,
    placeholder,
    isDisable = false,
    error,
    maxLength,
    style,
    isPassword = false,
    multiline = false,
    numberOfLines = 1
}: InputProps) =>{

    const isOverLimit = maxLength !== undefined && value.length > maxLength;

    return (
        <View>
        <Text variant="label" style={ styles.label}>{label}</Text>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            maxLength={maxLength}
            editable={!isDisable}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            style={[styles.input,
                isOverLimit ? styles.inputError : styles.input,
                isDisable && styles.inputDisabled,
                multiline && styles.multilineInput,
                style
            ]}
            secureTextEntry={isPassword}
            focusable={false}
            textAlignVertical={multiline ? 'top' : 'center'}
        />
        
        {!isDisable && (
            <>
                {error && <Text variant="caption" color={Colors.textSecondary} bold style={styles.errorText}>{error}</Text>}

                {maxLength && (
                    <Text variant="caption" color={Colors.textSecondary} bold style={styles.charCount}>
                        {value.length}/{maxLength}
                    </Text>
                )}
            </>
        )}

    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: Spacing.md,
    },
    label:{
        fontSize: FontSize.labelLarge,
        marginBottom: Spacing.sm,
        color: Colors.text,
        fontWeight: '600',
    },
    errorText: {
        color: Colors.error,
        fontSize: FontSize.labelSmall,
        marginTop: Spacing.xs,
        fontWeight: '500',
    },
    input: {
        flex: 1,
        fontSize: FontSize.bodyLarge,
        color: Colors.text,
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.lg,
        minHeight: 56,
        backgroundColor: Colors.surface,
        ...Shadows.sm,
    },
    charCount:{
        color: Colors.textMuted,
        fontSize: FontSize.labelSmall,
        textAlign: 'right',
        marginTop: Spacing.xs,
        fontWeight: '500',
    },
    inputError:{
        borderColor: Colors.error,
        borderWidth: 2,
    },
    inputDisabled:{
        backgroundColor: Colors.border,
        opacity: 0.6,
    },
    multilineInput: {
        textAlignVertical: 'top',
        paddingTop: Spacing.md,
    }
});