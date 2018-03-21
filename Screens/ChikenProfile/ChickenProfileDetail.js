import React, { Component } from 'react';
import { View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image,Keyboard } from 'react-native';

import { StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';
var ImagePicker = NativeModules.ImageCropPicker;
import services from './Services'

var Gender = t.enums({  
    1: 'Male',
    2: 'Female'
  });

var ChickenStatus = t.enums({
    1: 'Born on Farm',
    2: 'Purchased',
    3: 'Sold',
    4: 'Death on Farm'
});
  
export default class ChickenProfileDetail extends Component{
    static navigationOptions={
        title : 'Chicken Profile Details',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        drawerLabel: () => null
    }
    
    componentDidMount() {
        services.GetAnimalProfile(this.props.navigation.state.params.animalCode,0)
        .then(function (response) {
            if(response.data.animalProfile!=null)
            {
                var dtls = response.data.animalProfile;
                dtls.DateOfBirth = moment(dtls.DateOfBirth).toDate();
               
                this.setState({
                    ChickenProfileDetails: dtls,
                    imageLink: axios.defaults.baseURL+'/Uploads/AnimalProfile/'+response.data.animalProfile.AnimalCode+'/'+response.data.animalProfile.AnimalPhoto
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
            options:{
                fields:{
               
                    AnimalName:{
                        label: 'Name',
                        placeholder:'Name',
                        //error:'Please Enter Farm Address'                        
                    },
                    AnimalCode:{
                        label: 'Code',
                        placeholder:'Code',
                        // error:'Please Enter ChikenCode'                        
                    },
                    AnimalSymbol:{
                        label: 'Symbol',
                        placeholder:'Symbol',
                        // error:'Please Enter Your Full Name'                        
                    },
                    AnimalStatus:{
                        label: 'Choose Staues',
                        //placeholder:'Please Enter Your Full Name',
                        //error:'Please Enter Your Full Name'                        
                    },
                    CauseOfDeath:{
                        label: 'Cause Of Death',
                        placeholder:'CauseOfDeath',
                        //error:'Please Enter Your Full Name'  
                        editable: false                      
                    },
                    Gender:{
                        label: 'Gender',
                        //placeholder:' Web Site Name',
                        // error:'Please Enter Your Full Name'                        
                    },
                    SireCode:{
                        label: 'Sire Code',
                        placeholder:'Sire Code',
                        //multiline:true,
                        //error:'Please Enter Your Full Name'                        
                    },
                    DateOfBirth: {
                        label: 'Date Of Birth:',
                        placeholder: 'Date Of Birth',
                        //minimumDate: new Date(),
                        mode: 'date',
                        config: {
                            format: (date) => String(moment(date).format("MM/DD/YYYY")),
                        }
                    },
                    BreederCode:{
                        label: 'Breeder Code',
                        placeholder:'Breeder Code',
                        //error:'Please Enter Your Full Name'                        
                    },
                    BreederFormula:{
                        label: 'Breeder Formula',
                        placeholder:'Breeder Formula',
                        //error:'Please Enter Farm Address'                        
                    },
                    Talents:{
                        label: 'Talents',
                        placeholder:'Talents',
                        // error:'Please Enter ChikenCode'                        
                    },
                    Weight:{
                        label: 'Weight',
                        placeholder:'Weight',
                        // error:'Please Enter Your Full Name'                        
                    },
                    FightingRecord:{
                        label: 'Fighting Record',
                        placeholder:'Fighting Record',
                        //error:'Please Enter Your Full Name'                        
                    },
                    StandardPrice:{
                        label: 'Standard Price',
                        placeholder:'Standard Price',
                        //error:'Please Enter Farm Address'                        
                    },
                    Remarks:{
                        label: 'Remarks',
                        placeholder:'Remarks',
                        // error:'Please Enter ChikenCode'                        
                    }
                }
            }
        },

        this.AddChickenProfile=t.struct({

                            AnimalName:t.String,    
                            AnimalCode:t.Number,    
                            AnimalSymbol:t.String,  
                            AnimalStatus:ChickenStatus, 
                            CauseOfDeath:t.String,  
                            DateOfBirth:t.Date,   
                            Gender:Gender,        
                            SireCode:t.Number,      
                            BreederCode:t.Number,  
                            BreederFormula:t.String,
                            Talents:t.String,       
                            Weight:t.Number,       
                            FightingRecord:t.String,
                            StandardPrice:t.Number,
                            Remarks:t.String,       
                            //[AnimalPhoto]   

                })

       
    }

    onChange = (ChickenProfileDetails) => {
        var options = t.update(this.state.options, {
            fields: {
                CauseOfDeath: {
                editable: { '$set': ChickenProfileDetails.AnimalStatus==='4' ? true : false }
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
        debugger;
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
        debugger;
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            debugger;
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
              if(data.FarmID!=0){
                  alert('Animal profile saved successfully.')
                  this.props.navigation.navigate('ChickenProfileList');
              }
              else{
                  this.props.navigation.navigate('Navigation');
              }
                   
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
                            type={this.AddChickenProfile}
                            options={this.state.options}
                            value={this.state.ChickenProfileDetails}
                            onChange={this.onChange}
                        />
                        <TouchableOpacity onPress={this.state.isPhoto ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isPhoto ? 'Clear Photo' : 'Select Photo'}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {/* this.state.ChickenProfileDetails.AnimalPhoto ? this.state.ChickenProfileDetails.AnimalPhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null */}
                            {(this.state.ChickenProfileDetails.AnimalPhoto ? this.renderAsset(this.state.ChickenProfileDetails.AnimalPhoto) : null)}
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />
                        </ScrollView>
                    </View>
                </Content>
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success block rounded onPress={this.ResetchikenProfile} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary block rounded onPress={this.SavechikenProfile} style={{width:'100%',justifyContent:'center'}}>
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
