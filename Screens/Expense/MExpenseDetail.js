import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity,ActivityIndicator, Image,Keyboard,ToastAndroid} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';
import styles from '../stylesheet';
import services from './Services';
import {strings} from '../Localization';

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
            },
            isLoading:false
        },

        this.AddNewExpense=t.struct({
            ExpensesCode:t.String,
            ExpensesName:t.String,
            ExpensesType:t.String
        }),

        this.AddNewExpenseOptions={
            fields:{
                ExpensesName:{
                    label: strings.Expense_Name,
                    placeholder:strings.Expense_Name,
                    //error:'Please Enter Your Full Name'                
                },
                ExpensesCode:{
                    label: strings.Expense_Code,
                    placeholder:strings.Expense_Code,
                    //error:'Please Enter Farm Address'                
                },
                ExpensesType:{
                    label: strings.Expense_Type,
                    placeholder:strings.Expense_Type,
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
                this.setState({
                    isLoading: true
                });
              var data = {
                ExpensesName:this.state.ExpenseDetails.ExpensesName,
                ExpensesID:this.state.ExpenseDetails.ExpensesID,
                ExpensesCode:this.state.ExpenseDetails.ExpensesCode,
                ExpensesType:this.state.ExpenseDetails.ExpensesType
              }
              services.SaveExpensesMaster(data)
                .then(function (response) { 
                    this.setState({
                        isLoading: true
                    });
                  //if(data.FarmID!=0){
                     // alert('Expenses Master saved successfully.')
                      ToastAndroid.showWithGravity(
                        strings.Saved_successfully,
                        ToastAndroid.SHORT,
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
                strings.Mandatory_fields,
                ToastAndroid.SHORT,
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
        if (this.state.isLoading) {
            return (
                <View style={styles.activeindicator}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
            );
          }
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
                             <Title>{strings.Master_Expense_Details}</Title>
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
                                    <Text style={styles.white} >{strings.Reset}</Text>
                                </Button>
                            </View>
                            <View style={styles.width_50_flex_end}>
                                <Button primary block rounded onPress={this.SaveExpensesMaster}>
                                    <Text style={styles.white}>{strings.Save}</Text>
                                </Button>
                            </View>
                        </View>
                </Footer>
            </Container>
        );
    }
}