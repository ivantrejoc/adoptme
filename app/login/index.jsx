import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/WarmUpBrowser";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import colors from "../../constants/colors";

WebBrowser.maybeCompleteAuthSession();

export default function index() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "adoptme" })
        });

      if (createdSessionId) {
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/images/adopt-dog.png")}
        style={styles.image}
      />
      <View style={styles.legendCont}>
        <Text style={styles.legend}>Ready to make a new friend?</Text>
        <Text style={styles.caption}>
          Let's adopt the pet which you like and make there life happy again
        </Text>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1
  },
  image: {
    width: "100%",
    height: 500
  },
  legendCont: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  legend: {
    fontFamily: "lato-bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20
  },
  caption: {
    fontFamily: "lato",
    fontSize: 18,
    textAlign: "center",
    color: colors.GRAY
  },
  button: {
    padding: 14,
    marginTop: 100,
    backgroundColor: colors.PRIMARY,
    width: "100%",
    borderRadius: 14
  },
  buttonText: {
    fontFamily: "lato",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  }
});
