import React from 'react'
import {FlatList, Alert, Text, View} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { Income } from '../helpers/data-models'
import { remove, ref, getDatabase } from 'firebase/database'

const user_data = UserData.getInstance()
function DonationsScreen({navigation}){
    const [donations, setDonations] = React.useState(user_data.helps)
    React.useEffect(()=>{
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/donations', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.helps = []
                snapshot.forEach(element => {
                    user_data.helps.push(new Income(element.key, element.val().text, element.val().amount, element.val().time))
                });
                setDonations(user_data.helps)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {donations}
            renderItem = {({item})=>{
                return(
                    <ListItem
                    title = {item.text}
                    price = {item.amount}
                    timestamp = {item.time}
                    onItemClick = {()=>{
                        Alert.alert(
                            "Help of $" + item.amount,
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddDonationScreen', {
                                        id: item.id,
                                        text: item.text,
                                        amount: item.amount
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    if(user_data.helps.length == 1){
                                        setDonations([])
                                        user_data.helps = []
                                    }
                                    remove(ref(getDatabase(), 'users/'+user_data.userID+'/donations/'+item.id))
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
                    <Text style = {{marginTop: 200}}>No Donations Added.</Text>
                </View>
                
            )
        }}/>
    )
}

export default DonationsScreen;