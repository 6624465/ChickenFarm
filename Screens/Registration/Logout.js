import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image, Keyboard, ActivityIndicator,ToastAndroid, AsyncStorage} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';


import styles from '../stylesheet';

export default class Logout extends Component{
    static navigationOptions={
        title : 'Logout',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }

    constructor(props)
    {
        super(props);
    }


    async clearStorage()
    {
        Keyboard.dismiss();
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

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
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Logout</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>

                <Content>
                    <View style={styles.container}>
                    <Text>Your session got closed....</Text>
                        <Button success  block rounded onPress={this.clearStorage.bind(this)}>
                            <Text style={styles.white} >Logout</Text>
                        </Button>
                    </View>
                </Content>
                
            </Container>
        );
    }
}