import React from 'react';
import {View, AsyncStorage, Text, ScrollView} from 'react-native';
import getAllTransaction from '../service/historyService'
import HistoryDashBoardComponent from './HistoryDashBoarComponent';

export default class HistoryDashBoardContainer extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            idcust : '',
            accountt : {},
            transfer : []
            }
      }
     
      componentDidMount() {
        this.getCustNum();
      }

      getCustNum = async() => {
        let data = await AsyncStorage.getItem('idcustomer');
        this.setState({idcust : data});

        // console.log(this.state.idcust);
        this.makeRemoteRequest();
      }

      getHistory = async ()=>{
        let data = this.state.transfer;
        await getAllTransaction(data);
        // console.log(data);
      }
    
      makeRemoteRequest = () => {
        let data = this.state.idcust;

        const url = `http://192.168.1.19:3000/accountbycust/${data}.json`;
        fetch(url)
          .then(res => res.json())
          .then(resJson => {
              this.setState({accountt : resJson.values});
            //   console.log(this.state.accountt.accountnumber);
              this.setState({transfer: {...this.state.transfer, account : {...this.state.accountnumber, accountnumber :  resJson.values.accountnumber}}});
            // console.log(resJson);
            this.makeHistoryTransaction();
          })
          .catch(error => {
            // this.setState({ error, loading: false });
            console.log(error);
            
          });
      };

      makeHistoryTransaction = () => {
        let dataAccount = this.state.accountt.accountnumber;
        // console.log(dataAccount);
        
       const url = `http://192.168.1.19:3000/transaction/historyLatest/${dataAccount}.json`;
        fetch(url)
        .then((res) => res.json())
        .then(resJson => {
          this.setState({transfer : resJson.values});
          console.log(this.state.transfer);
        })
        .catch(error=>{
          console.log(error);
        })
      }
      render() {
        return (
          <View style={{height:350}}>
              <ScrollView>
              <HistoryDashBoardComponent data={this.state.transfer}></HistoryDashBoardComponent>
              </ScrollView>
          </View>
        );
      }
}
