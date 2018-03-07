import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer} from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';

export default class AddChickenTreatment extends Component{
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.AddChickenTreatment=t.struct({
                 AddTreatments:t.Number,
                 TreatmentReason:t.String,
                 MedicineName :t.String,
                 ChickenCode:t.String,
                 StartDateOfDosage:t.Date,
                 EndDateOfDosage:t.Date,
                 DaysInTotal:t.Number,
                 DosePerChickenPerDay  :t.Number,
                 AdditionalNotes:t.String

                })
                this.AddChickenTreatmentOptions={
                    fields:{
                        AddTreatments:{
                            label: 'Add Treatments',
                            placeholder:'Add Treatments',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        TreatmentReason:{
                            label: 'Treatment Reason',
                            placeholder:'Treatment Reason',
                            //error:'Please Enter Farm Address'
                        
                        },
                        MedicineName:{
                            label: 'Medicine Name',
                            placeholder:'Medicine Name',
                            //error:'Please Enter Tel/Line Number'
                        
                        },
                        ChickenCode:{
                            label: 'Chicken Code',
                            placeholder:'Chicken Code',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        StartDateOfDosage:{
                            label: 'Start Date Of Dosage',
                            //minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                            //error:'Please Enter Tel/Line Number'
                        
                        },
                        EndDateOfDosage:{
                            label: 'End Date Of Dosage',
                            //minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                            //error:'Please Enter Tel/Line Number'
                        
                        },
                        DaysInTotal:{
                            label: 'Days In Total',
                            placeholder:'Days In Total',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        DosePerChickenPerDay:{
                            label: 'Dose Per Chicken Per Day',
                            placeholder:'Treatment Reason',
                            //error:'Please Enter Farm Address'
                        
                        },
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
                            type={this.AddChickenTreatment}
                            options={this.AddChickenTreatmentOptions}
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
