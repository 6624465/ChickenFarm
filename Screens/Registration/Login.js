import React, { Component } from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image,Keyboard} from 'react-native';
import { Button } from 'native-base';
import {StackNavigator} from 'react-navigation';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';


export default class Login extends Component{

  static navigationOptions={
     header:false
  }
  componentDidMount() {
    axios.defaults.baseURL = 'http://192.168.0.109/FMS/api';
    //axios.defaults.baseURL = 'http://fmsapi.logiconglobal.com/api';
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
        }
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
              error:'Please Enter Your Mobile Number'  
            },
            Password: {
              label: 'Password',
              placeholder:'Enter Your Password',
              password: true,
              secureTextEntry: true,
              error:'Please Enter Your Password'  
            }
        }
    }
  };

  onChange = (user) => {
    this.setState({user:user});
  }

    render(){
      //const { navigate } = this.props.navigation;
      return(
      <View style={styles.container}>                 
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
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>Login</Text>
        </Button>

        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <View style={{width:'50%'}}>
            <TouchableOpacity style={{paddingTop:'10%'}} onPress={this.NewUserRegistration}>
              <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                New User?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width:'50%', alignItems:'flex-end'}}>
            <TouchableOpacity style={{paddingTop:'10%'}} onPress={this.ForgotPassword}>
              <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
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
        debugger;
        if (value) {
          var data = {
            UserID:value.UserID,
            Password:value.Password
          }
          debugger;
          axios({
            method: 'post',
            url: '/Register/Login',
            data: data
          })
          .then(function (response) { 
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
              alert('MobileNo not registered.');
            }
            else if(response.data.message=="invalid password")
            {
              alert('invalid credentials.');
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


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    }
  });