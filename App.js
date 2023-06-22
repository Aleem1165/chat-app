import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';

// 192.168.0.106


export default function App() {
  const backendURL = "http://192.168.0.106/";
  useEffect(()=>{
    (
      async() =>{
        try{
          const {data} = await axios.get("http://192.168.0.106:5000/");
          console.log("data===>" , data);
        }catch(error){
          console.log("error===>" , error);
        }
      }
    )
    ()
  },[])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
