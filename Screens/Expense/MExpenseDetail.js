import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class MExpenseDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor()
    {
        super();
        this.state ={
            ExpenseDetails:{
                ExpenseName:null,
                ExpenseCode:null,
                ExpenseType:null
            }
        },

        this.AddNewExpense=t.struct({
        ExpenseName:t.String,
        ExpenseCode:t.String,
        ExpenseType:t.String
        }),

        this.AddNewExpenseOptions={
            fields:{
                ExpenseName:{
                    label: 'Expense Name',
                    placeholder:'Expense Name',
                    //error:'Please Enter Your Full Name'                
                },
                ExpenseCode:{
                    label: 'Expense Code',
                    placeholder:'Expense Code',
                    //error:'Please Enter Farm Address'                
                },
                ExpenseType:{
                    label: 'Expense Type',
                    placeholder:'Expense Type',
                    //error:'Please Enter Tel/Line Number'                
                }
            }
        }
    }

    onChange = (ExpenseDetails) => {
        this.setState({ExpenseDetails});
    }  

    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('MExpenseList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Master Expense Details</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddNewExpense}
                            options={this.AddNewExpenseOptions}
                            value={this.state.ExpenseDetails}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success block rounded onPress={this.ResetFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SaveFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //marginTop: 120,
        padding: 20,
        backgroundColor: '#ffffff',      
    }
  });
