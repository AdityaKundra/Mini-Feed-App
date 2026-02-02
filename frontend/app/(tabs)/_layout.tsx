import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { getThemeColors } from '@/utils/themeUtils';

export default function TabLayout() {
  const router = useRouter();
  const { logout } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const themeColors = getThemeColors(mode);

  const handleCreatePost = () => {
    router.push('/(tabs)/add-post');
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textSecondary,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.border,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerShown: true,
          headerStyle: {
            backgroundColor: themeColors.surface,
          },
          headerTintColor: themeColors.text,
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: Spacing.md, gap: Spacing.md }}>
              <TouchableOpacity onPress={toggleTheme}>
                <Ionicons
                  name={mode === 'dark' ? 'sunny' : 'moon'}
                  size={24}
                  color={themeColors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Ionicons name="log-out" size={24} color={themeColors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Add Post',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={28} color={color} />,
          headerShown: false,
          headerStyle: {
            backgroundColor: themeColors.surface,
          },
          headerTintColor: themeColors.text,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push('/(tabs)/add-post');
          },
        }}
      />
    </Tabs>
  );
}