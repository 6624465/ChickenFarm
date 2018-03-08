import React, { Component } from 'react';
import {View, Text} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
// import LoginNavigation from '../Registration/Login'

export default class ProfitsAndLossReport extends Component{
    static navigationOptions={
        drawerLabel: () => null
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
                            <Title >Profits & Loss Report</Title>
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
                        <Text>ProfitsAndLossReport</Text>
                    </Content>
                </Container>
            );

    }
    
}
