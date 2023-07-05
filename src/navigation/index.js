import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Login from "../view/login";
import Signup from "../view/signup";
import AuthHeader from "../component/authHeader";
import Chats from "../view/chats";
import CustumDrawer from "../component/customDrawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import NewChat from "../view/newChat";
import ChatRooms from "../view/chatRoom";
import ChatRoomHeader from "../component/chatRoomHeader";

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
  function HeaderSearch() {
    return (
      <View style={(styles.headerSearchStyle)}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            // onChange={(e) => setEmail(e.nativeEvent.text)}
            // value={email}
          />
        </View>
        {reduxTheme ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(handleFalse());
            }}
          >
            <Ionicons name="sunny" size={30}></Ionicons>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(handleTrue());
            }}
          >
            <Ionicons name="moon-sharp" size={30}></Ionicons>
          </TouchableOpacity>
        )}
      </View>
    );
  }
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
            headerTitle: (props) => <HeaderSearch {...props} />,
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
            headerTitle: (props) => <HeaderSearch {...props} />,
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
            drawerItemStyle:{height:0},
            headerShown:false
            // headerTitle: (props) => <HeaderSearch {...props} />,
            // headerTitle: "",
            // header: () => <ChatRoomHeader name={"Login"} />,
           
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

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 20,
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
  },
  input: {
    width: "100%",
    flex: 1,
  },
  headerSearchStyle: {
    width: 290,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
