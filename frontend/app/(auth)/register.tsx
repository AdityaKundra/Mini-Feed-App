import { View, Image, StyleSheet, ViewStyle, ImageStyle, TextStyle, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@/components/ui/Text";
import { Spacing, Colors, BorderRadius, VALIDATION } from '@/constants/theme';
import logo from '@/assets/images/logo.png';
import { Input } from "@/components/ui/Input";
import { Button } from '@/components/ui/Button';
import { useForm, Controller } from 'react-hook-form';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { extractErrorMessage } from '@/utils/errorUtils';


export default function RegisterScreen() {

  interface RegisterFormData {
    name: string;
    email: string;
    password: string;
  }

  const { register: registerUser, isAuthenticated } = useAuth();
  const [registerError, setRegisterError] = useState<string>('');

  const { control, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setRegisterError('');
      await registerUser(data.name, data.email, data.password);
      // Don't redirect here - let useEffect handle it when isAuthenticated updates
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      setRegisterError(errorMessage);
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.centerContent}>
          <View style={styles.appNameHeader}>
            <Image source={logo} style={styles.appLogo} />
            <Text variant="heading">Register</Text>
            <Text variant="label" style={{ paddingVertical: Spacing.sm }}>
              Create a new account
            </Text>
          </View>
          <View style={styles.loginForm}>
            {registerError ? (
              <View style={styles.errorContainer}>
                <Text variant="caption" style={styles.errorText}>{registerError}</Text>
              </View>
            ) : null}

            <View style={styles.loginInputs}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    value={field.value}
                    onChangeText={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </View>
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
            <View style={styles.loginInputs}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: VALIDATION.PASSWORD_MIN_LENGTH,
                    message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
                  },
                  maxLength: {
                    value: VALIDATION.PASSWORD_MAX_LENGTH,
                    message: `Password must be at most ${VALIDATION.PASSWORD_MAX_LENGTH} characters`,
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

            <View style={styles.loginBtn}>
              <Button 
                title="Register"
                onPress={handleSubmit(handleRegister)}
                disabled={!isValid || isSubmitting}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
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
  backButton:{
    marginVertical: Spacing.md
  },
  centerContent:{
    flex: 1,
    justifyContent: 'center'
  },
  loginForm:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: Spacing.sm,
  },
  loginInputs:{
    marginVertical: Spacing.sm,
  },
  loginBtn:{
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
