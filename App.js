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

const Application =StackNavigator({
      Home:{screen:Login},
      Navigation:{screen:Navigation}
    },
    {
      navigationOptions:{
        header:false,
    }
  }
)

//dfdsjfksdjfkjdksjfksdjkfjksdjfksdkj

export default class App extends Component {
  render(){
      return(
        <Application/>       
      );
  };
}