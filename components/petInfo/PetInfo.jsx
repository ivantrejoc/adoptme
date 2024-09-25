import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import userInfo from "../../utils/userInfo";
import {
  getUserFavorites,
  updateUserFavorites
} from "../../services/firebaseServices";

export default function PetInfo({ image, name, age, breed, address }) {
  const [favorites, setFavorites] = useState([]);
  const { email } = userInfo;

  const petData = {
    image: image,
    name: name,
    age: age,
    breed: breed
  };

  useEffect(() => {
    const getFavorites = async (email) => {
      const userFavorites = await getUserFavorites(email);
      setFavorites(userFavorites);
    };
    getFavorites(email);
  }, [email]);

  const handlePressAddFav = async (email, favorites, petData) => {
    const newFavorites = [...favorites, petData];
    try {
      setFavorites(newFavorites);
      await updateUserFavorites({ email, newFavorites });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePressRemoveFav = async (email, name, favorites) => {
    const newFavorites = favorites.filter((favorite) => favorite.name !== name);
    try {
      setFavorites(newFavorites);
      await updateUserFavorites({ email, newFavorites });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: image,
          cache: "reload"
        }}
      />
      <View style={styles.infoCont}>
        <View style={styles.dataCont}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
        {favorites?.some((favorite) => favorite.name === name) ? (
          <Pressable
            onPress={() => handlePressRemoveFav(email, name, favorites)}
          >
            <Ionicons name="heart" size={30} color="red" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handlePressAddFav(email, favorites, petData)}
          >
            <Ionicons name="heart-outline" size={30} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
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
  dataCont: {},
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
