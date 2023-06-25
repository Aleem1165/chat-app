import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Signup({ navigation }) {
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            secureTextEntry={showPass ? false : true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
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
      <View style={styles.loginView}>
        <Button title="Signup" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-between",
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
    flex:1,
    display:"flex",
    justifyContent:"flex-end",
    marginVertical: 20,
  }
});
