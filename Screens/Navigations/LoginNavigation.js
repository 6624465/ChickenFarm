
import React, { Component } from 'react';
import ReactNative from 'react-native';

import {StackNavigator} from 'react-navigation';

import Login from '../Registration/Login';

import Registration from '../Registration/Registration';
import ForgotPassword from '../Registration/ForgotPassword';
import Navigation from '../Navigations/Navigation';

const NavLinksLogin = StackNavigator({
    Home:{screen:Login},
    Navigation:{screen:Navigation},
    Registration:{screen:Registration},
    ForgotPassword:{screen:ForgotPassword}
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