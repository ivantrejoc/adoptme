import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import { useRouter } from "expo-router";

export default function PetCard({ details }) {
  const router = useRouter();

  const {
    about,
    address,
    age,
    breed,
    gender,
    category,
    email,
    imageUrl,
    name,
    owner,
    ownerImageUrl,
    weight
  } = details;
  const encodedImage = encodeURIComponent(imageUrl);
  
  const handlePressCard = () => {
    router.push({
      pathname: "pet-details",
      params: {
        about,
        address,
        age,
        breed,
        gender,
        category,
        email,
        name,
        owner,
        ownerImageUrl,
        weight,
        image: encodedImage
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePressCard}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.dataCont}>
        <Text style={styles.breed}>{breed}</Text>
        <Text style={styles.age}>{age} Yrs</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15
  },
  image: {
    width: 150,
    height: 135,
    objectFit: "cover",
    borderRadius: 10
  },
  name: {
    fontFamily: "lato",
    fontSize: 18,
    fontWeight: "600"
  },
  dataCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  breed: {
    fontFamily: "lato",
    color: colors.GRAY
  },
  age: {
    fontFamily: "lato",
    fontSize: 10,
    color: colors.PRIMARY,
    backgroundColor: colors.LIGHT_PRIMARY,
    paddingHorizontal: 10,
    borderRadius: 10
  }
});
