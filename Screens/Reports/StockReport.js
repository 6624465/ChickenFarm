import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
// import LoginNavigation from '../Registration/Login'

export default class StockReport extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    render(){
            return(     
            <Container>
                    <Header>
                    <Left>
                           <Button transparent onPress={() => this.props.navigation.navigate('MainDashboard')}>
                           <Icon name='arrow-back'/>
                           </Button>
                       </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Stock Report</Title>
                        </View>
                    </Body>
                    <Right></Right>
                    </Header>

                    <Content contentContainerStyle={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                    <View style={{alignItems:'center'}}>
                            <Image source = { require('../../android/app/src/main/assets/capture.png') }/>
                        </View>
                        {/* <Text style={{fontSize:30}}>Stock Report</Text> */}
                    </Content>
                </Container>
            );

    }
    
}
