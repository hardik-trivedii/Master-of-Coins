import React from 'react'
import {View, Image, ActivityIndicator, Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDatabase, ref, get, child } from "firebase/database";
import { CommonActions } from '@react-navigation/native';
import UserData from '../helpers/user-data';
import {Group, Member, Expense} from '../helpers/data-models'

function SplashScreen({navigation}){
    // for showing ActivityIndicator
    const [isProcessing, setIsProcessing] = React.useState(true)
    downloadData(navigation)
    return(
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
                style={{height: 200,
                    width: 200,
                    marginBottom: 50,
                    alignSelf: 'center'}}
                source = {require('../assets/icon.png')}/>
            <Text style = {{fontSize: 40, fontWeight: 'bold'}}>Master of Coins</Text>
            <ActivityIndicator
                style={{marginTop: 50}}
                hidesWhenStopped={true}
                size='large'
                animating={isProcessing}/>
        </View>
    )
}

// download user data once and validate user info stored previously in async storage
function downloadData(navigation){
    const user_data = UserData.getInstance();
    try {
        // User crdentials retrieved, Automatic Login
        AsyncStorage.getItem('user_creds').then((result)=>{
            var userCredentials = result != null ? JSON.parse(result) : null
            if(userCredentials != null){
                // USer data fetching from the firebase
                var userID = userCredentials.email.replace(/\./g, "_");
                const database = getDatabase();
                get(child(ref(database), 'users/' + userID)).then((snapshot) => {
                    if (snapshot.exists()) {
                        // validating user info with stored one
                        if(snapshot.val().email == userCredentials.email && snapshot.val().password == userCredentials.password){
                            user_data.userID = snapshot.key;
                            user_data.name = snapshot.val().name;
                            user_data.email = snapshot.val().email;
                            user_data.password = snapshot.val().password; 
                            // All good, let's go to Dashboard
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "DashboardScreen" }]
                                }));
                        }else{
                            
                        }
                    } else {
                        
                    }
                }).catch((error) => {
                    console.log(error)
                    
                });
            }else{
                // User info doesn't match, take user to sign in again
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "SignInScreen" }]
                    }));
            }
        })
      } catch(e) {
        console.log(e)
      }
}

export default SplashScreen;