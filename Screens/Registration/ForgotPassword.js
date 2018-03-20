import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';


import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import services from './Services';

export default class ForgotPassword extends Component{
    static navigationOptions={
        title : 'Forgot Password',
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
                    label: 'Mobile No',
                    placeholder:'Pleasse Enter Mobile Number',
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
                    
                        alert('OTP successfully send to registered mobile number.');
                        // axios.defaults.headers.common['MOBILE_NO'] = data.MobileNo; 
                        // this.props.navigation.navigate('ForgotPasswordContinoue');
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
                alert('Mobile Number Is Not Exists....')
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
                           type={this.forgotpassword}
                           options={this.forgotpasswordOption}
                           value={this.state.value}
                           onChange={this.onChange}
                           />
                           <Button success block rounded onPress={this.ForgotPasswordContinue}>
                            <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>{'Continue'}</Text>
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
