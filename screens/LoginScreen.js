import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import HomeScreen from './HomeScreen'
import db from '../config'

export default class LoginScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            modalVisibility : false,
            name : '',
            emailId : '',
            password : '',
            confirmPassword : '',
            loginEmailId : '',
            loginPassword : ''
        }
    }


    //Function for showing modal and helping to register
    showModal =()=>{
        return(
            <Modal animationType = "fade"
            transparent = {true}
            visible = {this.state.modalVisibility}>
                <ScrollView>
                    <View style = {styles.modalContainer}>
                        <KeyboardAvoidingView>
                            <Text style = {{textAlign : 'center', fontWeight : 'bold', padding : 1, alignSelf : 'center', justifyContent : 'center', color : 'black', fontSize : 30, marginBottom : 20}}>
                                Sign Up
                            </Text>

                            <TextInput style = {styles.formTextInput}
                            placeholder = 'name'
                            maxLength = {30}
                            onChangeText ={(text) =>{
                                this.setState({
                                    name : text
                                })
                            }}/>

                            <TextInput style = {styles.formTextInput}
                            placeholder = 'email'
                            keyboardType = {"email-address"}
                            onChangeText ={(text) =>{
                                this.setState({
                                    emailId : text
                                })
                            }}/>

                            <TextInput style = {styles.formTextInput}
                            placeholder = 'password'
                            secureTextEntry = {true}
                            maxLength = {30}
                            onChangeText ={(text) =>{
                                this.setState({
                                    password : text
                                })
                            }}/>

                            <TextInput style = {styles.formTextInput}
                            placeholder = 'confirm password'
                            secureTextEntry = {true}
                            maxLength = {30}
                            onChangeText ={(text) =>{
                                this.setState({
                                    confirmPassword : text
                                })
                            }}/>

                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity style = {styles.registerButton}
                                onPress ={() =>{
                                    this.userSignUp(this.emailId, this.state.password, this.confirmPassword)
                                }}>
                                    <Text>Register</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity style = {styles.cancelButton}
                                onPress ={() =>{
                                    this.setState({
                                        "isModalVisible" : false
                                    })
                                }}>
                                <Text>Cancel</Text>
                                </TouchableOpacity>
                          </View>

                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </Modal>
        )
    }

    //creating a signup function

    userSignUp =(emailId, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("Your passwords don't match")
        }

        else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                db.collection("user").add({
                    name : this.state.name,
                    emailId : this.state.emailId,
                })
                return Alert.alert("Successfully created")
            })
            return(
                <TouchableOpacity
                onPress ={()=>{
                    this.setState({
                        isModalVisible : false
                    })
                }}>
                    <Text>Ok</Text>
                </TouchableOpacity>
            )
        }
    }

    //Function for login

    userLogin = (emailId, password)=>{
        if(this.state.emailId === this.state.loginEmailId && this.state.password === this.state.loginPassword){
            firebase.auth().signInWithEmailAndPassword(emailId, password)
            .catch((error)=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
        }
        else{
            Alert.alert("Wrong credentials")
        }
    }

    //Calling all functions

    render(){
        return(
            <ScrollView>
                <View style = {styles.container}>
                    {this.showModal()}

                    <Text style = {styles.title}>
                        Covid Helper
                    </Text>

                    <View style = {styles.buttonContainer}>
                        <TextInput
                        placeholder = "Email Id"
                        keyboardType = 'email-address'
                        onChangeText ={()=>{
                            this.setState({
                                loginEmailId : text
                            })
                        }}/>

                        <TextInput
                        placeholder = "Password"
                        secureTextEntry = {true}
                        onChangeText ={()=>{
                            this.setState({
                                loginPassword : text
                            })
                        }}/>

                    </View>
                    <View>
                    <TouchableOpacity
                    style={[styles.button,{marginBottom:20, marginTop:20}]}
                    onPress = {()=>{
                        this.userLogin(this.state.emailId, this.state.password)
                        this.props.navigation.navigate(HomeScreen)
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
                        >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity> 
                    </View>
                </View>
            </ScrollView>
        )
    }
}

//Creating styles

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    modalContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        alignSelf : 'center'
    },
    formTextInput : {
        flex : 0.1,
        borderColor : 'black',
        borderWidth : 2,
        margin : 10,
        padding : 2,
    },
    modalBackButton : {
        borderColor : 'black',
        borderWidth : 4,
        borderRadius : 4,
        justifyContent : 'center',
        alignItems : 'center'
    },
    registerButton : {

    },
    cancelButton : {

    },
    title : {

    },
    buttonContainer : {
        
    },
    button : {

    },
    buttonText : {
        
    }
})