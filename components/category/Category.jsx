import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCategories } from "../../services/firebaseServices";

export default function Category() {
  const [categoriesList, setCategoriesList] = useState([]);

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

  console.log("CATOGRIES INTO COMPONENT: ", categoriesList);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 20,
    fontWeight: "600"
  }
});
