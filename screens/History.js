import React, { useState, useEffect,useRef } from 'react';
import { Text, View, StyleSheet, Button,Image, AsyncStorage, ScrollView,SafeAreaView } from 'react-native';
import "@ethersproject/shims"
import Web3 from 'web3';
import abi from "../abi/abi.json";
import { ethers } from 'ethers';
import { Card,ListItem,Icon } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
function History() {
  const [datacount,sdatacount]=useState(); 
  const [data,sdata]=useState();
  const animation = useRef(null);
  const [ani,sani]=useState(true);
  const [revv,srev]=useState();
  var r=[];
  const isFocused=useIsFocused();
  async function getcat(){
      
        let url = "https://rpc-mumbai.maticvigil.com/";
        const web3 = new Web3('https://rpc-mumbai.maticvigil.com/');
        let provider = new ethers.providers.JsonRpcProvider(url);
        var address=await AsyncStorage.getItem('address');
        let contract_address="0x94E3cb14b261ea054326f6eF02EEA667a8098c89";
        var privatekey =await AsyncStorage.getItem('privatekey');
        var wallet = new ethers.Wallet(privatekey,provider);
        var contract = new ethers.Contract(contract_address,abi,wallet);
        var dc=await contract.scanitemcount(address);
       // console.log(dc);
        for(let i=0;i<dc;i++){
        var x=await contract.scandata(address,i);
        var da={"id":i,"title":x[3], "brand":x[2], "price":x[4], "image":x[5]};
        r.push(da);
        console.log(da);
        }
    
       
      sdata(r);
      sani(false);
        
      }
     useEffect(()=>{
      getcat();
     },[]);

        return (
      
        
        <ScrollView>
  {
    !ani&&isFocused?
    data.map((data) => {
      var im=data.image;
      return (
    
         <Card containerStyle={{padding: 0}} key={data.id} >
        <Image
         style={{width: 100, height: 100}}
        source={{uri:im}}
      />
        <Text>{data.title}</Text>
        <Text>{data.brand}</Text>
        <Text>{data.price}</Text>
      
        </Card>
       
      );
    })
    :
    <>
    <LottieView
ref={animation}
style={{
  width: 400,
  height: 400,
  marginLeft:-40,
  marginTop:50
}}
loop={true}
autoPlay
// Find more Lottie files at https://lottiefiles.com/featured
source={require("../assets/load1.json")}
/>
</>
}
</ScrollView>      
          

        )
     
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    
    },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });
export default History;