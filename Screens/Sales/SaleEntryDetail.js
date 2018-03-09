import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class SaleEntryDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    
    constructor()
    {
        super();
        this.state ={
            value:{}
        },
        this.SaleEntryDetail=t.struct({
        ChickenCode:t.String,
        ChickenStatus:t.String,
        BuyerName:t.String,
        BuyerDetails:t.String,
        Price:t.Number,
        DisCount:t.Number,
        TotalPrice:t.Number
        })
        this.SaleEntryDetailOptions={
            fields:{
                ChickenCode:{
                    label: 'Chicken Code',
                    placeholder:'Chicken Code',
                    //error:'Please Enter Your Full Name'                
                },
                ChickenStatus:{
                    label: 'Chicken Status',
                    placeholder:'Chicken Status',
                    //error:'Please Enter Farm Address'                
                },
                BuyerName:{
                    label: 'Buyer Name',
                    placeholder:'Buyer Name',
                    //error:'Please Enter Tel/Line Number'                
                },
                BuyerDetails:{
                    label: 'Buyer Details',
                    placeholder:'Buyer Contact  Details',
                    // error:'Please Enter Your Full Name'                
                },
                Price:{
                    label: 'Price',
                    placeholder:'Price',
                    // error:'Please Enter Your Full Name'                
                },
                DisCount:{
                    label: 'DisCount',
                    placeholder:'DisCount',
                    // error:'Please Enter Your Full Name'                
                },
                TotalPrice:{
                    label: 'Total Price',
                    placeholder:'Total Price',
                    // error:'Please Enter Your Full Name'                
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
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('SaleEntryList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title> Sale Entry Deatil</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.SaleEntryDetail}
                            options={this.SaleEntryDetailOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'33%'}}>
                            <Button success block rounded onPress={this.ResetFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Save</Text>
                            </Button>
                        </View>
                        <View style={{width:'33%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SaveFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>Print Certificate  </Text>
                            </Button>
                        </View>
                        <View style={{width:'33%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SaveFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>Delivery </Text>
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
