import { View, Text } from "react-native";
import userInfo from "../../utils/userInfo";
import { getUserChats } from "../../services/firebaseServices";
import { useEffect } from "react";

export default function Inbox() {
  const userEmail = userInfo.email;

  useEffect(() =>{
    getUserChats(userEmail)
  }, [userEmail])

  return (
    <View>
      <Text>Inbox</Text>
    </View>
  );
}
