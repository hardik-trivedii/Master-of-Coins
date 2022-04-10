import React from 'react'
import {View} from 'react-native'
import {WideTile} from '../helpers/my-components'

function ExpensesScreen({navigation}){
    return(
        <View style = {{flex: 1}}>
            <WideTile
                text = "Personal Expenses"
                color = '#8BC34A'
                onClick = {()=>{
                    navigation.navigate('PersonalExpenseScreen')
                }}/>
            
            <WideTile
                text = "Group Expenses"
                color = '#FF9800'
                onClick = {()=>{
                    navigation.navigate('GroupsScreen')
                }}/>
        </View>
    )
}

export default ExpensesScreen;