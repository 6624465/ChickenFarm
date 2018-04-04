import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,ActivityIndicator,Keyboard,ToastAndroid} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';
import services from './Services'
import styles from '../stylesheet';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class ExpenseEntryDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    componentDidMount() {
        services.GetExpensesEntry(this.props.navigation.state.params.RecordID)
        .then(function (response) {
            if(response.data!=null)
            {
              debugger;
                var dtls = response.data.expensesEntry;
                var astatus = {};
                for(let i=0;i<response.data.lstExpensesMaster.length;i++)
                {
                    astatus[response.data.lstExpensesMaster[i].ExpensesCode] = response.data.lstExpensesMaster[i].ExpensesName;
                }
                this.setState({
                    Expense: dtls,
                    lstExpensesCode: t.enums(astatus),
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
            Expense:{
                RecordID:null,
                ExpensesCode:null,
                VendorName:null,
                VendorAddress:null,
                Amount:null,
                Remarks:null
            },
            lstExpensesCode:t.enums({}),
            isLoading:false
        },
     
        this.ExpenseEntryOptions={
            fields:{
                ExpensesCode:{
                    label: 'Expense Name',
                    //placeholder:'Expense Name',
                    nullOption: {value: '', text: 'Select'} 
                },
                VendorName:{
                    label: 'Vendor Name',
                    placeholder:'Vendor Name'
                },
                VendorAddress:{
                    label: 'Vendor Address',
                    placeholder:'Vendor Address'                
                },
                Amount:{
                    label: 'Amount',
                    placeholder:'Amount'                
                } ,
                Remarks:{
                    label: 'Remarks',
                    placeholder:'Remarks'                
                }
            }
        }
    }

    ExpenseEntry() { 
        return ( t.struct({
            ExpensesCode:this.state.lstExpensesCode,
            VendorName:t.String,
            VendorAddress:t.String,
            Amount:t.Number,
            Remarks:t.String
        })
    )
}

    onChange = (Expense) => {
        this.setState({Expense});
    }    

    SaveExpenseEntry=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
            var data = {
                ExpensesCode:this.state.Expense.ExpensesCode,
                VendorName:this.state.Expense.VendorName,
                VendorAddress:this.state.Expense.VendorAddress,
                Amount:this.state.Expense.Amount,
                Remarks:this.state.Expense.Remarks,
                RecordID:this.state.Expense.RecordID
            }
            services.SaveExpensesEntry(data)
                .then(function (response) { 
                    this.setState({
                        isLoading: true
                    });
                //if(response.data!=0){
                   // alert('Expenses Entry saved successfully.')
                   ToastAndroid.showWithGravity(
                    'Expenses Entry saved successfully....',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                    this.props.navigation.navigate('ExpenseEntryList');
                //}
                    
                }.bind(this))
                .catch(function (error) {
                console.log(error);
            });
        }
        else
        {
            ToastAndroid.showWithGravity(
                'Please Enter all manadatary fields...',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
        }
    }
    ResetExpenseEntry=()=>{
        Keyboard.dismiss();
        this.setState({
            Expense:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('ExpenseEntryList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Expense Entry Details</Title>
                        </View>
                    </Body>
                    <Right>
                        
                    </Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.ExpenseEntry()}
                            options={this.ExpenseEntryOptions}
                            value={this.state.Expense}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                        <View style={styles.flexDirectionWrap} >
                            <View style={styles.width_50}>
                                <Button success block rounded onPress={this.ResetExpenseEntry}>
                                    <Text style={styles.white} >Reset</Text>
                                </Button>
                            </View>
                            <View style={styles.width_50_flex_end}>
                                <Button primary block rounded onPress={this.SaveExpenseEntry}>
                                    <Text style={styles.white}>Save</Text>
                                </Button>
                            </View>
                        </View>
                </Footer>
            </Container>
        );
    }
}


