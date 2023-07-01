import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function Chats({navigation}) {
  const [allChatsData, setAllChatsData] = useState();

  const backendURL = "http://192.168.0.106:6000/";

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
        setAllChatsData(currUserChats);
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

  const handleMoveChatRoom = async (item , index) => {
    navigation.navigate("ChatRoom" , {_id:item._id})
  }
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "red",
      }}
    >
      {allChatsData &&
        allChatsData.map((item, index) => {
          // console.log(item.chatroomName);
          return (
            <TouchableOpacity
            key={index}
            onPress={() => {
              handleMoveChatRoom(item , index)
            }}
            >
              <View
                style={{
                  backgroundColor: "green",
                  marginTop: 10,
                }}
                
              >
                <Image
                  source={{
                    uri: item.imageUri.replace(currUserData.imageUri, ""),
                  }}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
                />
                <Text>{item.chatroomName.replace(currUserData.name, "")}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}
