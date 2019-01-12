import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default class LoginContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            customer:[{
                idcustomer:'',
                username:' ',
                password:''
            }]
        }
    }
    componentDidMount() {
        this.loadInitialState();
    }

    loadInitialState = async () => {
        var value= await AsyncStorage.getItem('customer');
        if (value !== null){

            alert("Tes");
        }
    }

    Login =  () =>{

        let customer={}
        customer.idcustomer=this.state.idcustomer;
        customer.username=this.state.username;
        customer.password=this.state.password
        fetch('http://192.168.1.19:7000/api/login',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
            })
        }).then((response)=>response.json()).then((res)=>{
            if (res.message === "success"){

                AsyncStorage.setItem('idcustomer', res.values[0].idcustomer+'');
                AsyncStorage.setItem('username', res.values[0].username+'');

                alert("Wellcome "+this.state.username);
                this.props.navigation.navigate('dashboardDrawer');

            }else{
                alert("gagal");
            }
        })

    }

    goToScreenRegister = () =>{
        this.props.navigation.navigate('RegisterSection');
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={require('../../../assets/putih.png')} />
                <KeyboardAvoidingView style={styles.cardLogin} behavior="padding">
                    {/*<Image style={styles.imageStyle} source={require('../../assets/logo.png')} />*/}
                    <View style={{flexDirection: 'row'}}>


                        <IconAntDesign name={'user'} size={25} style={{ marginTop:66, color: "#646FE4"}}/>

                        <TextInput style = {styles.input}

                                   placeholder = "Username"
                                   placeholderTextColor = "#d8d8d8"
                                   autoCapitalize = "none"
                                   onChangeText={(username)=> this.setState({username})}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <IconAntDesign name={'lock'} size={28} style={{ marginTop:35, color: "#646FE4"}}/>
                        <TextInput style = {styles.input2}
                                   placeholder = "Password"
                                   placeholderTextColor = "#d8d8d8"
                                   autoCapitalize = "none"
                                   secureTextEntry={true}
                                   onChangeText={(password)=> this.setState({password})}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress={this.Login}>
                            <Text style = {styles.submitButtonText}> Sign In </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {styles.submitButton2}
                            onPress={this.goToScreenRegister}>
                            <Text style = {styles.submitButtonText}> Sign Up </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    cardLogin:{
        backgroundColor:"#F7F8FD",
        width:"80%" ,
        height: "65%",
        marginVertical: "10%",
        borderRadius:10,
        elevation: 10,
        alignItems: "center",
        shadowColor: '#646FE4'

    },
    input: {

        marginTop:52,
        height: 40,
        borderColor: '#646FE4',
        borderBottomWidth:1,
        width:200,
        padding: 9,



    },
    input2: {

        marginTop:20,
        height: 40,
        borderColor: '#646FE4',
        borderBottomWidth:1,
        width:200,
        padding: 9,

    },
    submitButton: {
        backgroundColor: '#646FE4',
        padding: 10,
        marginTop: 30,
        height: 40,
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        elevation: 6,
        shadowColor: '#000000',
        fontWeight: 'bold',
        fontSize:15

    },
    submitButton2: {
        backgroundColor: '#172B4D',
        padding: 10,
        marginTop: 30,
        height: 40,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        elevation: 6,
        shadowColor: '#000000',
        fontWeight: 'bold',
        fontSize:15

    },
    submitButtonText:{
        color: 'white',
        textAlign: 'center',
        width:80,
        fontWeight: 'bold',
        fontSize:15


    },

    container: {

        width:'100%',
        height:'75%',
        backgroundColor:'#646FE4',
        marginBottom:15,
        alignItems: "center",


    },
    headerComponent:{
        alignItems: 'center'
    },
    imageStyle:{

        marginTop:'30%',
        width:60,
        height:60,

    },

})
