import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { tokenCache } from "../utils/tokenCache";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    lato: require("./../assets/fonts/Lato-Regular.ttf"),
    "lato-thin": require("./../assets/fonts/Lato-Thin.ttf"),
    "lato-bold": require("./../assets/fonts/Lato-Bold.ttf")
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </ClerkProvider>
  );
}
