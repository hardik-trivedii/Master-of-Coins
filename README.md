<p align = "center"><img src="assets/icon.png" width="200" height="200"/></p>
<h1 align="center">Master of Coins</h1>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![Version](https://img.shields.io/badge/version-v1.4.5-blue.svg)
![React Native](https://img.shields.io/badge/react%20native-v17.0.1-red.svg)
![Firebase](https://img.shields.io/badge/firebase-v9.6.10-orange.svg)
![License](https://img.shields.io/badge/license-no%20license-brightgreen.svg)

# Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)<br>
    2.1 [User Management](#user-management)<br>
    2.2 [Dashboard](#dashboard)<br>
    2.3 [Expenditure Management](#expenditure-management)<br>
    2.4 [Debts Management](#debts-management)<br>
    2.5 [Incomes, Savings and Other Transactions Management](#incomes-savings-and-other-transactions-management)<br>
3. [Installation Guide](#installation-guide)<br>
    3.1 [Step 1: Install the Expo CLI](#step-1-install-expo-cli)<br>
    3.2 [Step 2: Clone the Repository](#step-2-clone-the-repository)<br>
    3.3 [Install the Dependencies](#step-3-install-the-dependencies)<br>
    3.4 [Run the Project](#step-4-run-the-project)<br>
    3.5 [Generating Executables](#step-5-generating-executables)<br>
4. [Project Files Description](#project-files-description)
5. [How to Contribute?](#how-to-contribute)
6. [Support](#support)
7. [License](#license)
8. [Author](#author)
9. [About this Project](#about-this-project)

# Introduction
Generally, people don't keep track of their monetary transactions, but those who do, often tends to use papers or diaries. And many times they don't even remember where they put those papers. So to manage monetary transactions and keep track of all the savings, earnings and expenses, here I present a mobile application solution which do all of these for us. The application is named **Master of Coins** because it was the position in the small council of the Game of Thrones series who manages all the financial and monetary transactions and our application does the same. <br/>[ Image Source: [tzr.io](https://www.tzr.io/yarn-clip/5c88db7a-e5cf-40d5-8a10-e59b059fb566/gif) ]

<p align = "center"><img src="assets/master-of-coin-lannister.gif" width="300" height="200"/><br/></p>

# Features
## User Management
Users need to create an account using their email address. The account is required to save all the user specific data and user can get all the data back when signs into account. User can log out from the account or can permanently delete the account, if wishes. As account is created on email, user can change name and password except email address.
<br/>
<img src="assets/screen-shots/IMG-0456.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0457.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0459.PNG" width="230" height="500"/>

## Dashboard
Here, Master of Coins welcomes you. You can see all the six categories which most probably are the causes of our monetary transactions, namely **Incomes**, **Expenses**, **Savings**, **Donations/Help**, **Debts** and **Gifts/Prizes**.
<br/>
<img src="assets/screen-shots/IMG-0465.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0460.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0461.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0462.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0463.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0464.PNG" width="230" height="500"/>

## Expenditure Management
Mostly, we need to manage how much we spend on our personal needs or in group hangouts. Master of Coins gives you the feature to manage personal expenses and group expenses. You can edit or delete any record by clicking on it. You can create groups, add members in them (only registered members can be added via their registered email address) and then you can manage group expenses by simply adding them as others. You can also choose who paid the bill. Only member who have accepted the group invitation, can be seen in the group activities. Group invitations can be seen in the Groups screen. User has choice to accept the invitation or decline it.
<br/>
<img src="assets/screen-shots/IMG-0469.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0470.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0471.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0472.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0473.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0481.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0482.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0483.PNG" width="230" height="500"/>

## Debts Management
Many times we forget whom to pay back or where to pay back like credit card bills or money lent from friend. So here comes Master of Coins Debts Management feature, you can add the debt when taken, it shows a button, you can actually clear the debt when paid. You can edit or delete any record by clicking on it.
<br/>
<img src="assets/screen-shots/IMG-0478.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0479.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0480.PNG" width="230" height="500"/>

## Incomes, Savings and Other Transactions Management
Along with debts and expenses, we do have transactions on positive side like incomes, savings, donations and gifts or prize money. Master of Coins provides features to manage all of them under a single application. You can edit or delete any record by clicking on it.
<br/>
<img src="assets/screen-shots/IMG-0466.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0467.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0468.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0474.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0475.PNG" width="230" height="500"/>
<img src="assets/screen-shots/IMG-0477.PNG" width="230" height="500"/>

# Installation Guide
## Step 1: Install Expo CLI
To run this project, you need Expo Command Line Interface (Expo CLI) installed in your system. If not, then your first step is to install ```expo-cli``` by entering following command in Unix based Terminal or Windows Powershell.
```
$ npm install --global --expo-cli
```
If you find any trouble doing this, please refere to this [guide](https://docs.expo.dev/get-started/installation/).
## Step 2: Clone the Repository
Once ```expo-cli``` sets up, you can clone this project into your local system. You can start by downloading ZIP file and extracting it to your local machine.
## Step 3: Install the Dependencies
When you have extracted project files ready, you can go for this step. The project files don't include the libraries and dependencies so you have to install them. Locate the ```package.json``` file in the project and execute the following command.
```
$ npm install
```
This might take a while so you have to be patient!!!
[Image Source: [giphy.com](https://giphy.com/gifs/bachelorinparadise-season-4-bachelor-in-paradise-U8cKIATUiTTRC)]
<p align = "center"><img src="assets/cannot-be-patient.gif" width="300" height="200"/><br/></p>

## Step 4: Run the Project
If everything has gone well upto here, then we are good to go for running this project. Just execute the following command. For the first time build, this might take a while.
```
$ expo start
```
If it runs perfectly, you can expect somewhat following results in command line:
<p align = "center"><img src="assets/expo-start-output.PNG" width="500" height="400"/><br/></p>

You can follow the in-screen commands to run in specific environment. If you scan this QR code to run in the mobile device, you might encounter an error saying ```coundn't connect to development server``` in the first time run. This is happening because building process is taking longer than expected time of expo client app in our mobile phones. The solution is, scan the QR code again and let the development server build the app again. This would resolve the problem and you can see the app running in the mobile phone. If problem persists, then wait for the development server to finish all its building tasks.

## Step 5: Generating Executables
If you want to build executables for the mobile platforms like Android APK or iOS IPA files, you can use the following guides for the same.
> Android Signed APK Generation [Guide](https://reactnative.dev/docs/signed-apk-android)

> Publishing to App Store and Signed IPA Generation [Guide](https://reactnative.dev/docs/publishing-to-app-store)

<br/>

# Project Files Description
- **README.md** : The readme file for the description of the project
- **App.js** : The main file containing all the screen and their navigation stack information
- **screens** : folder containing all the screen files
    - **splash.js** : for initial data fetching and user verification
    - **sign_in.js**, **sign_up.js**, **profile_settings**, **change_name.js**, **change_password**: for user management
    - **dashboard.js** : for the dashboard showcasing all the features tiles
    - **expenses.js**, **personal-expenses.js**, **groups.js**, **add-personal-expense.js**, **add_group.js**, **add-group-expense.js**, **group-expenses** : for expenditure management
    - **invitations.js** : to manage group invitations
    - **income.js**, **add_income.js** : to show incomes previously saved and to add new income source and amount
    - **savings.js**, **add_saving.js**, **debts.js**, **add_debt.js**, **gifts.js**, **add_gift.js**, **donations.js**, **add_donation.js** : same as above, to show particular transaction and to add one
- **helpers** : folder containing all the helping files
    - **data-models.js** : contains all the model classes
    - **my-components.js** : all the custom components designed for this app reside in it
    - **user-data.js** : a singleton pattern class to store all the user's data in one place 
- **app.json** : It contains all the application specific data like application name, icon, splash image, version, etc.
- **package.json** : It contains list all the dependencies with their versions.
- **assets** : folder containing all the images of the app, the image files which are not listed here are for **README.md** file.
    - **user.png** : for user icon in the dashboard
    - **icon.png** : Application icon
    - **favicon.png**, **splash.png**: expo uses it, I didn't change them

# How to contribute?
Pull requests are always welcome. If you think you can pick this up and make something great out of it or enhance it to a greater level, or find a bug or improvement where you can help, you are welcome to do this. And if you liked it, you can star this repo.

# Support
If you encounter any bug or need any kind of assistance, you can [mail me](mailto:hdt533@uregina.ca)

# License
The use of this project is under no license.

# Author
**Hardikkumar Trivedi** (You can call me **Hardik**)<br/>
Student ID : **200439820**<br/>
<a href='mailto:hdt533@uregina.ca'>
    <img src='https://img.shields.io/badge/Email-Me-green'>
  </a>
<a href='https://stackoverflow.com/users/6254678'>
    <img src='https://img.shields.io/badge/Stack%20Overflow-401-orange'>
  </a>
![social](https://img.shields.io/github/followers/hardik-trivedii?style=social)
![social](https://img.shields.io/twitter/follow/HardikTrivedi_D?style=social)
# About this Project
This project is the Final Project of the course **CS 855 Mobile Computing** Winter 2022 at **University of Regina**.
