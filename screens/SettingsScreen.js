import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, ScrollView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
import {RFValue} from 'react-native-responsive-fontsize'

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailId : '',
            name : '',
            mobile : '',
            address : '',
            age : '',
            docId: ''
        }
    }

    getUserDetails =()=>{
        var emailId = firebase.auth().currentUser.emailId
        db.collection("user").where("email_id", "===", "emailId").get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                var data = doc.data()
                this.setState({
                    emailId : data.email_id,
                    name : data.name,
                    address : data.address,
                    mobile : data.mobile,
                    age : data.age,
                    docId : doc.id
                })})
            }
        )

    }

    updateUserDetails =()=>{
        db.collection("user").doc(this.state.docId)
        .update({
            "name" : this.state.name,
            "address" : this.state.address,
            "mobile" : this.state.mobile,
            "age" : this.state.age,
        })
        Alert.alert("Profile has been updated")
    }

    componentDidMount(){
        this.getUserDetails()
    }

    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style = {styles.container}>
                        <MyHeader title = "Settings"
                        navigation = {this.props.navigation}/>

                        <View style = {styles.formContainer}>


                            <TextInput style = {styles.formTextInput}
                            placeholder = {"Name"}
                            maxLength = {25}
                            onChangeText ={(text) =>{
                                this.setState({
                                    name : text
                                })
                            }}
                            value = {this.state.name}
                            />


                            <TextInput style = {styles.formTextInput}
                            placeholder = {"Address"}
                            multiline = {true}
                            onChangeText ={(text) =>{
                                this.setState({
                                    address : text
                                })
                            }}
                            value = {this.state.address}
                            />

                            <TextInput style = {styles.formTextInput}
                            placeholder = {"Mobile"}
                            maxLength = {10}
                            keyboardType = {'numeric'}
                            onChangeText ={(text) =>{
                                this.setState({
                                    mobile : text
                                })
                            }}
                            value = {this.state.mobile}
                            />

                            <TextInput style = {styles.formTextInput}
                            placeholder = {"Age"}
                            maxLength = {2}
                            keyboardType = {'numeric'}
                            onChangeText ={(text) =>{
                                this.setState({
                                    age : text
                                })
                            }}
                            value = {this.state.age}
                            />

                            <TouchableOpacity style = {styles.button}
                            onPress ={() =>{
                                this.updateUserDetails()
                            }}>
                                <Text style = {styles.buttonText}>
                                    Update
                                </Text>
                            </TouchableOpacity>               
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    button : {
        backgroundColor : "grey",
        width : "50%",
        height : RFValue(60),
        alignItems : "center",
        justifyContent : "center",
        shadowColor : 0,
        shadowOffset : {
            width : "0%",
            height : 8
        },
        shadowOpacity : 0.45,
        shadowRadius : 10.3,
        elevation : 15,
        marginTop : RFValue(20),
        borderWidth : 3
    },
    buttonText : {
        color : "#000000",
        textAlign : "center",
        fontSize : RFValue(20),
        fontWeight : 'bold'
    },
    formTextInput : {
        height : RFValue(10),
        width : "80%",
        borderWidth : 3,
        borderRadius : 5,
        borderColor : "yellow",
        padding : RFValue(5),
        marginTop : RFValue(10),
        alignItems  : "center"
    },
    formContainer : {
        backgroundColor : "#ffffff",
        flex : 1,
        width : "100%",
        alignItems : "center",
        alignSelf : "center"
    }
})