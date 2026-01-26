import React, {useState} from "react";
import { View, ViewStyle, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, Spacing, BorderRadius } from '@/constants/theme';

interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    error?: string;
    maxLength?: number;
    style?: ViewStyle;
    multiline?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

export function Input({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    icon,
    error,
    maxLength,
    style,
    multiline = false,
    keyboardType = 'default',
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const showPasswordToggle = secureTextEntry && value.length > 0;

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error && styles.inputError]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={Colors.textSecondary}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, icon && styles.inputWithIcon, multiline && styles.inputMultiline]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textSecondary}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    multiline={multiline}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                />
                {showPasswordToggle && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={Colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {maxLength && (
                <Text style={styles.charCount}>
                    {value.length}/{maxLength}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontSize: FontSize.label,
        color: Colors.textSecondary,
        marginBottom: Spacing.sm,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        minHeight: 50,
    },
    inputError: {
        borderColor: '#FF0000',
    },
    input: {
        flex: 1,
        fontSize: FontSize.body,
        color: Colors.textPrimary,
        paddingVertical: Spacing.md,
    },
    inputWithIcon: {
        marginLeft: Spacing.sm,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: Spacing.md,
    },
    icon: {
        marginRight: Spacing.sm,
    },
    eyeIcon: {
        padding: Spacing.xs,
    },
    errorText: {
        color: '#FF0000',
        fontSize: FontSize.caption,
        marginTop: Spacing.xs,
    },
    charCount: {
        color: Colors.textSecondary,
        fontSize: FontSize.caption,
        textAlign: 'right',
        marginTop: Spacing.xs,
    },
});