import { StyleSheet, Text, Image, View } from "react-native";
import colors from "../../constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function OwnerInfo({email, owner, ownerImage}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoCont}>
        <Image
          style={styles.avatar}
          source={{
            uri: ownerImage
          }}
        />
        <View style={styles.ownerInfoCont}>
          <Text style={styles.name}>{owner}</Text>
          <Text style={styles.legend}>Pet Owner</Text>
        </View>
      </View>

      <View>
        <FontAwesome name="paper-plane" size={24} color={colors.PRIMARY} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
    borderColor: colors.PRIMARY,
    backgroundColor: "#FFFFFF"
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 90
  },
  infoCont:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  name: {
    fontFamily: "lato",
    fontSize: 16,
    fontWeight: "700"
  },
  legend: {
    fontFamily: "lato",
    color: colors.GRAY
  },
  ownerInfoCont: {}
});
