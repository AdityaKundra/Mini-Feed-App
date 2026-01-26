import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors, Spacing } from '@/constants/theme';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Buttons Section */}
      <View style={styles.section}>
        <Button 
          title="Primary Button" 
          onPress={() => console.log('Primary clicked')} 
        />
        
        <View style={styles.spacing} />
        
        <Button 
          title="Secondary Button" 
          onPress={() => console.log('Secondary clicked')}
          variant="secondary"
        />
        
        <View style={styles.spacing} />
        
        <Button 
          title="Outline Button" 
          onPress={() => console.log('Outline clicked')}
          variant="outline"
        />
        
        <View style={styles.spacing} />
        
        <Button 
          title="Disabled Button" 
          onPress={() => {}}
          disabled
        />
        
        <View style={styles.spacing} />
        
        <Button 
          title="Loading Button" 
          onPress={() => {}}
          loading
        />
      </View>

      {/* Inputs Section */}
      <View style={styles.section}>
        <Input
          label="E-mail Address"
          value={email}
          onChangeText={setEmail}
          placeholder="alina.solvaeica@gmail.com"
          icon="mail-outline"
          keyboardType="email-address"
        />
        
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          icon="lock-closed-outline"
          secureTextEntry
        />
        
        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          maxLength={70}
        />
        
        <Input
          label="Input with Error"
          value=""
          onChangeText={() => {}}
          placeholder="This field has an error"
          error="This field is required"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  spacing: {
    height: Spacing.md,
  },
});