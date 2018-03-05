import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';


import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var forgotpassword=t.struct({
    MobileNo:t.Number
})

var forgotpasswordOption={
    fields:{
        MobileNo:{
            label: 'Mobile No',
            placeholder:'Pleasse Enter Mobile Number',
            error:'Please Enter Your Mobile Number'
            
        }
    }
}

var forgotpasswordnew = t.struct({
    Otp:t.Number,
    Password: t.String,
    ConfirmPassword: t.String,
       
  });

  var forgotpasswordNewOption={
    fields:{
        Otp:{
            label: 'OTP',
            placeholder:'Pleasse Enter OTP Number',
            error:'Please Enter OTP Number'
        },
        Password: {
            label: 'New Password',
            placeholder:'Enter New Password',
            password: true,
            secureTextEntry: true,
            error:'Please Enter New Password'

          } ,
          ConfirmPassword: {
            label: 'Confirm Password',
            placeholder:'Confirm New Password',
            password: true,
            secureTextEntry: true,
            error:'Please Enter Confirm New Password'

          }
    }
}
export default class ForgotPassword extends Component{
    static navigationOptions={
        title : 'Forgot Password',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
    constructor(){
        super();
        this.state ={
          status:true
        }
      }

      ShowHideTextComponentView = () =>{

        var value = this.refs.form.getValue();
        if(value)
        {
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
                           <Title>Forgot Password</Title>
                       </Body>
                   </Header>
                   <Content>
                       <View style={styles.container}>
                           <Form
                           ref='form'
                           type={this.state.status?forgotpassword:forgotpasswordnew}
                           options={this.state.status?forgotpasswordOption:forgotpasswordNewOption}
                           />
                           <Button success block rounded onPress={this.ShowHideTextComponentView}>
                            <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>{this.state.status?'Continue':'Submit'}</Text>
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
    }
  
  });
