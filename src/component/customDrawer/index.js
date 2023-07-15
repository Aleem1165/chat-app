import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleRemoveUid } from "../../store/uidSlice";
import { removeCurrUserData } from "../../store/currUserDataSlice";

const CustumDrawer = (props) => {
  const dispatch = useDispatch();


  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser);
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);

  // console.log(currUserData);

  const handleLogout = async () => {
    dispatch(handleRemoveUid());
    dispatch(removeCurrUserData());
  };

  return (
    <View style={reduxTheme ? styles.containerBlack : styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1 }}
      >
        <Image
          source={{
            uri: currUserData.imageUri,
          }}
          style={styles.imgStyle}
        />
        <Text style={reduxTheme? styles.textStyleBlack : styles.textStyle}>{currUserData.name}</Text>
        <View style={styles.viewStyle}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutViewStyle}>
          <Ionicons name="log-out" size={30} color={reduxTheme ? "white" : "black"}></Ionicons>
          <Text style={reduxTheme ? styles.logoutTextBlack: styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustumDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBlack: {
    flex: 1,
    backgroundColor:"#13151B"
  },
  imgStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginLeft: 35,
    marginTop: 20,
  },
  textStyle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  textStyleBlack: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    color:"white"
  },
  viewStyle: {
    marginTop: 10,
  },
  logoutViewStyle: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 22,
  },
  logoutText: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  logoutTextBlack: {
    fontWeight: "bold",
    marginLeft: 10,
    color:"white"
  },
});
