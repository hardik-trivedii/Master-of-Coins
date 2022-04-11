import React from 'react'
import {ScrollView, TextInput, Pressable, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import UserData from '../helpers/user-data'
import { getDatabase, ref, update } from "firebase/database";
import { storeUserCreds } from './sign_in';

const user_data = UserData.getInstance()
function ChangePasswordScreen({navigation}){
    const [oldPassword, setOldPassword] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [rePassword, setRePassword] = React.useState('')
    const [isProcessing, setIsProcessing] = React.useState(false)

    return(
        <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps='handled'>
            <TextInput 
                style = {[{marginTop: 100},styles.text_field]}
                onChangeText={(text)=>{
                    setOldPassword(text);
                }} 
                value={oldPassword}
                placeholder="Current Password"/>

            <TextInput 
                style = {[styles.text_field]}
                onChangeText={(text)=>{
                    setPassword(text);
                }} 
                value={password}
                placeholder="New Password"/>

            <TextInput 
                style = {[styles.text_field]}
                onChangeText={(text)=>{
                    setRePassword(text);
                }} 
                value={rePassword}
                placeholder="Confirm New Password"/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress = {()=>{
                    if(user_data.password == oldPassword){
                        if(password == rePassword){
                            const updates = {};
                            updates['users/'+user_data.userID+'/password'] = password
                            update(ref(getDatabase()), updates).then(()=>{
                                storeUserCreds(user_data.email, password, (success)=>{
                                    setIsProcessing(false)
                                    navigation.goBack()
                                })
                            }).catch((error)=>{
                                setIsProcessing(false)
                                console.log(error)
                                Alert.alert(
                                    "Error in Saving",
                                    "Something went wrong on our side, please try again", 
                                    [
                                        {text: 'OK', onPress: ()=>{}}
                                    ]
                                )
                            })
                        }else{
                            Alert.alert(
                                "Password Not Matching",
                                "Please enter same passrod in the Confirm Password field", 
                                [
                                    {text: 'OK', onPress: ()=>{
                                        setPassword('')
                                        setRePassword('')
                                    }}
                                ]
                            )
                        }
                    }else{
                        Alert.alert(
                            "Current Password Incorrect",
                            "You have entered incorrect current password. Please enter correct password and try again.", 
                            [
                                {text: 'OK', onPress: ()=>{
                                    setPassword('')
                                    setRePassword('')
                                }}
                            ]
                        )
                    }
                    
                }}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Save</Text>
                </Pressable>
                <ActivityIndicator
                    style={{marginTop: 10}}
                    hidesWhenStopped={true}
                    size='large'
                    animating={isProcessing}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})
export default ChangePasswordScreen;