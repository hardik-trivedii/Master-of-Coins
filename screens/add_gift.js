import React from 'react'
import {ScrollView, StyleSheet, Text, TextInput, Pressable, Alert, ActivityIndicator} from 'react-native'
import { getDatabase, ref, set, push, update } from "firebase/database";
import UserData from '../helpers/user-data';
import { format } from 'date-fns';

const PLACEHOLDER_DESC = 'Gifts/Prizes Description'
const PLACEHOLDER_AMOUNT = 'Amount'

const user_data = UserData.getInstance()

function AddGiftScreen({route, navigation}){
    var gift_id, gift_text, gift_amount;
    if(route.params != null){
        const {id, text, amount} = route.params;
        gift_id = id;
        gift_text = text;
        gift_amount = amount;
    }
    const [description, setDescription] = React.useState(gift_text != null ? gift_text : '')
    const [amount, setAmount] = React.useState(gift_amount != null ? gift_amount : '')
    const [isProcessing, setIsProcessing] = React.useState(false)
    
    return(
        <ScrollView  keyboardDismissMode="interactive" keyboardShouldPersistTaps='handled'>
            <TextInput 
                style = {[{marginTop: 100},styles.text_field]}
                onChangeText={(text)=>{
                    setDescription(text);
                }} 
                value={description}
                placeholder={PLACEHOLDER_DESC}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    setAmount(text);
                }} 
                value={amount}
                placeholder={PLACEHOLDER_AMOUNT}/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress = {()=>{
                    setIsProcessing(true)
                    const db = getDatabase();
                    if(gift_id == null){
                        const dataRef = ref(db, 'users/'+user_data.userID+'/gifts');
                        set(push(dataRef),{
                            text: description,
                            amount: amount,
                            time: format(new Date(), 'EEEE dd MMMM yyyy, HH:mm a')
                        }).then(()=>{
                            setIsProcessing(false)
                            navigation.goBack()
                        }).catch((error)=>{
                            setIsProcessing(false)
                            console.log(error)
                            Alert.alert(
                                "Error in Saving",
                                "Something went wrong on our side, please try again", 
                                [
                                    {text: 'OK', onPress: ()=>{}}
                                ]
                            )
                        })
                    }else{
                        const updates = {};
                        updates['users/'+user_data.userID+'/gifts/'+gift_id] = {
                            text: description,
                            amount: amount,
                            time: format(new Date(), 'EEEE dd MMMM yyyy, HH:mm a')
                        };
                        update(ref(db), updates).then(()=>{
                            setIsProcessing(false)
                            navigation.goBack()
                        }).catch((error)=>{
                            setIsProcessing(false)
                            console.log(error)
                            Alert.alert(
                                "Error in Saving",
                                "Something went wrong on our side, please try again", 
                                [
                                    {text: 'OK', onPress: ()=>{}}
                                ]
                            )
                        })
                    }
                    
                    
                }}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Save</Text>
            </Pressable>

            <ActivityIndicator
                style={{marginTop: 10}}
                hidesWhenStopped={true}
                size='large'
                animating={isProcessing}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text_field:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'
    }, 
    button: {
        height: 40,
        margin: 30,  
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default AddGiftScreen;