import React from 'react'
import {FlatList, Alert, Text, View} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { Income } from '../helpers/data-models'
import { remove, ref, getDatabase } from 'firebase/database'

const user_data = UserData.getInstance()
function SavingsScreen({navigation}){
    const [savings, setSavings] = React.useState(user_data.savings)
    React.useEffect(()=>{
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/savings', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.savings = []
                snapshot.forEach(element => {
                    user_data.savings.push(new Income(element.key, element.val().text, element.val().amount, element.val().time))
                });
                setSavings(user_data.savings)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {savings}
            renderItem = {({item})=>{
                return(
                    <ListItem
                    title = {item.text}
                    price = {item.amount}
                    timestamp = {item.time}
                    onItemClick = {()=>{
                        Alert.alert(
                            "Savings of $" + item.amount,
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddSavingScreen', {
                                        id: item.id,
                                        text: item.text,
                                        amount: item.amount
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    if(user_data.incomes.length == 1){
                                        setSavings([])
                                        user_data.savings = []
                                    }
                                    remove(ref(getDatabase(), 'users/'+user_data.userID+'/savings/'+item.id))
                                    .catch((error)=>{
                                        console.log(error)
                                        Alert.alert(
                                            "Error in Deleting",
                                            "Something went wrong on our side, please try again", 
                                            [
                                                {text: 'OK', onPress: ()=>{}}
                                            ]
                                        )
                                    })
                                }},
                                {text: "Cancel", onPress: ()=>{

                                }}
                            ]
                        )
                    }}/>
                )
        }}
        ListEmptyComponent = {()=>{
            return(
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {{marginTop: 200}}>No Savings Added.</Text>
                </View>
                
            )
        }}/>
    )
}

export default SavingsScreen;