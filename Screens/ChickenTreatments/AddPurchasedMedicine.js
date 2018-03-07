import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';


export default class AddPurchasedMedicine extends Component{
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.AddPurchasedMedicine=t.struct({
                AddNewMedicine:t.String,
                DateOfPurchased:t.Date,
                BatchNumberOfMedicine:t.String,
                QuantityPurchased:t.Number,
                SuppliedBy:t.String,
                AddMedicinePhoto:t.String
                })
                this.AddPurchasedMedicineOptions={
                    fields:{
                        AddNewMedicine:{
                            label: 'Add New Medicine',
                            placeholder:'Add New Medicine',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        BatchNumberOfMedicine:{
                            label: 'Batch Number Of Medicine',
                            placeholder:'Batch Number Of Medicine',
                            //error:'Please Enter Farm Address'
                        
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
                        
                        },
                        DateOfPurchased:{
                            label: 'Date Of Purchased',
                            //minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
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
                            type={this.AddPurchasedMedicine}
                            options={this.AddPurchasedMedicineOptions}
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
