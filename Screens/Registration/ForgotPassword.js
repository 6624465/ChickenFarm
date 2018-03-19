import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';


import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';

export default class ForgotPassword extends Component{
    static navigationOptions={
        title : 'Forgot Password',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
    constructor(){
        super();
        this.state ={
          status:true,
          UserDetails:{
            MobileNo:null
          }
        },
        this.forgotpassword=t.struct({
            MobileNo:t.Number
        })
        
       this.forgotpasswordOption={
            fields:{
                MobileNo:{
                    label: 'Mobile No',
                    placeholder:'Pleasse Enter Mobile Number',
                }
            }
        }
        const ConfirmPasswordEquality = t.refinement(t.String, value => {
            return value === this.state.value.Password
          })
       this.forgotpasswordnew = t.struct({
            Otp:t.Number,
            Password: t.String,
            ConfirmPassword: ConfirmPasswordEquality,
               
          });
        
         this.forgotpasswordNewOption={
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
                    error:'Password Mismatch'
        
                  }
            }
        }

      }

      ForgotPasswordDetails = () =>{

        var value = this.refs.form.getValue();
        if(value)
        {
        var data = {
            MobileNo:this.state.reg.MobileNo
        }
        axios.get('/Register/IsMobileNoExists/'+this.state.reg.MobileNo)
        .then(function (response) {
            if(response.data.isMobileExist)
            {
                this.setState({status: false})
                axios.get('/Register/ResendOTP/'+this.state.reg.MobileNo)
                .then(function (response) { 
                    debugger;  
                        alert('OTP successfully resend to registered mobile number.');
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            }
            else{
                alert('Mobile Number Is Not Exists....')
            }
             console.log(this.state.status);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }
   
    }
    UpdateForgotPasswordDetails = () =>{

        var value = this.refs.form.getValue();
        if(value)
        {
        var data = {
            MobileNo:this.state.reg.MobileNo
        }
        axios.get('/Register/IsMobileNoExists/'+this.state.reg.MobileNo)
        .then(function (response) {
            if(response.data.isMobileExist)
            {
                this.setState({status: true})
            }
             console.log(this.state.status);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }
    
    }
    onChange = (value) => {
        this.setState({value});
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
                   <Content style={styles.container}>
                       <View>
                           <Form
                           ref='form'
                           type={this.state.status?this.forgotpassword:this.forgotpasswordnew}
                           options={this.state.status?this.forgotpasswordOption:this.forgotpasswordNewOption}
                           value={this.state.value}
                           onChange={this.onChange}
                           />
                           <Button success block rounded onPress={this.state.status ? this.ForgotPasswordDetails.bind(this):this.UpdateForgotPasswordDetails.bind(this)}>
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
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    }
  
  });
