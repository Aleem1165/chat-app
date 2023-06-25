import { createStackNavigator } from "@react-navigation/stack";

import { View, Text, StyleSheet } from "react-native";
import Login from "../view/login";
import Signup from "../view/signup";
import AuthHeader from "../component/authHeader";

const Stack = createStackNavigator();

function Navigation() {
  const MyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "",
            header: () => <AuthHeader name={"Login"} />,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTitle: "",
            header: () => <AuthHeader name={"Signup"} />,
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
      }}
    >
      <MyStack />
    </View>
  );
}

export default Navigation;

