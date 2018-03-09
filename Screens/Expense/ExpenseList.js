import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity,Image,Keyboard,Text} from 'react-native';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';
import {StackNavigator} from 'react-navigation';

export default class Expense extends Component{
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
                        <Title>Expenses</Title>
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
                <View>
                    <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('MExpenseList')}>
                        <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Master Expense List
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingTop:'10%', alignItems:'center'}} onPress={()=>this.props.navigation.navigate('MyExpenseList')}>
                        <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            My Expense List
                        </Text>
                    </TouchableOpacity>
                </View>
                </Content>
            </Container>
        );
    }
}