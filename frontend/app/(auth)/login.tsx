import { View, Image, StyleSheet, ViewStyle, ImageStyle, TextStyle, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@/components/ui/Text";
import { Spacing, Colors, BorderRadius } from '@/constants/theme';
import logo from '@/assets/images/logo.png';
import { Input } from "@/components/ui/Input";
import { Button } from '@/components/ui/Button';
import { useForm, Controller } from 'react-hook-form'
import { VALIDATION } from '@/constants/theme'
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { extractErrorMessage } from '@/utils/errorUtils';
import { kMaxLength } from "node:buffer";


export default function LoginScreen() {

  interface LoginFormData {
    email: string
    password: string
  }

  const { login, isAuthenticated } = useAuth();
  const [loginError, setLoginError] = useState<string>('');

  const { control, handleSubmit, formState: { errors, isSubmitting, isValid }, } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleLogin = async (data: LoginFormData) => {
    try {
      setLoginError('');
      await login(data.email, data.password);
      // Don't redirect here - let useEffect handle it when isAuthenticated updates
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setLoginError(errorMessage);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.centerContent}>
          <View style={styles.appNameHeader}>
            <Image source={logo} style={styles.appLogo} />
            <Text variant="heading">Login</Text>
            <Text variant="label" style={{ paddingVertical: Spacing.sm }}>
              Please Login to your Account
            </Text>
          </View>

          <View style={styles.loginForm}>
            {loginError ? (
              <View style={styles.errorContainer}>
                <Text variant="caption" style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}
            <View style={styles.loginInputs}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </View>
            <View>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  maxLength: {
                    value: VALIDATION.PASSWORD_MAX_LENGTH,
                    message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
                  },
                  minLength: {
                    value: VALIDATION.PASSWORD_MIN_LENGTH,
                    message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
                  }
                }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                    maxLength={VALIDATION.PASSWORD_MAX_LENGTH}
                    isPassword={true}
                  />
                )}
              />
            </View>

            <View style={styles.LoginFormBottomBar}>
              <View>
                <Text variant="caption">Remeber Me</Text>
              </View>
              <View>
                <Text variant="caption">Forget Password</Text>
              </View>
            </View>
          </View>

          <View style={styles.loginBtn}>
            <Button
              title="Login"
              onPress={handleSubmit(handleLogin)}
              disabled={!isValid || isSubmitting}
            >
            </Button>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

interface Styles {
  container: ViewStyle;
  appNameHeader: ViewStyle;
  appLogo: ImageStyle;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    // justifyContent: 'center'
  },
  appNameHeader: {
    flexDirection: "column",
    gap: Spacing.sm
  },
  appLogo: {
    height: 60,
    width: 60,
    marginRight: Spacing.md,
  },
  backButton: {
    marginTop: Spacing.md
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center'
  },
  loginForm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: Spacing.sm,
  },
  loginInputs: {
    marginVertical: Spacing.md
  },
  LoginFormBottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.sm
  },
  loginBtn: {
    marginVertical: Spacing.md
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
})