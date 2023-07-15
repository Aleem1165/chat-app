import axios from "axios";
import { useEffect, useState, scrollViewRef, scrollToEnd } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import ChatRoomHeader from "../../component/chatRoomHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import backendURL from "../../config/backendURL";
import socket from "../../config/io";

const backgroundImageWhite = {
  uri: "https://media.istockphoto.com/id/1409540606/vector/vector-contact-us-pattern-contact-us-seamless-background.jpg?s=612x612&w=0&k=20&c=3djpAIuo9fE9Mr4T7bLIUpEjqU7XaZk4wWt7aMUgU1o=",
};

const backgroundImageBlack = {
  uri: "https://i.pinimg.com/originals/85/04/30/850430a750fb80c1ebaa5e740fc7cbd6.jpg",
};

// 
export default function ChatRooms({ route, navigation }) {
  const [chatRoomData, setChatRoomData] = useState();
  const [message, setMessage] = useState("");
  const [oldMessage, setOldMessage] = useState("");

  const reduxUid = useSelector((state) => state);
  const currUserData = useSelector((state) => state.CurUserDataSlice.currUser);
  const reduxTheme = useSelector((state) => state.ThemeSlice.theme);


  const _id = route.params._id || route.params.data.data._id;

  useEffect(() => {
    socket.on(`msg`, (msg) => {
      const id = msg._id;
      const data = msg.msg;
      let [firstKey] = Object.keys(data);
      if (id == _id) {
        setOldMessage((oldMessage) => [...oldMessage, data[firstKey]]);
      }
    });
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          backendURL + "apis/user/getSingleChatRoom",
          {
            _id,
          }
        );
        setChatRoomData(data.data[0]);
        setOldMessage(data.data[0].messages);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [_id]);

  const uri =
    chatRoomData && chatRoomData.imageUri.replace(currUserData.imageUri, "");
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
  };

  const scrollViewRef = React.useRef();

  return (
    <View style={styles.container}>
      <ChatRoomHeader
        name={name ? name : "name"}
        uri={
          uri
            ? uri
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx3xbe3PZUx_dbv23hCujWeeZQzdyq_2dwa6JK48Y&s"
        }
        navigation={navigation}
      />
      <View style={styles.chatContainer}>
        <ImageBackground
          source={reduxTheme ? backgroundImageBlack : backgroundImageWhite}
          resizeMode="repeat"
          style={{ flex: 1  }}
        >
          <ScrollView
            ref={scrollViewRef}
            nestedScrollEnabled={true}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollViewRef.current?.scrollTo({ y: contentHeight });
            }}
            style={styles.scrollviewStyle}
          >
            {oldMessage &&
              oldMessage.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={
                      item.uid === currUserData._id
                        ? styles.mapViewWithUid
                        : styles.mapViewWithoutUid
                    }
                  >
                    <View
                      style={
                        item.uid === currUserData._id
                          ? styles.msgViewWithUid
                          : styles.msgViewWithoutUid
                      }
                    >
                      <Text style={styles.msgText}>{item.message}</Text>
                      <Text
                        style={
                          item.uid === currUserData._id
                            ? styles.msgTimeWithUid
                            : styles.msgTimeWithoutUid
                        }
                      >
                        {item.time}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </ScrollView>

          <View style={reduxTheme ? styles.inputViewBlack : styles.inputView}>
            <TextInput
              style={reduxTheme ? styles.inputBlack : styles.input}
              placeholder={"Message"}
              placeholderTextColor={reduxTheme ? "white" : "black"}
              onChange={(e) => setMessage(e.nativeEvent.text)}
              value={message}
            />
            <TouchableOpacity
              onPress={() => {
                message && handleSendMessage();
              }}
            >
              <Ionicons name="send" size={25} color={reduxTheme && "white"}></Ionicons>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  inputViewBlack: {
    alignSelf: "flex-end",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#13151B",
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
  inputBlack: {
    width: "100%",
    flex: 1,
    color:"white"
  },
  chatContainer: {
    flex: 1,
  },
  scrollviewStyle: {
    flex: 1,
  },
  mapViewWithUid: {
    marginTop: 5,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  mapViewWithoutUid: {
    marginTop: 5,
    justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  msgViewWithUid: {
    backgroundColor: "#03a9f4",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  msgViewWithoutUid: {
    // backgroundColor: "#03a9f4",
    backgroundColor: "#808080",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  msgText: {
    fontSize: 16,
  },
  msgTimeWithUid: {
    alignSelf: "flex-end",
    fontSize: 12,
  },
  msgTimeWithoutUid: {
    alignSelf: "flex-start",
    fontSize: 12,
  },
});
