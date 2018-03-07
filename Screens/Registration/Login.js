import React, { Component } from 'react';
import {View, Text,StyleSheet,TouchableOpacity,Image,Keyboard} from 'react-native';
import { Button } from 'native-base';
import {StackNavigator} from 'react-navigation';

var t = require('tcomb-form-native');
var Form = t.form.Form;



export default class Login extends Component{

  static navigationOptions={
     header:false
  }

  constructor()
  {
    super();
    this.state ={
        value:{
          MobileNo:'123',
          Password:'a'
        }
    },
    this.LoginCredential = t.struct({
      MobileNo: t.Number,             
      Password: t.String,  
         
    });
  
    this.LoginCredentialOption={
      //auto: 'placeholders'
      fields:{
          MobileNo: {
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

  onChange = (value) => {
    this.setState({value});
  }

    render(){
      return(
      <View style={styles.container}>                 
        <View style={{alignItems:'center'}}>
          <Image source = { require('../../android/app/src/main/assets/chicken.png') } style={{width:100,height:100}}/>
        </View>
        <Form
          ref='form'
          type={this.LoginCredential}
          options={this.LoginCredentialOption}
          value={this.state.value}
          onChange={this.onChange}
        />

        <Button primary block rounded onPress={this.LoginUser}>
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
        if (value) {
          if(value.MobileNo=='123' && value.Password=='a'){
            this.props.navigation.navigate('Navigation');
          }
        }
    }

    NewUserRegistration=()=>{
      this.props.navigation.navigate('Registration');
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
    },
    title: {
      fontSize: 30,
      alignSelf: 'center',
      marginBottom: 30
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });