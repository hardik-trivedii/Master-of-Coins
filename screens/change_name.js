import React from 'react'
import {ScrollView, TextInput, Pressable, Text, StyleSheet, ActivityIndicator} from 'react-native'
import UserData from '../helpers/user-data'
import { getDatabase, ref, update } from "firebase/database";

const user_data = UserData.getInstance()
function ChangeNameScreen({navigation}){
    const [name, setName] = React.useState(user_data.name)
    const [isProcessing, setIsProcessing] = React.useState(false)

    return(
        <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps='handled'>
            <TextInput 
                style = {[{marginTop: 100},styles.text_field]}
                onChangeText={(text)=>{
                    setName(text);
                }} 
                value={name}
                placeholder="Change Name"/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress = {()=>{
                    const updates = {};
                        updates['users/'+user_data.userID+'/name'] = name
                        update(ref(getDatabase()), updates).then(()=>{
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
export default ChangeNameScreen;