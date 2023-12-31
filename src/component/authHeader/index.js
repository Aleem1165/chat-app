import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleTrue, handleFalse } from "../../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AuthHeader(props) {
  const dispatch = useDispatch();
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);

  return (
    <View style={reduxTheme ? styles.headerBlack : styles.header}>
      <Ionicons
        name="chatbubbles-sharp"
        color={reduxTheme ? "white" : "#03a9f4"}
        size={35}
      ></Ionicons>
      <Text style={reduxTheme ? styles.pageTitleBlack : styles.pageTitle}>
        {props.name}
      </Text>
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
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    height: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerBlack: {
    backgroundColor: "#13151B",
    height: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pageTitleBlack: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
