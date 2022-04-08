import React from 'react';
import {View, TextInput, Text, Pressable, StyleSheet} from 'react-native'

const EMAIL_PLACEHOLDER_TEXT = "Email";
const PASSWORD_PLACEHOLDER_TEXT = "Password";

function SignInScreen(){
    const [emailText, onChangeEmailText] = React.useState('')
    const [password, onChangePasswordText] = React.useState('')
    return(
        <View style = {styles.container}> 
            <TextInput 
                style = {styles.text_field}
                onChangeText={onChangeEmailText} 
                value={emailText}
                placeholder={EMAIL_PLACEHOLDER_TEXT}/>

            <TextInput 
                style = {styles.text_field}
                onChangeText={onChangePasswordText} 
                value={password}
                placeholder={PASSWORD_PLACEHOLDER_TEXT}/>

            <Pressable
                style = {({pressed})=>[
                    {backgroundColor: pressed ? 'gray' : 'red'},
                    styles.button
                ]}
                onPress={()=>{

                }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign In</Text>
            </Pressable>

            <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{alignSelf: 'center'}}>New User?</Text>
                <Text style={{marginLeft: 5, color: 'blue', alignSelf: 'center'}}>Create Account</Text>
            </View>
            
            <Text style={{marginTop: 10, color: 'blue', alignSelf: 'center'}}>Forgot Password?</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
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
    }
})
export default SignInScreen;