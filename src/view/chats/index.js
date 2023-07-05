import axios from "axios";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import backendURL from "../../../backendURL";

export default function Chats({ navigation }) {
  const [allChatsData, setAllChatsData] = useState();

  // const backendURL = "http://192.168.0.106:6000/";

  const reduxUid = useSelector((state) => state);
  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser);
  // console.log(reduxUid);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          backendURL + "apis/user/getAllChetRooms"
        );
        console.log("allChatRooms===>", data);
        const allChats = data.data;
        // console.log(allChats);
        const currUserChats1 = allChats.filter(
          (allChats) => allChats.uid == currUserData._id
        );
        const currUserChats2 = allChats.filter(
          (allChats) => allChats.uid2 == currUserData._id
        );

        const currUserChats = currUserChats1.concat(currUserChats2);
        console.log("currUserChats===>", currUserChats);
        // setAllChatsData(currUserChats)
        if (currUserChats.length > 0) {
          setAllChatsData(currUserChats);
        } else {
          setAllChatsData();
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  // console.log(currUserData.imageUri);
  // const uri = currUserData.imageUri
  //   let name = "Aleem2"
  //   let chatRoomNAme = "AleemAleem2"
  //   let newString = chatRoomNAme.replace(name , "")
  //   console.log(newString);

  // console.log(allChatsData);

  console.log(allChatsData);
  const handleMoveChatRoom = async (item, index) => {
    navigation.navigate("ChatRoom", { _id: item._id });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {allChatsData ? (
          allChatsData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleMoveChatRoom(item, index);
                }}
              >
                <View style={styles.mapView}>
                  <Image
                    source={{
                      uri: item.imageUri.replace(currUserData.imageUri, ""),
                    }}
                    resizeMode="contain"
                    style={styles.mapImg}
                  />
                  <Text
                  style={{
                    fontSize:15,
                    fontWeight:"bold"
                  }}
                  >
                    {item.chatroomName.replace(currUserData.name, "")}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.view}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NewChat");
              }}
              style={styles.touchO}
            >
              <Ionicons name="add-circle" size={40}></Ionicons>
              <Text style={styles.text}>Start chat!</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:5,
    borderBottomColor:"black",
    borderBottomWidth:2,
    borderStyle:"solid"
    
  },
  mapImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal:10
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  touchO: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
