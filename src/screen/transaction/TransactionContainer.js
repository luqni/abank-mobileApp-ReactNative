import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage, Text} from 'react-native';
import TransactionComponent from "./TransactionComponent";
// import {getAccByCust} from "./ServiceTransaction";
import axios from 'axios';
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from 'react-navigation';
export default class TransactionContainer extends Component {
    constructor(props){
        super(props);
        this.state = {

            custid : '',
            accountt: {},
            transfer: {
                username:'',
                receiver : '',
                amount : '',
                amountsign : 'D',
                type : 'Transfer',
                date : Date.now(),
                account :{
                    accountnumber : ''
                }
            }
        }
    }

    componentDidMount() {
        this.getCustNum();
        this.getUsername();

    }

    getCustNum = async () => {
        let id = await AsyncStorage.getItem('idcustomer');
        this.setState({custid : id});
        this.getAccNum();
    }
    getUsername = async () => {
        let username = await AsyncStorage.getItem('username');
        this.setState({username : username});
        console.log(username);

    }

    postTrans = async () => {
        let data = this.state.transfer;
        const URL = `http://192.168.1.19:7000/api/transaction`;
        return axios({
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        })
            .then(res => {
                console.log('Status', res.data.status);
                console.log('Message', res.data.message);

                if(res.data.status == 404){
                    alert('Account number not found');
                }else if(res.data.status == 500){
                    alert('Your balance is insufficient');
                }else{
                    this.props.navigation.navigate('DashboardScreen');
                    alert('Transaction successed');
                }
            })
            .catch(error => {
                console.log('Error', error.response.data);
            })

    }

    getAccNum=()=>{
        let data = this.state.custid;

        return fetch('http://192.168.1.19:3000/accountbycust/'+data+'.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({accountt : responseJson.values});
                this.setState({transfer: {...this.state.transfer, account : {...this.state.accountnumber, accountnumber :  responseJson.values.accountnumber}}});
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return(
            <View style={styles.TransactionCard}>
                <View style={styles.barHeader} >
                </View>
                <View style={styles.menuBar}>
                    <View style={{flexDirection: 'row'}}>
                        <IconAntDesign name={'API'} size={25} style={{ marginTop:'5%', color:'#fff', marginLeft:"2%"}}
                                       onPress={()=>{this.props.navigation.dispatch(DrawerActions.openDrawer())}}
                        />
                        <Text style={{ marginTop:'6%', color:'#fff', marginLeft:"2%", fontWeight:'bold'}}>A Bank</Text>
                        <Text style={{ marginTop:'6%', color:'#fff', marginLeft:'45%'}}>{this.state.username} | {this.state.accountt.accountnumber}</Text>

                    </View>
                </View>
                <View style={styles.menuBarTab}>
                    <AntDesign name={'home'} size={30} style={{ marginLeft:'5%', marginTop:'4%', color: "#cccccc"}} onPress={()=>{this.props.navigation.navigate('dashboardDrawer')}}/>
                    <Text style={{marginTop:'7%', marginLeft:'1%', fontWeight: 'bold', color: "#cccccc"}} onPress={()=>{this.props.navigation.navigate('dashboardDrawer')}} >My Bank</Text>
                    <MaterialCommunityIcons name={'bank-transfer'} size={45} style={{ marginLeft:'8%', marginTop:'3%', }}
                                            onPress={()=> {this.props.navigation.navigate('TransactionScreen')}}
                    />
                    <Text style={{marginTop:'7%', marginLeft:'1%', fontWeight: 'bold'}} onPress={()=> {this.props.navigation.navigate('TransactionScreen')}}>Transfer</Text>
                    <FontAwesome name={'history'} size={30} style={{ marginLeft:'7%', marginTop:'5%', color: "#cccccc"}} onPress={()=>{this.props.navigation.navigate('HistoryScreen')}} />
                    <Text style={{marginTop:'7%', marginLeft:'2%', color: "#cccccc", fontWeight: 'bold'}}
                          onPress={()=>{this.props.navigation.navigate('HistoryScreen')}}
                    >History</Text>
                </View>
                <View>
                <TransactionComponent trans={this.transfer} post={this.postTrans} />
                </View>
            </View>
        )
    }

    transfer = (value, key) =>{
        if(key){
            if(key === 'receiver'){
                this.setState({transfer: {...this.state.transfer, receiver:value}});
            }else if (key === 'amount'){
                this.setState({transfer:{...this.state.transfer, amount:value}})
            }else if (key === 'type'){
                this.setState({transfer:{...this.state.transfer,type:value}});
            }
        }
    }
}

const styles = StyleSheet.create({
    TransactionCard: {
        backgroundColor: "#646FE4",
        width: '100%',
        height: '100%',
    },
    barHeader:{
        width: '100%',
        height: '5%',
        backgroundColor: '#2a2f63',

    },
    menuBar:{
        width: '100%',
        height: '10%',
        backgroundColor: '#646FE4',
        elevation: 10

    },
    menuBarTab:{
        width: '100%',
        height: '10%',
        backgroundColor: '#fff',
        elevation: 10,
        flexDirection: 'row'

    }

});

