import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
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

      <Link href={"/create-new-pet"} style={styles.link}>
        <View style={styles.iconCont}>
          <MaterialIcons
            style={styles.icon}
            name="pets"
            size={24}
            color={colors.PRIMARY}
          />
          <Text style={styles.btnText}>Add New Pet</Text>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  link: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 55,
    borderWidth: 1,
    backgroundColor: colors.LIGHT_PRIMARY,
    borderColor: colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed"
  },
  iconCont: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: 18,
    color: colors.PRIMARY,
    textAlign: "center"
  }
});
