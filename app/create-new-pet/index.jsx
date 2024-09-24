import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "../../constants/colors";
import { getCategories } from "../../services/firebaseServices";
import { Picker } from "@react-native-picker/picker";

export default function CreateNewPet() {
  const [formData, setFormData] = useState({
    category: "Dogs",
    gender: "Male"
  });
  const [gender, setGender] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState(null);
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    console.log("FORM DATA ON SUBMIT: ", formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Add New Pet for Adoption</Text>
      <Pressable style={styles.imageCont} onPress={pickImage}>
        {!image ? (
          <Image
            style={styles.image}
            source={require("../../assets/images/paw-transparent.png")}
          />
        ) : (
          <View style={{  }}>
            <Image style={styles.imageFill} source={{ uri: image }} />
          </View>
        )}
      </Pressable>
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
              style={styles.input}
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
    // backgroundColor: "cyan",
    width: 100,
    height: 100,
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
  imageFill: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 15,
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
