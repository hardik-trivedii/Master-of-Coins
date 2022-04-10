import React from 'react'
import {View, TextInput, Pressable, Text, StyleSheet, FlatList, Alert} from 'react-native'

const PLACEHOLDER_NAME = 'Group Name'
const PLACEHOLDER_MEMBER = 'Member\'s Email Address'

function AddGroupScreen({navaigation}){
    const [groupName, setGroupName] = React.useState('')
    const [memberEmail, setMemberEmail] = React.useState('')
    const [members, setMembers] = React.useState([])

    
    return(
        <View>
             <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    setGroupName(text);
                }} 
                value={groupName}
                placeholder={PLACEHOLDER_NAME}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={(text)=>{
                    setMemberEmail(text);
                }} 
                value={memberEmail}
                placeholder={PLACEHOLDER_MEMBER}/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress = {()=>{
                    setMembers(previousMembers => {
                        return [memberEmail, ...previousMembers];
                    })
                }}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Add Member</Text>
            </Pressable>
            <FlatList
                data = {members}
                renderItem = {({item})=>{
                    return(
                    <Text 
                        style = {{margin: 10, fontSize: 20, textAlign: 'center', backgroundColor: 'white', borderRadius: 5}}
                        onPress = {()=>{
                            // ask to Delete item if clicked
                        }}>{item}</Text>
                    )}}/>
        </View>
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
export default AddGroupScreen;