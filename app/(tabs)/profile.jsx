import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../constants/colors";
import userInfo from "../../utils/userInfo";
import { useRouter } from "expo-router";

export default function Profile() {
  const { name, email, avatar } = userInfo;
  const router = useRouter();

  const menu = [
    {
      id: 1,
      name: "Add New Pet",
      icon: "add-circle",
      route: "/create-new-pet"
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      route: "/(tabs)/favorite"
    },
    {
      id: 3,
      name: "Inbox",
      icon: "chatbubble",
      route: "/(tabs)/inbox"
    },
    {
      id: 4,
      name: "Logout",
      icon: "exit",
      route: "/"
    }
  ];
  const handlerPressMenu = (item) => {
    router.push(item.route);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <FlatList
          data={menu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.button}
              key={index}
              onPress={() => handlerPressMenu(item)}
            >
              <Ionicons
                name={item?.icon}
                size={30}
                color={colors.PRIMARY}
                style={styles.icon}
              />
              <Text style={styles.btnText}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 30,
    fontWeight: "700"
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25
  },
  avatar: {
    backgroundColor: "red",
    width: 100,
    height: 100,
    borderRadius: 99
  },
  userName: {
    fontFamily: "lato",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 6
  },
  userEmail: {
    fontFamily: "lato",
    fontSize: 16,
    color: colors.GRAY
  },
  buttonContainer: {
    marginVertical: 20,
    justifyContent: "center"
  },
  button: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF"
  },
  icon: {
    padding: 10,
    backgroundColor: colors.LIGHT_PRIMARY,
    borderRadius: 10
  },
  btnText: {
    fontFamily: "lato",
    fontSize: 20
  }
});
