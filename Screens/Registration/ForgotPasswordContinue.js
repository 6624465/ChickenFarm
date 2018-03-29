import React, { Component } from 'react';
import {View, Text,StyleSheet,TouchableOpacity,ToastAndroid} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import services from './Services';
import styles from '../stylesheet';

export default class ForgotPasswordContinue extends Component{
    static navigationOptions={
        title : 'Forgot Password',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
    constructor(){
        super();
        this.state ={
          status:true,
          value:{

          }
        }
        
        this.forgotpasswordnew = t.struct({
            Otp:t.Number,
        });
        
         this.forgotpasswordNewOption={
            fields:{
                Otp:{
                    label: 'OTP',
                    placeholder:'Pleasse Enter OTP Number',
                    secureTextEntry: true,
                }
            }
        }
    }
    ForgotPasswordContinueOtp = () =>{
        var value = this.refs.form.getValue();
        if(value)
        {
            var data = {
                MobileNo:this.props.navigation.state.params.MobileNo ,
                OTP:this.state.value.Otp
            }
           
            services.IsOtpVerify(data.MobileNo,data.OTP)
            .then(function (response) {
                if(response.data=="Success")
                {                      
                    this.props.navigation.navigate(
                        'ForgotPasswordUpdate',
                        { MobileNo: data.MobileNo }
                    );
                }
                else
                {  
                    ToastAndroid.showWithGravity(
                        'Invalid Otp Number..Please Enter Valid Otp Number..',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                      );
                   // alert("Invalid Otp Number..Please Enter Valid Otp Number")
                }
                console.log(this.state.status);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }   
    }
    IsResendOTP = () =>{
        var data = {
            MobileNo:this.props.navigation.state.params.MobileNo
        }

        services.IsMobileNoExists(data.MobileNo)
        .then(function (response) {
            if(response.data)
            {
                services.ResendOTP(data.MobileNo)
                .then(function (response) {
                    
                        alert('OTP successfully send to registered mobile number.');
                        // this.props.navigation.navigate(
                        //     'ForgotPasswordContinue',
                        //     { MobileNo: data.MobileNo }
                        //   );
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            }
             console.log(this.state.status);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
           
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
                            type={this.forgotpasswordnew}
                            options={this.forgotpasswordNewOption}
                            value={this.state.value}
                            onChange={this.onChange}
                        />

                        <View>
                            <TouchableOpacity onPress={this.IsResendOTP}>
                                <Text style={styles.touchableOpacity_text}> Resend Otp </Text>
                            </TouchableOpacity>
                        </View>

                        <Button success block rounded onPress={this.ForgotPasswordContinueOtp}>
                            <Text style={styles.button_text}>{'Continue'}</Text>
                        </Button>
                    </View>                      
                </Content>
            </Container>
        );
    }
}