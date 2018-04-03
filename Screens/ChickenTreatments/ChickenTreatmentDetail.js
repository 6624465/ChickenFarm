import React, { Component } from 'react';
import {View, Text,StyleSheet,Keyboard,ToastAndroid,ActivityIndicator} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer,Right} from 'native-base';
import moment from 'moment';
import services from './Services'
import axios from 'axios';
import styles from '../stylesheet';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class ChickenTreatmentDetail extends Component{
            static navigationOptions={
                drawerLabel: () => null
            }
            componentDidMount() {
                services.GetTreatmentEntry(this.props.navigation.state.params.RecordID)
                .then(function (response) {
                    if(response.data!=null)
                    {
                        var dtls = response.data.treatmentEntry;
                        dtls.StartDate = dtls.StartDate != null ? moment(dtls.StartDate).toDate() : null;
                        dtls.EndDate = dtls.EndDate != null ? moment(dtls.EndDate).toDate() : null;
                        var astatus = {};
                        for(let i=0;i<response.data.lstAnimalProfile.length;i++)
                        {
                            astatus[response.data.lstAnimalProfile[i].AnimalCode] = response.data.lstAnimalProfile[i].AnimalName;
                        }
                        this.setState({
                            TreatmentEntryDetail: dtls,
                            lstAnimalCode: t.enums(astatus),
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
                        TreatmentEntryDetail:{
                                    RecordID:null,
                                    FarmID:null,
                                    AnimalCode:null,
                                    MedicineName:null,
                                    Reason:null,
                                    StartDate:null,
                                    EndDate:null,
                                    Dosage:null,
                                    Remarks:null
                        },
                        lstAnimalCode:t.enums({}),
                        isLoading:false
                },
               
                this.AddChickenTreatmentOptions={
                    fields:{ 
                        AnimalCode:{
                            label: 'Animal Code',
                            //placeholder:'Medicine Name',
                            nullOption: {value: '', text: 'Select'} 
                        
                        },
                        MedicineName:{
                            label: 'Medicine Name',
                            placeholder:'Medicine Name'
                        
                        },
                        Reason:{
                            label: 'Reason',
                            placeholder:'Reason'
                        
                        },
                        StartDate:{
                            label: 'Start Date',
                            //minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                        
                        },
                        EndDate:{
                            label: 'End Date',
                            //minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                        
                        },
                        Dosage:{
                            label: 'Dosage',
                            placeholder:'Dosage'
                        },
                        Remarks:{
                            label: 'Remarks',
                            placeholder:'Remarks',
                    }
                }
        }
     }


        AddChickenTreatment() { 
        return ( t.struct({
            AnimalCode:this.state.lstAnimalCode,
            MedicineName :t.String,
            Reason:t.String,
            StartDate:t.Date,
            EndDate:t.Date,
            Dosage  :t.Number,
            Remarks:t.String
               }) )
            }

        onChange = (TreatmentEntryDetail) => {
            this.setState({TreatmentEntryDetail:TreatmentEntryDetail});
          }
        
        SaveTreatmentEntry=()=>{
            Keyboard.dismiss();
        debugger;
            var value = this.refs.form.getValue();
            if (value) {
                this.setState({
                    isLoading: true
                });
              var data = {
                AnimalCode:this.state.TreatmentEntryDetail.AnimalCode,
                MedicineName:this.state.TreatmentEntryDetail.MedicineName,
                Reason:this.state.TreatmentEntryDetail.Reason,
                StartDate:this.state.TreatmentEntryDetail.StartDate,
                EndDate:this.state.TreatmentEntryDetail.EndDate,
                Dosage:this.state.TreatmentEntryDetail.Dosage,
                Remarks:this.state.TreatmentEntryDetail.Remarks,
                RecordID:this.state.TreatmentEntryDetail.RecordID
              }
              services.SaveTreatmentEntry(data)
                .then(function (response) { 
                    this.setState({
                        isLoading: true
                    });
                  //if(data.FarmID!=0){
                      ToastAndroid.showWithGravity(
                        'Treatment Entry saved successfully..',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                      );
                      this.props.navigation.navigate('ChickenTreatmentList');
                  //}
                       
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
              });
          }
          else
          {
              ToastAndroid.showWithGravity(
                  'Please Enter all manadatary fields...',
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER
                );
          }
        }
        ResetTreatmentEntry=()=>{
            Keyboard.dismiss();
            this.setState({
                TreatmentEntryDetail:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('ChickenTreatmentList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:250,alignItems:'flex-start'}}>
                             <Title>Chicken Treatment Detail</Title>
                        </View>
                    </Body>
                    <Right>
                        
                    </Right>
                </Header>

                    <Content>
                       <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddChickenTreatment()}
                            options={this.AddChickenTreatmentOptions}
                            value={this.state.TreatmentEntryDetail}
                            onChange={this.onChange}
                        />
                    </View>
                    </Content>
                    <Footer style={styles.bgc_white}>
                        <View style={styles.flexDirectionWrap} >
                            <View style={styles.width_50}>
                                <Button success block rounded onPress={this.ResetTreatmentEntry}>
                                    <Text style={styles.white} >Reset</Text>
                                </Button>
                            </View>
                            <View style={styles.width_50_flex_end}>
                                <Button primary block rounded onPress={this.SaveTreatmentEntry}>
                                    <Text style={styles.white}>Save</Text>
                                </Button>
                            </View>
                        </View>
                </Footer>
                </Container>
                
            );

    }
}


