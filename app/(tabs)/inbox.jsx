import { View, Text, FlatList, StyleSheet } from "react-native";
import userInfo from "../../utils/userInfo";
import { getUserChats } from "../../services/firebaseServices";
import { useEffect, useState } from "react";
import InboxItem from "../../components/inboxItem/InboxItem";

export default function Inbox() {
  const [chatsList, setChatsList] = useState([]);
  const [otherUsersList, setOtherUsersList] = useState([]);
  const [loader, setLoader] = useState(true);
  const userEmail = userInfo.email;

  const fetchUserChats = async () => {
    const chats = await getUserChats(userEmail);
    setChatsList(chats);
    if (chats.length > 0) {
      const otherUsers = chats.map((chat) => {
        const user = chat.users.filter((user) => user.email !== userEmail);
        return {
          chatId: chat.id,
          user: user[0]
        };
      });
      setOtherUsersList(otherUsers);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUserChats();
  }, [userEmail]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <FlatList
        style={{ marginTop: 20 }}
        refreshing={loader}
        onRefresh={fetchUserChats}
        data={otherUsersList}
        renderItem={({ item, index }) => <InboxItem userInfo={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 30,
    fontWeight: "700"
  }
});
