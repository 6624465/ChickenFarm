import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';

export default class MainDashboard extends Component{
    
    static navigationOptions={
        title : 'Main Dashboard'
    }

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
                    <View style={{flex:1, padding:8 }} >
                        <View style={{flexDirection:'row' ,flexWrap:'wrap', height:'50%'}} >
                            <View style={{width:'50%', padding:8}}>
                                <TouchableOpacity style={{paddingTop:'10%', backgroundColor:'green', alignItems:'center', height:'100%', justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('SalesReport')}>
                                    <Text style={{color:'#fff',fontSize:24,fontWeight:'bold'}}>
                                        Sales report
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%', padding:8}}>
                                <TouchableOpacity style={{paddingTop:'10%', backgroundColor:'red', alignItems:'center', height:'100%', justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('ExpenseReport')}>
                                    <Text style={{color:'#fff',fontSize:24,fontWeight:'bold'}}>
                                        Expense report
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'row' ,flexWrap:'wrap', height:'50%'}} >
                            <View style={{width:'50%', padding:8}}>
                                <TouchableOpacity style={{paddingTop:'10%', backgroundColor:'orange', alignItems:'center', height:'100%', justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('ProfitsAndLossReport')}>
                                    <Text style={{color:'#fff', fontSize:24, fontWeight:'bold'}}>
                                        P & L report
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%', padding:8}}>
                                <TouchableOpacity style={{paddingTop:'10%', backgroundColor:'gray', alignItems:'center', height:'100%', justifyContent:'center'}} onPress={()=>this.props.navigation.navigate('StockReport')}>
                                    <Text style={{color:'#fff',fontSize:24, fontWeight:'bold'}}>
                                        Stock report 
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }    
}
