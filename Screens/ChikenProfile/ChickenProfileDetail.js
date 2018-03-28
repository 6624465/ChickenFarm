import React, { Component } from 'react';
import { View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard } from 'react-native';

import { StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';
import services from './Services'
import axios from 'axios';
import styles from '../stylesheet';

var ImagePicker = NativeModules.ImageCropPicker;
  
export default class ChickenProfileDetail extends Component{
    static navigationOptions={
        title : 'Chicken Profile Details',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        drawerLabel: () => null
    }
    
    componentDidMount() {
        services.GetAnimalProfile(this.props.navigation.state.params.animalCode)
        .then(function (response) {
            if(response.data!=null)
            {
                var dtls = response.data.animalProfile;
                dtls.DateOfBirth = dtls.DateOfBirth != null ? moment(dtls.DateOfBirth).toDate() : null;

                var astatus = {};
                for(let i=0;i<response.data.animalStatus.length;i++)
                {
                    astatus[response.data.animalStatus[i].LookupID] = response.data.animalStatus[i].LookupDescription;
                }
                var gender = {};
                for(let i=0;i<response.data.gender.length;i++)
                {
                    gender[response.data.gender[i].LookupID] = response.data.gender[i].LookupDescription;
                }

                this.setState({
                    ChickenProfileDetails: dtls,
                    lstChickenStatus: t.enums(astatus),
                    lstGender: t.enums(gender),
                    imageLink: axios.defaults.baseURL+'/Uploads/'+response.data.animalProfile.FarmID+'/AnimalProfile/'+response.data.animalProfile.AnimalCode+'/'+response.data.animalProfile.AnimalPhoto
                });
            }
            //alert(this.state.status+'<<<<>>>>'+response.data.registration.IsOTPVerified);
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
            ChickenProfileDetails:{
                AnimalName:null,
                AnimalCode:null,
                AnimalSymbol:null,
                AnimalStatus:null,
                CauseOfDeath:null,
                DateOfBirth:null,
                Gender:null,
                SireCode:null,
                BreederCode:null,
                BreederFormula:null,
                Talents:null,
                Weight:null,
                FightingRecord :null,
                StandardPrice :null,
                Remarks :null,
                AnimalPhoto:null,
                FileName:null
            },
            isPhoto:false,
            imageLink:null,
            lstChickenStatus:t.enums({}),
            lstGender:t.enums({}),
            options:{
                fields:{
               
                    AnimalName:{
                        label: 'Name',
                        placeholder:'Name'                     
                    },
                    // AnimalCode:{
                    //     label: 'Code',
                    //     placeholder:'Code',
                    //     // error:'Please Enter ChikenCode'                        
                    // },
                    AnimalSymbol:{
                        label: 'Symbol',
                        placeholder:'Symbol'                       
                    },
                    AnimalStatus:{
                        label: 'Choose Staues' ,
                         nullOption: {value: '', text: 'Select'}                     
                    },
                    CauseOfDeath:{
                        label: 'Cause Of Death',
                        placeholder:'CauseOfDeath',
                        editable: false,
                        hidden: true                    
                    },
                    Gender:{
                        label: 'Gender',
                        nullOption: {value: '', text: 'Select'}                        
                    },
                    SireCode:{
                        label: 'Sire Code',
                        placeholder:'Sire Code'                       
                    },
                    DateOfBirth: {
                        label: 'Date Of Birth:',
                        placeholder: 'Date Of Birth',
                        mode: 'date',
                        config: {
                            format: (date) => String(moment(date).format("MM/DD/YYYY")),
                        }
                    },
                    BreederCode:{
                        label: 'Breeder Code',
                        placeholder:'Breeder Code'
                    },
                    BreederFormula:{
                        label: 'Breeder Formula',
                        placeholder:'Breeder Formula'
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
                    StandardPrice:{
                        label: 'Standard Price',
                        placeholder:'Standard Price'
                    },
                    Remarks:{
                        label: 'Remarks',
                        placeholder:'Remarks'
                    }
                }
            }
        }
    }

    AddChickenProfile() { 
        return ( 
            t.struct({
                AnimalName:t.String,    
                //AnimalCode:t.Number,    
                AnimalSymbol:t.String,  
                AnimalStatus:this.state.lstChickenStatus, 
                CauseOfDeath:t.maybe(t.String),  
                DateOfBirth:t.Date,   
                Gender:this.state.lstGender,        
                SireCode:t.Number,      
                BreederCode:t.Number,  
                BreederFormula:t.String,
                Talents:t.String,       
                Weight:t.Number,       
                FightingRecord:t.String,
                StandardPrice:t.Number,
                Remarks:t.String
            })
        )
    }

    onChange = (ChickenProfileDetails) => {
        var options = t.update(this.state.options, {
            fields: {
                CauseOfDeath: {
                editable: { '$set': ChickenProfileDetails.AnimalStatus === '2003' ? true : false },
                hidden: { '$set': ChickenProfileDetails.AnimalStatus === '2003' ? false : true },
                
              }
            }
        });

        this.setState({options: options, ChickenProfileDetails: ChickenProfileDetails });
    }
    
    cleanupImages() {
        this.setState({
            ChickenProfileDetails:{  
                AnimalName:this.state.ChickenProfileDetails.AnimalName,
                AnimalCode:this.state.ChickenProfileDetails.AnimalCode,
                AnimalSymbol:this.state.ChickenProfileDetails.AnimalSymbol,
                AnimalStatus:this.state.ChickenProfileDetails.AnimalStatus,
                CauseOfDeath:this.state.ChickenProfileDetails.CauseOfDeath,
                DateOfBirth:this.state.ChickenProfileDetails.DateOfBirth,
                Gender:this.state.ChickenProfileDetails.Gender,
                SireCode:this.state.ChickenProfileDetails.SireCode,
                BreederCode:this.state.ChickenProfileDetails.BreederCode,
                BreederFormula:this.state.ChickenProfileDetails.BreederFormula,
                Talents:this.state.ChickenProfileDetails.Talents,
                Weight:this.state.ChickenProfileDetails.Weight,
                FightingRecord :this.state.ChickenProfileDetails.FightingRecord,
                StandardPrice :this.state.ChickenProfileDetails.StandardPrice,
                Remarks :this.state.ChickenProfileDetails.Remarks,

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
            ChickenProfileDetails:{
                AnimalName:this.state.ChickenProfileDetails.AnimalName,
                AnimalCode:this.state.ChickenProfileDetails.AnimalCode,
                AnimalSymbol:this.state.ChickenProfileDetails.AnimalSymbol,
                AnimalStatus:this.state.ChickenProfileDetails.AnimalStatus,
                CauseOfDeath:this.state.ChickenProfileDetails.CauseOfDeath,
                DateOfBirth:this.state.ChickenProfileDetails.DateOfBirth,
                Gender:this.state.ChickenProfileDetails.Gender,
                SireCode:this.state.ChickenProfileDetails.SireCode,
                BreederCode:this.state.ChickenProfileDetails.BreederCode,
                BreederFormula:this.state.ChickenProfileDetails.BreederFormula,
                Talents:this.state.ChickenProfileDetails.Talents,
                Weight:this.state.ChickenProfileDetails.Weight,
                FightingRecord :this.state.ChickenProfileDetails.FightingRecord,
                StandardPrice :this.state.ChickenProfileDetails.StandardPrice,
                Remarks :this.state.ChickenProfileDetails.Remarks,

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
    SavechikenProfile=()=>{
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
          var data = {
            AnimalName:this.state.ChickenProfileDetails.AnimalName,
            AnimalCode:this.state.ChickenProfileDetails.AnimalCode,
            AnimalSymbol:this.state.ChickenProfileDetails.AnimalSymbol,
            AnimalStatus:this.state.ChickenProfileDetails.AnimalStatus,
            CauseOfDeath:this.state.ChickenProfileDetails.CauseOfDeath,
            DateOfBirth:this.state.ChickenProfileDetails.DateOfBirth,
            Gender:this.state.ChickenProfileDetails.Gender,
            SireCode:this.state.ChickenProfileDetails.SireCode,
            BreederCode:this.state.ChickenProfileDetails.BreederCode,
            BreederFormula:this.state.ChickenProfileDetails.BreederFormula,
            Talents:this.state.ChickenProfileDetails.Talents,
            Weight:this.state.ChickenProfileDetails.Weight,
            FightingRecord :this.state.ChickenProfileDetails.FightingRecord,
            StandardPrice :this.state.ChickenProfileDetails.StandardPrice,
            Remarks :this.state.ChickenProfileDetails.Remarks,
            FileName:this.state.ChickenProfileDetails.FileName,
          }
     
          services.SaveAnimalProfile(data)
            .then(function (response) { 
              //if(data.FarmID!=0){
                  alert('Animal profile saved successfully.')
                  this.props.navigation.navigate('ChickenProfileList');
              //}
                   
            }.bind(this))
            .catch(function (error) {
              console.log(error);
          });
      }

    }
    ResetchikenProfile=()=>{
        Keyboard.dismiss();
        this.setState({
            ChickenProfileDetails:{ }
            })
    }


    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.navigate('ChickenProfileList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chicken Details</Title>
                    </Body>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddChickenProfile()}
                            options={this.state.options}
                            value={this.state.ChickenProfileDetails}
                            onChange={this.onChange}
                        />
                        <TouchableOpacity onPress={this.state.isPhoto ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={styles.marginbottom_10}>
                            <Text style={styles.blue}>{this.state.isPhoto ? 'Clear Photo' : 'Select Photo'}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {/* this.state.ChickenProfileDetails.AnimalPhoto ? this.state.ChickenProfileDetails.AnimalPhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null */}
                            {(this.state.ChickenProfileDetails.AnimalPhoto ? this.renderAsset(this.state.ChickenProfileDetails.AnimalPhoto) : null)}
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />
                        </ScrollView>
                    </View>
                </Content>
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success block rounded onPress={this.ResetchikenProfile}>
                                <Text style={styles.white} >Reset</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary block rounded onPress={this.SavechikenProfile}>
                                <Text style={styles.white}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}
