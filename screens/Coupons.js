import React, { useState, useEffect,useRef } from 'react';
import { Text, View, StyleSheet, Button,ScrollView,Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import abi from "../abi/abi.json";
import { AsyncStorage } from 'react-native';
import Web3 from "web3";
import { ethers,utils,Contract } from 'ethers';
import LottieView from 'lottie-react-native';
import { Card,ListItem,Icon } from 'react-native-elements';
function Coupons() {
  useEffect(()=>{
    fetchreward();
  },[]);
  var r=[];
  const [data,sdata]=useState();
  const animation = useRef(null);
  const [ani,sani]=useState(false);
  async function fetchreward(){
  let url = "https://rpc-mumbai.maticvigil.com/";
  const web3 = new Web3('https://rpc-mumbai.maticvigil.com/');
  let provider = new ethers.providers.JsonRpcProvider(url);
  let address="0x94E3cb14b261ea054326f6eF02EEA667a8098c89";
  var y = await AsyncStorage.getItem('address');
  var wallet = new ethers.Wallet("097b20c119d5a38697353581382902a4be67470be319dd3d46d5c1d306979ad3",provider);
  var contract = new ethers.Contract(address,abi,wallet);
  console.log(y);
  try{
  var d1=await contract.myrewards(y,0); 
  var da1={"id":Math.random(),"brand":d1[1], "coupon":d1[0]};
  r.push(da1);
  }
  catch(e){

  }

  try{
    var d2=await contract.myrewards(y,1); 
    var da2={"id":Math.random(),"brand":d2[1], "coupon":d2[0]};
    r.push(da2);
    }
    catch(e){
  
    }
    try{
      var d3=await contract.myrewards(y,2); 
      var da3={"id":Math.random(),"brand":d3[1], "coupon":d3[0]};
      r.push(da3);
      }
      catch(e){
    
      }
      try{
        var d4=await contract.myrewards(y,3); 
        var da4={"id":Math.random(),"brand":d3[1], "coupon":d3[0]};
        r.push(da4);
        }
        catch(e){
      
        }
        try{
          var d5=await contract.myrewards(y,4); 
          var da5={"id":Math.random(),"brand":d5[1], "coupon":d5[0]};
          r.push(da5);
          }
          catch(e){
        
          }
  sdata(r);

  console.log(r);
  sani(true);
  }
  //sdata(r);
    return (
      <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center'}}>
               <ScrollView>
  {
    ani?
  data.map((data) => {
      var im="https://media.istockphoto.com/id/1208768030/vector/coupon-frame-clip-to-save-frame-with-a-dotted-bounding.jpg?s=612x612&w=0&k=20&c=avlbnoR3muVcmRJ3Plg7yexP-1FC1ZbTHS_mDakHGT0=";
      return (
    
         <Card containerStyle={{padding: 0}} key={data.id} >
        <Image
         style={{width: 150, height: 100}}
        source={{uri:im}}
      />
        <Text style={{marginStart:50}}>{data.brand}</Text>
        <Text style={{marginStart:50}}>code:{data.coupon}</Text>
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
source={require("../assets/load1.json")}
/>
</>
}
</ScrollView>      
      </View>
    );
  }
export default Coupons;