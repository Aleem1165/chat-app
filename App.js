import "react-native-gesture-handler";
import { StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import Navigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import backendURL from "./src/config/backendURL";

export default function App() {

  // 192.168.0.106
  // const backendURL = "http://192.168.0.192:6000/";
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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
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
