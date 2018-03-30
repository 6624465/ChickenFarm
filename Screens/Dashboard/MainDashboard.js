import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import { Container, Content, Header, Icon, Left, Title, Body, Button, Right } from 'native-base';

import {StackNavigator} from 'react-navigation';
import styles from '../stylesheet';

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
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>My Farm Dashboard</Title>
                        </View>
                    </Body>
                    <Right>
                        
                    </Right>
                    </Header>

                    <Content contentContainerStyle={styles.contentContainer}>
                    <View style={styles.Dashboard_container}>
                        <View style={{flexDirection:'row', padding:3, flexWrap:'wrap', height:'20%'}} >
                            <View style={styles.width_25_align_center}>
                                <TouchableOpacity style={{width:70,height:70}} onPress={()=>this.props.navigation.navigate('SalesReport')}>
                                    <Image source = { require('../../android/app/src/main/assets/Sales.png') } style={{width:'100%',height:'100%'}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <TouchableOpacity  style={{width:70,height:70}}  onPress={()=>this.props.navigation.navigate('ExpenseReport')}>
                                    <Image source = { require('../../android/app/src/main/assets/Expenses.png') } style={{width:'100%',height:'100%'}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <TouchableOpacity  style={{width:70,height:70}}  onPress={()=>this.props.navigation.navigate('ProfitsAndLossReport')}>
                                    <Image source = { require('../../android/app/src/main/assets/P&L.png') } style={{width:'100%',height:'100%'}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <TouchableOpacity  style={{width:70,height:70}}  onPress={()=>this.props.navigation.navigate('StockReport')}>
                                    <Image source = { require('../../android/app/src/main/assets/Stock.png') } style={{width:'100%',height:'100%'}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <Text style={styles.bold_12}>
                                    Sales
                                </Text>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <Text style={styles.bold_12}>
                                    Expense
                                </Text>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <Text style={styles.bold_12}>
                                    P & L
                                </Text>
                            </View>
                            <View style={styles.width_25_align_center}>
                                <Text style={styles.bold_12}>
                                    Stock
                                </Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={{flexDirection:'row' ,flexWrap:'wrap', height:'80%', backgroundColor:'gray', alignItems:'center', justifyContent:'center'}} >
                            <Text style={{color:'red',fontSize:24,fontWeight:'bold'}}>
                                    Report Content....
                                </Text>
                        </View>

                        {/* <View style={{flexDirection:'row' ,flexWrap:'wrap', height:'50%'}} >
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
                        </View> */}
                    </View>
                </Content>
            </Container>
        );
    }    
}
