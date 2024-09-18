import { View, Text, StyleSheet } from "react-native";
import HomeHeader from "../../components/homeHeader/HomeHeader";

export default function home() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <Text>HOME</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20
  }
});
