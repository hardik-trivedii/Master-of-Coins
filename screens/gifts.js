import React from 'react'
import {FlatList, Alert, Text, View} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItem} from '../helpers/my-components'
import { Income } from '../helpers/data-models'
import { remove, ref, getDatabase } from 'firebase/database'

const user_data = UserData.getInstance()
function GiftsScreen({navigation}){
    const [gifts, setGifts] = React.useState(user_data.gifts)
    React.useEffect(()=>{
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/gifts', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.gifts = []
                snapshot.forEach(element => {
                    user_data.gifts.push(new Income(element.key, element.val().text, element.val().amount, element.val().time))
                });
                setGifts(user_data.gifts)
            }
        })

        return ()=>{
            abortController.abort();
        }
    }, []);

     return(
        <FlatList
            data = {gifts}
            renderItem = {({item})=>{
                return(
                    <ListItem
                    title = {item.text}
                    price = {item.amount}
                    timestamp = {item.time}
                    onItemClick = {()=>{
                        Alert.alert(
                            "Gift of $" + item.amount,
                            "Description: " + item.text +"\nTime: " + item.time,
                            [
                                {text: "Edit", onPress: ()=>{
                                    navigation.navigate('AddGiftScreen', {
                                        id: item.id,
                                        text: item.text,
                                        amount: item.amount
                                    })
                                }},
                                {text: "Delete", style: 'destructive', onPress: ()=>{
                                    if(user_data.gifts.length == 1){
                                        setGifts([])
                                        user_data.gifts = []
                                    }
                                    remove(ref(getDatabase(), 'users/'+user_data.userID+'/gifts/'+item.id))
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
                    <Text style = {{marginTop: 200}}>No Gifts Added.</Text>
                </View>
                
            )
        }}/>
    )
}

export default GiftsScreen;