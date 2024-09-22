import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import userInfo from "../../utils/userInfo";
import { getUserFavorites } from "../../services/firebaseServices";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { email } = userInfo;

  useEffect(() => {
    const getFavorites = async (email) => {
      const userFavorites = await getUserFavorites(email);
      setFavorites(userFavorites);
    };
    getFavorites(email);
  }, [email]);

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
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
  }
});
