import { Text, View, StyleSheet } from "react-native";
import { Link, Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const { user } = useUser();

  return user&&(
        <View style={styles.container}>
          <Text>{user?.fullName}</Text>
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
