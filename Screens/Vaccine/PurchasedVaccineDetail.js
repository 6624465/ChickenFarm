import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';
import moment from 'moment';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;

    import axios from 'axios';
    import services from './Services';

export default class PurchasedVaccineDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor(props)
    {
        super(props);
        this.state ={
            PurchasedVaccineDetails:{
                VaccineCode:null,
                VaccineName:null,
                PurchaseDate:null,
                ExpiryDate:null,
                BatchNo:null,
                Supplier:null,
                Quantity:null,
                Photo:null
            },
            isMedicinePhoto:false
        },

        this.PurchasedVaccine=t.struct({
           // VaccineCode:t.String,
            VaccineName:t.String,
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
        // ImagePicker.clean().then(() => {

        //   console.log('removed tmp images from tmp directory');
        // }).catch(e => {
        //   alert(e);
        // });

        this.setState({
            PurchasedVaccineDetails:{    
                VaccineCode:this.state.PurchasedVaccineDetails.VaccineCode,
                VaccineName:this.state.PurchasedVaccineDetails.VaccineName,
                PurchaseDate:this.state.PurchasedVaccineDetails.PurchaseDate,
                ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                BatchNo:this.state.PurchasedVaccineDetails.BatchNo,
                Supplier:this.state.PurchasedVaccineDetails.Supplier,
                Quantity:this.state.PurchasedVaccineDetails.Quantity,
                Photo:null
            },
            isMedicinePhoto:false
        });
    }
    
    pickMultiple() {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
        }).then(images => {
        this.setState({
            PurchasedVaccineDetails:{
                VaccineCode:this.state.PurchasedVaccineDetails.VaccineCode,
                VaccineName:this.state.PurchasedVaccineDetails.VaccineName,
                PurchaseDate:this.state.PurchasedVaccineDetails.PurchaseDate,
                ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                BatchNo:this.state.PurchasedVaccineDetails.BatchNo,
                Supplier:this.state.PurchasedVaccineDetails.Supplier,
                Quantity:this.state.PurchasedVaccineDetails.Quantity,
               
                Photo: images.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
            },
            isMedicinePhoto:true
          });
        }).catch(e => alert(e));
    }

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
        
    renderAsset(image) {
        // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
        //   return this.renderVideo(image);
        // }

        return this.renderImage(image);
    }


    componentDidMount() {
        services.GetVaccineMaster(this.props.navigation.state.params.VaccineCode, 0)
        .then(function (response) {
            if(response.data!=null)
            {
                var dtls = response.data.vaccineMaster;
                dtls.PurchaseDate = dtls.PurchaseDate != null ? moment(dtls.PurchaseDate).toDate() : null;
                dtls.ExpiryDate = dtls.ExpiryDate != null ? moment(dtls.ExpiryDate).toDate() : null;

                this.setState({
                    PurchasedVaccineDetails: dtls,
                  //  imageLink: axios.defaults.baseURL+'/Uploads/AnimalProfile/'+response.data.animalProfile.AnimalCode+'/'+response.data.animalProfile.AnimalPhoto
                });
            }
        
            console.log(this.state.imageLink);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
    }


    SaveVaccineMaster=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
          var data = {
            VaccineCode:this.state.PurchasedVaccineDetails.VaccineCode,
            VaccineName:this.state.PurchasedVaccineDetails.VaccineName,
            PurchaseDate:this.state.PurchasedVaccineDetails.PurchaseDate,
            ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
            BatchNo:this.state.PurchasedVaccineDetails.BatchNo,
            Supplier:this.state.PurchasedVaccineDetails.Supplier,
            Quantity:this.state.PurchasedVaccineDetails.Quantity
           
          }
     
          services.SaveVaccineMaster(data)
            .then(function (response) { 
              //if(response.data!=0){
                  alert('Vaccine profile saved successfully.')
                  this.props.navigation.navigate('ChickenProfileList');
              //}
                   
            }.bind(this))
            .catch(function (error) {
              console.log(error);
          });
      }
        
    }
    ResetVaccineMaster=()=>{

        Keyboard.dismiss();
        this.setState({
            PurchasedVaccineDetails:{ }
            })
    }
    render(){
        return(                  
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('PurchasedVaccineList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Purchased Vaccine</Title>
                    </Body>
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
                            {/* {this.state.value.image ? this.renderAsset(this.state.value.image) : null} */}
                            {this.state.PurchasedVaccineDetails.MedicinePhoto ? this.state.PurchasedVaccineDetails.MedicinePhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
                        </ScrollView>
                    </View>
                </Content>
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success block rounded onPress={this.ResetVaccineMaster} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SaveVaccineMaster} style={{width:'100%',justifyContent:'center'}}>
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
