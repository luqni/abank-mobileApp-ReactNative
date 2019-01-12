import React from 'react';
import {View, StyleSheet,Text,FlatList, ScrollView} from 'react-native';
import {List,ListItem} from 'react-native-elements';

export default class HistoryDashBoardComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView style={styles.container}>



                <FlatList
                  data={this.props.data}
                  renderItem={({ item }) => (
                    <ListItem
                      roundAvatar
                      title={`${item.sendername}   ${item.amountsign}`}
                      subtitle={`${item.type} ${item.amount}  ${item.date}`}
                    />
                  )}
                  keyExtractor={item => item.idtransaction.toString()}
                />


            </ScrollView>
        )
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
  },
  topBar:{
    backgroundColor : 'blue',
    height : '15%'
  }
});
