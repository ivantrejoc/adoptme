import { useState } from "react";
import colors from "../../constants/colors";
import { StyleSheet, Text, View, Pressable } from "react-native";
import OwnerInfo from "./OwnerInfo";

export default function AboutPet({ name, about, email, owner, ownerImage }) {
  const [readMore, SetReadMore] = useState(true);

  const handleReadMorePress = () => {
    SetReadMore(false);
  };

  const handleReadLessPress = () => {
    SetReadMore(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About {name}</Text>
      <Text numberOfLines={readMore ? 3 : 20} style={styles.paragraph}>
        {about}
      </Text>

      {readMore && (
        <Pressable onPress={handleReadMorePress}>
          <Text style={styles.textBtn}>Read More</Text>
        </Pressable>
      )}
      {!readMore && (
        <Pressable onPress={handleReadLessPress}>
          <Text style={styles.textBtn}>Read Less</Text>
        </Pressable>
      )}
      <OwnerInfo email={email} owner={owner} ownerImage={ownerImage} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 20,
    fontWeight: "600"
  },
  paragraph: {
    fontFamily: "lato",
    fontSize: 14
  },
  textBtn: {
    fontFamily: "lato",
    fontSize: 14,
    fontWeight: "700",
    color: colors.SECONDARY
  }
});
