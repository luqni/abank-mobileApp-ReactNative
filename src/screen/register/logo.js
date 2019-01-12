import React, {Component} from 'react'
import {View, Image, StyleSheet} from 'react-native'


export default class LogoComponent extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
            <View>
                <Image style={styles.imageStyle} source={require('../../../assets/logo.png')} />
            </View>
        )
    }
}
const styles = StyleSheet.create({

    imageStyle:{

        marginTop:-28,
        width:75,
        height:80,
        shadowColor: '#000'







    }
})

