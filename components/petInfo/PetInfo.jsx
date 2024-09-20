import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function PetInfo({ name, age, breed, image }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.infoCont}>
        <View style={styles.dataCont}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>552 N tryon Street 28155</Text>
        </View>
        <Ionicons name="heart-outline" size={30} color="black" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover"
  },
  infoCont: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dataCont:{},
  name: {
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: 27
  },
  address: {
    fontFamily: "lato",    
    fontSize: 16,
    color: colors.GRAY
  }
});
