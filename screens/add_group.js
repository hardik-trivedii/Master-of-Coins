import React from 'react'
import {View, TextInput, Pressable, Text, StyleSheet, FlatList, Alert, ActivityIndicator} from 'react-native'
import { getDatabase, ref, set, push, get } from "firebase/database";
import UserData from '../helpers/user-data';

const PLACEHOLDER_NAME = 'Group Name'
const PLACEHOLDER_MEMBER = 'Member\'s Email Address'
const user_data = UserData.getInstance()
function AddGroupScreen({navigation}){
    const [groupName, setGroupName] = React.useState('')
    const [memberEmail, setMemberEmail] = React.useState('')
    const [members, setMembers] = React.useState([])
    const [isProcessing, setIsProcessing] = React.useState(false)

    React.useEffect(()=>{
        navigation.setOptions({
            title: 'Add Group',
            headerRight: ()=>(
              <Pressable
                style = {{margin: 5, flexDirection: 'row'}}
                onPress = {()=>{
                  setIsProcessing(true)
                  var justEmails = []
                  members.forEach(element => {
                      justEmails.push({email: element.email, invitationAccepted: user_data.email == element.email})
                  })
                  const dataRef = ref(getDatabase(), 'groups/');
                  const groupIDRef = push(dataRef)
                  set(groupIDRef,{
                      name: groupName,
                      members: justEmails
                  }).then(()=>{
                      justEmails.forEach(element =>{
                          var userID = element.email.replace(/\./g, "_")
                          get(ref(getDatabase(), 'users/'+userID)).then((snap)=>{
                              if(snap.exists()){
                                
                                set(push(ref(getDatabase(), 'users/'+userID+(userID == user_data.userID ? '/groups' : '/invitations'))), groupIDRef.key)
                              }
                          }).catch((error)=>{console.log(error)})
                          
                      })
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
                    <ActivityIndicator 
                        style={{marginRight: 5}}
                        hidesWhenStopped={true}
                        size='small'
                        animating={isProcessing}/>
                    <Text style = {{color: 'blue'}}>Save</Text>
                </Pressable>
            )
          })
    })
    
    return(
        <View style = {{flex: 1}}>
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
                        var index = previousMembers.length - 1
                        let member = {id: ++index, email: memberEmail}
                        setMemberEmail('')
                        return [member, ...previousMembers];
                    })
                }}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Add Member</Text>
            </Pressable>
            <FlatList
                data = {members}
                renderItem = {({item})=>{
                    return(
                        <Pressable
                            style = {{flex: 1, margin: 2, backgroundColor: 'white', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}
                            onPress = {()=>{
                                Alert.alert(
                                    "Delete " + item.email,
                                    "",
                                    [
                                        {text: 'Yes', onPress: ()=>{
                                            setMembers(prev => {
                                                return prev.filter(element => { return element.id != item.id })
                                            })
                                        }},
                                        {
                                            text: 'No', onPress: ()=>{}
                                        }
                                    ]
                                )
                                
                            }}>
                                <Text 
                                    style = {{margin: 10, fontSize: 20, textAlign: 'center'}}
                                    >{item.email}</Text>
                            </Pressable>
                    
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