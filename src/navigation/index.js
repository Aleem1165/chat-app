import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { View } from "react-native";
import Login from "../view/login";
import Signup from "../view/signup";
import AuthHeader from "../component/authHeader";
import Chats from "../view/chats";
import CustumDrawer from "../component/customDrawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import NewChat from "../view/newChat";
import ChatRooms from "../view/chatRoom";
import Header from "../component/header";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Navigation() {
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);
  const reduxUid = useSelector((state) => state.UidSlice.uid);
  console.log("reduxUid====>", reduxUid);

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
 
  const MyDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustumDrawer {...props} />}
        screenOptions={{
          drawerLabelStyle: { marginLeft: -25 },
        }}
      >
        <Drawer.Screen
          name="Chats"
          component={Chats}
          
          options={{
          drawerActiveTintColor:reduxTheme ? "white" : "#03a9f4" ,
            drawerInactiveTintColor:reduxTheme ? "gray" : "black",
            headerStyle:{
              backgroundColor:reduxTheme ? "#13151B" : "white",
            
            },
            headerTintColor:reduxTheme ? "white" : "black",
            headerTitle: (props) => <Header {...props} name={"Chats"} />,
            drawerIcon: ({ color }) => (
              <Ionicons
                name="chatbubbles-sharp"
                size={25}
                color={color}
              ></Ionicons>
            ),
          }}
        />
        <Drawer.Screen
          name="NewChat"
          component={NewChat}
          options={{
            drawerActiveTintColor:reduxTheme ? "white" : "#03a9f4" ,
            drawerInactiveTintColor:reduxTheme ? "gray" : "black",
            headerStyle:{
              backgroundColor:reduxTheme ? "#13151B" : "white",
            
            },
            headerTintColor:reduxTheme ? "white" : "black",
            headerTitle: (props) => <Header {...props} name={"Select user"} />,
            drawerIcon: ({ color }) => (
              <Ionicons
                name="chatbubbles-sharp"
                size={25}
                color={color}
              ></Ionicons>
            ),
          }}
        />
        <Drawer.Screen
          name="ChatRoom"
          component={ChatRooms}
          options={{
            drawerItemStyle: { height: 0 },
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    );
  };
  return reduxUid ? (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyDrawer />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyStack />
    </View>
  );
}

export default Navigation;

