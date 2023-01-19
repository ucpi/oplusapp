import * as WebBrowser from "expo-web-browser";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Pressable,Modal,Button } from 'react-native';
import { AsyncStorage } from 'react-native'; 
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import RNRestart from 'react-native-restart';
import { useIsFocused } from '@react-navigation/native';
import axios from "axios";

global.Buffer = global.Buffer || require('buffer').Buffer
const resolvedRedirectUrl =
Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
  ? Linking.createURL("web3auth", {})
  : Linking.createURL("web3auth", { scheme: "w3akvrn" });
const clientId="BMNY-Kz5Qv60hjpAqRVhTZVaMgRu1RWogG4SB9b46bSkL6dNH5FLnFUraVUKut6M-eEgQJ0qYcMR9wRjKQKMT6U";
const web3auth = new Web3Auth(WebBrowser, {
clientId,
network: OPENLOGIN_NETWORK.TESTNET, // or other networks
});
function Home({navigation}) {

  // useEffect(()=>{
  //   RNRestart.Restart();
  // },[navigation]);
  const isFocused = useIsFocused();
   
  // useEffect(() => {
  //   setScanned(false);
  //   setlogin(false);
  // },[navigation]);
    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
     const [title, stitle] = useState("");
     const [price,sprice]=useState("");
      const [image, simage] = useState("");
      const [brand,sbrand]=useState("");

    const [islogin,setlogin]=useState(false);
    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
          const go=await AsyncStorage.getItem('privatekey');
          if(go!=null){
           setlogin(true);
           }
        };
    
        getBarCodeScannerPermissions();
      });
      const getdata=(q)=>{
        const url="https://serpapi.com/search.json?q="+q+"&tbm=shop&location=india&gl=in&api_key=c43d0566bc19c45854d7d349f24a9248bbb286abd621c4d45c1cd153e99bd248";
        console.log(url);
    axios.get(url).then(e=>{
      try{
    var _price=e.data.shopping_results[0].extracted_price;
    var _title=e.data.shopping_results[0].title;
    var _b=_title.toString().split(" ");
    var _brand=_b[0];
    console.log(_b);
     var _image=e.data.shopping_results[0].thumbnail;
     sprice(_price);
     stitle(_title);
     simage(_image);
     sbrand(_brand);
    console.log(title,price);
    if(_price!=undefined){
      setScanned(false);
    navigation.navigate("Engine",{
      title:_title,
      price:_price.toString(),
      image:_image,
      brand:_brand,
      uin:q
    });
  }
  else{
    alert("product not supported");  
  }
  }
  catch(e){
    alert("product not supported");
  }
    }).catch(e=>{
      alert("product not supported");
    })           
    } 
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        getdata(data);
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      
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
            //localStorage.setItem("privatekey",info.privKey);
            try {     
                await AsyncStorage.setItem('privatekey',info.privKey);
                }
                catch (error) {
                console.log(error)
                }
                setlogin(true);
            
            //   setUserInfo(info);
            //   setKey(info.privKey);
            console.log(info);
            } catch (e) {
             console.log(e);
            }   
            
            
            
        }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{
        islogin?
        <>
         {isFocused ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}
       <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
      
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </>
      :<>
          <Button title="signup for new experience" onPress={login}></Button>
      </>
      }
        
      </View>
    );
  }
export default Home;
