import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import colors from "../../constants/colors";
import { getCategories } from "../../services/firebaseServices";
import { Picker } from "@react-native-picker/picker";

export default function CreateNewPet() {
  const [formData, setFormData] = useState({});
  const [gender, setGender] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet"
    });
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = () => {
    console.log("FORM DATA ON SUBMIT: ", formData);
  };

  // console.log("CATEGORIES: ", categories);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Add New Pet for Adoption</Text>
      <View style={styles.imageCont}>
        <Image
          style={styles.image}
          source={require("../../assets/images/paw-transparent.png")}
        />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Rocky..."
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Pet Category *</Text>

        <Picker
          style={styles.input}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categories?.map((category, index) => (
            <Picker.Item
              label={category?.name}
              value={category?.name}
              key={index}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          placeholder="Shnauzer..."
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="4"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          placeholder="3.5 lbs..."
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Gender *</Text>

        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            handleInputChange("gender", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="123 Sundance Road, NY"
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      <View style={styles.inputCont}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          placeholder="My dog is very friendship..."
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontFamily: "lato",
    fontSize: 20,
    fontWeight: "700"
  },
  imageCont: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 20,
    marginVertical: 5
  },

  image: {
    width: 50,
    height: 50,
    objectFit: "contain"
  },
  inputCont: {
    marginVertical: 5
  },
  label: {
    fontFamily: "lato",
    marginVertical: 5
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 7,
    fontFamily: "lato"
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 50
  },
  btnText: {
    fontFamily: "lato",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 10
  }
});
