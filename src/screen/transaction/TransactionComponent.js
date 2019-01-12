import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Picker} from 'react-native';
import FAwe from 'react-native-vector-icons/FontAwesome';

export default class TransactionComponent extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return(
            <View style={styles.TransactionCard}>
                <Text style={styles.title}>Transaction</Text>
                <View style={{flexDirection: 'row', alignSelf:'center'}}>
                    <FAwe name={'credit-card'} size={25} style={{ marginTop:39, color: "#646FE4", marginRight: 8}}/>
                    <TextInput style={styles.formTransaction}
                           placeholder="Reciever"
                onChangeText={(text) => {this.props.trans(text,'receiver')}}>
                </TextInput>
                </View>
                <View style={{flexDirection: 'row', alignSelf:'center'}}>
                    <FAwe name={'usd'} size={28} style={{ marginTop:31, color: "#646FE4", marginRight: 8}}/>
                    <TextInput style={styles.formTransaction}
                               placeholder="Amount"
                               onChangeText={(text) => {this.props.trans(text,'amount')}}>
                    </TextInput>
                </View>

                <View style={{flexDirection: 'row', alignSelf:'center'}}>
                    <FAwe name={'send'} size={25} style={{ marginTop:39, color: "#646FE4", marginRight: 8}}/>
                    <TextInput style={styles.formTransaction}
                               placeholder="Type"
                               value={'Transfer'}
                               editable = {false}
                               onChangeText={(text) => {this.props.trans(text,'type')}}>
                    </TextInput>
                </View>

                <TouchableOpacity style={styles.btnSend}
                                  onPress={() => {this.props.post()}}>
                        <Text style={{alignSelf: 'center', marginTop: 4, color: '#fff'}}>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TransactionCard: {
        backgroundColor: "#F7F8FD",
        width: '90%',
        height: '85%',
        alignSelf: 'center',
        marginTop: '10%',
        elevation: 10,
        borderRadius: 10
    },
    formTransaction:{
        width: 200,
        borderBottomWidth: 1,
        alignSelf: 'center',
        marginTop: 30,
        borderColor: '#646FE4',
    },
    title:{
        marginTop: 40,
        color: '#646FE4',
        fontSize: 20,
        alignSelf: 'center'
    },
    btnSend:{
        marginTop:40,
        marginHorizontal: 100,
        borderRadius: 10,
        height: 30,
        backgroundColor: "#646FE4",

    }
});

