import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../../constants/colors";

export default function PetCard({ name, age, breed, image }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.dataCont}>
        <Text style={styles.breed}>{breed}</Text>
        <Text style={styles.age}>{age} Yrs</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {    
    padding: 10,
    marginRight: 15,   
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
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
  age:{
    fontFamily: "lato",  
    fontSize: 10,  
    color: colors.PRIMARY,
    backgroundColor: colors.LIGHT_PRIMARY,
    paddingHorizontal: 10,
    borderRadius: 10
  }
});
