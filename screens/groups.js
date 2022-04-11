import React from 'react'
import {View, Pressable, Text, FlatList} from 'react-native'
import UserData from '../helpers/user-data'
import {ListItemTile} from '../helpers/my-components'

function GroupsScreen({navigation}){
    const user_data = UserData.getInstance()
    const [statusHeight, setStatusHeight] = React.useState(40)
    const [invitations, setInvitations] = React.useState(0)

    const [groups, setGroupsData] = React.useState(user_data.groups)

    React.useEffect(()=>{
        // const abortController = new AbortController()
        // UserData.setValueUpdateOnPath('users/'+user_data.userID+'/gifts', (snapshot)=>{
        //     abortController.signal
        //     if(snapshot.exists()){
        //         user_data.gifts = []
        //         snapshot.forEach(element => {
        //             user_data.gifts.push(new Income(element.key, element.val().text, element.val().amount, element.val().time))
        //         });
        //         setGifts(user_data.gifts)
        //     }
        // })

        // return ()=>{
        //     abortController.abort();
        // }
    },[])

    return(
        <View style = {{flex: 1}}>
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