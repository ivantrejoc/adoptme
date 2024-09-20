import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import Slider from "../../components/slider/Slider";
import PetListByCategory from "../../components/petListByCategory/PetListByCategory";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../constants/colors";

export default function home() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <Slider />
      <PetListByCategory />
      <TouchableOpacity style={styles.newPetBtn}>
        <MaterialIcons name="pets" size={24} color={colors.PRIMARY} />
        <Text style={styles.btnText}>Add New Pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  newPetBtn: {
    flexDirection: "row",
    gap: 10,
    padding: 20,
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: colors.LIGHT_PRIMARY,
    borderColor: colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed"
  },
  btnText: {
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: 18,
    color: colors.PRIMARY
  }
});
