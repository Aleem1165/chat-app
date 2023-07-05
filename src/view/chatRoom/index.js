import axios from "axios";
import {
  useEffect,
  useState,
  scrollViewRef,
  scrollToEnd,
} from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { useSelector } from "react-redux";
import ChatRoomHeader from "../../component/chatRoomHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import backendURL from "../../../backendURL";

export default function ChatRooms({ route, navigation }) {
  // const backendURL = "http://192.168.0.106:6000/";

  const [chatRoomData, setChatRoomData] = useState();
  const [message, setMessage] = useState("");
  const [oldMessage, setOldMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  const reduxUid = useSelector((state) => state);
  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser);
  // console.log(currUserData);

  const _id = route.params._id || route.params.data.data._id;

  // const interval = setInterval(() => {
  //   setRefresh(!refresh)
  // }, 2000);
  // // console.log(refresh);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          backendURL + "apis/user/getSingleChatRoom",
          {
            _id,
          }
        );
        // console.log("originalData====>" , data.data[0].messages);
        setChatRoomData(data.data[0]);
        setOldMessage(data.data[0].messages);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [_id, refresh]);
  // console.log("oldMessage===>", oldMessage);

  //   let name = "Aleem2"
  //   let chatRoomNAme = "AleemAleem2"
  //   let newString = chatRoomNAme.replace(name , "")
  //   console.log(newString);
  // console.log(oldMessage);
  const uri =
    chatRoomData && chatRoomData.imageUri.replace(currUserData.imageUri, "");
  // console.log(uri);
  const name =
    chatRoomData && chatRoomData.chatroomName.replace(currUserData.name, "");

  const handleSendMessage = async () => {
    const date = new Date();
    const time = date.toLocaleString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const { data } = await axios.post(backendURL + "apis/user/adMsg", {
      _id,
      obj: {
        uid: currUserData._id,
        message,
        time,
      },
    });

    console.log(data);
    setMessage("");
    setRefresh(!refresh);
  };

  const scrollViewRef = React.useRef();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ChatRoomHeader
        name={name ? name : "name"}
        uri={
          uri
            ? uri
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx3xbe3PZUx_dbv23hCujWeeZQzdyq_2dwa6JK48Y&s"
        }
        navigation={navigation}
      />
      <View
        style={{
          flex: 1,
          // backgroundColor: "yellow",
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          nestedScrollEnabled={true}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current?.scrollTo({ y: contentHeight });
          }}
          style={{
            flex: 1,
          }}
        >
          {/* <KeyboardAvoidingView
          behavior="position"
          // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex:1
          }}
          > */}
            {oldMessage &&
              oldMessage.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={
                      item.uid === currUserData._id
                        ? {
                            // backgroundColor: "red",
                            marginTop: 5,
                            alignItems: "flex-end",
                            // height:40,
                            justifyContent: "center",
                            paddingHorizontal: 10,
                            // width:200
                          }
                        : {
                            // backgroundColor: "red",
                            marginTop: 5,
                            // height:40,
                            justifyContent: "center",
                            paddingHorizontal: 10,
                            // width:200
                            alignItems: "flex-start",
                          }
                    }
                  >
                    <View
                      style={
                        item.uid === currUserData._id
                          ? {
                              backgroundColor: "#03a9f4",
                              padding: 10,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              borderBottomLeftRadius: 10,
                            }
                          : {
                              backgroundColor: "#03a9f4",
                              padding: 10,
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              borderBottomRightRadius: 10,
                            }
                      }
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          // fontWeight:"400"
                        }}
                      >
                        {item.message}
                      </Text>
                      <Text
                        style={
                          item.uid === currUserData._id
                            ? {
                                alignSelf: "flex-end",
                                fontSize: 12,
                              }
                            : {
                                alignSelf: "flex-start",
                                fontSize: 12,
                              }
                        }
                      >
                        {item.time}
                      </Text>
                    </View>
                  </View>
                );
              })}
            {/* </View> */}
          {/* </KeyboardAvoidingView> */}
        </ScrollView>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder={"Message"}
            // secureTextEntry={showPass ? false : true}
            onChange={(e) => setMessage(e.nativeEvent.text)}
            value={message}
          />
          <TouchableOpacity
            onPress={() => {
              message && handleSendMessage();
            }}
          >
            <Ionicons name="send" size={25}></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#F2F2F2",
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,

    elevation: 5,
    marginVertical: 20,
    marginHorizontal: 5,
  },
  input: {
    width: "100%",
    flex: 1,
  },
});
