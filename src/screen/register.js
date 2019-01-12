import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import TransactionComponent from "./TransactionComponent";
// import {getAccByCust} from "./ServiceTransaction";
import axios from 'axios';

export default class TransactionContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      custid : '',
      accountt: {},
      transfer: {
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
  }

  getCustNum = async () => {
    let id = await AsyncStorage.getItem('idcustomer');
    this.setState({custid : id});
    this.getAccNum();
  }

  postTrans = async () => {
    let data = this.state.transfer;
    const URL = `http://192.168.1.9:3000/transaction`;
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

    return fetch('http://192.168.1.9:3000/accountbycust/'+data+'.json')
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
          <TransactionComponent trans={this.transfer} post={this.postTrans} />
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
  }
});

