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
  // console.log(currUserData);

  const handleLogout = async () => {
    dispatch(handleRemoveUid());
    dispatch(removeCurrUserData());
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <Image
          source={{
            uri: currUserData.imageUri,
          }}
          style={styles.imgStyle}
        />
        <Text style={styles.textStyle}>{currUserData.name}</Text>
        <View style={styles.viewStyle}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutViewStyle}>
          <Ionicons name="log-out" size={30}></Ionicons>
          <Text style={styles.logoutText}>Logout</Text>
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
});
