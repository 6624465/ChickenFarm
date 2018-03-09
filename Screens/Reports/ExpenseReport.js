import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
// import LoginNavigation from '../Registration/Login'

export default class ExpenseReport extends Component{
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
                            <Title >Expense Report</Title>
                        </Body>
                    </Header>

                    <Content contentContainerStyle={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <View style={{alignItems:'center'}}>
                            <Image source = { require('../../android/app/src/main/assets/capture.png') }/>
                        </View>
                        {/* <Text style={{fontSize:30}}>Expense Report</Text> */}
                    </Content>
                </Container>
            );

    }
    
}
