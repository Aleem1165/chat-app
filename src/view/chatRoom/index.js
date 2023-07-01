import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function ChatRooms({ route, navigation }) {

    const backendURL = "http://192.168.0.106:6000/";

  const [chatRoomData , setChatRoomData] = useState()

  const reduxUid = useSelector((state) => state);
  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser)
  console.log(currUserData);

    const _id = route.params._id || route.params.data.data._id
    console.log(_id);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          backendURL + "apis/user/getSingleChatRoom" , {
           _id 
          }
        );
        console.log("originalData====>" , data.data);
        setChatRoomData(data.data)
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [_id]);
    console.log("chatRoomData===?" , chatRoomData);

  //   let name = "Aleem2"
  //   let chatRoomNAme = "AleemAleem2"
  //   let newString = chatRoomNAme.replace(name , "")
  //   console.log(newString);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        // backgroundColor:"green"
      }}
    >
      <Text>chatRoom</Text>
      <Text>{chatRoomData && chatRoomData[0].chatroomName.replace(currUserData.name , "")}</Text>
    </View>
  );
}
