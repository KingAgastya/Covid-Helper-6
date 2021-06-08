import React, {Component} from 'react'
import {Text, View, StyleSheet, Alert} from 'react-native'
import {Header, Icon, Badge} from 'react-native-elements'
import NotificationsScreen from '../screens/NotificationsScreens'
import db from '../config'
import firebase from 'firebase'

export default class MyHeader extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            value : ""
        }
    }

    getUnreadNotifs(){
        db.collection("all_notifications").where("notification_status", "==", "unread")
        .onSnapshot((snapshot) =>{
            var unreadNotifs = snapshot.docs.map((doc) =>{doc.data()})
            this.setState ({
                value : unreadNotifs.length
            })
        })
    }

    componentDidMount(){
        this.getUnreadNotifs()
    }
    
    BellIconWithBadge =()=>{
        return(
            <View>
                <Icon name = "bell" type = "font-awesome" color = "#696969" size = {25}
                onPress ={()=>{
                    props.navigation.navigate("Notifications")
                }}/>
                <Badge value = {this.state.value} containerStyle = {{position : "absolute", top : -4, right : -4}}/>
            </View>
        )
    }

    render(){
        return(
            <Header 
            leftComponent = {<Icon name = "bars" type = "font-awesome" color = "#696969"
            onPress ={() =>{
                props.navigation.toggleDrawer()
            }}/>}
            rightComponent = {<this.BellIconWithBadge{...this.props}/>}
            centerComponent = {{text : props.title, style : {color : "#2423ec", fontSize : 20, fontWeight : "bold"}}}
            backgroundColor = "#afbced"/>
        )
    }
}