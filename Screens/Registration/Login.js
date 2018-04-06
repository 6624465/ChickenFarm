import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Keyboard, ActivityIndicator, ToastAndroid, AsyncStorage} from 'react-native';
import { Button } from 'native-base';
import {StackNavigator} from 'react-navigation';
//import Toast, {DURATION} from 'react-native-easy-toast'
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';

import Navigation from '../Navigations/Navigation';
import { strings } from '../Localization';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class Login extends Component{

  static navigationOptions={
     header:false
  }

  async componentDidMount() {
    axios.defaults.baseURL = 'http://192.168.56.1/FMS';
    //axios.defaults.baseURL = 'http://fmsapi.logiconglobal.com';
    axios.defaults.headers.common['AUTH_TOKEN'] = 'sdfsdfgsdfgsdfdsfgsdfgsdfg';
    axios.defaults.headers.common['Content-Type'] = 'application/json';    
    axios.defaults.headers.post['Content-Type'] = 'application/json';  

    await AsyncStorage.getItem('uid').then((value)=> 
      this.setState({}, function() {
        debugger;
        this.usrid = value ;
      })
    );
    await AsyncStorage.getItem('pwd').then((value)=> 
      this.setState({}, function() {
        debugger;
        this.pass = value;
      })
    );
    debugger;
if(this.usrid==null || this.pass==null)
{ 
//alert(this.usrid+"  <<>>  "+this.pass)
  //this.props.navigation.navigate('NavLinksLogin');
}
else{
  debugger
  var data = {
    UserID:this.usrid,
    Password:this.pass
  }
   services.Login(data)
    .then(function (response) { 
      this.setState({
        isLoading: false
      });
      axios.defaults.headers.common['MOBILE_NO'] = response.data.userid; 
      axios.defaults.headers.common['FarmID'] = response.data.FarmID; 
      if(response.data.message=="goto menu")
      {      
        //AsyncStorage.setItem('uid', data.UserID.toString());
        //AsyncStorage.setItem('pwd', data.Password);   
        this.props.navigation.navigate('MainDashboard');
      }  
      else{
        this.props.navigation.navigate('Home');
      }          
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
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
    this.usrid='',
    this.pass='',
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
        {/* <Toast
          ref="toast"
          style={{backgroundColor:'red'}}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'white'}}
        /> */}
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
            
            AsyncStorage.setItem('uid', data.UserID.toString());
            AsyncStorage.setItem('pwd', data.Password);   
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
              //this.refs.toast.show('MobileNo not registered.',DURATION.LENGTH_LONG);
              ToastAndroid.showWithGravity(
                'MobileNo not registered.',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              //alert('MobileNo not registered.');
            }
            else if(response.data.message=="invalid password")
            {
              ToastAndroid.showWithGravity(
              'invalid credentials.',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
              );
              //alert('invalid credentials.');
            }
            else
            {        
              this.props.navigation.navigate('MainDashboard');
            }            
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
          // if(value.MobileNo=='123' && value.Password=='a'){

          //   this.props.navigation.navigate('Navigation');
          // }
        }
        else{
          ToastAndroid.showWithGravity(
            'Please fill mandatory fields.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
            );
          //this.refs.toast.show('Please fill mandatory fields.',DURATION.LENGTH_LONG);
        }
    }

    NewUserRegistration=()=>{
      this.props.navigation.navigate('Registration', { UserID: 0 });
    }

    ForgotPassword=()=>{
        this.props.navigation.navigate('ForgotPassword');
    }
}

