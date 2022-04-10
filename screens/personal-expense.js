import React from 'react'
import {FlatList} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { Expense } from '../helpers/data-models'

const user_data = UserData.getInstance()
function PersonalExpenseScreen(){
    const [expenses, setExpenses] = React.useState(user_data.personal_expenses)
    React.useEffect(()=>{
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/personal_expenses', (snapshot)=>{
            if(snapshot.exists()){
                console.log(snapshot)
                var id = 0
                user_data.personal_expenses = []
                snapshot.forEach(element => {
                    user_data.personal_expenses.push(new Expense(id, element.val().text, element.val().price, element.val().time))
                    id += 1
                });
                //setExpenses(user_data.personal_expenses)
            }
        })
    });
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

                    }}/>
                )
        }}/>
    )
}

export default PersonalExpenseScreen;