import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Text,
  Alert
} from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { getUserPets, deleteUserPost } from "../../services/firebaseServices";
import PetCard from "../../components/petCard/PetCard";
import userInfo from "../../utils/userInfo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "../../constants/colors";

export default function UserPosts() {
  const [userPets, setUserPets] = useState([]);
  const [loader, setLoader] = useState(true);
  const { email } = userInfo;
  const navigation = useNavigation();

  const fetchPets = async (email) => {
    try {
      const response = await getUserPets(email);
      setUserPets(response);
      setLoader(false);
    } catch (error) {
      return error.message;
    }
  };

  const deleteUserPets = async (id) => {
    try {
      await deleteUserPost(id);
      const petsFiltered = userPets.filter((pet) => {
        pet.id !== id;
      });
      setUserPets(petsFiltered);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Posts"
    });
    fetchPets(email);
  }, [email]);

  const handlePressDelete = async (id) => {
    try {
      Alert.alert("Delete Post", "Are you sure to delete this post?", [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => await deleteUserPets(id),
          style: "default"
        }
      ]);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userPets}
        numColumns={2}
        refreshing={loader}
        onRefresh={() => fetchPets(email)}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <PetCard details={item} key={index} />
            <Pressable
              style={styles.button}
              onPress={() => handlePressDelete(item?.id)}
            >
              <FontAwesome5 name="trash-alt" size={15} color="black" />
              <Text style={styles.btnText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
      {userPets.length === 0 && <Text style={styles.notFound}>No Posts Found.</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  cardContainer: {},
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    gap: 5,
    marginTop: 10,
    borderRadius: 7,
    backgroundColor: colors.LIGHT_PRIMARY
  },
  btnText: {
    fontFamily: "lato",
    fontSize: 15
  },
  notFound:{
    fontFamily: "lato",
    fontSize: 20
  }
});
