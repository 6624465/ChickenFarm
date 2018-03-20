
import React, { Component } from 'react';
import ReactNative from 'react-native';

import {StackNavigator} from 'react-navigation';

import Login from '../Registration/Login';

import Registration from '../Registration/Registration';
import ForgotPassword from '../Registration/ForgotPassword';
import ForgotPasswordContinue from '../Registration/ForgotPasswordContinue';
import ForgotPasswordUpdate from '../Registration/ForgotPasswordUpdate'

import FarmProfile from '../FarmProfile/FarmProfileList';

import Navigation from '../Navigations/Navigation';

const NavLinksLogin = StackNavigator({
    Login:{screen:Login},
    Navigation:{screen:Navigation},
    Registration:{screen:Registration},
    ForgotPassword:{screen:ForgotPassword},
    ForgotPasswordContinue:{screen:ForgotPasswordContinue}, 
    ForgotPasswordUpdate:{screen:ForgotPasswordUpdate},
    FarmProfile:{screen:FarmProfile}
  },
  {
    navigationOptions:{
        header:false,
    }
  }
)

export default class LoginNavigation extends Component {
    render(){  
      return(<NavLinksLogin/>);
    }
}