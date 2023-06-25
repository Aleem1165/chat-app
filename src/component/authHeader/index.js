import { StyleSheet, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AuthHeader(props) {
  return (
    <View style={styles.header}>
      <Ionicons name="chatbubbles-sharp" color="#4169e1" size={35}></Ionicons>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {props.name}
      </Text>
      <Ionicons name="moon-sharp" size={30}></Ionicons>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor:"white",
    height: 80,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
