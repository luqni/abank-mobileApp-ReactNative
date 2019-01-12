import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    Image,
    AsyncStorage
} from 'react-native';

import IconAntDesign from "react-native-vector-icons/AntDesign";


export default class InputanLoginComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:' ',
            password:''

        }
    }

    componentDidMount() {
        this.loadInitialState().done();
    }

    loadInitialState = async () => {
        var value= await AsyncStorage.getItem('user');
        if (value !== null){

            alert("Tes");
        }
    }

    Login =  () =>{
        alert(this.state.username)
        fetch('http://192.168.1.9:3000/login',{
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
                AsyncStorage.setItem('user',res.user);
                // this.props.navigation.navigate('dash');
                alert("Wellcome "+this.state.username);
            }else{
                alert("gagal");
            }

        })
            .done();
    }

    render(){

        return(

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
                           onChangeText={(password)=> this.setState({password})}
                />
                </View>
                <View>
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress={this.Login}>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    cardLogin:{
        backgroundColor:"#F7F8FD",
        width:"80%" ,
        height: "70%",
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
        borderRadius:10,
        elevation: 6,
        shadowColor: '#000000',

    },
    submitButtonText:{
        color: 'white',
        textAlign: 'center',
        width:80


    },
    imageStyle:{


        width:30,
        height:40,
        marginTop:20,
        shadowColor: '#0000',




    },
})

