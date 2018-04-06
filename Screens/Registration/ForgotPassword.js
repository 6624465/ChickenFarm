import React, { Component } from 'react';
import {View, Text,StyleSheet,ToastAndroid} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Right } from 'native-base';

import services from './Services';
import styles from '../stylesheet';
import {strings} from '../Localization';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class ForgotPassword extends Component{
    static navigationOptions={
        title :strings.Forgot_Password,
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
    constructor(){
        super();
        this.state ={
          value:{
            MobileNo:null
          }
        },
        this.forgotpassword=t.struct({
            MobileNo:t.Number
        })
        
       this.forgotpasswordOption={
            fields:{
                MobileNo:{
                    label: strings.Mobile_Number,
                    placeholder:strings.Mobile_Number,
                    maxLength:10
                   
                }
            }
        }
    
        }


        ForgotPasswordContinue = () =>{

        var value = this.refs.form.getValue();
        if(value)
        {
        var data = {
            MobileNo:value.MobileNo
        }
        services.IsMobileNoExists(data.MobileNo)
        .then(function (response) {
            if(response.data)
            {
                services.ResendOTP(data.MobileNo)
                .then(function (response) {
                    
                        //alert('OTP successfully send to registered mobile number.');
                        // axios.defaults.headers.common['MOBILE_NO'] = data.MobileNo; 
                        // this.props.navigation.navigate('ForgotPasswordContinoue');

                        ToastAndroid.showWithGravity(
                            strings.OTP_Sent,
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                          );
                        this.props.navigation.navigate(
                            'ForgotPasswordContinue',
                            { MobileNo: data.MobileNo }
                          );
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            }
            else{
                ToastAndroid.showWithGravity(
                    strings.Mobile_NumberNotExists,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
            }
             console.log(this.state.status);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }  
        else{
            ToastAndroid.showWithGravity(
                strings.Mandatory_fields,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
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
                        <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>{strings.Forgot_Password}</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={styles.container}>
                    <View>
                        <Form
                        ref='form'
                        type={this.forgotpassword}
                        options={this.forgotpasswordOption}
                        value={this.state.value}
                        onChange={this.onChange}
                        />
                        <Button success block rounded onPress={this.ForgotPasswordContinue}>
                            <Text style={styles.button_text}>{strings.Continue}</Text>
                        </Button>
                    </View>                      
                </Content>
            </Container>
        );
    }
}

