import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, Image } from 'react-native';
import {Card} from "react-native-elements";


export default class DashboardComponent extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.card}>
                <Card>
                    <Image style={styles.gambar} source={require('./wallet1.png')} />
                    <Text style={styles.balance}>Balance: Rp 10.000,00</Text>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gambar: {
        width: 100,
        height: 100
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
    }
});
import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet, Image } from 'react-native';


export default class DashboardComponent extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <View style={styles.card}>
                <View>
                    <Image style={styles.gambar} source={require('./wallet1.png')} />
                    <Text style={styles.balance}>Balance: Rp 10.000,00</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gambar: {
        width: 100,
        height: 100
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
    }
});
