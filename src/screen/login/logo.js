import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class LogoComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View>
                <Image style={styles.imageStyle} source={require('../../assets/putih.png')} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageStyle:{
        marginLeft:90,
        borderRadius:100,
        marginBottom:10,
        width:100,
        height:100,
        backgroundColor:'#fff',
        shadowColor: '#0000',
    },
});
