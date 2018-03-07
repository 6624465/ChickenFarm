import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';


export default class AddPurchasedVaccine extends Component{
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.AddPurchasedVaccine=t.struct({
                AddNewVaccine:t.String,
                DateOfPurchased:t.Date,
                ExpiryDate:t.Date,
                BatchNumberOfVaccine:t.String,
                QuantityPurchased:t.Number,
                SuppliedBy:t.String,
                AddMedicinePhoto:t.String
                })
                this.AddPurchasedVaccineOptions={
                    fields:{
                        AddNewVaccine:{
                            label: 'Add New Vaccine',
                            placeholder:'Add New Vaccine',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        DateOfPurchased:{
                            label: 'Date Of Purchased',
                            placeholder:'Date Of Purchased',
                            minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                            
                            //error:'Please Enter Farm Address'
                        
                        },
                        ExpiryDate:{
                            label: 'Expiry Date',
                            placeholder:'Expiry Date',
                            minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                            //error:'Please Enter Tel/Line Number'
                        
                        },
                        BatchNumberOfVaccine:{
                            label: 'Batch Number Of Vaccine',
                            placeholder:'Batch Number Of Vaccine',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        QuantityPurchased:{
                            label: 'Quantity Purchased',
                            placeholder:'Quantity Purchased',
                            //error:'Please Enter Tel/Line Number'
                        
                        },
                        SuppliedBy:{
                            label: 'Supplied By',
                            placeholder:'Supplied By',
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

                    <Content>
                       <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddPurchasedVaccine}
                            options={this.AddPurchasedVaccineOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <Button success style={{paddingLeft:'10%',paddingRight:'10%'}} onPress={this.ResetFarmProfile}>
                            <Text style={{color:'white'}} >Reset</Text>
                        </Button>
                        <Button primary style={{marginLeft:'35%',paddingLeft:'10%',paddingRight:'10%',}} onPress={this.SaveFarmProfile}>
                            <Text style={{color:'white'}}>Save</Text>
                        </Button>
                        </View>
                    </View>
                    </Content>
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
