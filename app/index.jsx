import { Text, View, StyleSheet } from "react-native";
import { Link, Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      {user ?
      <Redirect href={"/(tabs)/home"} />
      : <Redirect href={"/login"} />  
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontFamily: "lato",
    fontSize: 20
  }
});
