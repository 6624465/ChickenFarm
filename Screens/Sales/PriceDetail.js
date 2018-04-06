import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity,ActivityIndicator, Image,Keyboard,ToastAndroid} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';
import services from './Services'
import styles from '../stylesheet';

import {strings} from '../Localization';
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
            isLoading:false
        },
     
        this.SalesStandardPriceOptions={
            fields:{
                SireCode:{
                    label: strings.Sire_Code,
                    placeholder:strings.Sire_Code
                },
                BreederCode:{
                    label: strings.Breeder_Code,
                    placeholder:strings.Breeder_Code
                },
                Price:{
                    label: strings.Price,
                    placeholder:strings.Price                
                },
                CurrencyCode:{
                    label: strings.Currency,
                    nullOption: {value: '', text: 'Select'}              
                } ,
                ExRate:{
                    label: string.Ex_Rate,
                    placeholder:string.Ex_Rate                
                },
                LocalPrice:{
                    label: strings.Local_Price,
                    placeholder: strings.Local_Price,
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
            this.setState({
                isLoading: true
            });
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
                    this.setState({
                        isLoading: true
                    });
                //if(response.data!=0){
               
                   ToastAndroid.showWithGravity(
                    strings.Saved_successfully,
                    ToastAndroid.SHORT,
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
              strings.Mandatory_fields,
                ToastAndroid.SHORT,
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('PriceList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>{strings.Standard_PriceDetails}</Title>
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
                                    <Text style={styles.white} >{strings.Reset}</Text>
                                </Button>
                            </View>
                            <View style={styles.width_50_flex_end}>
                                <Button primary block rounded onPress={this.SaveStandardPrice}>
                                    <Text style={styles.white}>{strings.Save}</Text>
                                </Button>
                            </View>
                        </View>
                </Footer>
            </Container>
        );
    }
}


