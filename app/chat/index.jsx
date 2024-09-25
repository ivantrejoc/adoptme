import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getDocumentDetails } from "../../services/firebaseServices";
import { useEffect, useState } from "react";
import userInfo from "../../utils/userInfo";

export default function Chat() {
  const [chat, setChat] = useState(null);
  const searchParams = useLocalSearchParams();
  const { chatId } = searchParams;
  const { email } = userInfo;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChat = async () => {
      const details = await getDocumentDetails(chatId);
      setChat(details);
    };

    fetchChat();
  }, [chatId]);

  useEffect(() => {
    if (chat) {
      const ownerUser = chat?.users.filter((user) => user.email !== email);
      const ownerName = ownerUser[0].name;
      navigation.setOptions({
        headerTitle: ownerName
      });
    }
  });

  return (
    <View>
      <Text> Chat</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
