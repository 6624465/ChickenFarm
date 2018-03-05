import React, { Component } from 'react';
import {View, Text,StyleSheet, TouchableOpacity} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

import {StackNavigator} from 'react-navigation';
import Login from '../Registration/Login';

var t = require('tcomb-form-native');
var Form = t.form.Form;


var Otp=t.struct({
    Otp:t.Number
})
var OtpOptions={
    fields:{
        Otp:{
            label: 'OTP',
            placeholder:'Pleasse Enter OTP Number',
            help: 'Resend OTP'
        }
    }
}



var registration = t.struct({
    FullName: t.String,             
    MobileNo: t.Number,  
    EmailId:t.maybe(t.String),
    Password: t.String,
    ReEnterPassword: t.String,       
  });

  var registrationOption={
    //auto: 'placeholders'
    fields:{
        FullName: {
            label: 'Full Name',
            placeholder:'Enter Your Full Name',
            error:'Please Enter Your Name'

          },
        MobileNo: {
            label: 'Mobile No',
            placeholder:'Enter Your Mobile No',
            error:'Please Enter Your Mobile Number'

          },
          EmailId: {
            label: 'Email ID',
            placeholder:'Enter Your Email ID'
          },
          Password: {
            label: 'Password',
            placeholder:'Enter Your Password',
            password: true,
            secureTextEntry: true,
            error:'Please Enter Your Password'

          } ,
          ReEnterPassword: {
            label: 'Re-Password',
            placeholder:'Re-Enter Your Password',
            password: true,
            secureTextEntry: true,
            error:'Please Enter Your Password'

          }
      }
  }

var status= false;
export default class Registration extends Component{

    constructor(){
        super();
        this.state ={
          status:true
        }
      }

      ShowHideTextComponentView = () =>{
        var value = this.refs.form.getValue();
        if (value) {
            if(this.state.status == true)
            {
            this.setState({status: false})
            }
            else
            {
            this.setState({status: true})
            }
        }
      }

    static navigationOptions={
        title : 'Registration',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        Header:true
    }

    render(){
            return(    
                 
            <Container>
                 <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Registration</Title>
                        </Body>
                    </Header>
                    <Content>
                    <View style={styles.container}>
                        <Form
                        ref='form'
                        type={this.state.status? registration:Otp}
                        options={this.state.status? registrationOption:OtpOptions}
                        />

                        <Button success block rounded onPress={this.ShowHideTextComponentView}>
                            <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>{this.state.status?'Sign Up':'Submit'}</Text>
                        </Button>
                    </View>
                    </Content>
                </Container>
                
            );

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
