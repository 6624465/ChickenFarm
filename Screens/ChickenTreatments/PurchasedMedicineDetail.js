import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';
import moment from 'moment';
import axios from 'axios';
import services from './Services';
import styles from '../stylesheet';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;

export default class PurchasedMedicineDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }

    componentDidMount() {
        services.GetMedicineMaster(this.props.navigation.state.params.MedicineCode)
        .then(function (response) {
            if(response.data!=null)
            {
                var dtls = response.data.medicineMaster;
                dtls.PurchaseDate = dtls.PurchaseDate != null ? moment(dtls.PurchaseDate).toDate() : null;
                dtls.ExpiryDate = dtls.ExpiryDate != null ? moment(dtls.ExpiryDate).toDate() : null;

                this.setState({
                    PurchasedMedicineDetails: dtls,
                   // imageLink: axios.defaults.baseURL+'/Uploads/'+response.data.medicineMaster.FarmID+'/MedicineMaster/'+response.data.medicineMaster.MedicineCode+'/'+response.data.medicineMaster.Photo
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
            PurchasedMedicineDetails:{
                MedicineCode:null,
                MedicineName:null,
                MedicineType:null,
                MedicineCompany:null,
                PurchaseDate:null,
                ExpiryDate:null,
                BatchNo:null,
                Supplier:null,
                Quantity:null,
                Photo:null,
               // FileName:null
            },
           // isMedicinePhoto:false,
           // imageLink:null,
        },

        this.PurchasedMedicine=t.struct({
           // MedicineCode:t.String,
            MedicineName:t.String,
            MedicineType:t.String,
            MedicineCompany:t.String,
            PurchaseDate:t.Date,
            ExpiryDate:t.Date,
            BatchNo:t.String,
            Supplier:t.String,
            Quantity:t.Number,
           
            //MedicinePhoto:t.String
        }),

        this.AddPurchasedMedicineOptions={
            fields:{
                // MedicineCode:{
                //     label: 'Medicine Code',
                //     placeholder:'Medicine Code'
                // },
                MedicineName:{
                    label: 'Medicine Name',
                    placeholder:'Medicine Name'                
                },
                MedicineType:{
                    label: 'Medicine Type',
                    placeholder:'Medicine Type'                
                },
                MedicineCompany:{
                    label: 'Medicine Company',
                    placeholder:'Medicine Company'                
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
    
    onChange = (PurchasedMedicineDetails) => {
        this.setState({PurchasedMedicineDetails});
    }    

    // cleanupImages() {
    //     this.setState({
    //         PurchasedMedicineDetails:{    
    //             MedicineCode:this.state.PurchasedMedicineDetails.MedicineCode,
    //             MedicineName:this.state.PurchasedMedicineDetails.MedicineName,
    //             MedicineType:this.state.PurchasedMedicineDetails.MedicineType,
    //             MedicineCompany:this.state.PurchasedMedicineDetails.MedicineCompany,
    //             PurchaseDate:this.state.PurchasedMedicineDetails.PurchaseDate,
    //             ExpiryDate:this.state.PurchasedMedicineDetails.ExpiryDate,
    //             BatchNo:this.state.PurchasedMedicineDetails.BatchNo,
    //             Supplier:this.state.PurchasedMedicineDetails.Supplier,
    //             Quantity:this.state.PurchasedMedicineDetails.Quantity,
    //             Photo:null,
    //             FileName:null
    //         },
    //         isMedicinePhoto:false
    //     });
    // }
    
    // pickMultiple() {
    //     ImagePicker.openPicker({
    //         //multiple: true,
    //         waitAnimationEnd: false,
    //         includeExif: true,
    //         includeBase64: true,
    //     }).then(image => {
    //         this.setState({
    //             PurchasedMedicineDetails:{
    //                 MedicineCode:this.state.PurchasedMedicineDetails.MedicineCode,
    //                 MedicineName:this.state.PurchasedMedicineDetails.MedicineName,
    //                 MedicineType:this.state.PurchasedMedicineDetails.MedicineType,
    //                 MedicineCompany:this.state.PurchasedMedicineDetails.MedicineCompany,
    //                 PurchaseDate:this.state.PurchasedMedicineDetails.PurchaseDate,
    //                 ExpiryDate:this.state.PurchasedMedicineDetails.ExpiryDate,
    //                 BatchNo:this.state.PurchasedMedicineDetails.BatchNo,
    //                 Supplier:this.state.PurchasedMedicineDetails.Supplier,
    //                 Quantity:this.state.PurchasedMedicineDetails.Quantity,

    //                 Photo: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
    //                 FileName: image.data
                
    //                 // Photo: images.map(i => {
    //                 //     console.log('received image', i);
    //                 //     return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
    //                 // })
    //             },
    //             isMedicinePhoto:true
    //         });
    //     }).catch(e => alert(e));
    // }

    // renderImage(image) {
    //     return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    // }
        
    // renderAsset(image) {
    //     return this.renderImage(image);
    // }



    SaveMedicineMaster=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            var data = {
                MedicineCode:this.state.PurchasedMedicineDetails.MedicineCode,
                MedicineName:this.state.PurchasedMedicineDetails.MedicineName,
                MedicineType:this.state.PurchasedMedicineDetails.MedicineType,
                MedicineCompany:this.state.PurchasedMedicineDetails.MedicineCompany,
                PurchaseDate:this.state.PurchasedMedicineDetails.PurchaseDate,
                ExpiryDate:this.state.PurchasedMedicineDetails.ExpiryDate,
                BatchNo:this.state.PurchasedMedicineDetails.BatchNo,
                Supplier:this.state.PurchasedMedicineDetails.Supplier,
                Quantity:this.state.PurchasedMedicineDetails.Quantity,
                //FileName:this.state.PurchasedMedicineDetails.FileName,
            }
     
            services.SaveMedicineMaster(data)
                .then(function (response) { 
                //if(response.data!=0){
                    alert('Medicine profile saved successfully.')
                    this.props.navigation.navigate('PurchasedMedicineList');
                //}
                    
                }.bind(this))
                .catch(function (error) {
                console.log(error);
            });
        }
    }

    ResetMedicineMaster=()=>{
        Keyboard.dismiss();
        this.setState({
            PurchasedMedicineDetails:{ }
        })
    }
    render(){
        return(                  
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('PurchasedMedicineList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Purchased Medicine</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.PurchasedMedicine}
                            options={this.AddPurchasedMedicineOptions}
                            value={this.state.PurchasedMedicineDetails}
                            onChange={this.onChange}
                        />
                        {/* <TouchableOpacity onPress={this.state.isMedicinePhoto ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isMedicinePhoto ? 'Clear Photo' : 'Select Photo'}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {(this.state.PurchasedMedicineDetails.Photo ? this.renderAsset(this.state.PurchasedMedicineDetails.Photo) : null)}
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />
                           
                        </ScrollView> */}
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetMedicineMaster}>
                                <Text style={styles.white} >Reset</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SaveMedicineMaster}>
                                <Text style={styles.white}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>                    
            </Container>
        );
    }
}