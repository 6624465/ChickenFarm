import React, { Component } from 'react';
import {View, Text,StyleSheet,Keyboard,ToastAndroid,ActivityIndicator} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer,Right } from 'native-base';
var t = require('tcomb-form-native');
var Form = t.form.Form;
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';

var t = require('tcomb-form-native');
var Form = t.form.Form;


export default class GiveVaccineDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetVaccineEntry(this.props.navigation.state.params.RecordID)
        .then(function (response) {
            if(response.data!=null)
            {
              debugger;
                var dtls = response.data.vaccineEntry;
                var astatus = {};
                for(let i=0;i<response.data.lstAnimalProfile.length;i++)
                {
                    astatus[response.data.lstAnimalProfile[i].AnimalCode] = response.data.lstAnimalProfile[i].AnimalName;
                }
                this.setState({
                    VaccineDetails: dtls,
                    lstAnimalCode: t.enums(astatus),
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
            VaccineDetails:{
                AnimalCode:null,
                AnimalAge:null,
                VaccineType:null,
                VaccineName:null,
                VaccineCompany:null,
                Remarks:null,
                RecordID:null
            },
            lstAnimalCode:t.enums({}),
            isLoading:false
        },
        this.GiveVaccineOptions={
            fields:{
                AnimalCode:{
                    label: 'Animal Code',
                    placeholder:'Animal Code',
                    nullOption: {value: '', text: 'Select'}               
                },
                AnimalAge:{
                    label: 'Animal Age',
                    placeholder:'Animal Age',
                    editable:false
                                  
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

    GiveVaccine() { 
        return ( t.struct({
            AnimalCode:this.state.lstAnimalCode,
            AnimalAge:t.Number,
            VaccineType:t.String,
            VaccineName:t.String,
            VaccineCompany:t.String,
            Remarks:t.String
        })
    )
}
    // onChange = (VaccineDetails) => {
    //     this.setState({VaccineDetails});
    // }


    onChange = (vaccineDetail) => {
        // var options = t.update(this.state.options, {
        //     fields: {
        //         CauseOfDeath: {
        //         editable: { '$set': ChickenProfileDetails.AnimalStatus === '2003' ? true : false }
        //       }
        //     }
        // });
        debugger;
        if(vaccineDetail.AnimalCode!="")
        {
            services.GetAnimalCodeList(vaccineDetail.AnimalCode)
            .then(function (response) { 
            if(response.data.age!=null){
               this.setState({
                VaccineDetails:{
                    AnimalCode:vaccineDetail.AnimalCode,
                    AnimalAge:response.data.age,
                    VaccineType:vaccineDetail.VaccineType,
                    VaccineName:vaccineDetail.VaccineName,
                    VaccineCompany:vaccineDetail.VaccineCompany,
                    Remarks:vaccineDetail.Remarks
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
                VaccineDetails:{
                    AnimalCode:vaccineDetail.AnimalCode,
                    AnimalAge:null,
                    VaccineType:vaccineDetail.VaccineType,
                    VaccineName:vaccineDetail.VaccineName,
                    VaccineCompany:vaccineDetail.VaccineCompany,
                    Remarks:vaccineDetail.Remarks
                }
               })
        }
       // this.setState({VaccineDetails });
    }
    

    SaveVaccineEntry=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
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
                    this.setState({
                        isLoading: true
                    });
                //if(response.data!=0){
                    //alert('Vaccine Entry saved successfully.')
                    ToastAndroid.showWithGravity(
                        'Saved successfully..',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    this.props.navigation.navigate('GiveVaccineList');
                //}
                    
                }.bind(this))
                .catch(function (error) {
                console.log(error);
            });
        }
        else{
            ToastAndroid.showWithGravity(
                'Please Enter all manadatary fields...',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
        }
    }
    ResetVaccineEntry=()=>{
         Keyboard.dismiss();
        this.setState({
            VaccineDetails:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('GiveVaccineList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Give Vaccine </Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.GiveVaccine()}
                            options={this.GiveVaccineOptions}
                            value={this.state.VaccineDetails}
                            onChange={this.onChange}
                        />
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetVaccineEntry}>
                                <Text style={styles.white} >Reset</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SaveVaccineEntry}>
                                <Text style={styles.white}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}