import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import RequestScreen from './screens/RequestScreen';
import DonateScreen from '../screens/DonateScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export const AppTabNavigator = createBottomTabNavigator({
    Donate : {
        screens : DonateScreen,
        navigationOptions : {tabBarLabel : "Donate"}
    },
    Request : {
        screens : RequestScreen,
        navigationOptions : {tabBarLabel : "Request"}
    },
})