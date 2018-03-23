import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Keyboard, ActivityIndicator, ToastAndroid} from 'react-native';
import { Button } from 'native-base';
import {StackNavigator} from 'react-navigation';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';

export default class Login extends Component{

  static navigationOptions={
     header:false
  }
  componentDidMount() {
    axios.defaults.baseURL = 'http://192.168.0.108/FMS';
    //axios.defaults.baseURL = 'http://fmsapi.logiconglobal.com';
    axios.defaults.headers.common['AUTH_TOKEN'] = 'sdfsdfgsdfgsdfdsfgsdfgsdfg';
    axios.defaults.headers.common['Content-Type'] = 'application/json';    
    axios.defaults.headers.post['Content-Type'] = 'application/json';  

  }

  constructor(props)
  {
    super(props);
    //const nav = this.props.navigation; 
    this.state ={
        user:{
          UserID:'',
          Password:''
        },
        isLoading: false,
    },
    this.LoginCredential = t.struct({
      UserID: t.Number,             
      Password: t.String,  
         
    });
  
    this.LoginCredentialOption={
      //auto: 'placeholders'
      fields:{
        UserID: {
              label: 'Mobile No',
              placeholder:'Enter Your Mobile No',
              maxLength:12 
              //error:'Please Enter Your Mobile Number'  
            },
            Password: {
              label: 'Password',
              placeholder:'Enter Your Password',
              secureTextEntry: true,
              //error:'Please Enter Your Password'  
            }
        }
    }
  };

  onChange = (user) => {
    this.setState({user:user});
  }

    render(){
      if (this.state.isLoading) {
        return (
            <View style={styles.activeindicator}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        );
      }

      return(
      <View style={styles.login_container}>                 
        <View style={{alignItems:'center'}}>
          <Image source = { require('../../android/app/src/main/assets/chicken.png') } style={{width:100,height:100}}/>
        </View>
        <Form
          ref='form'
          type={this.LoginCredential}
          options={this.LoginCredentialOption}
          value={this.state.user}
          onChange={this.onChange}
        />
        
        <Button primary block rounded onPress={this.LoginUser.bind(this)}>
            <Text style={styles.button_text}>Login</Text>
        </Button>

        <View style={styles.flexDirectionWrap}>
          <View style={styles.width_50}>
            <TouchableOpacity style={styles.paddingtop_10} onPress={this.NewUserRegistration}>
              <Text style={styles.touchableOpacity_text}>
                New User?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.width_50_flex_end}>
            <TouchableOpacity style={styles.paddingtop_10} onPress={this.ForgotPassword}>
              <Text style={styles.touchableOpacity_text}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View> 
        </View>
      );
    }

    LoginUser=()=>
    {

      Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
          this.setState({
            isLoading: true
          });
          var data = {
            UserID:value.UserID,
            Password:value.Password
          }
         services.Login(data)
          .then(function (response) { 
            this.setState({
              isLoading: false
            });
            axios.defaults.headers.common['MOBILE_NO'] = response.data.userid; 
            axios.defaults.headers.common['FarmID'] = response.data.FarmID; 
            debugger;
            if(response.data.message=="goto farm")
            {
              this.props.navigation.navigate('FarmProfile');
            }
            else if(response.data.message=="goto otp")
            {
              this.props.navigation.navigate(
                'Registration',
                { UserID: data.UserID }
              );
            }
            else if(response.data.message=="goto registration")
            {
              debugger;
              ToastAndroid.showWithGravity(
                'MobileNo not registered.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
              //alert('MobileNo not registered.');
            }
            else if(response.data.message=="invalid password")
            {
              ToastAndroid.showWithGravity(
              'invalid credentials.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER
              );
              //alert('invalid credentials.');
            }
            else
            {           
              this.props.navigation.navigate('Navigation');
            }            
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
          // if(value.MobileNo=='123' && value.Password=='a'){

          //   this.props.navigation.navigate('Navigation');
          // }
        }
    }

    NewUserRegistration=()=>{
      this.props.navigation.navigate('Registration', { UserID: 0 });
    }

    ForgotPassword=()=>{
        this.props.navigation.navigate('ForgotPassword');
    }
}

