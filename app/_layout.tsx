import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    "lato": require("./../assets/fonts/Lato-Regular.ttf"),
    "lato-thin": require("./../assets/fonts/Lato-Thin.ttf"),
    "lato-bold": require("./../assets/fonts/Lato-Bold.ttf")
  });
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
