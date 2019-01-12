import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,ScrollView,
    StyleSheet,Image,
    View,SafeAreaView,
    TouchableOpacity,
    Text, Alert
} from 'react-native';
import { createStackNavigator, createSwitchNavigator,
    DrawerItems,createAppContainer, createDrawerNavigator } from 'react-navigation';
import DashboardContainer from "./DashboardContainer";
import TransactionContainer from "../transaction/TransactionContainer";
import HistoryDashBoardContainer from "./HistoryDashBoardContainer";
import ShowHistoryComponent from "../showallhistory/ShowHistoryComponent";
import PinContainer from "../formpin/PinContainer";
import ShowHistoryContainer from "../showallhistory/ShowHistoryContainer";



const CustomerDrawerComponent = (props) => (

    <View style={{flex:1}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={{height:150,backgroundColor:'white',alignItems: 'center',justifyContent: 'flex-end'}}>
                <Image source={require('../../../assets/logo.png')}
                       style={{height:120,width:120,borderRadius:60}}
                />
            </View >
            <View style={{height:150,backgroundColor:'white',alignItems: 'center',justifyContent: 'flex-end'}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>"A" Bank </Text>
            </View>
            <DrawerItems {...props} />
            <TouchableOpacity style={{marginLeft: 18, }} onPress={()=>
                Alert.alert(
                    'Log out',
                    'Do you want to logout?',
                    [
                        {text: 'Cancel', onPress: () => {return null}},
                        {text: 'Confirm', onPress: () => {
                                AsyncStorage.clear();
                                props.navigation.navigate('LoginScreen')
                            }},
                    ],
                    { cancelable: false }
                )
            }>
                <Text style={{fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </View>
);

const AppSwitch = createDrawerNavigator(
    {

        // App: AppStack,
        // Auth: AuthStack,
        Home : {
            screen : DashboardContainer
        }

    },{
        contentComponent:CustomerDrawerComponent
    }

);

const DashboardDrawerComponent = createAppContainer(AppSwitch)
export default DashboardDrawerComponent;
