import React, {Component} from 'react'
import {View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert, TextInput, TouchableHighlight, FlatList} from 'react-native'
import MyHeader from '../components/MyHeader' 
import db from '../config'
import firebase from 'firebase'
import db from '../config'

export default class RequestScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            itemName : '',
            description : '',
            dataSource : '',
            showFlatlist : ''
        }
    }
    
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }


    getItemRequest =()=>{
        var itemRequest = db.collection("requested_items").where("user_id", '==', this.state.userId).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.data().item_status !== "received"){
                    this.setState({
                        requestId : doc.data().request_id,
                        requestItemName : doc.data().item_name,
                        itemStatus : doc.data().item_status,
                        docId : docId
                    })
                }
            })
        })
    }

    getIsItemRequestActive(){
        db.collection("user").where("email_id", "==", this.state.userId)
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.setState({
                    isItemRequestActive : doc.data().isItemRequestActive,
                    userDocId : doc.id
                })
            })
        })
    }

    sendNotification =()=>{
        db.collection("user").where("email_id", "==", this.state.userId).get()
        .then((snapshot) =>{
            snapshot.forEach((doc) => {
            var name = doc.data().name
            db.collection("all_notifications").where("request_id", "==", this.state.requestId).get()
                .then((snapshot) =>{
                snapshot.forEach((doc) => {
                var donorId = doc.data().donor_id
                var itemName = doc.data().item_name
                db.collection("all_notifications").add({
                    "targeted_user_id" : donorId,
                    "message" : name + " " +  "has received your Item" + itemName, 
                    "notification_status" : "unread",
                    "item_name" : itemName
                })
            })
        })
        })
    })}


    updateItemRequestStatus=()=>{
        db.collection("requested_Items").doc(this.state.docId).update({
            item_status : "received"
        })
        db.collection("user").where("email_id", "==", this.state.userId).get()
        .then((snapshot) =>{
            snapshot.forEach((doc) => {
                db.collection("user").doc(doc.id).update({
                    isItemRequestActive : false
                })
            })
        })
    }

    addRequest =async(itemName, description)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection("requested_items").add({
            "item_name" : itemName,
            "description_of_item" : description,
            "request_id" : randomRequestId,
            "user_id" : userId,
            "item_status" : "requested",
            "date" : firebase.firestore.FieldValue.serverTimestamp(),
        })

        await this.getItemRequest()
        db.collection("user").where("email_id", "==", userId).get().then()
        .then((snapshot) => {
            snapshot.forEach((doc) =>{db.collection("user").doc(doc.id).update({
                isItemRequestActive : true
            })})
        })

        api

        this.setState({
            itemName : "",
            description : "",
            requestId : randomRequestId
        })

        return Alert.alert("Request Created")
    }

    renderItem =({item, i})=>{
        return(
            <TouchableHighlight style = {{alignItems : 'center', backgroundColor : '#edfac2', padding : 10, width : "90%"}}
            activeOpacity = {0.6}
            underlayColor = 'skyblue'
            onPress ={()=>{
                this.setState({
                    showFlatlist : false,
                    itemName : item.volumeInfo.title,
                    ItemImage : item.volumeInfo.image
                })
            }}
            bottomDivider>
                <Text>{item.volumeInfo.title}</Text>
            </TouchableHighlight>
        )
    }

    render(){
        if(this.state.isItemRequestActive === true){
            return(
                <ScrollView>
                <View style = {{flex : 1, justifyContent : 'center'}}>
                    <View style = {{justifyContent : "center", alignItems : 'center', borderColor : "#235e13", borderWidth : 2, padding : 10, margin : 10}}>
                        <Text>Item Name</Text>
                        <Text>{this.state.requestItemName}</Text>
                    </View>
                    <View style = {{justifyContent : "center", alignItems : 'center', borderColor : "#235e13", borderWidth : 2, padding : 10, margin : 10}}>
                        <Text>Item Status</Text>
                        <Text>{this.state.item_status}</Text>
                    </View>
                    <TouchableOpacity style = {{backgroundColor : "#124eac", borderColor : "#333BCD", alignItems : "center", alignSelf : "center", height : 30, borderWidth : 1}}
                    onPress ={() =>{
                        this.sendNotification()
                        this.updateItemRequestStatus()
                        this.receivedItems(this.state.requestItemName)
                    }}>
                        <Text>I have Received The Item</Text>
                    </TouchableOpacity>

                </View>
                </ScrollView>
            )
        }

        else{
            return(
                <ScrollView>
                <View style = {styles.container}>
                    <MyHeader title = "Request An Item"/>
                    <KeyboardAvoidingView style = {styles.keyBoardStyle}>

                        <TextInput style = {styles.formTextInput}
                        placeholder = {"Enter Item Name"}
                        onChangeText = {(text) => {
                            this.setState({
                                itemName : text
                            })
                        }}
                        value = {this.state.itemName}/>

                        {this.state.showFlatlist ? (
                            <FlatList
                            data = {this.state.dataSource}
                            renderItem = {this.renderItem}
                            enableEmptySections = {true}
                            style = {{marginTop : 10}}
                            keyExtractor = {(item, index) => index.toString()}/>
                        ) 
                        : (
                        <TextInput style = {[styles.formTextInput, {height : 300}]}
                        multiline
                        numberOfLines = {8}
                        placeholder = {"Description"}
                        onChangeText = {(text) => {
                            this.setState({
                                description : text
                            })
                        }}
                        value = {this.state.description}/>
                        )}

                        <TouchableOpacity style = {styles.button}
                        onPress ={() =>{
                            this.addRequest(this.state.itemName, this.state.description)
                        }}>
                            <Text>Request</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
                </ScrollView>
            )
        }
    }
}

styles = StyleSheet.create({
    container : {
        flex : 1
    },
    keyBoardStyle : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    formTextInput : {
        width : 60,
        height : 50,
        marginTop : 20,
        borderRadius : 15,
        borderWidth : 4,
        padding : 10,
        borderColor : "red"
    },
    button : {
        width : 50,
        height : 20,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : "#696969",
        shadowColor : 0,
        shadowOffset : {
            width : 5,
            height : 10
        }
    }
})