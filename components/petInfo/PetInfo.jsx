import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import userInfo from "../../utils/userInfo";
import {
  getUserFavorites,
  updateUserFavorites
} from "../../services/firebaseServices";

export default function PetInfo({ details }) {
  const [favorites, setFavorites] = useState([]);
  const userEmail = userInfo.email;

  const {
    about,
    address,
    age,
    breed,
    email,
    gender,
    category,
    image,
    name,
    owner,
    ownerImageUrl,
    weight
  } = details;

  const petData = {
    about,
    address,
    age,
    breed,
    gender,
    category,
    email,
    image,
    name,
    owner,
    ownerImageUrl,
    weight
  };

  useEffect(() => {
    const getFavorites = async (userEmail) => {
      const userFavorites = await getUserFavorites(userEmail);
      setFavorites(userFavorites);
    };
    getFavorites(userEmail);
  }, [userEmail]);

  const handlePressAddFav = async (userEmail, favorites, petData) => {
    const newFavorites = [...favorites, petData];
    try {
      setFavorites(newFavorites);
      await updateUserFavorites({ userEmail, newFavorites });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePressRemoveFav = async (userEmail, name, favorites) => {
    const newFavorites = favorites.filter((favorite) => favorite.name !== name);
    try {
      setFavorites(newFavorites);
      await updateUserFavorites({ userEmail, newFavorites });
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("FAVORITES: ", favorites);

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
            onPress={() => handlePressRemoveFav(userEmail, name, favorites)}
          >
            <Ionicons name="heart" size={30} color="red" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handlePressAddFav(userEmail, favorites, petData)}
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
