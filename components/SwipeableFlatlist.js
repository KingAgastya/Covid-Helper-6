import React, {Component} from 'react'
import {Text, View, StyleSheet, Dimensions} from 'react-native'
import {Icon, ListItem} from 'react-native-elements'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'
import firebase from 'firebase'

export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            allNotifications  : this.props.allNotifications
        }
    }

    updateMarkAsread = notification => {
        db.collection("all_notifications").doc(notification.doc_id).update({notification_status : "read"})
    }

    renderItem = data => {
        <ListItem leftElement = {<Icon name = "Book" type = "font-awesome" color = "#043292"/>}
        title = {data.item.book_name}
        title style = {{color : "#000000", fontWeight : "bold"}}
        subtitle = {data.item.message}
        bottomDivider/>
    }

    renderHiddenItem =()=> {
        <View style = {styles.rowBack}>
            <View style = {[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style = {styles.backTextWhite}>Mark As Read</Text>
            </View>
        </View>
    }

    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allNotifications
        const {key, value} = swipeData
        if (value < -Dimensions.get("window").width){
            const viewData = [...allNotifications]
            this.updateMarkAsread(allNotifications[key])
            newData.splice(key, 1)
            this.setState({
                allNotifications: newData
            })
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <SwipeListView disableRightSwipe
                data = {this.state.allNotifications}
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get("window").width}
                previewRowKey = {0}
                previewOpenValue = {-40}
                previewOpenDelay={3000}
                onSwipeValueChange = {this.onSwipeValueChange}
                keyExtractor ={(item, index) => index.toString()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    rowBack : {
        alignItems : "center",
        flex : 1,
        paddingLeft : 15,
        backgroundColor : "#ffff00",
        justifyContent : "space-between",
        flexDirection : 'row'
    },
    backRightBtn : {
        alignItems : "center",
        paddingLeft : 15,
        justifyContent : "center",
        position : 'absolute',
        top : 0,
        bottom : 0
    },
    backRightBtnRight : {
        backgroundColor : "#adfecb",
        right : 0
    },
    backTextWhite : {
        color : "#fff",
        fontWeight : "bold",
        fontSize : 20,
        textAlign : "center",
        alignSelf : "center"
    }
})