import React from 'react'
import {FlatList, Alert, Text, View, Pressable} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { GroupExpense, Member } from '../helpers/data-models'
import { remove, ref, getDatabase } from 'firebase/database'

const user_data = UserData.getInstance()
function GroupExpenseScreen({route, navigation}){
    var group_expenses = []
    const [expenses, setExpenses] = React.useState([])
    var groupID = '', group_members = []
    if(route.params != null){
        const {id, members} = route.params
        groupID = id;
        group_members = members;
    }
    React.useEffect(()=>{
        navigation.setOptions({
            title: 'Group Expenses',
            headerRight: ()=>(
                <Pressable
                style = {{margin: 5}}
                  onPress = {()=>{
                    navigation.navigate('AddGroupExpenseScreen', {
                        gid: groupID,
                        payee_mem: new Member(user_data.userID, user_data.name, user_data.email),
                        members: group_members
                    })
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
        })
        
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('groups/'+groupID+'/expenses', (snapshot)=>{
            abortController.signal
            group_expenses = []
            if(snapshot.exists()){
                snapshot.forEach(element => {
                    group_expenses.push(new GroupExpense(element.key, element.val().text, element.val().price, element.val().time, element.val().payee))
                });
                setExpenses(group_expenses)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {expenses}
            renderItem = {({item})=>{
                return(
                    <ListItem
                    title = {item.text + ' [ Expense Paid By ' + item.payee.name + ']'}
                    price = {item.price}
                    timestamp = {item.time}
                    onItemClick = {()=>{
                        Alert.alert(
                            "Group Expense of $" + item.price + ' Paid By ' + item.payee.name,
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddGroupExpenseScreen', {
                                        gid: groupID,
                                        id: item.id,
                                        text: item.text,
                                        price: item.price,
                                        payee_mem: item.payee,
                                        members: group_members
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    if(group_expenses.length == 0){
                                        setExpenses([])
                                        group_expenses = []
                                    }
                                    remove(ref(getDatabase(), 'groups/'+groupID+'/expenses/'+item.id))
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
                    <Text style = {{marginTop: 200}}>No Group Expenses Added.</Text>
                </View>
            )
        }}/>
    )
}

export default GroupExpenseScreen;