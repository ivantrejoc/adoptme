import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import PetCard from "../../components/petCard/PetCard";
import userInfo from "../../utils/userInfo";
import { getUserFavorites } from "../../services/firebaseServices";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loader, setLoader] = useState(true);
  const { email } = userInfo;

  const getFavorites = async (email) => {
    const userFavorites = await getUserFavorites(email);
    setFavorites(userFavorites);
    setLoader(false);
  };

  useFocusEffect(
    useCallback(() => {
      getFavorites(email);
    }, [email])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        contentContainerStyle={styles.flatList}
        numColumns={2}
        data={favorites}
        onRefresh={getFavorites}
        refreshing={loader}
        renderItem={({ item }) => (
          <View style={styles.petCardCont}>
            <PetCard
              name={item?.name}
              age={item?.age}
              breed={item?.breed}
              image={item?.image}
            />
          </View>
        )}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 30,
    fontWeight: "700"
  },
  flatList: {
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  petCardCont: {
    paddingHorizontal: 17,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
