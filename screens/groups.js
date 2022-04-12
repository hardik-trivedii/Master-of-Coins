import React from 'react'
import {View, Pressable, Text, FlatList} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItemTile} from '../helpers/my-components'
import { getDatabase, ref, set, push, get } from "firebase/database";
import {Group, Member} from '../helpers/data-models';

function GroupsScreen({navigation}){
    const user_data = UserData.getInstance()
    const [statusHeight, setStatusHeight] = React.useState(0)
    const [invitations, setInvitations] = React.useState(0)

    const [groups, setGroupsData] = React.useState(user_data.groups)

    React.useEffect(()=>{
        // to manage subscriptions
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/invitations', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                var totalInvitations = 0
                snapshot.forEach(element => {
                    totalInvitations += 1
                });
                setInvitations(totalInvitations)
                setStatusHeight(totalInvitations == 0 ? 0 : 40)
            }
        })

        // setting value update callback on groups data
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/groups', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.groups = []
                var groupsPromises = []
                // groups data are stored apart from user data so taking all the group IDs
                // and executing data fetch using those IDs from groups data
                snapshot.forEach(element => {
                    groupsPromises.push(get(ref(getDatabase(), 'groups/'+element.val())))
                });
                // executing all the group data fetching
                Promise.all(groupsPromises).then((groupsData)=>{
                    groupsData.forEach(data=>{
                        var group = new Group(data.key, data.val().name)
                        group.members.push(new Member(user_data.userID,user_data.name,user_data.email))
                        data.val().members.forEach(item=>{
                            if(item.invitationAccepted)
                                group.members.push(new Member(item.userID,item.name,item.email))
                            else
                                group.pendingMembers.push(new Member("","",item.email))
                        })
                        user_data.groups.push(group)
                    })
                    setGroupsData(user_data.groups)
                })   
            }
        })
        return ()=>{
            abortController.abort();
        }
    },[])

    return(
        <View style = {{flex: 1, backgroundColor: 'white'}}>
            <Pressable 
                style = {({pressed})=>[{height: statusHeight, backgroundColor: pressed ? 'lightgray' : 'green'}]}
                onPress = {()=>{
                    navigation.navigate('InvitationsScreen')
                }}>
                <Text style = {{color: 'white', margin: 10}}>{invitations} group inviations pending</Text>
            </Pressable>
            <FlatList
                data={groups}
                renderItem = {({item})=>{
                    return(
                        <ListItemTile
                            text = {item.name}
                            color = 'red'
                            onClick = {()=>{
                                navigation.navigate('GroupExpenseScreen', {id: item.id, members: item.members})
                            }}/>
                    )
                }}/>
        </View>
    )
}

export default GroupsScreen;