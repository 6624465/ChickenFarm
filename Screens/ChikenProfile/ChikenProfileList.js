import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';

var Gender = t.enums({
  
    M: 'Male',
    F: 'Female'
  });
  
export default class FarmProfileList extends Component{
    static navigationOptions={
        title : 'Chicken Profile',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
   Gender = t.enums({
        M: 'Male',
        F: 'Female'
      });
            constructor()
                 {
                super();
                this.state ={
                    value:{}
                },
                this.AddChickenProfile=t.struct({
                ChooseStatus:t.String,
                Name:t.String,
                ChickenCode:t.Number,
                ChickenSymbol:t.String,
                DateOfBirth:t.Date,
                gender:Gender,
                SireCode:t.String,
                BreederCode:t.String,
                Breed:t.String,
                Talents:t.Number,
                Weight:t.Number,
                FightingRecord :t.String,
                StandardPrice :t.Number,
                AdditionalNote :t.String,
                AddPhoto:t.String
                })
                this.AddChickenProfileOptions={
                    fields:{
                        ChooseStatus:{
                            label: 'Choose Staues',
                            //placeholder:'Please Enter Your Full Name',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        Name:{
                            label: 'Name',
                           placeholder:'Name',
                            //error:'Please Enter Farm Address'
                        
                        },
                        ChickenCode:{
                            label: 'Chicken Code',
                            placeholder:'Chicken Code',
                           // error:'Please Enter ChikenCode'
                        
                        },
                        ChickenSymbol:{
                            label: 'Chicken Symbol',
                            placeholder:'Chicken Symbol',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        gender:{
                            label: 'Gender',
                            //placeholder:' Web Site Name',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        SireCode:{
                            label: 'Sire Code',
                            placeholder:'Sire Code',
                            //multiline:true,
                            //error:'Please Enter Your Full Name'
                        
                        },
                        DateOfBirth: {
                            label: 'Date Of Birth:',
                            placeholder: 'Date Of Birth',
                            minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                          },
                          BreederCode:{
                            label: 'Breeder Code',
                            placeholder:'Breeder Code',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        Breed:{
                            label: 'Breed',
                           placeholder:'Breed',
                            //error:'Please Enter Farm Address'
                        
                        },
                        Talents:{
                            label: 'Talents',
                            placeholder:'Talents',
                           // error:'Please Enter ChikenCode'
                        
                        },
                        Weight:{
                            label: 'Weight',
                            placeholder:'Weight',
                           // error:'Please Enter Your Full Name'
                        
                        },
                        FightingRecord:{
                            label: 'Fighting Record',
                            placeholder:'Fighting Record',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        StandardPrice:{
                            label: 'Standard Price',
                           placeholder:'Standard Price',
                            //error:'Please Enter Farm Address'
                        
                        },
                        AdditionalNote:{
                            label: 'Additional Note',
                            placeholder:'Additional Note',
                           // error:'Please Enter ChikenCode'
                        
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
                            <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Add New Chicken</Title>
                        </Body>
                    </Header>

                    <Content>
                       <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddChickenProfile}
                            options={this.AddChickenProfileOptions}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </View>
                    </Content>
                        <Footer style={{backgroundColor:'white'}}>
                            <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                                <View style={{width:'50%'}}>
                                    <Button success block rounded onPress={this.ResetFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                        <Text style={{color:'white'}} >Reset</Text>
                                    </Button>
                                </View>
                                <View style={{width:'50%', alignItems:'flex-end'}}>
                                    <Button primary block rounded onPress={this.SaveFarmProfile} style={{width:'100%',justifyContent:'center'}}>
                                        <Text style={{color:'white'}}>Save</Text>
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
