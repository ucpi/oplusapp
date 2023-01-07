import React, { useState, useEffect,useRef } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card } from 'react-native-paper';
import Cards from '../components/Card';
import Selectbtn from '../components/Selectbtn';
import RadioGroup from 'react-native-radio-buttons-group';
import abi from "../abi/abi.json";
import { AsyncStorage } from 'react-native';
import Web3 from "web3";
import { ethers,utils,Contract } from 'ethers';
import axios from "axios";
import LottieView from 'lottie-react-native';
import RNRestart from 'react-native-restart';
//import Selectbtn from '../components/Selectbtn';


const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Food',
    value: 'Food'
},{
    id: '2',
    label: 'Sports',
    value: 'Sports'
},
{
    id: '3',
    label: 'Clothing',
    value: 'Clothing'
}
]

function Engine({route,navigation}) {
const {title,price,image,brand,uin}=route.params; 
const [isSelected, setIsSelected] = useState('');   
const [category,scategory]=useState("");

const exit=()=>{
    navigation.navigate("Home");
}

const animation = useRef(null);
const [success,setsuccess]=useState(false);
useEffect(()=>{
    if(success==true){
        setTimeout(()=>{
            navigation.navigate("History");
        },8000)
    }
    },[success]);
async function getcat(){
    setsuccess(true);
    let url = "https://rpc-mumbai.maticvigil.com/";
    const web3 = new Web3('https://rpc-mumbai.maticvigil.com/');
    let provider = new ethers.providers.JsonRpcProvider(url);
    let address="0x94E3cb14b261ea054326f6eF02EEA667a8098c89";
    var wallet = new ethers.Wallet("097b20c119d5a38697353581382902a4be67470be319dd3d46d5c1d306979ad3",provider);
    var contract = new ethers.Contract(address,abi,wallet);
    try {
        await AsyncStorage.setItem(
          'address',
          wallet.address
        );
      } catch (error) {
        // Error saving data
      }
    var msg="0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
    let signo=web3.eth.accounts.sign(msg,"097b20c119d5a38697353581382902a4be67470be319dd3d46d5c1d306979ad3");
    console.log(signo);
    //alert(price);
    contract.scanitem(brand,uin,title,price,image,msg,signo.signature).then(e=>{
    console.log(e);
 
    });
}
async function uploadscan(){
let url = "https://api.s0.ps.hmny.io";
const web3 = new Web3('https://api.s0.ps.hmny.io');
let provider = new ethers.providers.JsonRpcProvider(url);
let address="0x6235D9f000B05D098da8098dF0BD70d6a81982e6";
const privatekey = await AsyncStorage.getItem('privatekey');
var wallet = new ethers.Wallet("097b20c119d5a38697353581382902a4be67470be319dd3d46d5c1d306979ad3",provider);
var contract = new ethers.Contract(address,abi,wallet);
var msg="0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
let signo=web3.eth.accounts.sign(msg,"097b20c119d5a38697353581382902a4be67470be319dd3d46d5c1d306979ad3");
contract.scanitem("others",brand,uin,title,price,"india",image,msg,signo.signature).then(e=>{
console.log(e);
setsuccess(true);
});
}
    return (
        <View style={{marginTop:200}}>
            {!success?<Cards title={title} price={price} image={image} exit={exit} brand={brand} getcat={getcat}>
            </Cards>
:<LottieView
ref={animation}
style={{
  width: 400,
  height: 400,
}}
loop={false}
autoPlay
source={require("../assets/done1.json")}
/>}
        </View>

    );
  }
export default Engine;