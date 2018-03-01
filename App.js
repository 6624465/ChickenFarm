/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

import {StackNavigator} from 'react-navigation';

import Login from './Screens/Registration/Login';
import Navigation from './Screens/Navigations/Navigation';

//import MainDashboard from './Screens/Dashboard/MainDashboard';
import Registration from './Screens/Registration/Registration';
import ForgotPassword from './Screens/Registration/ForgotPassword';


const Application =StackNavigator({
      Home:{screen:Login},
      Navigation:{screen:Navigation},
      //MainDashboard:{screen:MainDashboard},
      Registration:{screen:Registration},
      ForgotPassword:{screen:ForgotPassword}
    },
    {
      navigationOptions:{
        header:false,
    }
  }
)

export default class App extends Component {
  render(){
      return(
        <Application/>       
      );
  };
}