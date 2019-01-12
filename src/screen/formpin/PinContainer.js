import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import PinView from 'react-native-pin-view';

export default class PinContainer extends Component{
    constructor(props) {
        super(props);
        this.onComplete = this.onComplete.bind(this);
        this.state = {
            custid: '',
            account: []
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

    getAccNum=()=>{
        let data = this.state.custid;

        return fetch('http://192.168.1.19:3000/accountbycust/'+data+'.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({account : responseJson.values});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onComplete(inputtedPin, clear) {
        if(inputtedPin !== this.state.account.pin){
            clear();
            alert('Your pin is incorrect');
        }else{
            clear();
            this.props.navigation.navigate('TransactionScreen');
        }
    }


    render() {
        return(
            <View style={{
                flex           : 1,
                backgroundColor: '#f1f1f1',
                justifyContent : 'center'
            }}>
                <PinView
                    onComplete={this.onComplete}
                    pinLength={6}
                    // pinLength={6} // You can also use like that.
                />
            </View>
        )
    }
}
