import { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { createNewChat } from "../../services/firebaseServices";
import userInfo from "../../utils/userInfo";
import PetInfo from "../../components/petInfo/PetInfo";
import PetSubInfo from "../../components/petInfo/PetSubInfo";
import AboutPet from "../../components/petInfo/AboutPet";
import colors from "../../constants/colors";

export default function PetDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const {
    about,
    address,
    age,
    breed,
    gender,
    email,
    name,
    owner,
    ownerImageUrl,
    weight,
    image
  } = searchParams;

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ""
    });
  }, []);

  const handlePressStartChat = async () => {
    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      imageUrl: userInfo.avatar
    };

    const ownerData = {
      name: owner,
      email: email,
      imageUrl: ownerImageUrl
    };
    try {
      const response = await createNewChat(userData, ownerData);
      router.push({
        pathname: "/chat",
        params: {
          chatId: response.id
        }
      });
    } catch (error) {
      console.error(error);
      return error.message;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PetInfo
          image={image}
          name={name}
          age={age}
          breed={breed}
          address={address}
        />
        <PetSubInfo age={age} breed={breed} gender={gender} weight={weight} />
        <AboutPet
          name={name}
          about={about}
          email={email}
          owner={owner}
          ownerImage={ownerImageUrl}
        />
        <View style={styles.block}></View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.adoptButton}
          onPress={handlePressStartChat}
        >
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
    height: 90
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
