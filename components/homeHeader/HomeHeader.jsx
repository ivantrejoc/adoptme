import { View, Text, Image, StyleSheet } from "react-native";
import userInfo from "../../utils/userInfo";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.name}>{userInfo.name}</Text>
      </View>
      <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    justifyContent: "center"
  },
  welcome: {
    fontFamily: "lato",
    fontSize: 18
  },
  name: {
    fontFamily: "lato-bold",
    fontSize: 25
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 90
  }
});
