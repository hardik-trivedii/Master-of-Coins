import React from 'react'
import {View, Image, ActivityIndicator, Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDatabase, ref, get, child } from "firebase/database";
import { CommonActions } from '@react-navigation/native';
import UserData from '../helpers/user-data';
import {Group, Member, Expense} from '../helpers/data-models'

function SplashScreen({navigation}){
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

const ERROR_REASON_NO_USER = "user_not_found"
const ERROR_REASON_INCORRECT_PASSWORD = "incorrect_password"
const ERROR_REASON_FETCH_FAILURE = "fetching_failure"

function downloadData(navigation){
    const user_data = UserData.getInstance();
    try {
        // User crdentials retrieved
        AsyncStorage.getItem('user_creds').then((result)=>{
            var userCredentials = result != null ? JSON.parse(result) : null
            if(userCredentials != null){
                // USer data fetching from the firebase
                var userID = userCredentials.email.replace(/\./g, "_");
                const database = getDatabase();
                get(child(ref(database), 'users/' + userID)).then((snapshot) => {
                    if (snapshot.exists()) {
                    if(snapshot.val().email == userCredentials.email && snapshot.val().password == userCredentials.password){
                        user_data.userID = snapshot.key;
                        user_data.name = snapshot.val().name;
                        user_data.email = snapshot.val().email;
                        user_data.password = snapshot.val().password; 
                        //parsing personal expenses in our model
                        if(snapshot.val().personal_expenses != null){
                            user_data.personal_expenses = []
                            var index = 0
                            snapshot.val().personal_expenses.forEach(element=>{
                            var expense = new Expense(index, element.text, element.price, element.time);
                            user_data.personal_expenses.push(expense)
                            index += 1
                        })
                        }
                        if(snapshot.val().groups != null){
                            // Fetching groups data
                            var groupsPromises = snapshot.val().groups.map(id => {
                                return get(child(ref(database), 'groups/' + id))
                            })
                            Promise.all(groupsPromises).then((groups) => {
                                user_data.groups = []
                                groups.forEach(data =>{
                                    var group = new Group(data.key, data.val().name)
                                    data.val().members.forEach(element =>{
                                        group.members.push(new Member(element.userID, element.name, element.email))
                                    })
                                    user_data.groups.push(group)                           
                                })
                                // All Done, set value update callbacks and Lets go to Dashboard
                                
                                navigation.dispatch(
                                    CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "DashboardScreen" }]
                                    }));
                                
                            }).catch((error)=>{
                                console.log(error)
                            });
                        }else{
                            navigation.dispatch(
                                CommonActions.reset({
                                  index: 0,
                                  routes: [{ name: "DashboardScreen" }]
                                }));
                        }
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
            }else{
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