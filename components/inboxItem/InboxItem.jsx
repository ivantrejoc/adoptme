import { StyleSheet, Text, Image, View } from "react-native";
import { Link } from "expo-router";
import colors from "../../constants/colors";

export default function InboxItem({ userInfo }) {
  const chatId = userInfo.chatId;
  const name = userInfo.user.name;
  const avatar = userInfo.user.imageUrl;


  return (
    <Link href={`/chat?chatId=${chatId}`}>
      <View style={styles.infoContainer}>
        <Image style={styles.image} source={{ uri: avatar }} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.border} />
    </Link>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 99
  },
  name: {
    fontFamily: "lato",
    fontSize: 20,
    fontWeight: "700"
  },
  border: {
    borderWidth: 0.5,
    marginVertical: 5,
    borderColor: colors.GRAY
  }
});
