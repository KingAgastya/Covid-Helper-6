import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import DonateScreen from '../screens/DonateScreen'

export const AppStackNavigator = createStackNavigator({
    DonateList : {screen : DonateScreen, navigationOptions : {headerShown : false}},
},
{
    initiateRouteName : "DonateList"
})