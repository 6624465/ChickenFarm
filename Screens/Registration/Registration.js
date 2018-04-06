import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Keyboard,ToastAndroid} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button,Right } from 'native-base';

import {StackNavigator} from 'react-navigation';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';
import {strings} from '../Localization';


export default class Registration extends Component {
    
    static navigationOptions={
        title : strings.Registration,
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        Header:true
    }

    componentDidMount() {
       // axios.get('/Register/GetRegistration/'+this.props.navigation.state.params.UserID)
        services.GetRegistration(this.props.navigation.state.params.UserID)
        .then(function (response) {
            var regi= response.data.registration;
            this.setState({
                status: (response.data.registration.IsOTPVerified === null || response.data.registration.IsOTPVerified === true) ? true : false,
                reg: response.data.registration,
            });
            //alert(this.state.status+'<<<<>>>>'+response.data.registration.IsOTPVerified);
            console.log(this.state.status);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }

    constructor(props)
    {
        super(props);
        this.state ={
            status:true,
            reg:{
                ID:null,
                Email:null,
                FullName: null,             
                MobileNo: null, 
                Password: null,
                OTPNo:null,
                IsOTPSent:null,
                OTPSentDate:null,
                IsOTPReSent:null,
                OTPSentCount:null,
                CountryCode:null,
                IsOTPVerified:null,
            },
            OtpOptions:{
                fields:{
                    OTPN:{
                        label: strings.OTP,
                        placeholder:strings.OTP,
                        secureTextEntry: true,
                    }
                }
            },
            registrationOption:{
                //auto: 'placeholders'
                fields:{
                    FullName: {
                        label: strings.Full_Name,
                        placeholder:strings.Full_Name,
                        //error:'Please Enter Your Name'        
                    },
                    MobileNo: {
                        label: strings.Mobile_Number,
                        placeholder:'Enter Your Mobile No',
                        maxLength:10,
                        onBlur:()=>{
                            var data = {
                                MobileNo:this.state.reg.MobileNo
                            }
                            //axios.get('/Register/IsMobileNoExists/'+this.state.reg.MobileNo)
                            services.IsMobileNoExists(data.MobileNo)
                            .then(function (response) {
                                if(response.data)
                                {
                                    
                                   // alert('MobileNo Already Exists...');

                                    ToastAndroid.showWithGravity(
                                        strings.MobileNo_Already_Exists,
                                        ToastAndroid.SHORT,
                                        ToastAndroid.CENTER
                                      );
                                    this.refs.form.getComponent('MobileNo').refs.input.focus()
                                }
                                 console.log(this.state.status);
                                }.bind(this))
                                .catch(function (error) {
                                    console.log(error);
                                });
                          },
                    },
                    Email: {
                        label: strings.Email_ID,
                        placeholder:strings.Email_ID
                    },
                    Password: {
                        label: strings.Password,
                        placeholder:strings.Password,
                        password: true,
                        secureTextEntry: true
                    } ,
                    ReEnterPassword: {
                        label: strings.Re_Password,
                        placeholder:strings.Re_Password,
                        password: true,
                        secureTextEntry: true,
                        error:strings.Password_Mismatch        
                    }
                }
            }
        },
        this.Otp=t.struct({
            OTPN:t.Number
        })
        
        const ConfirmPasswordEquality = t.refinement(t.String, value => {
            return value === this.state.reg.Password
        })
        
        this.registration = t.struct({
            Email:t.String,
            FullName: t.String,             
            MobileNo: t.Number,  
            Password: t.String,
            ReEnterPassword: ConfirmPasswordEquality,       
        });        
    }

    SaveRegistration = () => {
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        
        if (value) {
            var data = {
                ID:this.state.reg.ID,
                Email:this.state.reg.Email,
                FullName:this.state.reg.FullName,
                MobileNo:this.state.reg.MobileNo,
                Password:this.state.reg.Password
            }
            // axios({
            //     method: 'post',
            //     url: '/Register/Save',
            //     data: data
            //   })

            services.RegistrationSave(data)
              .then(function (response) { 
                debugger;   
                axios.defaults.headers.common['MOBILE_NO'] = data.MobileNo;
                this.setState({
                    reg: response.data.registration,
                    status: response.data.registration.IsOTPVerified===null || response.data.registration.IsOTPVerified===true ? true : false
                });       
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

    
    UpdateOTPStatus = () => {
        Keyboard.dismiss();
        var value = this.refs.form.getValue();        
        if (value) {
            var data = {
                ID:this.state.reg.ID,
                OTPNo:value.OTPN
            }
            debugger;
            // axios({
            //     method: 'post',
            //     url: '/Register/UpdateOTPStatus',
            //     data: data
            // })
            services.UpdateOTPStatus(data)
            .then(function (response) { 
                debugger;  
                if(response.data.msg=="Failed"){
                    //alert("Invalid OTP. Please try with correct OTP.");

                    ToastAndroid.showWithGravity(
                        strings.Invalid_OTPNumber,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                }
                else
                {
                    this.props.navigation.navigate('FarmProfile'); 
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    ResendOTP=()=>{
        Keyboard.dismiss();
        //axios.get('/Register/ResendOTP/'+this.state.reg.MobileNo)
        services.ResendOTP(this.state.reg.MobileNo)
        .then(function (response) { 
            debugger;  
                //alert('OTP successfully resend to registered mobile number.');
                ToastAndroid.showWithGravity(
                    strings.OTPsuccessfully_resend,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }

    onChange = (reg) => {
        this.setState({reg:reg});
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
                             <Title>{strings.Registration}</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={styles.container}>
                    <View>
                        <Form
                            ref='form'
                            type={this.state.status? this.registration:this.Otp}
                            options={this.state.status? this.state.registrationOption:this.state.OtpOptions}
                            value={this.state.reg}
                            onChange={this.onChange}
                        />
                        
                        <TouchableOpacity onPress={this.ResendOTP.bind(this)}>
                        <Text style={styles.touchableOpacity_text}>
                            {this.state.status?'':strings.Resend_OTP}
                        </Text>
                        </TouchableOpacity>
                        <Button success block rounded onPress={this.state.status ? this.SaveRegistration.bind(this):this.UpdateOTPStatus.bind(this)}>
                            <Text style={styles.button_text}>{this.state.status?strings.Sign_Up:strings.Submit}</Text>
                        </Button>
                    </View>
                </Content>
            </Container>                
        );
    }  
}
