import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  getChatDetails,
  setNewMessage,
  getChatMessages
} from "../../services/firebaseServices";
import { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import userInfo from "../../utils/userInfo";
import moment from "moment";

export default function Chat() {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const searchParams = useLocalSearchParams();
  const { chatId } = searchParams;
  console.log("CHAT ID: ", chatId);
  const { email, name, avatar } = userInfo;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChat = async () => {
      const details = await getChatDetails(chatId);
      setChat(details);
    };

    const fetchMessages = async () => {
      const messagesData = await getChatMessages(chatId);
      setMessages(messagesData);
    };

    fetchChat();
    fetchMessages();
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

  const onSend = async (newMessage) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, newMessage)
    );

    const formatedDate = moment().format("MM-DD-YYYY HH:mm:ss");
    const message = {
      ...newMessage[0],
      createdAt: formatedDate
    };
    await setNewMessage(chatId, message);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: email,
        name: name,
        avatar: avatar
      }}
    />
  );
}
const styles = StyleSheet.create({});
