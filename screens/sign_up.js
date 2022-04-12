import React from 'react';
import {View, TextInput, Text, Pressable, StyleSheet, Alert, ActivityIndicator, ScrollView, Image} from 'react-native'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { CommonActions } from '@react-navigation/native';
import { storeUserCreds } from './sign_in';

const NAME_PLACEHOLDER_TEXT = "Name";
const EMAIL_PLACEHOLDER_TEXT = "Email";
const PASSWORD_PLACEHOLDER_TEXT = "Password";
const CONFIRM_PASSWORD_PLACEHOLDER_TEXT = "Confirm Password";

function SignUpScreen({navigation}){
    const [nameText, onChangeNameText] = React.useState('')
    const [emailText, onChangeEmailText] = React.useState('')
    const [password, onChangePasswordText] = React.useState('')
    const [confirmPassword, onChangeConfirmPasswordText] = React.useState('')
    const [isProcessing, setIsProcessing] = React.useState(false);

    return(
        <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps='handled'>
            <Image
                style={styles.image_logo}
                source = {require('../assets/icon.png')}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    onChangeNameText(text);
                }} 
                value={nameText}
                placeholder={NAME_PLACEHOLDER_TEXT}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    onChangeEmailText(text);
                }} 
                value={emailText}
                placeholder={EMAIL_PLACEHOLDER_TEXT}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    onChangePasswordText(text);
                }}  
                value={password}
                placeholder={PASSWORD_PLACEHOLDER_TEXT}
                secureTextEntry={true}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    onChangeConfirmPasswordText(text);
                }}  
                value={confirmPassword}
                placeholder={CONFIRM_PASSWORD_PLACEHOLDER_TEXT}
                secureTextEntry={true}/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress={()=>{
                    if(password != confirmPassword){
                        Alert.alert(
                            "Re-enter Password",
                            "Please enter the same password in Confirm Password field.",
                            [
                              { text: "OK", 
                                onPress: () => {
                                  onChangePasswordText('');
                                  onChangeConfirmPasswordText('');
                                }
                              }
                            ]
                          );
                    }else{
                        setIsProcessing(true)
                        register_user(nameText, emailText, password, (success, reason)=>{
                            setIsProcessing(false)
                            if(success){
                                Alert.alert(
                                    "User Registered Successfully",
                                    "Welcome to Master of Coins.",
                                    [
                                        {text: "OK", onPress: ()=>{
                                            navigation.dispatch(
                                                CommonActions.reset({
                                                  index: 0,
                                                  routes: [{ name: "DashboardScreen" }]
                                                }));
                                        }}
                                    ]
                                );
                            }else{
                                if(reason != ERROR_REASON_DUPLICATE_USER){
                                    Alert.alert(
                                        "User Registration Error",
                                        "Something went wrong, please try registering user again.",
                                        [
                                            {text: "OK", onPress: ()=>{}}
                                        ]
                                    );
                                }else{
                                    Alert.alert(
                                        "User Already Registered",
                                        "User with this Email address is already registered",
                                        [
                                            {text: "OK", onPress: ()=>{}}
                                        ]
                                    )
                                }
                            }
                        });
                    }
                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign Up</Text>
            </Pressable>

            <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{alignSelf: 'center'}}>Already User?</Text>
                <Text 
                    style={{marginLeft: 5, color: 'blue', alignSelf: 'center'}}
                    onPress = {()=>{
                        navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{ name: "SignInScreen" }]
                            }));
                    }}>
                        Sign In
                </Text>
            </View>

            <ActivityIndicator
                style={{marginTop: 10}}
                hidesWhenStopped={true}
                size='large'
                animating={isProcessing}/>
            
        </ScrollView>
    );
}

const ERROR_REASON_DUPLICATE_USER = "duplicate_user"
const ERROR_REASON_SAVING_FAILURE = "saving_failure"
const ERROR_REASON_FETCHING_FAILURE = "fetching_failure"

function register_user(name, email, password, onCompleted){
    var userID = email.replace(/\./g, "_");
    const database = getDatabase();
    get(child(ref(database), 'users/' + userID)).then((snapshot) => {
        if (snapshot.exists()) {
          onCompleted(false, ERROR_REASON_DUPLICATE_USER)
        } else {
            set(ref(database, 'users/' + userID), {
                name: name,
                email: email,
                password : password
              }).then(()=>{
                storeUserCreds(snapshot.val().email, snapshot.val().password, (success)=>{
                    onCompleted(true, null)
                })
              }).catch((error)=>{
                console.log(error)
                onCompleted(false, ERROR_REASON_SAVING_FAILURE)
              });
        }
      }).catch((error) => {
        console.log(error)
        onCompleted(false, ERROR_REASON_FETCHING_FAILURE)
    });
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    text_field:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    }, 
    button: {
        height: 40,
        margin: 30,  
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_logo: {
        height: 100,
        width: 100,
        marginTop: 100,
        marginBottom: 100,
        alignSelf: 'center'
    }
})
export default SignUpScreen;