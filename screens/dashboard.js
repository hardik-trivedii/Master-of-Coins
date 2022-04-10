import React from 'react'
import {View, SafeAreaView, StyleSheet, Text, Image, Pressable} from 'react-native'
import UserData from '../helpers/user-data'
import {Tile} from '../helpers/my-components'

const user_data = UserData.getInstance();
function DashboardScreen({navigation}){
    const [usersName, setUsersName] = React.useState(user_data.name);

    return(
        <SafeAreaView style = {styles.container}>
            <View 
                style = {{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                }}>
                <Pressable
                    style = {{height: 40, width: 40, margin: 10}}
                    onPress = {()=>{
                        
                    }}>    
                <Image
                    style = {{height: 40, width: 40}}
                    source = {require('../assets/user.png')}/>
                </Pressable>
            </View>

            <View style = {{
                flex: 2,
                margin: 10
            }}>
                <View style = {{flex: 1}}></View>
                <View style = {{flex: 1, flexDirection: 'column-reverse'}}>
                    <Text style = {{fontSize: 20}}>Hello</Text>
                </View>
                
                <Text style = {{flex: 1, fontSize: 40, fontWeight: 'bold', marginBottom: 5}}>{usersName}</Text>
                <Text style = {{flex: 1}}>Your Master of Coins is in your service. What would you like to manage today?</Text>
            </View>

            <View style = {{
                flex: 6,
            }}>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <Tile text = "Income" color = "#8BC34A" onClick = {()=>{}}/>
                    <Tile 
                        text = "Expenses" 
                        color = "#F44336" 
                        onClick = {()=>{
                            navigation.navigate('ExpensesScreen')
                        }}/>
                </View>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <Tile text = "Savings" color = "#F4DD17" onClick = {()=>{}}/>
                    <Tile text = "Donations/Helps" color = "#00BCD4" onClick = {()=>{}}/></View>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <Tile text = "Debts" color = "#E91E63" onClick = {()=>{}}/>
                    <Tile text = "Gifts/Prizes" color = "#3F51B5" onClick = {()=>{}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default DashboardScreen;