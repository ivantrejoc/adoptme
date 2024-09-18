import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getSliders } from "../../services/firebaseServices";

export default function Slider() {
  const [slidersData, setSlidersData] = useState([]);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await getSliders();
        setSlidersData(response);
      } catch (error) {
        console.error(error);
        return error.message;
      }
    };
    fetchSliders();
  }, []);

  console.log("SLIDERS WITHIN COMPONENT: ", slidersData);

  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
