import * as WebBrowser from "expo-web-browser";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { AsyncStorage } from 'react-native'; 
global.Buffer = global.Buffer || require('buffer').Buffer
const resolvedRedirectUrl =
Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
  ? Linking.createURL("web3auth", {})
  : Linking.createURL("web3auth", { scheme: scheme });
const clientId="BMNY-Kz5Qv60hjpAqRVhTZVaMgRu1RWogG4SB9b46bSkL6dNH5FLnFUraVUKut6M-eEgQJ0qYcMR9wRjKQKMT6U";
const web3auth = new Web3Auth(WebBrowser, {
clientId,
network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});
function Auth({ navigation }) {
   useEffect(()=>{
    try {   
        async function j(){
            const value = await AsyncStorage.getItem('privatekey');
            console.log("private key-----"+value);
            if(value!=null){
                navigation.navigate("Home");
            }
        }  
        j();
        }
        catch (error) {
        console.log(error)
        }
   })
    const login = async () => {
        try {
         // setConsole("Logging in");
          const web3auth = new Web3Auth(WebBrowser, {
            clientId,
            network: OPENLOGIN_NETWORK.TESTNET, // or other networks
          });
          const info = await web3auth.login({
            loginProvider: LOGIN_PROVIDER.GOOGLE,
            redirectUrl: resolvedRedirectUrl,
            mfaLevel: "none",
            curve: "secp256k1",
          });
          console.log(info);
        //localStorage.setItem("privatekey",info.privKey);
        try {     
            await AsyncStorage.setItem('privatekey',info.privKey);
          //  await AsyncStorage.setItem('privatekey',info.);
            }
            catch (error) {
            console.log(error)
            }
        navigation.navigate("Home");
        //   setUserInfo(info);
        //   setKey(info.privKey);
        console.log(info);
        } catch (e) {
         console.log(e);
        }
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>welcome to history tab</Text>
       <Button title="login" onPress={login}></Button>
      </View>
    );
  }
export default Auth;