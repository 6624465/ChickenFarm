import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class MyExpenseDetails extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor()
    {
        super();
        this.state ={
            Expense:{
                ExpenseCode:null,
                ExpenseName:null,
                ExpenseType:null,
                VendorName:null,
                VendorDetails:null,
                ExpenseAmout:null,
                AdditionalNotes:null
            }
        },
        this.MyExpense=t.struct({
            ExpenseCode:t.String,
            ExpenseName:t.String,
            ExpenseType:t.String,
            VendorName:t.String,
            VendorDetails:t.String,
            ExpenseAmout:t.Number,
            AdditionalNotes:t.String
        })
        this.MyExpenseOptions={
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
                },
                VendorName:{
                    label: 'Vendor Name',
                    placeholder:'Vendor Name',
                    //error:'Please Enter Your Full Name'                
                },
                VendorDetails:{
                    label: 'Vendor Contract Details',
                    placeholder:'Vendor Contract Details',
                    //error:'Please Enter Farm Address'                
                },
                ExpenseAmout:{
                    label: 'Expense Amout',
                    placeholder:'Expense Amout',
                    //error:'Please Enter Tel/Line Number'                
                } ,
                AdditionalNotes:{
                    label: 'Additional Notes',
                    placeholder:'Additional Notes',
                    //error:'Please Enter Tel/Line Number'                
                }
            }
        }
    }

    onChange = (Expense) => {
        this.setState({Expense});
    }    

    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('MyExpenseList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>My Expense Details</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.MyExpense}
                            options={this.MyExpenseOptions}
                            value={this.state.Expense}
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
