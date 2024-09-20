import { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import PetInfo from "../../components/petInfo/PetInfo";
import PetSubInfo from "../../components/petInfo/PetSubInfo";
import AboutPet from "../../components/petInfo/AboutPet";
import colors from "../../constants/colors";

export default function PetDetails() {
  const navigation = useNavigation();
  const searchParams = useLocalSearchParams();
  const { name, age, breed, image } = searchParams;

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ""
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PetInfo image={image} name={name} age={age} breed={breed} />
        <PetSubInfo age={age} breed={breed} />
        <AboutPet name={name} />
        <View style={styles.block}></View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.adoptButton}>
          <Text style={styles.textBtn}>Adopt Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  block: {
    height: 70
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    marginTop: 20,
    bottom: 0
  },
  adoptButton: {
    padding: 15,
    backgroundColor: colors.PRIMARY
  },
  textBtn: {
    fontFamily: "lato",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
  }
});
