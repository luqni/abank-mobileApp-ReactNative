import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet } from 'react-native';
import {Card} from "react-native-elements";

export default class TopComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <View style={styles.tayo}>
                    <Text style={{margin: 2}}>
                        Riska Rahmatul Janah
                    </Text>
                    <Text>
                        (08313427)
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    tayo:{

        width: 200,
        height: 70,
        marginLeft:10,
        borderWidth: 3,
        borderColor: '#d0b4ff',
        marginTop: 6,

        backgroundColor: '#d0b4ff',
        alignItems: 'flex-end',
    }
});
