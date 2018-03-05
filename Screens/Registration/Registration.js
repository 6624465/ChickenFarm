import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

import {StackNavigator} from 'react-navigation';

import Login from '../Registration/Login'


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
                 <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Registration</Title>
                        </Body>
                    </Header>
                    <Content contentContainerStyle={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Text>Registration</Text>
                    </Content>
                </Container>
            );

    }
  
}
