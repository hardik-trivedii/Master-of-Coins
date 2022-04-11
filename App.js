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
import PersonalExpenseScreen from './screens/personal-expense';
import AddPersonalExpenseScreen from './screens/add-personal-expense';
import IncomesScreen from './screens/income';
import AddIncomeScreen from './screens/add_income';
import SavingsScreen from './screens/savings';
import AddSavingScreen from './screens/add_saving';
import DonationsScreen from './screens/donations';
import AddDonationScreen from './screens/add_donation';
import GiftsScreen from './screens/gifts';
import AddGiftScreen from './screens/add_gift';
import DebtsScreen from './screens/debts';
import AddDebtScreen from './screens/add_debt';
import { Pressable, Text } from 'react-native';
import ProfileSettingsScreen from './screens/profile_settings';
import ChangeNameScreen from './screens/change_name';
import ChangePasswordScreen from './screens/change_password';

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
              style = {{margin: 5}}
                onPress = {()=>{
                  navigation.navigate('AddGroupScreen')
                }}>
                  <Text style = {{color: 'blue'}}>Add</Text>
                </Pressable>
            )
          })}/>
        <Stack.Screen 
          name = "AddGroupScreen" 
          component={AddGroupScreen}/>
          <Stack.Screen 
            name = 'PersonalExpenseScreen' 
            component={PersonalExpenseScreen} 
            options = {({navigation})=>({
              title: 'Personal Expenses',
              headerRight: ()=>(
                <Pressable
                  onPress = {()=>{
                    navigation.navigate('AddPersonalExpenseScreen')
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
          })}/>
          <Stack.Screen 
          name = "AddPersonalExpenseScreen" 
          component={AddPersonalExpenseScreen} 
          options = {({navigation})=>({
            title: 'Add Personal Expense',
          })}/>
          <Stack.Screen 
            name = 'IncomesScreen' 
            component={IncomesScreen} 
            options = {({navigation})=>({
              title: 'Incomes',
              headerRight: ()=>(
                <Pressable
                  onPress = {()=>{
                    navigation.navigate('AddIncomeScreen')
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
          })}/>
          <Stack.Screen 
          name = "AddIncomeScreen" 
          component={AddIncomeScreen} 
          options = {({navigation})=>({
            title: 'Add Income',
          })}/>
          <Stack.Screen 
            name = 'SavingsScreen' 
            component={SavingsScreen} 
            options = {({navigation})=>({
              title: 'Savings',
              headerRight: ()=>(
                <Pressable
                  onPress = {()=>{
                    navigation.navigate('AddSavingScreen')
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
          })}/>
          <Stack.Screen 
          name = "AddSavingScreen" 
          component={AddSavingScreen} 
          options = {({navigation})=>({
            title: 'Add Saving',
          })}/>
          <Stack.Screen 
            name = 'DonationsScreen' 
            component={DonationsScreen} 
            options = {({navigation})=>({
              title: 'Donations/Help',
              headerRight: ()=>(
                <Pressable
                  onPress = {()=>{
                    navigation.navigate('AddDonationScreen')
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
          })}/>
          <Stack.Screen 
          name = "AddDonationScreen" 
          component={AddDonationScreen} 
          options = {({navigation})=>({
            title: 'Add Donation/Help',
          })}/>
          <Stack.Screen 
            name = 'GiftsScreen' 
            component={GiftsScreen} 
            options = {({navigation})=>({
              title: 'Gifts/Prizes',
              headerRight: ()=>(
                <Pressable
                  onPress = {()=>{
                    navigation.navigate('AddGiftScreen')
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
          })}/>
          <Stack.Screen 
          name = "AddGiftScreen" 
          component={AddGiftScreen} 
          options = {({navigation})=>({
            title: 'Add Gift/Prize',
          })}/>
          <Stack.Screen 
            name = 'DebtsScreen' 
            component={DebtsScreen} 
            options = {({navigation})=>({
              title: 'Debts',
              headerRight: ()=>(
                <Pressable
                  onPress = {()=>{
                    navigation.navigate('AddDebtScreen')
                  }}>
                    <Text style = {{color: 'blue'}}>Add</Text>
                  </Pressable>
              )
          })}/>
          <Stack.Screen 
          name = "AddDebtScreen" 
          component={AddDebtScreen} 
          options = {({navigation})=>({
            title: 'Add Debt',
          })}/>
          <Stack.Screen 
          name = "ProfileSettingsScreen" 
          component={ProfileSettingsScreen} 
          options = {({navigation})=>({
            title: 'Settings',
          })}/>
          <Stack.Screen 
          name = "ChangeNameScreen" 
          component={ChangeNameScreen} 
          options = {({navigation})=>({
            title: 'Change Name',
          })}/>
          <Stack.Screen 
          name = "ChangePasswordScreen" 
          component={ChangePasswordScreen} 
          options = {({navigation})=>({
            title: 'Change Password',
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

