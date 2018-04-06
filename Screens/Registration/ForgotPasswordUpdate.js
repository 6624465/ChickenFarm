import React, { Component } from 'react';
import {View, Text,StyleSheet,ToastAndroid} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Right } from 'native-base';

import services from './Services';
import styles from '../stylesheet';
import {strings} from '../Localization';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class ForgotPasswordContinoue extends Component{
    static navigationOptions={
        title : strings.Forgot_Password,
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
        const ConfirmPasswordEquality = t.refinement(t.String, value => {
            return value === this.state.value.Password
        })

        this.forgotpasswordUpdate = t.struct({
             Password: t.String,
             ConfirmPassword: ConfirmPasswordEquality,
        });
        
        this.forgotpasswordUpdateOption={
            fields:{
                Password: {
                    label: strings.New_Password,
                    placeholder:strings.New_Password,
                    password: true,
                    secureTextEntry: true,
        
                } ,
                ConfirmPassword: {
                    label:strings.Confirm_Password,
                    placeholder:strings.Confirm_Password,
                    password: true,
                    secureTextEntry: true,
                    error:strings.Password_Mismatch,
                }
            }
        }
    }
ForgotPasswordUpdate = () =>
{
    var value = this.refs.form.getValue();
    if(value)
    {
        var data = {
            MobileNo:this.props.navigation.state.params.MobileNo ,
            Password:this.state.value.Password, 
            ConfirmPassword:this.state.value.ConfirmPassword
        }
             
        services.UpdateForgotPasswrod(data.MobileNo,data.Password)
        .then(function (response) {
            if(response.data=="Success")
            {  
                ToastAndroid.showWithGravity(
                    strings.Successfully_ChangedPassword,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
               // alert("Successfully Changed Your Password..")
                this.props.navigation.navigate('Login');                
            }
            else
            {  
                ToastAndroid.showWithGravity(
                    strings.Invalid_OTPNumber,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
            //  alert("Invalid Otp Number..Please Enter Valid Otp Number")
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
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
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
                            type={this.forgotpasswordUpdate}
                            options={this.forgotpasswordUpdateOption}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <Button success block rounded onPress={this.ForgotPasswordUpdate}>
                            <Text style={styles.button_text}>{strings.Submit}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}