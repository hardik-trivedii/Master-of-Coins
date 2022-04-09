import { initializeApp, getApps, getApp } from '@firebase/app';
import { ref, onValue, getDatabase } from "firebase/database";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/sign_in'
import SignUpScreen from './screens/sign_up';
import DashboardScreen from './screens/dashboard';

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
      <Stack.Navigator initialRouteName = 'SignInScreen'>
        <Stack.Screen name = 'SignInScreen' component = {SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'SignUpScreen' component = {SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name = 'DashboardScreen' component = {DashboardScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

