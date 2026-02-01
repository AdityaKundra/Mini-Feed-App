import { View, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Colors, Spacing } from '@/constants/theme';
import logo from '@/assets/images/logo.png';
import { useRouter } from 'expo-router';

export default function AuthLanding() {

  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.appNameHeader}>
        <Image source={logo} style={styles.appLogo} />
        <Text variant="heading">Mini Feed</Text>
      </View>

      <Text variant="title" style={styles.title}>
        Welcome
      </Text>
      <Text variant="label" style={styles.subtitle}>
        Please sign in or create an account
      </Text>

      <View style={styles.buttons}>
        <Button title="Login" onPress={() => { router.push('/(auth)/login') }} />
        <Button
          title="Register"
          variant="secondary"
          onPress={() => { router.push('/(auth)/register') }}
        />
      </View>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  appNameHeader: ViewStyle;
  appLogo: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  buttons: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  appNameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  appLogo: {
    height: 60,
    width: 60,
    marginRight: Spacing.md,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  subtitle: {
    marginBottom: Spacing.xl,
  },
  buttons: {
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
});