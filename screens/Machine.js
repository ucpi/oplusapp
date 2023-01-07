import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Engine from './Engine';
import Auth from './Auth';
function Machine() {
  const Stack = createNativeStackNavigator();
    return (
        
            <Stack.Navigator>
                 <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Engine" options={{ headerShown: false }} component={Engine} />
      </Stack.Navigator>
            
    );
  }
export default Machine;