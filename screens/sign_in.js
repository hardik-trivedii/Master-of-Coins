import React from 'react';
import {View, TextInput, Text, Pressable, StyleSheet, 
    ActivityIndicator, Alert, ScrollView, SafeAreaView, Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { CommonActions } from '@react-navigation/native';
import UserData from '../helpers/user-data';

const EMAIL_PLACEHOLDER_TEXT = "Email";
const PASSWORD_PLACEHOLDER_TEXT = "Password";

function SignInScreen({navigation}){
    const [emailText, onChangeEmailText] = React.useState('')
    const [password, onChangePasswordText] = React.useState('')
    const [isProcessing, setIsProcessing] = React.useState(false)

    return(
        <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps='handled'> 
            <Image
                style={styles.image_logo}
                source = {require('../assets/icon.png')}/>

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
                secureTextEntry = {true}/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress={()=>{
                    if(emailText == '' || password == ''){
                        Alert.alert(
                            "Fields are empty",
                            "Email or Password field cannot be empty. Please enter all the details.",
                            [
                                {text: 'OK', onPress:()=>{}}
                            ]
                        )
                    }
                    else {
                        setIsProcessing(true)
                        signIn(emailText, password, (success, reason)=>{
                            setIsProcessing(false)
                            if(success){
                                navigation.dispatch(
                                    CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "DashboardScreen" }]
                                    }));
                            }else{
                                var title, subTitle;
                                if(reason == ERROR_REASON_NO_USER){
                                    title = "User Not Found"
                                    subTitle = "There is no user registered with this Email address."
                                }else if(reason == ERROR_REASON_INCORRECT_PASSWORD){
                                    title = "Incorrect Password"
                                    subTitle = "The password is incorrect. Please enter correct password."
                                }else if(reason == ERROR_REASON_FETCH_FAILURE){
                                    title = "Something went wrong"
                                    subTitle = "It seems like there is something wrong with connecting to us. Please try again."
                                }
                                Alert.alert(
                                    title,
                                    subTitle,
                                    [
                                        {text: "OK", onPress: ()=>{}}
                                    ]
                                )
                            }
                        })
                    }
                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign In</Text>
            </Pressable>

            <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{alignSelf: 'center'}}>New User?</Text>
                <Text 
                    style={{marginLeft: 5, color: 'blue', alignSelf: 'center'}}
                    onPress = {()=>{
                        navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{ name: "SignUpScreen" }]
                            }));
                    }}>
                    Create Account
                </Text>
            </View>
            
            <Text style={{marginTop: 10, color: 'blue', alignSelf: 'center'}}>Forgot Password?</Text>
            
            <ActivityIndicator
                style={{marginTop: 10}}
                hidesWhenStopped={true}
                size='large'
                animating={isProcessing}/>
            
        </ScrollView>
    );
}

const ERROR_REASON_NO_USER = "user_not_found"
const ERROR_REASON_INCORRECT_PASSWORD = "incorrect_password"
const ERROR_REASON_FETCH_FAILURE = "fetching_failure"

const user_data = UserData.getInstance();
function signIn(email, password, onCompleted){
    var userID = email.replace(/\./g, "_");
    const database = getDatabase();
    get(child(ref(database), 'users/' + userID)).then((snapshot) => {
        if (snapshot.exists()) {
          if(snapshot.val().email == email && snapshot.val().password == password){
            user_data.userID = snapshot.key;
            user_data.name = snapshot.val().name;
            user_data.email = snapshot.val().email;
            user_data.password = snapshot.val().password; 
            storeUserCreds(snapshot.val().email, snapshot.val().password, (success)=>{
                onCompleted(true, null)
            }) 
            
          }else{
            onCompleted(false, ERROR_REASON_INCORRECT_PASSWORD)
          }
        } else {
            onCompleted(false, ERROR_REASON_NO_USER)
        }
      }).catch((error) => {
        console.log(error)
        onCompleted(false, ERROR_REASON_FETCH_FAILURE)
    });
}

function storeUserCreds(email, password, onCompleted) {
    try {
        const userCredentials = JSON.stringify({
            email: email,
            password: password
        })
        AsyncStorage.setItem('user_creds', userCredentials).then(()=>{
            onCompleted(true)
        });
      } catch (e) {
        console.log(e)
        onCompleted(false)
      }
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
        marginTop: 200,
        marginBottom: 100,
        alignSelf: 'center'
    }
})
export default SignInScreen;
export {storeUserCreds};