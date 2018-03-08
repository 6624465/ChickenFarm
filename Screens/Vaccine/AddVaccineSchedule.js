import React, { Component } from 'react';
import {View, Text,StyleSheet} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class AddVaccineSchedule extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    
    constructor()
    {
        super();
        this.state ={
            value:{}
        },
        this.AddVaccineSchedule=t.struct({
        ChickenAge:t.Number,
        TypeofVaccine:t.String,
        VaccineName:t.String,
        VaccineCompany:t.String,
        HowtogetVaccine:t.String
        })
        this.AddVaccineScheduleOptions={
            fields:{
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
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('VaccineScheduleList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Vaccine Schedule</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddVaccineSchedule}
                            options={this.AddVaccineScheduleOptions}
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
