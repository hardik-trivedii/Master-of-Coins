import React from 'react'
import {FlatList, Pressable, Text, ActivityIndicator} from 'react-native'
import { InviteListItem } from '../helpers/my-components'
import UserData from '../helpers/user-data'

const user_data = UserData.getInstance()
function InvitationsScreen({navigation}){
    var invitations = []
    const [invites, setInvites] = React.useState([])
    React.useEffect(()=>{
        const abortController = new AbortController()
        UserData.setValueUpdateOnPath('users/'+user_data.userID+'/invitations', (snapshot)=>{
            abortController.signal
            if(snapshot.exists()){
                invitations = []
                var index = 0
                snapshot.forEach(element => {
                    let invite = {id: index, name: element}
                    invitations.push(invite)
                    index += 1
                });
                setInvites(invitations)
            }
        })

        return ()=>{
            abortController.abort();
        }
    },[])

    return(
        <FlatList
            data={invites}
            renderItem = {({item})=>{
                <InviteListItem
                    groupName = {item.name}
                    onAcceptClicked = {()=>{

                    }}
                    onDeclineClicked = {()=>{

                    }}/>
            }}
        />
    )
}

export default InvitationsScreen;