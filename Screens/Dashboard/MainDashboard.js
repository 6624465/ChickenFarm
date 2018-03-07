import React, { Component } from 'react';
import {View, Text} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
// import LoginNavigation from '../Registration/Login'

export default class MainDashboard extends Component{
    // Logout=()=>{
    //     this.props.navigation.navigate('LoginNavigation');
    // }
    render(){
            return(     
            <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title >My Farm Dashboard</Title>
                        </Body>
                        {/* <Right>
                        <Button transparent onPress={this.Logout}>
                            <Icon ios='ios-menu' android="md-menu" />
                            </Button>
                        </Right> */}
                    </Header>

                    <Content contentContainerStyle={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <Text>My Farm Dashboard123</Text>
                    </Content>
                </Container>
            );

    }
    
}
