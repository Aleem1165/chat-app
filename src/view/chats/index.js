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
import backendURL from "../../config/backendURL";
import socket from "../../config/io"

export default function Chats({ navigation }) {
  const [allChatsData, setAllChatsData] = useState();


  const reduxUid = useSelector((state) => state);
  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser);
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);


  
  
  useEffect(() => {
    socket.on(`existingChat` , (existingChat)=>{
      console.log("socket===>",existingChat)
      const forCurrUser = existingChat.filter(
        (existingChat) => existingChat.uid == currUserData._id
      );
      const forCurrUser2 = existingChat.filter(
        (existingChat) => existingChat.uid2 == currUserData._id
      );
      const finalCurrUserChat = forCurrUser.concat(forCurrUser2)
      console.log(finalCurrUserChat);
      setAllChatsData(finalCurrUserChat);
    })
    
  }, [socket])
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          backendURL + "apis/user/getAllChetRooms"
        );
        const allChats = data.data;
        const currUserChats1 = allChats.filter(
          (allChats) => allChats.uid == currUserData._id
        );
        const currUserChats2 = allChats.filter(
          (allChats) => allChats.uid2 == currUserData._id
        );

        const currUserChats = currUserChats1.concat(currUserChats2);
        if (currUserChats.length > 0) {
          setAllChatsData(currUserChats);
        } else {
          setAllChatsData();
        }
      } catch (error) {
      }
    })();
  }, []);

  const handleMoveChatRoom = async (item, index) => {
    navigation.navigate("ChatRoom", { _id: item._id });
  };
  return (
    <View style={reduxTheme ? styles.containerBlack : styles.container }>
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
                <View style={reduxTheme? styles.mapViewBlack : styles.mapView}>
                  <Image
                    source={{
                      uri: item.imageUri.replace(currUserData.imageUri, ""),
                    }}
                    resizeMode="contain"
                    style={styles.mapImg}
                  />
                  <Text
                  style={reduxTheme ? styles.mapTextBlack : styles.mapText}
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
  containerBlack: {
    flex: 1,
    backgroundColor:"#13151B"
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
  mapViewBlack: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:5,
    borderBottomColor:"white",
    borderBottomWidth:2,
    borderStyle:"solid"
    
  },
  mapImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal:10
  },
  mapTextBlack:{
    fontSize:15,
    fontWeight:"bold",
    color:"white"
  },
  mapText:{
    fontSize:15,
    fontWeight:"bold",
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
