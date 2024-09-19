import { useEffect, useState, memo } from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { getSliders } from "../../services/firebaseServices";

const SliderItem = memo(({ item }) => {
  return (
    <View style={styles.sliderContainer}>
      <Image style={styles.image} source={{ uri: item?.imageUrl }} />
    </View>
  );
});

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

  return (
    <View style={styles.container}>
      <FlatList
        data={slidersData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SliderItem item={item} />}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: Dimensions.get("screen").width * 0.9,
    height: 180,
    resizeMode: "stretch",
    borderRadius: 20,
    marginRight: 10
  }
});
