import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';
import moment from 'moment';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;


export default class AddPurchasedVaccine extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    constructor()
    {
        super();
        this.state ={
            PurchasedVaccineDetails:{
                Vaccine:null,
                DateOfPurchased:null,
                ExpiryDate:null,
                BatchNumberOfVaccine:null,
                QuantityPurchased:null,
                SuppliedBy:null,
                MedicinePhoto:null,
            },
            isMedicinePhoto:false
        },

        this.PurchasedVaccine=t.struct({
            Vaccine:t.String,
            DateOfPurchased:t.Date,
            ExpiryDate:t.Date,
            BatchNumberOfVaccine:t.String,
            QuantityPurchased:t.Number,
            SuppliedBy:t.String,
            //MedicinePhoto:t.String
        }),

        this.AddPurchasedVaccineOptions={
            fields:{
                Vaccine:{
                    label: 'Vaccine',
                    placeholder:'Vaccine',
                    //error:'Please Enter Your Full Name'                
                },
                DateOfPurchased:{
                    label: 'Date Of Purchased',
                    placeholder:'Date Of Purchased',
                    // minimumDate: new Date(),
                    mode: 'date',
                    config: {
                        format: (date) => String(moment(date).format("MM/DD/YYYY")),
                    }                    
                    //error:'Please Enter Farm Address'                
                },
                ExpiryDate:{
                    label: 'Expiry Date',
                    placeholder:'Expiry Date',
                    // minimumDate: new Date(),
                    mode: 'date',
                    config: {
                        format: (date) => String(moment(date).format("MM/DD/YYYY")),
                    }
                    //error:'Please Enter Tel/Line Number'                
                },
                BatchNumberOfVaccine:{
                    label: 'Batch Number Of Vaccine',
                    placeholder:'Batch Number Of Vaccine',
                    // error:'Please Enter Your Full Name'                
                },
                QuantityPurchased:{
                    label: 'Quantity Purchased',
                    placeholder:'Quantity Purchased',
                    //error:'Please Enter Tel/Line Number'                
                },
                SuppliedBy:{
                    label: 'Supplied By',
                    placeholder:'Supplied By',
                    // error:'Please Enter Your Full Name'                
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
                Vaccine:this.state.PurchasedVaccineDetails.Vaccine,
                DateOfPurchased:this.state.PurchasedVaccineDetails.DateOfPurchased,
                ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                BatchNumberOfVaccine:this.state.PurchasedVaccineDetails.BatchNumberOfVaccine,
                QuantityPurchased:this.state.PurchasedVaccineDetails.QuantityPurchased,
                SuppliedBy:this.state.PurchasedVaccineDetails.SuppliedBy,

                MedicinePhoto:null
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
        debugger;
        this.setState({
            PurchasedVaccineDetails:{
                Vaccine:this.state.PurchasedVaccineDetails.Vaccine,
                DateOfPurchased:this.state.PurchasedVaccineDetails.DateOfPurchased,
                ExpiryDate:this.state.PurchasedVaccineDetails.ExpiryDate,
                BatchNumberOfVaccine:this.state.PurchasedVaccineDetails.BatchNumberOfVaccine,
                QuantityPurchased:this.state.PurchasedVaccineDetails.QuantityPurchased,
                SuppliedBy:this.state.PurchasedVaccineDetails.SuppliedBy,

                MedicinePhoto: images.map(i => {
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
