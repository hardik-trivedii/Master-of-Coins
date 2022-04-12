import React from 'react'
import {FlatList, Alert, Text, View} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { Income } from '../helpers/data-models'
import { remove, ref, getDatabase } from 'firebase/database'

const user_data = UserData.getInstance()
function IncomesScreen({navigation}){
    const [incomes, setIncomes] = React.useState(user_data.incomes)
    React.useEffect(()=>{
        // to manage subscriptions in here
        const abortController = new AbortController()
        // setting value update callback for realtime update
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/incomes', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.incomes = []
                snapshot.forEach(element => {
                    user_data.incomes.push(new Income(element.key, element.val().text, element.val().amount, element.val().time))
                });
                setIncomes(user_data.incomes)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {incomes}
            renderItem = {({item})=>{
                return(
                    <ListItem
                    title = {item.text}
                    price = {item.amount}
                    timestamp = {item.time}
                    onItemClick = {()=>{
                        Alert.alert(
                            "Income of $" + item.amount,
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddIncomeScreen', {
                                        id: item.id,
                                        text: item.text,
                                        amount: item.amount
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    if(user_data.incomes.length == 1){
                                        setIncomes([])
                                        user_data.incomes = []
                                    }
                                    remove(ref(getDatabase(), 'users/'+user_data.userID+'/incomes/'+item.id))
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
                    <Text style = {{marginTop: 200}}>No Incomes Added.</Text>
                </View>
                
            )
        }}/>
    )
}

export default IncomesScreen;