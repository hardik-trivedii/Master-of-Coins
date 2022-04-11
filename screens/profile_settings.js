import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import React from 'react'
import {FlatList, Pressable,  Text, Alert} from 'react-native'
import UserData from '../helpers/user-data';
import { remove, ref, getDatabase } from 'firebase/database'

function ProfileSettingsScreen({navigation}){
    const user_data = UserData.getInstance()
    const settings_list_data = [
        {   
            id: 0,
            title: "Name",
            subTitle: user_data.name
        },
        {
            id: 1,
            title: "Email",
            subTitle: user_data.email
        },
        {
            id: 2,
            title: "Password",
            subTitle: '************'
        },
        {
            id: 3,
            title: 'Log out',
            subTitle: ''
        },
        {
            id: 4,
            title: 'Delete Account',
            subTitle: ''
        }
    ]
    return(
        <FlatList 
            data = {settings_list_data}
            renderItem = {({item})=>{
                if(item.id < 3){
                     return(
                        <Pressable
                            style = {{flex: 1, marginTop: 5, marginBottom: 5, backgroundColor: 'white'}}
                            onPress = {()=>{
                                if(item.id == 0){
                                    navigation.navigate('ChangeNameScreen')
                                }else if(item.id == 2){
                                    navigation.navigate('ChangePasswordScreen')
                                }
                            }}>
                                <Text style = {{marginTop: 5, marginBottom: 5, marginLeft: 10, fontSize: 15, color: 'gray'}}>{item.title}</Text>
                                <Text style = {{marginBottom: 5, marginLeft: 10, fontSize: 20, fontWeight: '400'}}>{item.subTitle}</Text>
                        </Pressable>
                     )   
                }else{
                    return(
                        <Pressable
                            style = {{flex: 1, marginTop: 5, marginBottom: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', height: 50}}
                            onPress = {()=>{
                                if(item.id == 3){
                                    Alert.alert(
                                        "Logging Out?",
                                        "Are you sure you want to log out?", 
                                        [
                                            {text: 'Yes', onPress: ()=>{
                                                AsyncStorage.removeItem('user_creds').then(()=>{
                                                    navigation.dispatch(
                                                        CommonActions.reset({
                                                          index: 0,
                                                          routes: [{ name: "SignInScreen" }]
                                                        }));
                                                }).catch((error)=>{
                                                    console.log(error)
                                                })
                                            }},
                                            {text: 'No', onPress: ()=>{}}
                                        ]
                                    )
                                }else if(item.id == 4){
                                    Alert.alert(
                                        "Delete Account?",
                                        "Are you sure you want to delete account? All the data associated with this will also be deleted.", 
                                        [
                                            {text: 'Yes', style: 'destructive', onPress: ()=>{
                                                remove(ref(getDatabase(), 'users/'+user_data.userID))
                                                .then(()=>{
                                                    AsyncStorage.removeItem('user_creds').then(()=>{
                                                        navigation.dispatch(
                                                            CommonActions.reset({
                                                              index: 0,
                                                              routes: [{ name: "SignInScreen" }]
                                                            }));
                                                    }).catch((error)=>{
                                                        console.log(error)
                                                    })
                                                })
                                                .catch((error)=>{
                                                    console.log(error)
                                                    Alert.alert(
                                                        "Error in Deleting Account",
                                                        "Something went wrong on our side, please try again", 
                                                        [
                                                            {text: 'OK', onPress: ()=>{}}
                                                        ]
                                                    )
                                                })
                                            }},
                                            {text: 'No', onPress: ()=>{}}
                                        ]
                                    )
                                }
                            }}>
                                <Text style = {{margin: 5, fontSize: 18, color: 'red'}}>{item.title}</Text>
                        </Pressable>
                    )
                }
            }}/>
    )
}

export default ProfileSettingsScreen;