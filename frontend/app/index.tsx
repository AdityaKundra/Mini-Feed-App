import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Text } from '@/components/ui/Text';
import { Colors, Spacing } from '@/constants/theme';
import logo from '@/assets/images/logo.png';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Wait a bit for splash animation
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)');
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={logo} style={styles.appLogo} />
        <Text variant="heading" style={styles.title}>
          Mini Feed
        </Text>
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    marginBottom: Spacing.xl,
  },
  loader: {
    marginTop: Spacing.lg,
  },
  appLogo: {
    height: 60,
    width: 60,
    marginBottom: Spacing.md,
  },
});