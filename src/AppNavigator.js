import React from 'react'
import { createStackNavigator, createAppContainer} from 'react-navigation'
import {StyleSheet} from "react-native";
import LoginContainer from "./screen/login/loginContainer";
import RegisterSection from "./screen/register/registerSection";
import DashboardContainer from "./screen/dashboard/DashboardContainer";
import TransactionContainer from "./screen/transaction/TransactionContainer";
import showHistoryContainer from './screen/showallhistory/ShowHistoryContainer';
import dashboardDrawer from './screen/dashboard/DashboardDrawer';
import PinContainer from "./screen/formpin/PinContainer";
const AppStack  = createStackNavigator(
    {
        LoginScreen : {
            screen : LoginContainer,
            headerMode: 'none',
            navigationOptions:()=> ({
                header:null
            })
        },
        dashboardDrawer : {
            screen : dashboardDrawer,
            headerMode: 'none',
            navigationOptions:()=> ({
                header:null
            })
        },
        RegisterSection : {
            screen : RegisterSection,
            headerMode: 'none',
            navigationOptions:()=> ({
                header:null
            })
        },
        TransactionScreen : {
            screen : TransactionContainer,
            headerMode: 'none',
            navigationOptions:()=> ({
                header:null
            })
        },
        PinScreen : {
            screen : PinContainer,
            headerMode: 'none',
            navigationOptions:()=> ({
                header:null
            })
        },
        HistoryScreen : {
            screen : showHistoryContainer,
            headerMode: 'none',
            navigationOptions:() =>({
                header:null
            })
        }
    },
    {
        initialRouteName: 'LoginScreen'
    },

);


const AppNavigator = createAppContainer(AppStack)
export default AppNavigator;

