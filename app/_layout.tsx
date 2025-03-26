import { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useAuth } from '@/stores/authStore';

export default function RootLayout() {
  useFrameworkReady();
  const { initialize, session, loading } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}