import React from 'react'
import {ScrollView, StyleSheet, Text, TextInput, Pressable, Alert, ActivityIndicator} from 'react-native'
import { getDatabase, ref, set, push, update } from "firebase/database";
import UserData from '../helpers/user-data';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import { Member } from '../helpers/data-models';

const PLACEHOLDER_DESC = 'Expense Description'
const PLACEHOLDER_PRICE = 'Price'

const user_data = UserData.getInstance()

function AddGroupExpenseScreen({route, navigation}){
    var group_id, expense_id, expense_text, expense_price, payee, group_members = [];
    if(route.params != null){
        const {gid, id, text, price, payee_mem, members} = route.params;
        group_id = gid;
        expense_id = id;
        expense_text = text;
        expense_price = price;
        payee = payee_mem;
        group_members = members;
    }
    const [description, setDescription] = React.useState(expense_text != null ? expense_text : '')
    const [price, setPrice] = React.useState(expense_price != null ? expense_price : '')
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [paidBy, setPaidBy] = React.useState(new Member(payee.userID,payee.name,payee.email))
    var pickerItems = []
    group_members.forEach((item)=>{
        pickerItems.push(<Picker.Item key={item.userID} label={item.name} value={item} />)
    })
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
                    setPrice(text);
                }} 
                value={price}
                placeholder={PLACEHOLDER_PRICE}/>

            <Text style = {{fontSize: 15, color: 'gray', alignSelf: 'center'}}>Paid By</Text>    
            <Picker
                    style = {{backgroundColor: 'white', borderRadius: 10, margin: 10}}
                    selectedValue={paidBy}
                    onValueChange={(itemValue, itemIndex) =>
                        setPaidBy(itemValue)
                    }>
                    {pickerItems}
            </Picker>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress = {()=>{
                    setIsProcessing(true)
                    const db = getDatabase();
                    if(expense_id == null){
                        const dataRef = ref(db, 'groups/'+group_id+'/expenses');
                        set(push(dataRef),{
                            text: description,
                            price: price,
                            time: format(new Date(), 'EEEE dd MMMM yyyy, HH:mm a'),
                            payee: {
                                userID: paidBy.userID,
                                name: paidBy.name,
                                email: paidBy.email
                            }
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
                        console.log('groups/'+group_id+'/expenses/'+expense_id)
                        updates['groups/'+group_id+'/expenses/'+expense_id] = {
                            text: description,
                            price: price,
                            time: format(new Date(), 'EEEE dd MMMM yyyy, HH:mm a'),
                            payee: {
                                userID: paidBy.userID,
                                name: paidBy.name,
                                email: paidBy.email
                            }
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

export default AddGroupExpenseScreen;