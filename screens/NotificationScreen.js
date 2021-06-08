import React , {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet} from 'react-native';
import {Icon, ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'
import SwipeableFlatlist from '../components/SwipeableFlatlist'

export default class NotificationsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId : firebase.auth().currentUser.email,
            allNotifications : []
        }
        this.notificationRef = null
    }

    getNotification =()=>{
        this.requestRef = db.collection("all_notifications").where("notification_status", "==", "Unread").where("targeted_user_id", "==", this.state.userId)
        .onSnapshot((snapshot) => {
            var allNotifications = []
            snapshot.docs.map((doc) =>{
                var notification = doc.data()
                notification["doc_id"] = doc.doc_id
                allNotifications.push(notification)
            })
            this.setState({
                allNotifications : allNotifications
            })
        })
    }

    componentDidMount(){
        this.getNotification()
    }

    componentWillUnmount(){
        this.notificationRef()
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ( {item, index} ) =>(
        <ListItem
          key = {index}
          leftElement = {<Icon name="book" type="font-awesome" color ='#696969'/>}
          title = {item.book_name}
          subtitle = {item.message}
          bottomDivider
        />
    )

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{flex : 0.1}}>
                    <MyHeader title = {"Notifications"}
                    navigation = {this.props.navigation}/>
                </View>
                <View style = {{flex : 0.9}}>
                    {
                        this.state.allNotifications.length === 0?(
                            <View style = {{flex : 1, justifyContent : "center", alignItems : 'center'}}>
                                <Text style = {{fontSize : 20}}>You have no notifs</Text>
                            </View>
                        ) : (
                            <SwipeableFlatlist allNotifications = {this.state.allNotifications}/>
                        )
                    }
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    }
})