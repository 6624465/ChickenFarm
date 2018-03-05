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
        // this.state ={
        //   status:false
        // }
      }

      toggleStatus(){
        status = true;
        // this.setState({
        //   status:true
        // });
        debugger;
       this._renderCancel();
        
      }

    static navigationOptions={
        title : 'Registration',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        Header:true
    }
    _renderCancel() {
        debugger;
        if (!status) {
            return (
                <View style={styles.container}>
                <Form
                ref='form'
                type={registration}
                options={registrationOption}
                />
                <Button success block rounded onPress={this.toggleStatus}>
                    <Text>SignUp</Text>
                </Button>
            </View>
            );
        } 
        else {
            return (
            <View  style={styles.container}>
                <Form
                    ref='form'
                    type={Otp}
                    options={OtpOptions}
                />
                    <Button success block rounded onPress={this.toggleStatus}>
                    <Text>Submit</Text>
                    </Button>
            </View>
            )
        }
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
                    {this._renderCancel()}
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
