import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import colors from "../../constants/colors";
import { getCategories } from "../../services/firebaseServices";

export default function Category({ onCategorySelected }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const [isSelected, setIsSelected] = useState("Dogs");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategoriesList(categories);
      } catch (error) {
        console.error;
        return error.message;
      }
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (category) => {
    setIsSelected(category);
    onCategorySelected(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        data={categoriesList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.touchable}
            key={index}
            onPress={() => handleSelectCategory(item?.name)}
          >
            <View
              style={[
                styles.imageCont,
                isSelected === item?.name && styles.selectedCategoryCont
              ]}
            >
              <Image style={styles.image} source={{ uri: item?.imageUrl }} />
            </View>
            <Text style={styles.categoryName}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5
  },
  touchable: {
    flex: 1
  },
  imageCont: {
    backgroundColor: colors.LIGHT_PRIMARY,
    padding: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.PRIMARY,
    margin: 5
  },
  image: {
    width: 40,
    height: 40
  },
  categoryName: {
    fontFamily: "lato",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  selectedCategoryCont: {
    backgroundColor: colors.SECONDARY,
    borderColor: colors.SECONDARY
  }
});
