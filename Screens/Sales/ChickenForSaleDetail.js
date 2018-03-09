import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image} from 'react-native';

import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;

export default class ChickenForSaleDetail extends Component{
    static navigationOptions={
        drawerLabel: () => null
    }
    
    constructor()
    {
        super();
        this.state ={
            ChickenForSaleDetail:{
                ChickenCode:null,
                Seller:null,
                Breed:null,
                SireCode:null,
                BreederCode:null,
                Talents:null,
                Age:null,
                Weight:null,
                FightingRecord:null,
                StandardPrice:null,
                Status:null,
                AddPhoto:null,
                AddClip:null,
            },
            isLogo:false
        },

        this.ChickenForSaleDetail=t.struct({
            ChickenCode:t.String,
            Seller:t.String,
            Breed:t.String,
            SireCode:t.String,
            BreederCode:t.String,
            Talents:t.String,
            Age:t.Number,
            Weight:t.Number,
            FightingRecord:t.String,
            StandardPrice:t.String,
            Status:t.String 
            //AddLogo:t.String
        }),

        this.ChickenForSaleDetailOptions={
            fields:{
                ChickenCode:{
                    label: 'Chicken Code',
                    placeholder:'Chicken Code',
                    //error:'Please Enter Your Full Name'
                
                },
                Seller:{
                    label: 'Seller',
                    placeholder:'Seller',
                    //error:'Please Enter Farm Address'
                
                },
                Breed:{
                    label: 'Breed',
                    placeholder:'Breed',
                    //error:'Please Enter Tel/Line Number'
                
                },
                SireCode:{
                    label: 'Sire Code',
                    placeholder:'Sire Code',
                    // error:'Please Enter Your Full Name'
                
                },
                BreederCode:{
                    label: 'Breeder Code',
                    placeholder:' Breeder Code',
                    // error:'Please Enter Your Full Name'
                
                },
                Talents:{
                    label: 'Talents',
                    placeholder:'Talents',
                                          
                },
                Age:{
                    label: 'Age',
                    placeholder:'Age',
                    //error:'Please Enter Farm Address'
                
                },
                Weight:{
                    label: 'Weight',
                    placeholder:'Weight',
                    //error:'Please Enter Tel/Line Number'
                
                },
                FightingRecord:{
                    label: 'Fighting Record',
                    placeholder:'Fighting Record',
                    // error:'Please Enter Your Full Name'
                
                },
                StandardPrice:{
                    label: 'Standard Price',
                    placeholder:' Standard Price',
                    // error:'Please Enter Your Full Name'
                
                },
                Status:{
                    label: 'Status',
                    placeholder:'Status',
                                          
                },

            }
        }
    }

    onChange = (ChickenForSaleDetail) => {
        this.setState({ChickenForSaleDetail});
    }

    cleanupImages() {
        // ImagePicker.clean().then(() => {

        //   console.log('removed tmp images from tmp directory');
        // }).catch(e => {
        //   alert(e);
        // });

        this.setState({
            ChickenForSaleDetail:{    
                ChickenCode:this.state.ChickenForSaleDetail.ChickenCode,
                Seller:this.state.ChickenForSaleDetail.Seller,
                Breed:this.state.ChickenForSaleDetail.Breed,
                SireCode:this.state.ChickenForSaleDetail.SireCode,
                BreederCode:this.state.ChickenForSaleDetail.BreederCode,
                Talents:this.state.ChickenForSaleDetail.Talents,
                Age:this.state.ChickenForSaleDetail.Age,
                Weight:this.state.ChickenForSaleDetail.Weight,
                FightingRecord:this.state.ChickenForSaleDetail.FightingRecord,
                StandardPrice:this.state.ChickenForSaleDetail.StandardPrice,
                Status:this.state.ChickenForSaleDetail.Status,

                AddPhoto: null,
                AddClip:null
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
            ChickenForSaleDetail:{
                ChickenCode:this.state.ChickenForSaleDetail.ChickenCode,
                Seller:this.state.ChickenForSaleDetail.Seller,
                Breed:this.state.ChickenForSaleDetail.Breed,
                SireCode:this.state.ChickenForSaleDetail.SireCode,
                BreederCode:this.state.ChickenForSaleDetail.BreederCode,
                Talents:this.state.ChickenForSaleDetail.Talents,
                Age:this.state.ChickenForSaleDetail.Age,
                Weight:this.state.ChickenForSaleDetail.Weight,
                FightingRecord:this.state.ChickenForSaleDetail.FightingRecord,
                StandardPrice:this.state.ChickenForSaleDetail.StandardPrice,
                Status:this.state.ChickenForSaleDetail.Status,

                AddPhoto: images.map(i => {
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
                        <Button transparent onPress={()=>this.props.navigation.navigate('ChickenForSaleList')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title> Chicken For Sale Detail</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.ChickenForSaleDetail}
                            options={this.ChickenForSaleDetailOptions}
                            value={this.state.ChickenForSaleDetail}
                            onChange={this.onChange}
                        />
                         <TouchableOpacity onPress={this.state.isLogo ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isLogo ? 'Clear Photo' : 'Select Photo'}</Text>
                        </TouchableOpacity>
                        <ScrollView>
                            {this.state.ChickenForSaleDetail.AddPhoto ? this.state.ChickenForSaleDetail.AddPhoto.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
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
