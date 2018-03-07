import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class GiveVaccine extends Component{
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.GiveVaccine=t.struct({
                            ChickenCode:t.String,
                            ChickenAge:t.Number,
                            TypeofVaccine:t.String,
                            VaccineName:t.String,
                            VaccineCompany:t.String,
                            HowtogetVaccine:t.String

                     })
                this.GiveVaccineOptions={
                    fields:{
                        ChickenCode:{
                            label: 'Chicken Code',
                            placeholder:'Chicken Code',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        ChickenAge:{
                            label: 'Chicken Age',
                            placeholder:'Chicken Age',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        TypeofVaccine:{
                            label: 'Type Of Vaccine',
                            placeholder:'Type Of Vaccine',
                            //error:'Please Enter Farm Address'
                        
                        },
                        VaccineName:{
                            label: 'Vaccine Name',
                            placeholder:'Vaccine Name',
                            //error:'Please Enter Tel/Line Number'
                        
                        },
                        VaccineCompany:{
                            label: 'Vaccine Company',
                            placeholder:'Vaccine Company',
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
                            type={this.GiveVaccine}
                            options={this.GiveVaccineOptions}
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
