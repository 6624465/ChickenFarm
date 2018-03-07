import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;



export default class CreateMyExpense extends Component{
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.CreateMyExpense=t.struct({
                    ExpenseCode:t.String,
                    ExpenseName:t.String,
                    ExpenseType:t.String,
                    VendorName:t.String,
                    VendorDetails:t.String,
                    ExpenseAmout:t.Number,
                    AdditionalNotes:t.String
                })
                this.CreateMyExpenseOptions={
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
        onChange = (value) => {
            this.setState({value});
          }
    

    render(){
            return(        
                  
            <Container>

                    <Content>
                       <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.CreateMyExpense}
                            options={this.CreateMyExpenseOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </View>
                    </Content>
                    <Footer style={{backgroundColor:'white'}}>
                                <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                                    <Button success style={{paddingLeft:'10%',paddingRight:'10%'}} onPress={this.ResetFarmProfile}>
                                        <Text style={{color:'white'}} >Reset</Text>
                                    </Button>
                                    <Button primary style={{marginLeft:'35%',paddingLeft:'10%',paddingRight:'10%',}} onPress={this.SaveFarmProfile}>
                                        <Text style={{color:'white'}}>Save</Text>
                                    </Button>
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
