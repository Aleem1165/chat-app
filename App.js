import "react-native-gesture-handler"

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import Login from "./src/view/login";
import Navigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const backendURL = "http://192.168.0.106:6000/";``
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(backendURL);
        console.log("data===>", data);
      } catch (error) {
        console.log("error===>", error);
      }
    })();
  }, []);
  return (
    // <View style={styles.container}>
    // </View>
     <NavigationContainer>
      <Navigation/>
     </NavigationContainer>
  )

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: `space-evenly`,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
