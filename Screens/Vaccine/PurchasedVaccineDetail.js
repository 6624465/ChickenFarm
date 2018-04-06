import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard,ActivityIndicator,ToastAndroid} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer ,Right} from 'native-base';
import moment from 'moment';
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;

export default class PurchasedVaccineDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetVaccineMaster(this.props.navigation.state.params.VaccineCode)
        .then(function (response) {
            if(response.data!=null)
            {
                var dtls = response.data.vaccineMaster;
                dtls.PurchaseDate = dtls.PurchaseDate != null ? moment(dtls.PurchaseDate).toDate() : null;
                dtls.ExpiryDate = dtls.ExpiryDate != null ? moment(dtls.ExpiryDate).toDate() : null;

                this.setState({
                    PurchasedVaccineDetails: dtls,
                    imageLink: axios.defaults.baseURL+'/Uploads/'+response.data.vaccineMaster.FarmID+'/VaccineMaster/'+response.data.vaccineMaster.VaccineCode+'/'+response.data.vaccineMaster.Photo
                });
            }
        
            console.log(this.state.imageLink);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }

    constructor(props)
    {
        super(props);
        this.state ={
            PurchasedVaccineDetails:{
                VaccineCode:null,
                VaccineName:null,
                VaccineType:null,
                VaccineCompany:null,
                PurchaseDate:null,
                ExpiryDate:null,
                BatchNo:null,
                Supplier:null,
                Quantity:null,
                Photo:null,
                FileName:null
            },
            isMedicinePhoto:false,
            imageLink:null,
            isLoading:false
        },

        this.PurchasedVaccine=t.struct({
           // VaccineCode:t.String,
            VaccineName:t.String,
            VaccineType:t.String,
            VaccineCompany:t.String,
            PurchaseDate:t.Date,
            ExpiryDate:t.Date,
            BatchNo:t.String,
            Supplier:t.String,
            Quantity:t.Number,
           
            //MedicinePhoto:t.String
        }),

        this.AddPurchasedVaccineOptions={
            fields:{
                // VaccineCode:{
                //     label: 'Vaccine Code',
                //     placeholder:'Vaccine Code'
                // },
                VaccineName:{
                    label: 'Vaccine Name',
                    placeholder:'Vaccine Name'                
                },
                VaccineType:{
                    label: 'Vaccine Type',
                    placeholder:'Vaccine Type'                
                },
                VaccineCompany:{
                    label: 'Vaccine Company',
                    placeholder:'Vaccine Company'                
                },
                PurchaseDate:{
                    label: 'Purchase Date',
                    placeholder:'Purchase Date',
                    // minimumDate: new Date(),
                    mode: 'date',
                    config: {
                        format: (date) => String(moment(date).format("MM/DD/YYYY")),
                    }            
                },
                ExpiryDate:{
                    label: 'Expiry Date',
                    placeholder:'Expiry Date',
                    // minimumDate: new Date(),
                    mode: 'date',
                    config: {
                        format: (date) => String(moment(date).format("MM/DD/YYYY")),
                    }
                                 
                },
                BatchNo:{
                    label: 'Batch No',
                    placeholder:'BatchNo'
                                
                },
                Quantity:{
                    label: 'Quantity ',
                    placeholder:'Quantity '
                                
                },
                Supplier:{
                    label: 'Supplied By',
                    placeholder:'Supplied By',
                                
                }
            }
        }
    }
    
    onChange = (PurchasedVaccineDetails) => {
        this.setState({PurchasedVaccineDetails});
    }    

    cleanupImages() {
        this.setState({
            PurchasedVaccineDetails:{    
                VaccineCode:this.state.PurchasedVaccineDetails.VaccineCode,
                VaccineName:this.state.PurchasedVaccineDetails.VaccineName,
                VaccineType:this.state.PurchasedVaccineDetails.VaccineType,
                VaccineCompany:this.state.PurchasedVaccineDetails.VaccineCompany,
                PurchaseDate:this.state.PurchasedVaccineDetails.PurchaseDate,
                ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                BatchNo:this.state.PurchasedVaccineDetails.BatchNo,
                Supplier:this.state.PurchasedVaccineDetails.Supplier,
                Quantity:this.state.PurchasedVaccineDetails.Quantity,
                Photo:null,
                FileName:null
            },
            isMedicinePhoto:false
        });
    }
    
    pickMultiple() {
        ImagePicker.openPicker({
            //multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            includeBase64: true,
        }).then(image => {
            this.setState({
                PurchasedVaccineDetails:{
                    VaccineCode:this.state.PurchasedVaccineDetails.VaccineCode,
                    VaccineName:this.state.PurchasedVaccineDetails.VaccineName,
                    VaccineType:this.state.PurchasedVaccineDetails.VaccineType,
                    VaccineCompany:this.state.PurchasedVaccineDetails.VaccineCompany,
                    PurchaseDate:this.state.PurchasedVaccineDetails.PurchaseDate,
                    ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                    BatchNo:this.state.PurchasedVaccineDetails.BatchNo,
                    Supplier:this.state.PurchasedVaccineDetails.Supplier,
                    Quantity:this.state.PurchasedVaccineDetails.Quantity,

                    Photo: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
                    FileName: image.data
                
                    // Photo: images.map(i => {
                    //     console.log('received image', i);
                    //     return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                    // })
                },
                isMedicinePhoto:true
            });
        }).catch(e => alert(e));
    }

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
        
    renderAsset(image) {
        return this.renderImage(image);
    }



    SaveVaccineMaster=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
            var data = {
                VaccineCode:this.state.PurchasedVaccineDetails.VaccineCode,
                VaccineName:this.state.PurchasedVaccineDetails.VaccineName,
                VaccineType:this.state.PurchasedVaccineDetails.VaccineType,
                VaccineCompany:this.state.PurchasedVaccineDetails.VaccineCompany,
                PurchaseDate:this.state.PurchasedVaccineDetails.PurchaseDate,
                ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                BatchNo:this.state.PurchasedVaccineDetails.BatchNo,
                Supplier:this.state.PurchasedVaccineDetails.Supplier,
                Quantity:this.state.PurchasedVaccineDetails.Quantity,
                FileName:this.state.PurchasedVaccineDetails.FileName,
            }
     
            services.SaveVaccineMaster(data)
                .then(function (response) {
                    this.setState({
                        isLoading: true
                    }); 
                //if(response.data!=0){
                    //alert('Vaccine profile saved successfully.')
                    ToastAndroid.showWithGravity(
                        'Saved successfully...',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    this.props.navigation.navigate('PurchasedVaccineList');
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

    ResetVaccineMaster=()=>{
        Keyboard.dismiss();
        this.setState({
            PurchasedVaccineDetails:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('PurchasedVaccineList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Purchased Vaccine</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.PurchasedVaccine}
                            options={this.AddPurchasedVaccineOptions}
                            value={this.state.PurchasedVaccineDetails}
                            onChange={this.onChange}
                        />
                        <TouchableOpacity onPress={this.state.isMedicinePhoto ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isMedicinePhoto ? 'Clear Photo' : 'Select Photo'}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {(this.state.PurchasedVaccineDetails.Photo ? this.renderAsset(this.state.PurchasedVaccineDetails.Photo) : null)}
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />
                           
                        </ScrollView>
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetVaccineMaster}>
                                <Text style={styles.white} >Reset</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SaveVaccineMaster}>
                                <Text style={styles.white}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>                    
            </Container>
        );
    }
}