import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu  from './CustomSideBarMenu';
import HomeScreen from '../screens/HomeScreen';
import {Icon} from 'react-native-elements'

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
            screen : AppTabNavigator,
            navigationOptions : {
            drawerIcon : <Icon name = "Home" type = 'font-awesome'/>,
            drawerLabel : "Home"
            }
        }
    },
    {
      contentComponent:CustomSideBarMenu
    },
    {
      initialRouteName : 'Home'
    }
  )