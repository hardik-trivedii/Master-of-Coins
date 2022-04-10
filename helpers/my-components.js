import React from 'react'
import {View, Pressable, Text, StyleSheet} from 'react-native'


function Tile(props){
    return(
        <Pressable 
            style = {({pressed})=>[{backgroundColor: pressed ? 'lightgray' : props.color}, styles.dashboard_tile]}
            onPress = {props.onClick}>
                        <Text style = {styles.dashboard_tile_text}>{props.text}</Text>
        </Pressable>
    )
}

function WideTile(props){
    return(
        <Pressable 
            style = {({pressed})=>[{backgroundColor: pressed ? 'lightgray' : props.color}, styles.expense_tile]}
            onPress = {props.onClick}>
            <Text style = {styles.dashboard_tile_text}>{props.text}</Text>
        </Pressable>
    )
}

function ListItemTile(props){
    return(
        <Pressable 
            style = {({pressed})=>[{backgroundColor: pressed ? 'lightgray' : props.color}, styles.list_item_tile]}
            onPress = {props.onClick}>
            <Text style = {styles.dashboard_tile_text}>{props.text}</Text>
        </Pressable>
    )
}

function ListItem(props){
    return(
        <Pressable
            style = {{flex: 1, borderRadius: 10, borderColor: 'gray', borderWidth: 1, margin: 5, backgroundColor: 'white'}}
            onPress = {props.onItemClick}>
            <Text style = {{flex: 1, fontSize: 15, margin: 5}}>{props.title}</Text>
            <Text style = {{flex: 2, fontSize: 30, fontWeight: 'bold', margin: 5}}>${props.price}</Text>
            <Text style = {{flex: 1, margin: 5}}>{props.timestamp}</Text>
        </Pressable>
    )
}

function ListItemWithButton(props){
    return(
        <Pressable
            style = {{flex: 1, borderRadius: 10, borderColor: 'gray', borderWidth: 1}}
            onPress = {props.onItemClick}>
            <Text style = {{flex: 1, fontSize: 20, margin: 5}}>{props.title}</Text>
            <View style = {{flex: 2, flexDirection: 'row'}}>
                <Text style = {{flex: 3, fontSize: 40, fontWeight: 'bold', margin: 5}}>${props.price}</Text>
                <Pressable
                    style = {{flex: 1, backgroundColor: props.buttonColor, borderRadius: 5}}
                    onPress = {props.onButtonClicked}>
                        <Text style = {{fontSize: 10, color: 'white', fontWeight: 'bold'}}>{props.buttonText}</Text>
                </Pressable>
            </View>
            <Text style = {{flex: 1, margin: 5}}>{props.timestamp}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    dashboard_tile:{
        flex: 1,  
        margin: 10, 
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dashboard_tile_text: {
        color: 'white', 
        fontSize: 25, 
        fontWeight: 'bold'
    },
    expense_tile:{
        flex: 0.2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    list_item_tile:{
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
})

export default function MyComps(){
    return(<View></View>)
}

export {Tile, WideTile, ListItem, ListItemWithButton, ListItemTile};