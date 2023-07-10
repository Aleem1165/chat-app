import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import axios from "axios";
import backendURL from "../../config/backendURL";
import socket from "../../config/io";

export default function NewChat({ navigation }) {
  // const backendURL = "http://192.168.0.106:6000/";

  const [allUserData, setAllUserData] = useState("");
  const reduxUid = useSelector((state) => state);
  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser);
  // console.log(allUserData);

  // socket.on(`message` , (users)=>{
  //   console.log("socket===>",users)
  //   // setAllUserData(allUserData => [...allUserData , users])
  //   // setAllUserData(allUserData.push(users))
  // })

  useEffect(() => {
    socket.on(`message`, (users) => {
      console.log("socket", users);
      setAllUserData((allUserData) => [...allUserData, users]);
    });
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(backendURL + "apis/user/userData");
        // console.log(data.data);
        const allData = data.data;
        const filterArr = allData.filter(
          (allData) => allData._id !== currUserData._id
        );
        // console.log("filterArr===>" , filterArr);
        setAllUserData(filterArr);
      } catch (error) {
        alert(error.message);
      }
    })();
  }, []);

  const handleCreateChatRoom = async (item, index) => {
    const chatroomName = item.name + currUserData.name;
    // || currUserData.name + item.name;
    const { data } = await axios.post(
      backendURL + "apis/user/existingChatRoom",
      {
        chatroomName,
      }
    );
    // console.log("1st concole", data);

    if (data.message == "existingChat find") {
      navigation.navigate("ChatRoom", { data: data });
    } else {
      const chatroomName = currUserData.name + item.name;
      const { data } = await axios.post(
        backendURL + "apis/user/existingChatRoom",
        {
          chatroomName,
        }
      );
      if (data.message == "existingChat find") {
        navigation.navigate("ChatRoom", { data: data });
      } else {
        const { data } = await axios.post(
          backendURL + "apis/user/createChatRoom",
          {
            uid: currUserData._id,
            uid2: item._id,
            chatroomName: currUserData.name + item.name,
            imageUri: item.imageUri + currUserData.imageUri,
            message: [],
          }
        );
        navigation.navigate("ChatRoom", { data: data });
      }
    }
  };

  // console.log("allUserData", allUserData);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.iconView}>
          <Ionicons
            name="chatbubbles-sharp"
            color="#03a9f4"
            size={60}
          ></Ionicons>
          <Text>Chat With You's Buddies!</Text>
        </View>
        <View>
          {allUserData &&
            allUserData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleCreateChatRoom(item, index);
                  }}
                >
                  <View style={styles.mapView}>
                    <Image
                      source={{
                        uri: item.imageUri,
                      }}
                      resizeMode="contain"
                      style={styles.mapImage}
                    />
                    <Text style={styles.mapText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  mapImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mapText: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  iconView: {
    display: "flex",
    alignItems: "center",
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
});
