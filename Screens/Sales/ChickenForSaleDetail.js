import React, { Component } from 'react';
import { View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity,ActivityIndicator, Image,Keyboard,ToastAndroid } from 'react-native';

import { StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';
import services from './Services'
import axios from 'axios';
import styles from '../stylesheet';

var ImagePicker = NativeModules.ImageCropPicker;
  
export default class ChickenForSaleDetail extends Component{
    static navigationOptions={
        title : 'Animal For Sale',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        drawerLabel: () => null
    }
    
    componentDidMount() {
        services.GetAnimalForSale(this.props.navigation.state.params.SaleID)
        .then(function (response) {
            if(response.data!=null)
            {
                var dtls = response.data.animalForSale;
                var astatus = {};
                for(let i=0;i<response.data.animalProfile.length;i++)
                {
                    astatus[response.data.animalProfile[i].AnimalCode] = response.data.animalProfile[i].AnimalName;
                }
                var gender = {};
                this.setState({
                    AnimalForSaleDetails: dtls,
                    lstAnimalCode: t.enums(astatus),
                    imageLink: axios.defaults.baseURL+'/Uploads/'+response.data.animalForSale.FarmID+'/AnimalForSale/'+response.data.animalForSale.SaleID+'/'+response.data.animalForSale.AnimalPhoto
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
            AnimalForSaleDetails:{
                SaleID:null,
                AnimalCode:null,
                AnimalAge:null,
                Breed:null,
                SireCode:null,
                BreederCode:null,
                Talents:null,
                Weight:null,
                FightingRecord:null,
                IsShowStandardPrice:null,
                AnimalPhoto:null,
                IsActive:null,
                FileName:null
            },
            isPhoto:false,
            isLoading:false,
            imageLink:null,
            lstAnimalCode:t.enums({}),
            options:{
                fields:{
               
                    AnimalCode:{
                        label: 'Animal Name',
                         nullOption: {value: '', text: 'Select'} 
                    },
                    AnimalAge:{
                        label: 'Animal Age',
                        placeholder:'Animal Age'                       
                    },
                   
                    SireCode:{
                        label: 'Sire Code',
                        placeholder:'Sire Code'                       
                    },
                   
                    BreederCode:{
                        label: 'Breeder Code',
                        placeholder:'Breeder Code'
                    },
                    Breed:{
                        label: 'Breed',
                        placeholder:'Breed'
                    },
                    Talents:{
                        label: 'Talents',
                        placeholder:'Talents'
                    },
                    Weight:{
                        label: 'Weight',
                        placeholder:'Weight'
                    },
                    FightingRecord:{
                        label: 'Fighting Record',
                        placeholder:'Fighting Record'
                    },
                    IsShowStandardPrice:{
                        label: 'Standard Price'
                    }
                }
            }
        }
    }

    AnimalForSaleDetails() { 
        return ( 
            t.struct({
                AnimalCode:this.state.lstAnimalCode, 
                AnimalAge:t.Number,  
                Breed:t.String, 
                SireCode:t.Number,      
                BreederCode:t.Number,
                Talents:t.String,       
                Weight:t.Number,       
                FightingRecord:t.String,
                IsShowStandardPrice:t.Boolean
            })
        )
    }

    onChange = (AnimalForSaleDetails) => {
        if(AnimalForSaleDetails.AnimalCode!="")
        {
            services.GetAnimalCodeList(AnimalForSaleDetails.AnimalCode)
            .then(function (response) { 
            if(response.data.age!=null){
               this.setState({
                AnimalForSaleDetails:{
                    SaleID:AnimalForSaleDetails.SaleID,
                    AnimalCode:AnimalForSaleDetails.AnimalCode,
                    AnimalAge:response.data.age,
                    Breed:AnimalForSaleDetails.Breed,
                    SireCode:AnimalForSaleDetails.SireCode,
                    BreederCode:AnimalForSaleDetails.BreederCode,
                    Talents:AnimalForSaleDetails.Talents,
                    Weight:AnimalForSaleDetails.Weight,
                    FightingRecord:AnimalForSaleDetails.FightingRecord,
                    IsShowStandardPrice:AnimalForSaleDetails.IsShowStandardPrice,
                    IsActive:AnimalForSaleDetails.IsActive,
                    FileName:AnimalForSaleDetails.FileName
                },
                isPhoto:true
               })
            }
                
            }.bind(this))
            .catch(function (error) {
            console.log(error);
        });
        }
        else{
            this.setState({
                AnimalForSaleDetails:{
                    SaleID:AnimalForSaleDetails.SaleID,
                    AnimalCode:AnimalForSaleDetails.AnimalCode,
                    AnimalAge:null,
                    Breed:AnimalForSaleDetails.Breed,
                    SireCode:AnimalForSaleDetails.SireCode,
                    BreederCode:AnimalForSaleDetails.BreederCode,
                    Talents:AnimalForSaleDetails.Talents,
                    Weight:AnimalForSaleDetails.Weight,
                    FightingRecord:AnimalForSaleDetails.FightingRecord,
                    IsShowStandardPrice:AnimalForSaleDetails.IsShowStandardPrice,
                    IsActive:AnimalForSaleDetails.IsActive,
                    FileName:AnimalForSaleDetails.FileName
                },
                isPhoto:true
               })
        }

       // this.setState({AnimalForSaleDetails: AnimalForSaleDetails });
    }
    
    cleanupImages() {
        this.setState({
            AnimalForSaleDetails:{  
                SaleID:this.state.AnimalForSaleDetails.SaleID,
                AnimalCode:this.state.AnimalForSaleDetails.AnimalCode,
                AnimalAge:this.state.AnimalForSaleDetails.AnimalAge,
                Breed:this.state.AnimalForSaleDetails.Breed,
                SireCode:this.state.AnimalForSaleDetails.SireCode,
                BreederCode:this.state.AnimalForSaleDetails.BreederCode,
                Talents:this.state.AnimalForSaleDetails.Talents,
                Weight:this.state.AnimalForSaleDetails.Weight,
                FightingRecord :this.state.AnimalForSaleDetails.FightingRecord,
                IsShowStandardPrice :this.state.AnimalForSaleDetails.IsShowStandardPrice,
                AnimalPhoto: null,
                FileName:null
            },
            isPhoto:false
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
            AnimalForSaleDetails:{
                SaleID:this.state.AnimalForSaleDetails.SaleID,
                AnimalCode:this.state.AnimalForSaleDetails.AnimalCode,
                AnimalAge:this.state.AnimalForSaleDetails.AnimalAge,
                Breed:this.state.AnimalForSaleDetails.Breed,
                SireCode:this.state.AnimalForSaleDetails.SireCode,
                BreederCode:this.state.AnimalForSaleDetails.BreederCode,
                Talents:this.state.AnimalForSaleDetails.Talents,
                Weight:this.state.AnimalForSaleDetails.Weight,
                FightingRecord :this.state.AnimalForSaleDetails.FightingRecord,
                IsShowStandardPrice :this.state.AnimalForSaleDetails.IsShowStandardPrice,
                AnimalPhoto: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
                FileName: image.data

                // AnimalPhoto: images.map(i => {
                //     console.log('received image', i);
                //     return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                // })
            },
            isPhoto:true
          });
        }).catch(e => alert(e));
    }

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
        
    renderAsset(image) {
        return this.renderImage(image);
    }
    SaveAnimalForSale=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
          var data = {
                 SaleID:this.state.AnimalForSaleDetails.SaleID,
                AnimalCode:this.state.AnimalForSaleDetails.AnimalCode,
                AnimalAge:this.state.AnimalForSaleDetails.AnimalAge,
                Breed:this.state.AnimalForSaleDetails.Breed,
                SireCode:this.state.AnimalForSaleDetails.SireCode,
                BreederCode:this.state.AnimalForSaleDetails.BreederCode,
                Talents:this.state.AnimalForSaleDetails.Talents,
                Weight:this.state.AnimalForSaleDetails.Weight,
                FightingRecord :this.state.AnimalForSaleDetails.FightingRecord,
                IsShowStandardPrice :this.state.AnimalForSaleDetails.IsShowStandardPrice,
               FileName:this.state.AnimalForSaleDetails.FileName,
          }
     
          services.SaveAnimalForSale(data)
            .then(function (response) { 
                this.setState({
                    isLoading: true
                });
              //if(data.FarmID!=0){
                  //alert('Animal profile saved successfully.')
                  ToastAndroid.showWithGravity(
                    'Animal For Sale saved successfully...',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                  );
                  this.props.navigation.navigate('ChickenForSaleList');
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
    ResetAnimalForSale=()=>{
        Keyboard.dismiss();
        this.setState({
            AnimalForSaleDetails:{ }
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('ChickenForSaleList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Animal For Sale Details</Title>
                        </View>
                    </Body>
                    <Right></Right>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AnimalForSaleDetails()}
                            options={this.state.options}
                            value={this.state.AnimalForSaleDetails}
                            onChange={this.onChange}
                        />
                        <TouchableOpacity onPress={this.state.isPhoto ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={styles.marginbottom_10}>
                            <Text style={styles.blue}>{this.state.isPhoto ? 'Clear Photo' : 'Select Photo'}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {/* this.state.ChickenProfileDetails.AnimalPhoto ? this.state.ChickenProfileDetails.AnimalPhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null */}
                            {(this.state.AnimalForSaleDetails.AnimalPhoto ? this.renderAsset(this.state.AnimalForSaleDetails.AnimalPhoto) : null)}
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />
                        </ScrollView>
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetAnimalForSale}>
                                <Text style={styles.white} >Reset</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SaveAnimalForSale}>
                                <Text style={styles.white}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}
