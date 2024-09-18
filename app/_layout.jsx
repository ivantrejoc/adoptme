import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

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
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
