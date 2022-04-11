import React from 'react'
import {FlatList, Alert, Text} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { Expense } from '../helpers/data-models'
import { remove, ref, getDatabase } from 'firebase/database'

const user_data = UserData.getInstance()
function PersonalExpenseScreen({navigation}){
    const [expenses, setExpenses] = React.useState(user_data.personal_expenses)
    React.useEffect(()=>{
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/personal_expenses', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                var id = 0
                user_data.personal_expenses = []
                snapshot.forEach(element => {
                    user_data.personal_expenses.push(new Expense(element.key, element.val().text, element.val().price, element.val().time))
                    id += 1
                });
                setExpenses(user_data.personal_expenses)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {user_data.personal_expenses}
            renderItem = {({item})=>{
                return(
                    <ListItem
                    title = {item.text}
                    price = {item.price}
                    timestamp = {item.time}
                    onItemClick = {()=>{
                        Alert.alert(
                            "$" + item.price,
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddPersonalExpenseScreen', {
                                        id: item.id,
                                        text: item.text,
                                        price: item.price
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    remove(ref(getDatabase(), 'users/'+user_data.userID+'/personal_expenses/'+item.id))
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
                <Text style = {{alignSelf: 'center', justifyContent: 'center'}}>No Personal Expenses.</Text>
            )
        }}/>
    )
}

export default PersonalExpenseScreen;