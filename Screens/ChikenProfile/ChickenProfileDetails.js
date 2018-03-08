import React, { Component } from 'react';
import { View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image } from 'react-native';

import { StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
import moment from 'moment';
var ImagePicker = NativeModules.ImageCropPicker;

var Gender = t.enums({  
    M: 'Male',
    F: 'Female'
  });

var ChickenStatus = t.enums({
    1: 'Born on Farm',
    2: 'Purchased',
    3: 'Sold',
    4: 'Death on Farm'
});
  
export default class ChickenProfileDetails extends Component{
    static navigationOptions={
        title : 'Chicken Profile Details',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'},
        drawerLabel: () => null
    }
   
    constructor()
    {
        super();
        this.state ={            
            ChickenProfileDetails:{
                ChooseStatus:null,
                CauseOfDeath:null,
                Name:null,
                ChickenCode:null,
                ChickenSymbol:null,
                DateOfBirth:null,
                gender:null,
                SireCode:null,
                BreederCode:null,
                Breed:null,
                Talents:null,
                Weight:null,
                FightingRecord :null,
                StandardPrice :null,
                AdditionalNote :null,
                AddPhoto:null,
            },
            isPhoto:false,
            options:{
                fields:{
                    ChooseStatus:{
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
                    Name:{
                        label: 'Name',
                        placeholder:'Name',
                        //error:'Please Enter Farm Address'                        
                    },
                    ChickenCode:{
                        label: 'Chicken Code',
                        placeholder:'Chicken Code',
                        // error:'Please Enter ChikenCode'                        
                    },
                    ChickenSymbol:{
                        label: 'Chicken Symbol',
                        placeholder:'Chicken Symbol',
                        // error:'Please Enter Your Full Name'                        
                    },
                    gender:{
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
                        minimumDate: new Date(),
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
                    Breed:{
                        label: 'Breed',
                        placeholder:'Breed',
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
                    AdditionalNote:{
                        label: 'Additional Note',
                        placeholder:'Additional Note',
                        // error:'Please Enter ChikenCode'                        
                    }
                }
            }
        },

        this.AddChickenProfile=t.struct({
            ChooseStatus:ChickenStatus,
            CauseOfDeath:t.String,
            Name:t.String,
            ChickenCode:t.Number,
            ChickenSymbol:t.String,
            DateOfBirth:t.Date,
            gender:Gender,
            SireCode:t.String,
            BreederCode:t.String,
            Breed:t.String,
            Talents:t.Number,
            Weight:t.Number,
            FightingRecord :t.String,
            StandardPrice :t.Number,
            AdditionalNote :t.String,
            //AddPhoto:t.String
        })

        // this.AddChickenProfileOptions={
        //     fields:{
        //         ChooseStatus:{
        //             label: 'Choose Staues',
        //             //placeholder:'Please Enter Your Full Name',
        //             //error:'Please Enter Your Full Name'                        
        //         },
        //         CauseOfDeath:{
        //             label: 'Cause Of Death',
        //             placeholder:'CauseOfDeath',
        //             //error:'Please Enter Your Full Name'  
        //             editable: false,
        //         },
        //         Name:{
        //             label: 'Name',
        //             placeholder:'Name',
        //             //error:'Please Enter Farm Address'                        
        //         },
        //         ChickenCode:{
        //             label: 'Chicken Code',
        //             placeholder:'Chicken Code',
        //             // error:'Please Enter ChikenCode'                        
        //         },
        //         ChickenSymbol:{
        //             label: 'Chicken Symbol',
        //             placeholder:'Chicken Symbol',
        //             // error:'Please Enter Your Full Name'                        
        //         },
        //         gender:{
        //             label: 'Gender',
        //             //placeholder:' Web Site Name',
        //             // error:'Please Enter Your Full Name'                        
        //         },
        //         SireCode:{
        //             label: 'Sire Code',
        //             placeholder:'Sire Code',
        //             //multiline:true,
        //             //error:'Please Enter Your Full Name'                        
        //         },
        //         DateOfBirth: {
        //             label: 'Date Of Birth:',
        //             placeholder: 'Date Of Birth',
        //             minimumDate: new Date(),
        //             mode: 'date',
        //             config: {
        //                 format: (date) => String(moment(date).format("MM/DD/YYYY")),
        //             }
        //         },
        //         BreederCode:{
        //             label: 'Breeder Code',
        //             placeholder:'Breeder Code',
        //             //error:'Please Enter Your Full Name'                        
        //         },
        //         Breed:{
        //             label: 'Breed',
        //             placeholder:'Breed',
        //             //error:'Please Enter Farm Address'                        
        //         },
        //         Talents:{
        //             label: 'Talents',
        //             placeholder:'Talents',
        //             // error:'Please Enter ChikenCode'                        
        //         },
        //         Weight:{
        //             label: 'Weight',
        //             placeholder:'Weight',
        //             // error:'Please Enter Your Full Name'                        
        //         },
        //         FightingRecord:{
        //             label: 'Fighting Record',
        //             placeholder:'Fighting Record',
        //             //error:'Please Enter Your Full Name'                        
        //         },
        //         StandardPrice:{
        //             label: 'Standard Price',
        //             placeholder:'Standard Price',
        //             //error:'Please Enter Farm Address'                        
        //         },
        //         AdditionalNote:{
        //             label: 'Additional Note',
        //             placeholder:'Additional Note',
        //             // error:'Please Enter ChikenCode'                        
        //         }
        //     }
        // }
    }

    onChange = (ChickenProfileDetails) => {
        debugger;
        var options = t.update(this.state.options, {
            fields: {
                CauseOfDeath: {
                editable: { '$set': ChickenProfileDetails.ChooseStatus==='4' ? true : false }
              }
            }
        });

        this.setState({options: options, ChickenProfileDetails: ChickenProfileDetails });
    }
    
    cleanupImages() {
        this.setState({
            ChickenProfileDetails:{    
                ChooseStatus:this.state.ChickenProfileDetails.ChooseStatus,
                CauseOfDeath:this.state.ChickenProfileDetails.CauseOfDeath,
                Name:this.state.ChickenProfileDetails.Name,
                ChickenCode:this.state.ChickenProfileDetails.ChickenCode,
                ChickenSymbol:this.state.ChickenProfileDetails.ChickenSymbol,
                DateOfBirth:this.state.ChickenProfileDetails.DateOfBirth,
                gender:this.state.ChickenProfileDetails.gender,
                SireCode:this.state.ChickenProfileDetails.SireCode,
                BreederCode:this.state.ChickenProfileDetails.BreederCode,
                Breed:this.state.ChickenProfileDetails.Breed,
                Talents:this.state.ChickenProfileDetails.Talents,
                Weight:this.state.ChickenProfileDetails.Weight,
                FightingRecord :this.state.ChickenProfileDetails.FightingRecord,
                StandardPrice :this.state.ChickenProfileDetails.StandardPrice,
                AdditionalNote :this.state.ChickenProfileDetails.AdditionalNote,

                AddPhoto: null
            },
            isPhoto:false
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
            ChickenProfileDetails:{
                ChooseStatus:this.state.ChickenProfileDetails.ChooseStatus,
                CauseOfDeath:this.state.ChickenProfileDetails.CauseOfDeath,
                Name:this.state.ChickenProfileDetails.Name,
                ChickenCode:this.state.ChickenProfileDetails.ChickenCode,
                ChickenSymbol:this.state.ChickenProfileDetails.ChickenSymbol,
                DateOfBirth:this.state.ChickenProfileDetails.DateOfBirth,
                gender:this.state.ChickenProfileDetails.gender,
                SireCode:this.state.ChickenProfileDetails.SireCode,
                BreederCode:this.state.ChickenProfileDetails.BreederCode,
                Breed:this.state.ChickenProfileDetails.Breed,
                Talents:this.state.ChickenProfileDetails.Talents,
                Weight:this.state.ChickenProfileDetails.Weight,
                FightingRecord :this.state.ChickenProfileDetails.FightingRecord,
                StandardPrice :this.state.ChickenProfileDetails.StandardPrice,
                AdditionalNote :this.state.ChickenProfileDetails.AdditionalNote,

                AddPhoto: images.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                })
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
                            {/* {this.state.value.image ? this.renderAsset(this.state.value.image) : null} */}
                            {this.state.ChickenProfileDetails.AddPhoto ? this.state.ChickenProfileDetails.AddPhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
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
