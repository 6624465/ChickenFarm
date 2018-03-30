import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard,ToastAndroid} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';
import services from './Services'
import styles from '../stylesheet';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class PriceDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    componentDidMount() {
        services.GetStandardPrice(this.props.navigation.state.params.StandardPriceId)
        .then(function (response) {
            if(response.data!=null)
            {
              debugger;
                var dtls = response.data.standardPrice;
                var astatus = {};
                for(let i=0;i<response.data.currencyList.length;i++)
                {
                    astatus[response.data.currencyList[i].LookupCode] = response.data.currencyList[i].LookupDescription;
                }
                this.setState({
                    SalesStandardPrice: dtls,
                    lstCurrencyCode: t.enums(astatus),
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
            SalesStandardPrice:{
                StandardPriceId:null,
                SireCode:null,
                BreederCode:null,
                Price:null,
                CurrencyCode:null,
                ExRate:null,
                LocalPrice:null,
                IsActive:null
            },
            lstCurrencyCode:t.enums({}),
        },
     
        this.SalesStandardPriceOptions={
            fields:{
                SireCode:{
                    label: 'Sire Code',
                    placeholder:'Sire Code'
                },
                BreederCode:{
                    label: 'Breeder Code',
                    placeholder:'Breeder Code'
                },
                Price:{
                    label: 'Price',
                    placeholder:'Price'                
                },
                CurrencyCode:{
                    label: 'Currency',
                    nullOption: {value: '', text: 'Select'}              
                } ,
                ExRate:{
                    label: 'Ex.Rate',
                    placeholder:'Ex.Rate'                
                },
                LocalPrice:{
                    label: 'Local Price',
                    placeholder:'Local Price',
                    editable:false                
                }
            }
        }
    }

    SalesStandardPrice() { 
        return ( t.struct({
            SireCode:t.Number,
            BreederCode:t.Number,
            Price:t.Number, 
            CurrencyCode:this.state.lstCurrencyCode,
            ExRate:t.Number,
            LocalPrice:t.Number,
        })
    )
}

    onChange = (SalesStandardPrice) => {
        this.setState({SalesStandardPrice});
    }    

    SaveStandardPrice=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            var data = {
                StandardPriceId:this.state.SalesStandardPrice.StandardPriceId,
                SireCode:this.state.SalesStandardPrice.SireCode,
                BreederCode:this.state.SalesStandardPrice.BreederCode,
                Price:this.state.SalesStandardPrice.Price,
                CurrencyCode:this.state.SalesStandardPrice.CurrencyCode,
                ExRate:this.state.SalesStandardPrice.ExRate,
                LocalPrice:this.state.SalesStandardPrice.LocalPrice,
                IsActive:true,
              
            }
            services.SaveStandardPrice(data)
                .then(function (response) { 
                //if(response.data!=0){
               
                   ToastAndroid.showWithGravity(
                    'Standard Price saved successfully....',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                  );
                    this.props.navigation.navigate('PriceList');
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
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
        }
    }
    ResetStandardPrice=()=>{
        Keyboard.dismiss();
        this.setState({
            SalesStandardPrice:{ }
        })
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('PriceList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Standard Price Details</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.SalesStandardPrice()}
                            options={this.SalesStandardPriceOptions}
                            value={this.state.SalesStandardPrice}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                        <View style={styles.flexDirectionWrap} >
                            <View style={styles.width_50}>
                                <Button success block rounded onPress={this.ResetStandardPrice}>
                                    <Text style={styles.white} >Reset</Text>
                                </Button>
                            </View>
                            <View style={styles.width_50_flex_end}>
                                <Button primary block rounded onPress={this.SaveStandardPrice}>
                                    <Text style={styles.white}>Save</Text>
                                </Button>
                            </View>
                        </View>
                </Footer>
            </Container>
        );
    }
}


