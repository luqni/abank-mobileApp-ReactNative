import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {Card} from "react-native-elements";
import HistoryDashBoardContainer from "./HistoryDashBoardContainer";



export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);

        this.showData()
        this.state={
            username:'',
            idcustomer:'',
            balance:'',
            accountnumber:''
        }

    }



    showData = async ()=>{
        let idcustomer=await AsyncStorage.getItem('idcustomer');
        console.log('id customer '+idcustomer);
        this.setState({idcustomer:idcustomer});
        this.getAccNum();
        let username=await AsyncStorage.getItem('username');
        console.log('username : '+username);
        this.setState({username:username});


    }

    getAccNum=()=>{
        let data = this.state.idcustomer;

        return fetch('http://192.168.1.19:7000/api/accountbycust/'+data+'.json')
            .then((response) => response.json())
            .then((responseJson) => {
                // this.setState({accountt : responseJson.values});
                console.log(responseJson.values.balance);
                console.log(responseJson.values.accountnumber);

                this.setState({balance:responseJson.values.balance});
                this.setState({accountnumber:responseJson.values.accountnumber});

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return(
            <View style={styles.canvas}>
                <View style={styles.barHeader} >
                </View>

                <View style={styles.menuBar} >
                    <View style={{flexDirection: 'row', height: '100%'}}>
                        <IconAntDesign name={'menu-fold'} size={25} style={{ marginTop:'5%', color:'#fff', marginLeft:"2%"}}
                                       onPress={()=>{this.props.navigation.openDrawer()}}
                        />
                        <Text style={{ marginTop:'6%', color:'#fff', marginLeft:"60%"}}>{this.state.username} | {this.state.accountnumber}</Text>

                    </View>

                </View>

                <View style={styles.menuBarTab}>
                    <AntDesign name={'home'} size={30} style={{ marginLeft:'5%', marginTop:'4%'}}/>
                    <Text style={{marginTop:'7%', marginLeft:'1%', fontWeight: 'bold'}}>My Bank</Text>
                    <MaterialCommunityIcons name={'bank-transfer'} size={45} style={{ marginLeft:'8%', marginTop:'3%', color: "#cccccc"}}
                                            onPress={() => {this.props.navigation.navigate('PinScreen')}}/>
                    <Text style={{marginTop:'7%', marginLeft:'1%', color: "#cccccc", fontWeight: 'bold'}}
                          onPress={() => {this.props.navigation.navigate('PinScreen')}}
                    >Transaction</Text>
                    <FontAwesome name={'history'} size={30} style={{ marginLeft:'7%', marginTop:'5%', color: "#cccccc"}}
                                 onPress={() => {this.props.navigation.navigate('HistoryScreen')}}
                    />
                    <Text style={{marginTop:'7%', marginLeft:'2%', color: "#cccccc", fontWeight: 'bold'}}
                          onPress={() => {this.props.navigation.navigate('HistoryScreen')}}
                    >History</Text>
                </View>

                <ScrollView>
                <View>
                    <Card>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name={'piechart'} size={30}/>
                            <Text style={{marginLeft:'3%', marginTop:'2%'}}>Your Balance</Text>
                            <View style={{marginTop:'10%'}}>
                                <Text style={{marginLeft:'3%', marginTop:'2%', fontWeight:'bold', fontSize:25}}>Rp.{this.state.balance}</Text>
                            </View>
                            <FontAwesome name={'refresh'} size={20} style={{marginLeft:'10%'}} onPress={this.getAccNum}/>

                        </View>

                    </Card>
                </View>

                <View style={styles.sliderImage}>
                    <Image style={{width:'94%', height:'100%'}} source={require('../../../assets/banner-promo-abank.png')}/>

                </View>

                <View style={{alignItems:'center', justifyContent:'center', marginTop:'0.1%', elevation:10}}><Text style={{fontWeight:'bold'}}>History</Text></View>

                <ScrollView>
                    <HistoryDashBoardContainer/>
                </ScrollView>
            </ScrollView>
            </View>
        )
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
    balance:{
        alignItems: 'flex-end'
    },
    sliderImage:{
        width:'100%',
        height:'30%',
        backgroundColor:'#f7f7f7',
        marginTop:'3%',
        alignItems:'center',
        justifyContent:'center',
        elevation:20
    },
    orderFitur:{
        width:'100%',
        height:'15%',
        backgroundColor:'#ededed',
        flexDirection:'row'
    }


});
