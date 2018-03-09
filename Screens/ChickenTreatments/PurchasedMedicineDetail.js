import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';
var ImagePicker = NativeModules.ImageCropPicker;

export default class PurchasedMedicineDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
            constructor()
                 {
                super();
                this.state ={
                    AddPurchasedMedicine:{
                        AddNewMedicine:null,
                        DateOfPurchased:null,
                        BatchNumberOfMedicine:null,
                        QuantityPurchased:null,
                        SuppliedBy:null,
                        AddMedicinePhoto:null
                    },
                    isLogo:false
                },
                this.AddPurchasedMedicine=t.struct({
                AddNewMedicine:t.String,
                DateOfPurchased:t.Date,
                BatchNumberOfMedicine:t.String,
                QuantityPurchased:t.Number,
                SuppliedBy:t.String,
                //AddMedicinePhoto:t.String
                })
                this.AddPurchasedMedicineOptions={
                    fields:{
                        AddNewMedicine:{
                            label: 'Add New Medicine',
                            placeholder:'Add New Medicine',
                            //error:'Please Enter Your Full Name'
                        
                        },
                        BatchNumberOfMedicine:{
                            label: 'Batch Number Of Medicine',
                            placeholder:'Batch Number Of Medicine',
                            //error:'Please Enter Farm Address'
                        
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
                        
                        },
                        DateOfPurchased:{
                            label: 'Date Of Purchased',
                            //minimumDate: new Date(),
                            mode: 'date',
                            config: {
                              format: (date) => String(moment(date).format("MM/DD/YYYY")),
                            }
                            //error:'Please Enter Tel/Line Number'
                        
                        }
                    }
                }
        }
        onChange = (AddPurchasedMedicine) => {
            this.setState({AddPurchasedMedicine});
        }
    
        cleanupImages() {
            // ImagePicker.clean().then(() => {
    
            //   console.log('removed tmp images from tmp directory');
            // }).catch(e => {
            //   alert(e);
            // });
    
            this.setState({
                AddPurchasedMedicine:{    
                    AddNewMedicine:this.state.AddPurchasedMedicine.AddNewMedicine,
                    DateOfPurchased:this.state.AddPurchasedMedicine.DateOfPurchased,
                    BatchNumberOfMedicine:this.state.AddPurchasedMedicine.BatchNumberOfMedicine,
                    QuantityPurchased:this.state.AddPurchasedMedicine.QuantityPurchased,
                    SuppliedBy:this.state.AddPurchasedMedicine.SuppliedBy,
    
                    AddMedicinePhoto: null
                },
                isLogo:false
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
                AddPurchasedMedicine:{
                    AddNewMedicine:this.state.AddPurchasedMedicine.AddNewMedicine,
                    DateOfPurchased:this.state.AddPurchasedMedicine.DateOfPurchased,
                    BatchNumberOfMedicine:this.state.AddPurchasedMedicine.BatchNumberOfMedicine,
                    QuantityPurchased:this.state.AddPurchasedMedicine.QuantityPurchased,
                    SuppliedBy:this.state.AddPurchasedMedicine.SuppliedBy,
    
                    AddMedicinePhoto: images.map(i => {
                        console.log('received image', i);
                        return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                    })
                },
                isLogo:true
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
                            <Button transparent onPress={()=>this.props.navigation.navigate('PurchasedMedicineList')}>
                                <Icon name='arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Purchased Medicine Detail</Title>
                        </Body>
                  </Header>

                    <Content>
                       <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddPurchasedMedicine}
                            options={this.AddPurchasedMedicineOptions}
                            value={this.state.AddPurchasedMedicine}
                            onChange={this.onChange}
                        />
                          <TouchableOpacity onPress={this.state.isLogo ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isLogo ? 'Clear Medicine Photo' : 'Select Medicine Photo'}</Text>
                        </TouchableOpacity>


                        <ScrollView>
                            {this.state.AddPurchasedMedicine.AddMedicinePhoto ? this.state.AddPurchasedMedicine.AddMedicinePhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
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
                                <Button primary onPress={this.SaveFarmProfile} style={{width:'100%',justifyContent:'center'}}>
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
