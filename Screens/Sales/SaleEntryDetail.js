import React, { Component } from 'react';
import {View, Text,StyleSheet,Keyboard,ToastAndroid,ActivityIndicator} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer,Right } from 'native-base';
var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';

import {strings} from '../Localization';

var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class SaleEntryDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetAnimalSaleEntry(this.props.navigation.state.params.AnimalSaleEntryId)
        .then(function (response) {
            if(response.data!=null)
            {
              debugger;
                var dtls = response.data.animalSaleEntry;
                var acode = {};
                for(let i=0;i<response.data.animalProfile.length;i++)
                {
                    acode[response.data.animalProfile[i].AnimalCode] = response.data.animalProfile[i].AnimalName;
                }
                var astatus = {};
                for(let i=0;i<response.data.animalStatus.length;i++)
                {
                    astatus[response.data.animalStatus[i].LookupID] = response.data.animalStatus[i].LookupDescription;
                }
                this.setState({
                    AnimalSaleEntryDetails: dtls,
                    lstAnimalCode: t.enums(acode),
                    lstAnimalStatus: t.enums(astatus),
                });
            }
         
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }

    constructor()
    {
        super();
        this.state ={
            AnimalSaleEntryDetails:{
                SaleEntryID:null,
                AnimalCode:null,
                AnimalStatus:null,
                BuyerName:null,
                BuyerAddress:null,
                BuyerPhoneNo:null,
                BuyerMobileNo:null,
                Price:null,
                Discount:null,
                TotalPrice:null,
                IsActive:null
            },
            lstAnimalCode:t.enums({}),
            lstAnimalStatus:t.enums({}),
            isLoading:false
        },  
        this.AnimalSaleEntryDetailsOptions={
            fields:{
                AnimalCode:{
                    label: strings.Animal_Name,
                    nullOption: {value: '', text: 'Select'}               
                },
                AnimalStatus:{
                    label: strings.Animal_Status,
                    nullOption: {value: '', text: 'Select'},
                    editable:false
                                  
                },
                BuyerName:{
                    label: strings.Buyer_Name,
                    placeholder: strings.Buyer_Name
                },
                BuyerAddress:{
                    label: strings.Buyer_Address,
                    placeholder:strings.Buyer_Address
                },
                BuyerPhoneNo:{
                    label: strings.Buyer_PhoneNo,
                    placeholder:strings.Buyer_PhoneNo
                },
                BuyerMobileNo:{
                    label: strings.Buyer_MobileNo,
                    placeholder:strings.Buyer_MobileNo               
                },
                Price:{
                    label: strings.Price,
                    placeholder:strings.Price
                },
                Discount:{
                    label: strings.Discount,
                    placeholder:strings.Discount
                },
                TotalPrice:{
                    label: strings.Total_Price,
                    placeholder: strings.Total_Price               
                }
            }
        }
    }

    AnimalSaleEntryDetails() { 
        return ( t.struct({
            AnimalCode:this.state.lstAnimalCode,
            AnimalStatus:this.state.lstAnimalStatus,
            BuyerName:t.String,
            BuyerAddress:t.String,
            BuyerPhoneNo:t.Number,
            BuyerMobileNo:t.Number,
            Price:t.Number,
            Discount:t.Number,
            TotalPrice:t.Number
        })
    )
}
    


    onChange = (AnimalSaleEntryDetails) => {
        if(AnimalSaleEntryDetails.AnimalCode!="")
        {
            services.GetAnimalStatusCode(AnimalSaleEntryDetails.AnimalCode)
            .then(function (response) { 
            if(response.data.animalstatuscode!=null){
               this.setState({
                AnimalSaleEntryDetails:{
                    SaleEntryID:AnimalSaleEntryDetails.SaleEntryID,
                    AnimalCode:AnimalSaleEntryDetails.AnimalCode,
                    AnimalStatus:response.data.animalstatuscode,
                    BuyerName:AnimalSaleEntryDetails.BuyerName,
                    BuyerAddress:AnimalSaleEntryDetails.BuyerAddress,
                    BuyerPhoneNo:AnimalSaleEntryDetails.BuyerPhoneNo,
                    BuyerMobileNo:AnimalSaleEntryDetails.BuyerMobileNo,
                    Price:AnimalSaleEntryDetails.Price,
                    Discount:AnimalSaleEntryDetails.Discount, 
                    TotalPrice:AnimalSaleEntryDetails.TotalPrice,
                    IsActive:AnimalSaleEntryDetails.IsActive
                }
               })
            }
            
                
            }.bind(this))
            .catch(function (error) {
            console.log(error);
        });
        }
        else{
            this.setState({
                AnimalSaleEntryDetails:{
                    SaleEntryID:AnimalSaleEntryDetails.SaleEntryID,
                    AnimalCode:AnimalSaleEntryDetails.AnimalCode,
                    AnimalStatus:null,
                    BuyerName:AnimalSaleEntryDetails.BuyerName,
                    BuyerAddress:AnimalSaleEntryDetails.BuyerAddress,
                    BuyerPhoneNo:AnimalSaleEntryDetails.BuyerPhoneNo,
                    BuyerMobileNo:AnimalSaleEntryDetails.BuyerMobileNo,
                    Price:AnimalSaleEntryDetails.Price,
                    Discount:AnimalSaleEntryDetails.Discount, 
                    TotalPrice:AnimalSaleEntryDetails.TotalPrice,
                    IsActive:AnimalSaleEntryDetails.IsActive
                }
               })
        }
       // this.setState({VaccineDetails });
    }
    

    SaveAnimalSaleEntry=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
            var data = {
                    SaleEntryID:this.state.AnimalSaleEntryDetails.SaleEntryID,
                    AnimalCode:this.state.AnimalSaleEntryDetails.AnimalCode,
                    AnimalStatus:this.state.AnimalSaleEntryDetails.AnimalStatus,
                    BuyerName:this.state.AnimalSaleEntryDetails.BuyerName,
                    BuyerAddress:this.state.AnimalSaleEntryDetails.BuyerAddress,
                    BuyerPhoneNo:this.state.AnimalSaleEntryDetails.BuyerPhoneNo,
                    BuyerMobileNo:this.state.AnimalSaleEntryDetails.BuyerMobileNo,
                    Price:this.state.AnimalSaleEntryDetails.Price,
                    Discount:this.state.AnimalSaleEntryDetails.Discount,
                    TotalPrice:this.state.AnimalSaleEntryDetails.TotalPrice,
                    IsActive:true
            }
     debugger;
            services.SaveAnimalSaleEntry(data)
                .then(function (response) { 
                    this.setState({
                        isLoading: true
                    });
                //if(response.data!=0){
                    //alert('Vaccine Entry saved successfully.')
                    ToastAndroid.showWithGravity(
                       strings.Saved_successfully,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    this.props.navigation.navigate('SaleEntryList');
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
    ResetAnimalSaleEntry=()=>{
         Keyboard.dismiss();
        this.setState({
            AnimalSaleEntryDetails:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('SaleEntryList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:250,alignItems:'flex-start'}}>
                             <Title>{strings.Animal_SaleEntryDetails}</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AnimalSaleEntryDetails()}
                            options={this.AnimalSaleEntryDetailsOptions}
                            value={this.state.AnimalSaleEntryDetails}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetAnimalSaleEntry}>
                                <Text style={styles.white} >{strings.Reset}</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SaveAnimalSaleEntry}>
                                <Text style={styles.white}>{strings.Save}</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}