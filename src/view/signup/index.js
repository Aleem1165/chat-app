import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddUid } from "../../store/uidSlice";
import { adCurrUserData } from "../../store/currUserDataSlice";
import backendURL from "../../config/backendURL";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();

  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);

  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUri, setImageUri] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      fileName: true,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const type = "image/jpg";
      const name = userName;
      const source = { uri, type, name };
      handleUpdata(source);
    }
  };
  const handleUpdata = (source) => {
    setLoader(true);
    const data = new FormData();
    data.append("file", source);
    data.append("upload_preset", "_DemoEmployee");
    data.append("cloud_name", "diqu541n1");
    fetch("https://api.cloudinary.com/v1_1/diqu541n1/image/upload", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUri(data.url);
        console.log(data);
        setLoader(false);
      })
      .catch((err) => {
        alert("Image not Upload! try again.");
        setLoader(false);
      });
  };

  const handleSignup = async () => {
    setLoader(true);
    const { data } = await axios.post(backendURL + "apis/user/signup", {
      name: userName,
      email,
      password,
      imageUri,
    });
    console.log(data);
    if (data.message == "Signup Successfully!") {
      alert(data.message);
      const uid = data.data._id;
      const currUserData = data.data;
      dispatch(adCurrUserData(currUserData));
      dispatch(handleAddUid(uid));
      setUserName("");
      setPassword("");
      setEmail("");
      setImageUri("");
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
    <View style={reduxTheme ? styles.containerBlack : styles.container}>
      <View style={styles.changePageBtnView}>
        <TouchableOpacity
          style={styles.changePageLogin}
          onPress={() => {
            navigation.push("Login");
          }}
        >
          <Text style={styles.changePageLoginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={reduxTheme ? styles.changePAgeBtnBlack : styles.changePAgeBtn}
        >
          <Text
            style={
              reduxTheme
                ? styles.changePageBtnTextBlack
                : styles.changePageBtnText
            }
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.innerContainer}>
        <View style={reduxTheme ? styles.inputViewBlack : styles.inputView}>
          <TextInput
            placeholderTextColor={reduxTheme ? "white" : "black"}
            style={reduxTheme ? styles.inputBlack : styles.input}
            placeholder={"Name"}
            onChange={(e) => setUserName(e.nativeEvent.text)}
            value={userName}
          />
        </View>
        <View style={reduxTheme ? styles.inputViewBlack : styles.inputView}>
          <TextInput
            placeholderTextColor={reduxTheme ? "white" : "black"}
            style={reduxTheme ? styles.inputBlack : styles.input}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            value={email}
          />
        </View>
        <View style={reduxTheme ? styles.inputViewBlack : styles.inputView}>
          <TextInput
            placeholderTextColor={reduxTheme ? "white" : "black"}
            style={reduxTheme ? styles.inputBlack : styles.input}
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
              <Ionicons
                name="eye-off-sharp"
                color={reduxTheme ? "white" : "black"}
                size={25}
              ></Ionicons>
            ) : (
              <Ionicons
                name="eye-sharp"
                color={reduxTheme ? "white" : "black"}
                size={25}
              ></Ionicons>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          userName ? pickImage() : alert("First enter name!");
        }}
      >
        {imageUri ? (
          <Image
            source={{
              uri: imageUri,
            }}
            resizeMode="contain"
            style={styles.uploadImgStyle}
          />
        ) : (
          <View style={styles.uploadImgStyle}>
            <Ionicons
              name="person-circle-outline"
              color={reduxTheme ? "white" : "black"}
              size={110}
            ></Ionicons>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.loginView}>
        <TouchableOpacity
          style={reduxTheme ? styles.loginBtnBlack : styles.loginBtn}
          onPress={handleSignup}
        >
          <Text
            style={reduxTheme ? styles.loginBtnTextBlack : styles.loginBtnText}
          >
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  containerBlack: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#13151B",
  },
  input: {
    width: "100%",
    flex: 1,
  },
  inputBlack: {
    width: "100%",
    flex: 1,
    color: "white",
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
  inputViewBlack: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#2D2F2F",
    shadowColor: "white",
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
  uploadImgStyle: {
    marginTop: 10,
    width: 110,
    height: 110,
    borderRadius: 60,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  changePageBtnView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
  },
  changePAgeBtn: {
    width: "40%",
    backgroundColor: "#03a9f4",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  changePAgeBtnBlack: {
    width: "40%",
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  changePageBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  changePageBtnTextBlack: {
    color: "#03a9f4",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginBtn: {
    backgroundColor: "#03a9f4",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  loginBtnBlack: {
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  loginBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginBtnTextBlack: {
    color: "#03a9f4",
    fontSize: 18,
    fontWeight: "bold",
  },
  changePageLogin: {
    width: "40%",
    backgroundColor: "gray",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  changePageLoginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
