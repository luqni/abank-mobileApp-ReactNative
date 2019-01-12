import React, {Component} from 'react'
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import {postCustomer} from '../register/serviceRegister'
import IconAntDesign from "../login/loginContainer";
import LogoComponent from "./logo";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from "axios";



export default class RegisterSection extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{
                firstname:'',
                lastname:'',
                gender:'',
                phonenumber:'',
                address:'',
                nationality:'',
                username:'',
                password:'',
                email:''
            }
        }

    }


    handleFirst(value, key){
        if(key){
            if(key === 'firstname'){
                this.setState({user: {...this.state.user, firstname:value}});
            }else if (key === 'lastname'){
                this.setState({user:{...this.state.user, lastname:value}})
            }else if (key === 'gender'){
                this.setState({user:{...this.state.user,gender:value}});
            }else if (key === 'phonenumber'){
                this.setState({user:{...this.state.user, phonenumber:value}});
            }else if (key === 'address'){
                this.setState({user:{...this.state.user, address:value}});
            }else if (key === 'nationality'){
                this.setState({user:{...this.state.user,nationality:value}});
            }else if (key === 'username'){
                this.setState({user:{...this.state.user, username:value}});
            }else if (key === 'password'){
                this.setState({user:{...this.state.user, password:value}});
            }else{
                this.setState({user:{...this.state.user, email:value}})
            }
        }
    }

    // postCustomer = async () => {
    //     const data = this.state.user;
    //     await postCustomer(data)
    //     console.log(data);
    // }
    // goToScreenLogin = () =>{
    //     this.props.navigation.navigate('LoginScreen');
    // }

    postCustomer = async () => {
        const data = this.state.user;
        const URL = `http://192.168.1.19:7000/api/register`;
        return axios({
            method: 'POST',
            url: URL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        })
            .then(res => {
                console.log('Status', res.data.status);
                console.log('Message', res.data.message);

                if(res.data.status == 404){
                    alert('All Field is Required. Please check your Field');
                }else if(res.data.status == 500){
                    alert('Your data is insufficient');
                }else{
                    this.props.navigation.navigate('LoginScreen');
                    alert(' successed');
                }
            })
            .catch(error => {
                console.log('Error', error.response.data);
            })

    }

    render(){
        var radio_props = [
            {label: 'Male', value: "M" },
            {label: 'Female', value: "F" },
        ];

        return(

            <ScrollView>
            <KeyboardAvoidingView style={styles.container}>

                < View style={styles.cardLogin} behavior="position">
                    <LogoComponent/>
                    <Text style={{fontSize:20, marginTop:15}}>Sign Up</Text>
                    <View style={{flexDirection: 'row'}}>


                        <TextInput
                            value = {this.state.user.firstname}
                            style ={styles.input2}
                            placeholder="First Name"
                            placeholderTextColor = "#d8d8d8"
                            onChangeText = {(text)=>(this.handleFirst(text,'firstname'))}
                        />

                        <TextInput
                            value = {this.state.user.lastname}
                            style ={styles.input3}
                            placeholder="Last Name"
                            placeholderTextColor = "#d8d8d8"
                            onChangeText = {(text)=>(this.handleFirst(text,'lastname'))}
                        />
                    </View>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#646FE4'}
                            animation={true}
                            style ={styles.inputRadio}
                            buttonSize={15}

                            onPress={(text) => {this.handleFirst(text,'gender')}}
                        />
                        <TextInput
                            value = {this.state.user.phonenumber}
                            style ={styles.input}
                            placeholder ='phonenumber'
                            keyboardType='numeric'
                            onChangeText = {(text)=>(this.handleFirst(text,'phonenumber'))}
                        />
                        <TextInput
                            value = {this.state.user.address}
                            style ={styles.input}
                            placeholder ='address'
                            onChangeText = {(text)=>(this.handleFirst(text,'address'))}
                        />
                        <TextInput
                            value = {this.state.user.nationality}
                            style ={styles.input}
                            placeholder ='nationality'
                            onChangeText = {(text)=>(this.handleFirst(text,'nationality'))}
                        />
                        <TextInput
                            value = {this.state.user.email}
                            style ={styles.input}
                            placeholder ='email'
                            onChangeText = {(text)=>(this.handleFirst(text,'email'))}
                        />
                        <TextInput
                            value = {this.state.user.password}
                            style ={styles.input}
                            placeholder ='password'
                            onChangeText = {(text)=>(this.handleFirst(text,'password'))}
                        />

                        <TextInput
                            value = {this.state.user.username}
                            style ={styles.input}
                            placeholder ='username'
                            onChangeText = {(text)=>(this.handleFirst(text,'username'))}
                        />

                    <View>
                        <TouchableOpacity
                            style = {styles.submitButton}
                            onPress={()=> this.postCustomer()}>
                            <Text style = {styles.submitButtonText}> Sign Up </Text>
                        </TouchableOpacity>
                        {/*<Text style={{marginTop:4, marginLeft: 40}}>OR</Text>*/}
                        {/*<TouchableOpacity*/}
                            {/*style = {styles.submitButton2}*/}
                            {/*onPress={()=> this.goToScreenLogin()}>*/}
                            {/*<Text style = {styles.submitButtonText}> Sign In </Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>



                </View>


            </KeyboardAvoidingView>
            </ScrollView>

        )
    }

}
const styles = StyleSheet.create({
    cardLogin:{
        marginTop:100,
        backgroundColor:"#F7F8FD",
        width:"93%" ,
        height: 700,
        marginVertical: "10%",
        borderRadius:10,
        elevation: 10,
        alignItems: "center",
        shadowColor: '#646FE4'

    },
    input: {

        marginTop:15,
        height: 40,
        borderColor: '#646FE4',
        borderBottomWidth:1,
        width:300,
        padding: 9,
        elevation:0.3



    },
    inputRadio: {

        marginTop:15,
        height: 40,
        borderColor: '#646FE4',
        borderBottomWidth:1,
        width:300,
        padding: 9,
        elevation:0.3,
        justifyContent: 'space-between'



    },
    input2: {

        marginTop:30,
        height: 40,
        borderColor: '#646FE4',
        borderBottomWidth:1,
        width:150,
        padding: 9,
        borderRightWidth: 1,
        elevation:0.5

    },
    input3: {

        marginTop:30,
        height: 40,
        borderColor: '#646FE4',
        borderBottomWidth:1,
        width:150,
        padding: 9,
        elevation:0.5

    },
    submitButton: {
        backgroundColor: '#646FE4',
        padding: 10,
        marginTop: 40,
        height: 40,
        borderRadius:5,
        elevation: 6,
        shadowColor: '#000000',


    },
    submitButton2: {
        backgroundColor: '#172B4D',
        padding: 10,
        marginTop: 10,
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

    container: {

        width:'100%',
        height:'100%',
        backgroundColor:'#646FE4',
        marginBottom:15,
        alignItems: "center",
        elevation:20


    },
    headerComponent:{
        alignItems: 'center'
    },
    imageStyle:{

        marginTop:100,
        width:60,
        height:60,






    }
})
