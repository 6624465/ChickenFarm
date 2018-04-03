import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard,ToastAndroid} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';
import styles from '../stylesheet';
import services from './Services';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class MExpenseDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetExpensesMaster(this.props.navigation.state.params.ExpensesID)
        .then(function (response) {
            if(response.data!=null)
            {
                var dtls = response.data.expensesMaster;
                this.setState({
                    ExpenseDetails: dtls
                });
            }
            console.log(this.state.imageLink);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }
    constructor()
    {
        super();
        this.state ={
            ExpenseDetails:{
                ExpensesID:null,
                ExpensesCode:null,
                ExpensesName:null,
                ExpensesType:null
            }
        },

        this.AddNewExpense=t.struct({
            ExpensesCode:t.String,
            ExpensesName:t.String,
            ExpensesType:t.String
        }),

        this.AddNewExpenseOptions={
            fields:{
                ExpensesName:{
                    label: 'Expense Name',
                    placeholder:'Expense Name',
                    //error:'Please Enter Your Full Name'                
                },
                ExpensesCode:{
                    label: 'Expense Code',
                    placeholder:'Expense Code',
                    //error:'Please Enter Farm Address'                
                },
                ExpensesType:{
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
    SaveExpensesMaster=()=>{
        Keyboard.dismiss();
        debugger;
            var value = this.refs.form.getValue();
            if (value) {
              var data = {
                ExpensesName:this.state.ExpenseDetails.ExpensesName,
                ExpensesID:this.state.ExpenseDetails.ExpensesID,
                ExpensesCode:this.state.ExpenseDetails.ExpensesCode,
                ExpensesType:this.state.ExpenseDetails.ExpensesType
              }
              services.SaveExpensesMaster(data)
                .then(function (response) { 
                  //if(data.FarmID!=0){
                     // alert('Expenses Master saved successfully.')
                      ToastAndroid.showWithGravity(
                        'Expenses Master saved successfully...',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                      );
                      this.props.navigation.navigate('MExpenseList');
                  //}
                       
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
              });
          }
          else{
            ToastAndroid.showWithGravity(
                'Please Enter all manadatary fields...',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
          }
    }
    ResetExpensesMaster=()=>{
        Keyboard.dismiss();
        this.setState({
            ExpenseDetails:{ }
            }) 
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
                        <View style={{width:250,alignItems:'flex-start'}}>
                             <Title>Master Expense Details</Title>
                        </View>
                    </Body>
                    <Right>
                        
                    </Right>
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
                <Footer style={styles.bgc_white}>
                        <View style={styles.flexDirectionWrap} >
                            <View style={styles.width_50}>
                                <Button success block rounded onPress={this.ResetExpensesMaster}>
                                    <Text style={styles.white} >Reset</Text>
                                </Button>
                            </View>
                            <View style={styles.width_50_flex_end}>
                                <Button primary block rounded onPress={this.SaveExpensesMaster}>
                                    <Text style={styles.white}>Save</Text>
                                </Button>
                            </View>
                        </View>
                </Footer>
            </Container>
        );
    }
}