import { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, ScrollView, View } from "react-native";
import PetInfo from "../../components/petInfo/PetInfo";
import PetSubInfo from "../../components/petInfo/PetSubInfo";
import AboutPet from "../../components/petInfo/AboutPet";

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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
