import React from 'react'
import {View, SafeAreaView, StyleSheet} from 'react-native'

function DashboardScreen({navigation}){
    return(
        <SafeAreaView style = {styles.container}>
            <View style = {{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'red'
            }}>

            </View>

            <View style = {{
                flex: 2,
                justifyContent: 'flex-end',
                backgroundColor: 'green'
            }}>
                
            </View>

            <View style = {{
                flex: 6,
                justifyContent: 'flex-end',
                backgroundColor: 'blue'
            }}>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default DashboardScreen;