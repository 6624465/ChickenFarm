import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

import {StackNavigator} from 'react-navigation';

// import Login from './Screens/Registration/Login';


export default class Registration extends Component{
    static navigationOptions={
        title : 'Registration',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        Header:true
    }
    render(){
            return(          
            <Container>
                    <Content contentContainerStyle={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Text>My Farm Dashboard</Text>
                    </Content>
                </Container>
            );

    }
    BackToLogin=()=>{
        this.props.navigation.navigate('Login');
      }
}
