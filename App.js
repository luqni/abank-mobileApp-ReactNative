import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/AppNavigator';
import RegisterSection from "./src/screen/register/registerSection";
import LoginContainer from "./src/screen/login/loginContainer";
import ShowHistoryContainer from './src/screen/showallhistory/ShowHistoryContainer';
import TransactionContainer from "./src/screen/transaction/TransactionContainer";
import DashboardContainer from './src/screen/dashboard/DashboardContainer';


export default class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={styles.container}>

        {/*<LoginContainer/>*/}
         {/*<DashboardContainer/>*/}
       {/*<RegisterSection/>*/}
        {/*<AppNavigator/>*/}
        {/*<TransactionContainer/>*/}
        <AppNavigator/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
});
