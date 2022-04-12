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

        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/groups', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                user_data.groups = []
                var groupsPromises = []
                snapshot.forEach(element => {
                    groupsPromises.push(get(ref(getDatabase(), 'groups/'+element.val())))
                });
                Promise.all(groupsPromises).then((groupsData)=>{
                    groupsData.forEach(data=>{
                        var group = new Group(data.key, data.val().name)
                        data.val().members.forEach(item=>{
                            group.members.push(new Member("","",item.email))
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
                style = {({pressed})=>[{height: statusHeight, backgroundColor: pressed ? 'lightgray' : 'green'}]}>
                <Text style = {{color: 'white', margin: 10}}>{invitations} group inviations pending</Text>
            </Pressable>
            <FlatList
                data={groups}
                renderItem = {({item})=>{
                    return(
                        <ListItemTile
                            text = {item['name']}
                            color = 'red'
                            onClick = {()=>{
                                
                            }}/>
                    )
                }}/>
        </View>
    )
}

export default GroupsScreen;