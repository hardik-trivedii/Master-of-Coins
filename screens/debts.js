import React from 'react'
import {FlatList, Alert, Text, View} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItemWithButton} from '../helpers/my-components'
import { Debt } from '../helpers/data-models'
import { remove, ref, getDatabase, update } from 'firebase/database'

const user_data = UserData.getInstance()
function DebtsScreen({navigation}){
    const [debts, setDebts] = React.useState(user_data.debts)
    React.useEffect(()=>{
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/debts', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.debts = []
                snapshot.forEach(element => {
                    user_data.debts.push(new Debt(element.key, element.val().text, element.val().amount, element.val().time, element.val().isCleared))
                });
                setDebts(user_data.debts)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {debts}
            renderItem = {({item})=>{
                return(
                    <ListItemWithButton
                    title = {item.text}
                    price = {item.amount}
                    timestamp = {item.time}
                    buttonText = {item.isCleared ? 'Cleared' : 'Clear'}
                    buttonColor = {item.isCleared ? '#8BC34A' : '#F44336'}
                    onButtonClicked = {()=>{
                        const updates = {};
                        updates['users/'+user_data.userID+'/debts/'+item.id] = {
                            text: item.text,
                            amount: item.amount,
                            time: item.time,
                            isCleared: !item.isCleared
                        };
                        update(ref(getDatabase()), updates)
                    }}
                    onItemClick = {()=>{
                        Alert.alert(
                            "Debt of $" + item.amount + " [" + (item.isCleared ? 'Cleared]' : 'Not Cleared]'),
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddDebtScreen', {
                                        id: item.id,
                                        text: item.text,
                                        amount: item.amount,
                                        isCleared: item.isCleared
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    if(user_data.debts.length == 1){
                                        setDebts([])
                                        user_data.debts = []
                                    }
                                    remove(ref(getDatabase(), 'users/'+user_data.userID+'/debts/'+item.id))
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
                    <Text style = {{marginTop: 200}}>No Debts Added.</Text>
                </View>
                
            )
        }}/>
    )
}

export default DebtsScreen;