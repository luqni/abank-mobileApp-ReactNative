import React, {Component} from 'react';
import {View, FlatList,ScrollView, StyleSheet,Text} from 'react-native';
import { ListItem, List } from 'react-native-elements';

export default class ShowHistoryComponent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.topBar}>

            </View>
            <View>
              <ScrollView>
                <FlatList
                  data={this.props.data}
                  renderItem={({ item }) => (
                    <ListItem
                      title={`${item.sendername}   ${item.amountsign}`}
                      subtitle={`${item.type} ${item.amount}  ${item.date}`}
                    />
                  )}
                  keyExtractor={item => item.idtransaction.toString()}
                />
              </ScrollView>
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      marginTop: '6%',
      backgroundColor: '#F5FCFF',
    },
    item: {
      marginTop: '10%',
      fontFamily: 'Helvetica',
      fontSize: 36,
      fontWeight: 'bold',
      backgroundColor: 'grey'
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: '30%',
      borderRadius: 2,
      backgroundColor: '#fff'
    }
  });
