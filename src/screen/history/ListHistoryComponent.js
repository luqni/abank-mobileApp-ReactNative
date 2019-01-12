import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

export default class ListHistoryComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <View style={{elevation: 10, borderRadius: 10, marginTop: 30}}>

                <FlatList
                    data={this.props.customer.balance}
                    renderItem={({item}) => <Text style={styles.nama}>
                        {item.nama}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        )
    }

}

const styles = StyleSheet.create({
    nama: {
        flexDirection: 'row',
        alignItems : 'center',
        padding: 30,
        margin:2,
        borderWidth: 3,
        borderRadius:8,
        borderColor: '#646FE4',
        backgroundColor: '#fff'
    }
});
