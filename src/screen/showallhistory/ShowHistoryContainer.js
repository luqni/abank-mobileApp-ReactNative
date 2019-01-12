import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {Card} from "react-native-elements";
import axios from "axios";
import ShowHistoryComponent from "./ShowHistoryComponent";
import { DrawerActions } from 'react-navigation';

export default class showHistoryContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idcust : '',
            username:'',
            accountt : [],
            transfer : [],
            transferC: []
            }
      }
      
    
      componentDidMount() {
        this.getCustNum();
      }

      getCustNum = async() => {
        let data = await AsyncStorage.getItem('idcustomer');
        this.setState({idcust : data});
        console.log(this.state.idcust);
        this.makeRemoteRequest();
          let username=await AsyncStorage.getItem('username');
          console.log('username : '+username);
          this.setState({username:username});
      }

      getHistory = async ()=>{
        let data = this.state.transfer;
        await getAllTransaction(data);
        console.log(data);
      }
    
      makeRemoteRequest = () => {
        let data = this.state.idcust;

        const url = `http://192.168.1.19:7000/api/accountbycust/${data}.json`;
        fetch(url)
          .then(res => res.json())
          .then(resJson => {
              this.setState({accountt : resJson.values});
              console.log(this.state.accountt.accountnumber);
              this.setState({transfer: {...this.state.transfer, account : {...this.state.accountnumber, accountnumber :  resJson.values.accountnumber}}});
            console.log(resJson);
            this.getAllHistoryDebit();
          })
          .catch(error => {
            // this.setState({ error, loading: false });
            console.log(error);
            
          });
      };

      getAllHistoryDebit = () => {
          let dataAccount = this.state.accountt.accountnumber;
          console.log(dataAccount);

          const url = `http://192.168.1.19:7000/api/transaction/historyDebit/${dataAccount}.json`;
          fetch(url)
              .then((res) => res.json())
              .then(resJson => {
                  this.setState({transfer: resJson.values});
                  console.log(this.state.transfer);
                  // this.setState({})
              })
              .catch(error => {
                  console.log(error);

              })
      }

    
      render() {
        return (

            <View style={styles.canvas}>
                <View style={styles.barHeader} >
                </View>

                <View style={styles.menuBar} >
                    <View style={{flexDirection: 'row', height: '100%'}}>
                        <IconAntDesign name={'API'} size={25} style={{ marginTop:'5%', color:'#fff', marginLeft:"2%"}}
                                       onPress={()=>{this.props.navigation.dispatch(DrawerActions.openDrawer())}}
                        />
                        <Text style={{ marginTop:'6%', color:'#fff', marginLeft:"2%", fontWeight:'bold'}}>A Bank</Text>
                        <Text style={{ marginTop:'6%', color:'#fff', marginLeft:'45%'}}>{this.state.username} | {this.state.accountt.accountnumber}</Text>

                    </View>

                </View>

                <View style={styles.menuBarTab}>
                    <AntDesign name={'home'} size={30} style={{ marginLeft:'5%', marginTop:'4%', color: "#cccccc"}}
                               onPress={()=> {this.props.navigation.navigate('dashboardDrawer')}}
                    />
                    <Text style={{marginTop:'7%', marginLeft:'1%', fontWeight: 'bold', color: "#cccccc"}}
                          onPress={()=> {this.props.navigation.navigate('dashboardDrawer')}}
                    >My Bank</Text>
                    <MaterialCommunityIcons name={'bank-transfer'} size={45} style={{ marginLeft:'8%', marginTop:'3%', color: "#cccccc"}}
                                            onPress={()=> {this.props.navigation.navigate('PinScreen')}}
                    />
                    <Text style={{marginTop:'7%', marginLeft:'1%', color: "#cccccc", fontWeight: 'bold'}} onPress={()=> {this.props.navigation.navigate('PinScreen')}}>Transfer</Text>

                    <FontAwesome name={'history'} size={30} style={{ marginLeft:'7%', marginTop:'5%', }} onPress={()=>{this.props.navigation.navigate('HistoryScreen')}} />
                    <Text style={{marginTop:'7%', marginLeft:'2%',  fontWeight: 'bold'}}
                          onPress={()=>{this.props.navigation.navigate('HistoryScreen')}}
                    >History</Text>
                </View>

                <View style={styles.contentHistory}>

                    <ShowHistoryComponent data={this.state.transfer}/>

                </View>
            </View>
        );
      }
    }

const styles = StyleSheet.create({
    canvas: {
        width: '100%',
        height: '100%'
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

    },
    imageStyle:{
        width:'10%',
        height:'10%',
        marginTop: '10%',
        marginLeft: '60%'

    },
    card: {
        elevation: 50,
        width: '90%',
        height: '30%',
        marginLeft:20,
        borderWidth: 3,
        marginTop: 6,
        borderRadius:8,
        backgroundColor: '#646FE4'
    },
    contentHistory:{
        width:'100%',
        height:'100%'
    }


});

