import React, { Component } from 'react';
import {View, Text,StyleSheet,Keyboard} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button,Footer} from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';
import services from './Services'
import axios from 'axios';

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
                },
               
                this.AddChickenTreatmentOptions={
                    fields:{
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
                  //if(data.FarmID!=0){
                      alert('Treatment Entry saved successfully.')
                      this.props.navigation.navigate('ChickenTreatmentList');
                  //}
                       
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
              });
          }
        }
        ResetTreatmentEntry=()=>{
            Keyboard.dismiss();
            this.setState({
                TreatmentEntryDetail:{ }
                }) 
        }
    render(){
            return(        
                  
            <Container>
                   <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('ChickenTreatmentList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chicken Treatment Detail</Title>
                    </Body>
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
                    <Footer style={{backgroundColor:'white'}}>
                        <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                            <View style={{width:'50%'}}>
                                <Button success block rounded onPress={this.ResetTreatmentEntry} style={{width:'100%',justifyContent:'center'}}>
                                    <Text style={{color:'white'}} >Reset</Text>
                                </Button>
                            </View>
                            <View style={{width:'50%', alignItems:'flex-end'}}>
                                <Button primary block rounded onPress={this.SaveTreatmentEntry} style={{width:'100%',justifyContent:'center'}}>
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
