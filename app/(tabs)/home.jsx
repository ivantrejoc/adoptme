import { View, Text, StyleSheet } from "react-native";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import Slider from "../../components/slider/Slider";
import PetListByCategory from "../../components/petListByCategory/PetListByCategory";

export default function home() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <Slider />
     <PetListByCategory />
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
