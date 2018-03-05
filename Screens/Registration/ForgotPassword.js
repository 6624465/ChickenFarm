import React, { Component } from 'react';
import {View, Text} from 'react-native';

import {StackNavigator} from 'react-navigation';

import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

export default class ForgotPassword extends Component{
    static navigationOptions={
        title : 'Forgot Password',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
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
                   <Content contentContainerStyle={{
                       flex:1,
                       alignItems:'center',
                       justifyContent:'center'
                   }}>
                       <Text>Forgot Password</Text>
                   </Content>
               </Container>
            );

    }
}
