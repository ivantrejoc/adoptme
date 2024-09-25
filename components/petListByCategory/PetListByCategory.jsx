import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Category from "../category/Category";
import PetCard from "../petCard/PetCard";
import { getPetsByCategory } from "../../services/firebaseServices";

export default function PetListByCategory() {
  const [categorySelected, setCategorySelected] = useState("Dogs");
  const [petsByCategory, setPetsByCategory] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchFilteredPets = async (categorySelected) => {
    const data = await getPetsByCategory(categorySelected);
    setPetsByCategory(data);
    setLoader(false);
  };

  useEffect(() => {
    if (categorySelected) {
      fetchFilteredPets(categorySelected);
    }
  }, [categorySelected]);

  const handleCategorySelected = (category) => {
    setCategorySelected(category);
  };
  
  return (
    <View style={styles.container}>
      <Category onCategorySelected={handleCategorySelected} />
      <FlatList
        style={{ marginTop: 30 }}
        data={petsByCategory}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => fetchFilteredPets(categorySelected)}
        renderItem={({ item }) => <PetCard key={item?.id} details={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {}
});
