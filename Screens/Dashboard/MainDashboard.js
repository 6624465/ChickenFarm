import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';

export default class MainDashboard extends Component{
    Logout=()=>{
        this.props.navigation.navigate('Logout');
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
                    <View>
                        <TouchableOpacity style={{paddingTop:'10%'}} onPress={()=>this.props.navigation.navigate('SalesReport')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Sales report
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop:'10%'}} onPress={()=>this.props.navigation.navigate('ExpenseReport')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Expense report
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop:'10%'}} onPress={()=>this.props.navigation.navigate('ProfitsAndLossReport')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Profits & loss report
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingTop:'10%'}} onPress={()=>this.props.navigation.navigate('StockReport')}>
                            <Text style={{color:'blue',fontSize:15,fontWeight:'bold'}}>
                            Stock report 
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </Content>
                </Container>
            );

    }
    
}
