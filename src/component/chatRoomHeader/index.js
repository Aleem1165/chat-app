import { StyleSheet, View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleTrue, handleFalse } from "../../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ChatRoomHeader(props) {
  const dispatch = useDispatch();
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);

  return (
    <View style={reduxTheme ? styles.headerBlack : styles.header}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Chats");
          }}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color={reduxTheme ? "white" : "black"}
          ></Ionicons>
        </TouchableOpacity>
        <Image
          source={{
            uri: props.uri,
          }}
          resizeMode="contain"
          style={styles.profileImg}
        />
        <Text style={reduxTheme ? styles.nameBlack : styles.name}>
          {props.name}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {reduxTheme ? (
          <TouchableOpacity
            onPress={() => {
              dispatch(handleFalse());
            }}
          >
            <Ionicons name="sunny" color={"white"} size={30}></Ionicons>
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "pink",
    height: 90,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 5,
    paddingBottom: 5,
  },
  headerBlack: {
    backgroundColor: "#13151B",
    height: 90,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingRight: 5,
    paddingBottom: 5,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  nameBlack: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
});
