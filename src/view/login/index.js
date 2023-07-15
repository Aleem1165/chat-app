import { useEffect, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddUid } from "../../store/uidSlice";
import { adCurrUserData } from "../../store/currUserDataSlice";
import backendURL from "../../config/backendURL";
import socket from "../../config/io";

export default function Login({ navigation }) {
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoader(true);
      const { data } = await axios.post(backendURL + "apis/user/login", {
        email,
        password,
      });
      alert(data.message);

      if (data.message == "login Successfully") {
        setEmail("");
        setPassword("");
        const currUserData = data.data[0];
        const uid = data.data[0]._id;
        dispatch(adCurrUserData(currUserData));
        dispatch(handleAddUid(uid));
        setLoader(false);
      } else {
        switch (data.message) {
          case "user not found":
            return (
              alert(data.message),
              setEmail(""),
              setPassword(""),
              setLoader(false)
            );
          case "incorrect password":
            return alert(data.message), setPassword(""), setLoader(false);
          case "login Successfully":
            return (
              alert(data.message),
              setEmail(""),
              setPassword(""),
              setLoader(false)
            );
        }
      }
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }
  };

  return loader ? (
    <View>
      <Spinner visible={true} textContent={"Loading..."} />
    </View>
  ) : (
    <View style={reduxTheme ? styles.containerBlack : styles.container}>
      <View
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={styles.changePageBtnView}>
          <TouchableOpacity
            style={
              reduxTheme ? styles.changePAgeBtnBlack : styles.changePAgeBtn
            }
          >
            <Text
              style={
                reduxTheme
                  ? styles.changePageBtnTextBlack
                  : styles.changePageBtnText
              }
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "40%",
              backgroundColor: "gray",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              navigation.push("Signup");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <View style={reduxTheme ? styles.inputViewBlack : styles.inputView}>
          <TextInput
            style={reduxTheme ? styles.inputBlack : styles.input}
            placeholder={"Email"}
            placeholderTextColor={reduxTheme ? "white" : "black"}
            onChange={(e) => setEmail(e.nativeEvent.text)}
            value={email}
          />
        </View>
        <View style={reduxTheme ? styles.inputViewBlack : styles.inputView}>
          <TextInput
            style={reduxTheme ? styles.inputBlack : styles.input}
            placeholder={"Password"}
            placeholderTextColor={reduxTheme ? "white" : "black"}
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
      <View style={styles.loginView}>
        <TouchableOpacity
          style={reduxTheme ? styles.loginBtnBlack : styles.loginBtn}
          onPress={handleLogin}
        >
          <Text
            style={reduxTheme ? styles.loginBtnTextBlack : styles.loginBtnText}
          >
            Login
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
});
