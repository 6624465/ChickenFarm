/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';

import {StackNavigator} from 'react-navigation';

import LoginNavigation from './Screens/Navigations/LoginNavigation';



const Application =StackNavigator({
      Home:{screen:LoginNavigation}
    },
    {
      navigationOptions:{
        header:true,
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