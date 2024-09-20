import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../../constants/colors";

export default function PetSubInfo({ breed, age }) {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.subInfoCont}>
          <View style={styles.iconCont}>
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={colors.PRIMARY}
            />
          </View>
          <View style={styles.legendCont}>
            <Text style={styles.legend}>Age</Text>
            <Text style={styles.data}>{age} Years</Text>
          </View>
        </View>
        <View style={styles.subInfoCont}>
          <View style={styles.iconCont}>
            <FontAwesome6 name="bone" size={24} color={colors.PRIMARY} />
          </View>
          <View style={styles.legendCont}>
            <Text style={styles.legend}>Breed</Text>
            <Text style={styles.data}>{breed}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.subInfoCont}>
          <View style={styles.iconCont}>
            <FontAwesome name="intersex" size={24} color={colors.PRIMARY} />
          </View>
          <View style={styles.legendCont}>
            <Text style={styles.legend}>Sex</Text>
            <Text style={styles.data}>Female</Text>
          </View>
        </View>

        <View style={styles.subInfoCont}>
          <View style={styles.iconCont}>
            <FontAwesome6
              name="weight-scale"
              size={24}
              color={colors.PRIMARY}
            />
          </View>
          <View style={styles.legendCont}>
            <Text style={styles.legend}>Weight</Text>
            <Text style={styles.data}>60 lb.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subInfoCont: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    gap: 15,
    backgroundColor: "#FFFFFF"
  },
  iconCont: {
    backgroundColor: colors.LIGHT_PRIMARY,
    padding: 10,
    borderRadius: 10
  },
  legendCont: {
    flexShrink: 1
  },
  legend: {
    fontFamily: "lato",
    fontSize: 16,
    color: colors.GRAY
  },
  data: {
    fontFamily: "lato",
    fontSize: 18,
    fontWeight: "600"
  }
});
