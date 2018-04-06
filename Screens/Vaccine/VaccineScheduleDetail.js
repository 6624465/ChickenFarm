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


export default class VaccineScheduleDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetVaccineSchedule(this.props.navigation.state.params.VaccineScheduleId)
        .then(function (response) {
            if(response.data!=null)
            {
              debugger;
                var dtls = response.data.vaccineSchedule;
                var astatus = {};
                for(let i=0;i<response.data.lstVaccineMaster.length;i++)
                {
                    astatus[response.data.lstVaccineMaster[i].VaccineCode] = response.data.lstVaccineMaster[i].VaccineName;
                }
                this.setState({
                    VaccineScheduleDetails: dtls,
                    lstVaccineCode: t.enums(astatus),
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
            VaccineScheduleDetails:{
                AnimalAge:null,
                VaccineType:null,
                VaccineName:null,
                VaccineCode:null,
                VaccineCompany:null,
                Remarks:null,
                VaccineScheduleId:null
            },
            lstVaccineCode:t.enums({}),
            isLoading:false
        },
        this.VaccineScheduleOptions={
            fields:{
                AnimalAge:{
                    label: strings.Animal_Age,
                    placeholder:strings.Animal_Age
                },
                VaccineType:{
                    label: strings.Vaccine_Type,
                    placeholder:strings.Vaccine_Type,
                    editable:false
                },
                VaccineCode:{
                    label: strings.Vaccine_Name,
                    placeholder:strings.Vaccine_Name,
                    nullOption: {value: "", text: 'Select'}  
                },
                VaccineCompany:{
                    label: strings.Vaccine_Company,
                    placeholder:strings.Vaccine_Company,
                    editable:false
                },
                Remarks:{
                    label: strings.Remarks,
                    placeholder:strings.Remarks               
                }
            }
        }
    }

    VaccineSchedule() { 
        return ( t.struct({
            //AnimalCode:this.state.lstAnimalCode,
            AnimalAge:t.Number,
            VaccineCode:this.state.lstVaccineCode,
            VaccineType:t.String,
            VaccineCompany:t.String,
            Remarks:t.String
        })
    )
}
   

    onChange = (VaccineScheduleDetails) => {
        if(VaccineScheduleDetails.VaccineCode!="" && VaccineScheduleDetails.VaccineCode!=undefined)
        {
            services.GetVaccineMaster(VaccineScheduleDetails.VaccineCode)
            .then(function (response) { 
            if(response.data.vaccineMaster!=null){
               this.setState({
                VaccineScheduleDetails:{
                    AnimalAge:VaccineScheduleDetails.AnimalAge,
                    VaccineType:response.data.vaccineMaster.VaccineType,
                    VaccineName:response.data.vaccineMaster.VaccineName,
                    VaccineCode:response.data.vaccineMaster.VaccineCode,
                    VaccineCompany:response.data.vaccineMaster.VaccineCompany,
                    Remarks:VaccineScheduleDetails.Remarks,
                    VaccineScheduleId:VaccineScheduleDetails.VaccineScheduleId,
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
                VaccineScheduleDetails:{
                    AnimalAge:VaccineScheduleDetails.AnimalAge,
                    VaccineType:null,
                    VaccineName:null,
                    VaccineCode:null,
                    VaccineCompany:null,
                    Remarks:VaccineScheduleDetails.Remarks,
                    VaccineScheduleId:VaccineScheduleDetails.VaccineScheduleId,
                }
               })
        }
    }
    

    SaveVaccineSchedule=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
            var data = {
                AnimalAge:this.state.VaccineScheduleDetails.AnimalAge,
                VaccineName:this.state.VaccineScheduleDetails.VaccineName,
                VaccineCode:this.state.VaccineScheduleDetails.VaccineCode,
                VaccineType:this.state.VaccineScheduleDetails.VaccineType,
                VaccineCompany:this.state.VaccineScheduleDetails.VaccineCompany,
                Remarks:this.state.VaccineScheduleDetails.Remarks,
                VaccineScheduleId:this.state.VaccineScheduleDetails.VaccineScheduleId,
            }
     
            services.SaveVaccineSchedule(data)
                .then(function (response) { 
                    this.setState({
                        isLoading: true
                    });
                //if(response.data!=0){
                    //alert('Vaccine Schedule saved successfully.')
                    ToastAndroid.showWithGravity(
                        strings.Saved_successfully,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    this.props.navigation.navigate('VaccineScheduleList');
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
    ResetVaccineSchedule=()=>{
         Keyboard.dismiss();
        this.setState({
            VaccineScheduleDetails:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('VaccineScheduleList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>{strings.Vaccine_Schedule}</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.VaccineSchedule()}
                            options={this.VaccineScheduleOptions}
                            value={this.state.VaccineScheduleDetails}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetVaccineSchedule}>
                                <Text style={styles.white} >{strings.Reset}</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SaveVaccineSchedule}>
                                <Text style={styles.white}>{strings.Save}</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}