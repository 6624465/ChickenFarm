import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';


import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import services from './Services';

export default class ForgotPasswordContinoue extends Component{
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
                    label: 'New Password',
                    placeholder:'Enter New Password',
                    password: true,
                    secureTextEntry: true,
        
                } ,
                ConfirmPassword: {
                    label: 'Confirm Password',
                    placeholder:'Confirm New Password',
                    password: true,
                    secureTextEntry: true,
                    error:'Password Mismatch',
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
                           type={this.forgotpasswordUpdate}
                           options={this.forgotpasswordUpdateOption}
                           value={this.state.value}
                           onChange={this.onChange}
                           />
                           <Button success block rounded onPress={this.ForgotPasswordUpdate}>
                            <Text style={{color:'#fff', fontWeight:'bold', fontSize:18}}>{'Submit'}</Text>
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
