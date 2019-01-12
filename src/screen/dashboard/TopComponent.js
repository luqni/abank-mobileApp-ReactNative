import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert, StyleSheet } from 'react-native';

export default class TopComponent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>

                <View style={styles.tayo}>
                    <Text style={{margin: '10%'}}>
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

        width: '100%',
        height: 70,

        borderWidth: 3,
        borderColor: '#d0b4ff',
        marginTop: 6,

        backgroundColor: '#d0b4ff',
        alignItems: 'flex-end',
    }
});
