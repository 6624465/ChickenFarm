import React, { Component } from 'react';
import {View, Text,StyleSheet,Keyboard} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';
import services from './Services';


export default class GiveVaccineDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetVaccineEntry(this.props.navigation.state.params.RecordID)
        .then(function (response) {
            if(response.data!=null)
            {
              
                var dtls = response.data.vaccineEntry;
                this.setState({
                    VaccineDetails: dtls,
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
            VaccineDetails:{
                AnimalCode:null,
                AnimalAge:null,
                VaccineType:null,
                VaccineName:null,
                VaccineCompany:null,
                Remarks:null,
                RecordID:null
            }
        },
        this.GiveVaccine=t.struct({
            AnimalCode:t.Number,
            AnimalAge:t.Number,
            VaccineType:t.String,
            VaccineName:t.String,
            VaccineCompany:t.String,
            Remarks:t.String
        })
        this.GiveVaccineOptions={
            fields:{
                AnimalCode:{
                    label: 'Animal Code',
                    placeholder:'Animal Code'              
                },
                AnimalAge:{
                    label: 'Animal Age',
                    placeholder:'Animal Age'
                                  
                },
                VaccineType:{
                    label: 'Vaccine Type',
                    placeholder:'Vaccine Type'
                },
                VaccineName:{
                    label: 'Vaccine Name',
                    placeholder:'Vaccine Name'
                },
                VaccineCompany:{
                    label: 'Vaccine Company',
                    placeholder:'Vaccine Company'
                },
                Remarks:{
                    label: 'Remarks',
                    placeholder:'Remarks'               
                }
            }
        }
    }

    onChange = (VaccineDetails) => {
        this.setState({VaccineDetails});
    }

    SaveVaccineEntry=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            var data = {
                AnimalCode:this.state.VaccineDetails.AnimalCode,
                AnimalAge:this.state.VaccineDetails.AnimalAge,
                VaccineType:this.state.VaccineDetails.VaccineType,
                VaccineName:this.state.VaccineDetails.VaccineName,
                VaccineCompany:this.state.VaccineDetails.VaccineCompany,
                Remarks:this.state.VaccineDetails.Remarks,
                RecordID:this.state.VaccineDetails.RecordID,
            }
     
            services.SaveVaccineEntry(data)
                .then(function (response) { 
                //if(response.data!=0){
                    alert('Vaccine Entry saved successfully.')
                    this.props.navigation.navigate('GiveVaccineList');
                //}
                    
                }.bind(this))
                .catch(function (error) {
                console.log(error);
            });
        }
    }
    ResetVaccineEntry=()=>{
         Keyboard.dismiss();
        this.setState({
            VaccineDetails:{ }
        })
    }

    render(){
        return( 
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('GiveVaccineList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Give Vaccine</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.GiveVaccine}
                            options={this.GiveVaccineOptions}
                            value={this.state.VaccineDetails}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success block rounded onPress={this.ResetVaccineEntry} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SaveVaccineEntry} style={{width:'100%',justifyContent:'center'}}>
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
