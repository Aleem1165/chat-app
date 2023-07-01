import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { handleFalse, handleTrue } from "../../store/themeSlice";
import { useDispatch } from "react-redux";
import { handleAddUid } from "../../store/uidSlice";
import { adCurrUserData } from "../../store/currUserDataSlice";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();

  const backendURL = "http://192.168.0.106:6000/";

  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSignup = async () => {
    // setLoader(true);
    const { data } = await axios.post(backendURL + "apis/user/signup", {
      name,
      email,
      password,
      imageUri,
    });
    if (data.message == "Signup Successfully!") {
      alert(data.message);
      const uid = data.data._id;
      const currUserData = data.data
      dispatch(adCurrUserData(currUserData))
      dispatch(handleAddUid(uid));
      setLoader(false);
    } else {
      switch (data.message) {
        case `E11000 duplicate key error collection: db1.users index: name_1 dup key: { name: \"${name}\" }`:
          return (
            alert("name already registered!"), setName(""), setLoader(false)
          );
        case `E11000 duplicate key error collection: db1.users index: email_1 dup key: { email: "${email}" }`:
          return (
            alert("email already registered!"), setEmail(""), setLoader(false)
          );
      }
    }
  };

  return loader ? (
    <View>
      <Spinner visible={true} textContent={"Loading..."} />
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "40%",
          }}
        >
          <Button
            title="login"
            color="#a9a9a9"
            onPress={() => {
              navigation.push("Login");
            }}
          />
        </View>
        <View
          style={{
            width: "40%",
          }}
        >
          <Button title="signup" />
        </View>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Name"}
            onChange={(e) => setName(e.nativeEvent.text)}
            value={name}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={showPass ? false : true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            value={password}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass);
            }}
          >
            {showPass ? (
              <Ionicons name="eye-off-sharp" size={25}></Ionicons>
            ) : (
              <Ionicons name="eye-sharp" size={25}></Ionicons>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageBtn}>
          <Ionicons name="image" size={30}></Ionicons>
          <Text>Profile picture</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.loginView}>
        <Button title="Signup" onPress={handleSignup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor:"red",
    // justifyContent:"space-between",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    flex: 1,
  },
  innerContainer: {
    alignSelf: "stretch",
  },
  inputView: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F2F2F2",
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,

    elevation: 5,
    marginTop: 20,
  },
  loginView: {
    width: "90%",
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginVertical: 20,
  },
  imageBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: "#03a9f4",
  },
});
