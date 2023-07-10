import {View , Text , TouchableOpacity , StyleSheet} from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector , useDispatch } from "react-redux";
import { handleFalse , handleTrue } from "../../store/themeSlice";



export default function Header(props) {

    const dispatch = useDispatch()
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);

    return (
      <View style={(styles.headerSearchStyle)}>
        <Text
        style={reduxTheme ? styles.textBlack : styles.text}
        >{props.name}</Text>
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
            <Ionicons name="moon-sharp"  size={30}></Ionicons>
          </TouchableOpacity>
        )}
      </View>
    );
  }




  const styles = StyleSheet.create({
    
    headerSearchStyle: {
        // backgroundColor:"red",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text:{
      fontSize:17,
      fontWeight:"bold"
    },
    textBlack:{
      fontSize:17,
      fontWeight:"bold",
      color:"white"
    }
  });