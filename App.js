import { initializeApp, getApps, getApp } from '@firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/splash-screen';
import SignInScreen from './screens/sign_in'
import SignUpScreen from './screens/sign_up';
import DashboardScreen from './screens/dashboard';
import ExpensesScreen from './screens/expenses';
import GroupsScreen from './screens/groups';
import AddGroupScreen from './screens/add_group';
import { Pressable, Text } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyDv00MUbusng7OKLpCZIindbQe9ZGE2yo4",
  authDomain: "master-of-coin-7d873.firebaseapp.com",
  projectId: "master-of-coin-7d873",
  storageBucket: "master-of-coin-7d873.appspot.com",
  messagingSenderId: "809511179012",
  appId: "1:809511179012:web:4d7e33f7af79f149a3b651",
  databaseURL: "https://master-of-coin-7d873-default-rtdb.firebaseio.com/",
};

const Stack = createNativeStackNavigator();
export default function App() {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'SplashScreen'>
        <Stack.Screen name = 'SplashScreen' component={SplashScreen} options = {{headerShown: false}}/>
        <Stack.Screen name = 'SignInScreen' component = {SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'SignUpScreen' component = {SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'DashboardScreen' component = {DashboardScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'ExpensesScreen' component={ExpensesScreen} options = {{title: 'Expenses'}}/>
        <Stack.Screen 
          name = 'GroupsScreen' 
          component={GroupsScreen} 
          options = {({navigation})=>({
            title: 'Groups',
            headerRight: ()=>(
              <Pressable
                onPress = {()=>{
                  navigation.navigate('AddGroupScreen')
                }}>
                  <Text style = {{color: 'blue'}}>Add</Text>
                </Pressable>
            )
          })}/>
        <Stack.Screen 
          name = "AddGroupScreen" 
          component={AddGroupScreen} 
          options = {({navigation})=>({
            title: 'Add Group',
            headerRight: ()=>(
              <Pressable
                onPress = {()=>{
                  
                }}>
                  <Text style = {{color: 'blue'}}>Save</Text>
                </Pressable>
            )
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

