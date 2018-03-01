import React, { Component } from 'react';
import {View, Text} from 'react-native';

import {StackNavigator} from 'react-navigation';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var LoginCredential = t.struct({
    MobileNo: t.Number,             
    Password: t.String,  
       
  });

  export default class Login extends Component{
    
    render(){
            return(        
            <View>
                  <Form
                  ref='form'
                  type={LoginCredential}
                //   options={LoginCredentialOption}
                  />
             </View>        
           
            );

    }
}