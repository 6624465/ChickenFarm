import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image, Keyboard} from 'react-native';

//import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;
import axios from 'axios';

import services from '../Registration/Services';

export default class FarmProfileList extends Component{
    static navigationOptions={
        title : 'Farm Profile',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
    componentDidMount() {
        //axios.get('/FarmProfile/GetFarmProfile/'+axios.defaults.headers.common['MOBILE_NO'])
        services.GetFarmProfile(axios.defaults.headers.common['MOBILE_NO'])
        .then(function (response) {
            debugger;

            //var regi= response.data.farmProfile;
            if(response.data.farmProfile!=null)
            {
                this.setState({
                    //status: (response.data.registration.IsOTPVerified === null || response.data.registration.IsOTPVerified === true) ? true : false,
                    FarmProfileDetails: response.data.farmProfile,
                    imageLink: 'http://192.168.0.109/FMS/Uploads/FarmProfile/'+response.data.farmProfile.MobileNo+'/'+response.data.farmProfile.FarmLogo
                });
                debugger;
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
            FarmProfileDetails:{
                FarmID:0,
                FarmName:null,
                FarmAddress:null,
                PhoneNo:null,
                MobileNo:axios.defaults.headers.common['MOBILE_NO'],
                LineID:null,
                SocialPage:null,
                WebSite:null,
                AboutUs:null,
                FarmLogo:null,
                FileName:null
            },
            isLogo:false,
            imageLink:null
        },

        this.AddFarmProfile=t.struct({
            FarmName:t.String,
            FarmAddress:t.String,
            PhoneNo:t.Number,
            MobileNo:t.Number,
            LineID:t.maybe(t.String),
            SocialPage:t.maybe(t.String),
            WebSite:t.maybe(t.String),
            AboutUs:t.maybe(t.String),
            //AddLogo:t.String
        }),

        this.AddFarmProfileOptions={
            fields:{
                FarmName:{
                    label: 'Farm Name',
                    placeholder:'Please Enter Your Farm Name',
                    //error:'Please Enter Your Full Name'
                
                },
                FarmAddress:{
                    label: 'Farm Address',
                    placeholder:'Please Enter Farm Address',
                    //error:'Please Enter Farm Address'
                
                },
                PhoneNo:{
                    label: 'Phone Number',
                    placeholder:'Please Enter Phone Number',
                    //error:'Please Enter Tel/Line Number'
                
                },
                MobileNo:{
                    label: 'Mobile Number',
                    placeholder:'Please Enter Mobile Number',
                    //error:'Please Enter Tel/Line Number'
                    editable:false
                
                },
                SocialPage:{
                    label: 'Social Page',
                    placeholder:'Social Page ',
                    // error:'Please Enter Your Full Name'
                
                },
                WebSite:{
                    label: 'Website',
                    placeholder:' Website Name',
                    // error:'Please Enter Your Full Name'
                
                },
                AboutUs:{
                    label: 'About Us',
                    placeholder:'About Us',
                    multiline:true,                           
                    //error:'Please Enter Your Full Name'                        
                },
                LineID:{
                    label: 'LineID',
                    placeholder:'LineID',
                  
                },
            }
        }
    }

    onChange = (FarmProfileDetails) => {
        this.setState({FarmProfileDetails});
    }

    cleanupImages() {
        // ImagePicker.clean().then(() => {

        //   console.log('removed tmp images from tmp directory');
        // }).catch(e => {
        //   alert(e);
        // });

        this.setState({
            FarmProfileDetails:{    
                FarmID:this.state.FarmProfileDetails.FarmID,
                FarmName:this.state.FarmProfileDetails.FarmName,
                FarmAddress:this.state.FarmProfileDetails.FarmAddress,
                PhoneNo:this.state.FarmProfileDetails.PhoneNo,
                MobileNo:this.state.FarmProfileDetails.MobileNo,
                LineID:this.state.FarmProfileDetails.LineID,
                SocialPage:this.state.FarmProfileDetails.SocialPage,
                WebSite:this.state.FarmProfileDetails.WebSite,
                AboutUs:this.state.FarmProfileDetails.AboutUs,

                FarmLogo: null,
                FileName:null
            },
            isLogo:false
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
            FarmProfileDetails:{
                FarmID:this.state.FarmProfileDetails.FarmID,
                FarmName:this.state.FarmProfileDetails.FarmName,
                FarmAddress:this.state.FarmProfileDetails.FarmAddress,
                PhoneNo:this.state.FarmProfileDetails.PhoneNo,
                MobileNo:this.state.FarmProfileDetails.MobileNo,
                LineID:this.state.FarmProfileDetails.LineID,
                SocialPage:this.state.FarmProfileDetails.SocialPage,
                WebSite:this.state.FarmProfileDetails.WebSite,
                AboutUs:this.state.FarmProfileDetails.AboutUs,

                FarmLogo: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
                FileName: image.data

                // FarmLogo: images.map(i => {
                //     console.log('received image', i);
                //     debugger;
                //     //var file = 'data:image/png;base64,' + i.data;
                //     //return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                //     return {uri: `data:${i.mime};base64,`+ i.data, width: i.width, height: i.height}
                // }),
                // FileName:images.map(i => {
                //     return i.data
                // })
            },
            isLogo:true
          });
        }).catch(e => alert(e));
        debugger;
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

    SaveFarmProfile=()=>
    {

      Keyboard.dismiss();
      var value = this.refs.form.getValue();
      if (value) {
        var data = {
            //FarmID:this.state.FarmProfileDetails.FarmID,
            FarmName:this.state.FarmProfileDetails.FarmName,
            FarmAddress:this.state.FarmProfileDetails.FarmAddress,
            PhoneNo:this.state.FarmProfileDetails.PhoneNo,
            MobileNo:this.state.FarmProfileDetails.MobileNo,
            LineID:this.state.FarmProfileDetails.LineID,
            SocialPage:this.state.FarmProfileDetails.SocialPage,
            WebSite:this.state.FarmProfileDetails.WebSite,
            AboutUs:this.state.FarmProfileDetails.AboutUs,
            FileName:this.state.FarmProfileDetails.FileName,
            Status:true
        }
        debugger;
        // axios({
        //     method: 'post',
        //     url: '/FarmProfile/save',
        //     data: data
        //   })
        services.SaveFarmProfile(data)
          .then(function (response) { 
            debugger;   
            this.props.navigation.navigate('Navigation');
            
            // this.setState({
            //     reg: response.data.registration,
            //     status: response.data.registration.IsOTPVerified===null || response.data.registration.IsOTPVerified===true ? true : false
            // });       
          }.bind(this))
          .catch(function (error) {
            console.log(error);
        });
    }
    }
    ResetFarmProfile=()=>
    {
      Keyboard.dismiss();
        this.setState({
        FarmProfileDetails:{

        }
    })
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left>                        
                        <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>                        
                    </Left>
                    <Body>
                        <Title>Add Farm Profile</Title>
                    </Body>
                </Header>

                <Content>
                    <View style={styles.container}>
                        <Form
                            ref='form'
                            type={this.AddFarmProfile}
                            options={this.AddFarmProfileOptions}
                            value={this.state.FarmProfileDetails}
                            onChange={this.onChange}
                        />

                         <TouchableOpacity onPress={this.state.isLogo ? this.cleanupImages.bind(this) : this.pickMultiple.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>{this.state.isLogo ? 'Clear Logos' : 'Select Logos'}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>Clear Logo</Text>
                        </TouchableOpacity>
                         */}

                        <ScrollView>
                            {
                                (this.state.FarmProfileDetails.FarmName != null)
                                ?                            
                                (this.state.FarmProfileDetails.FarmLogo ? this.renderAsset(this.state.FarmProfileDetails.FarmLogo) : null)
                                :
                                (
                                <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />)
                                }
                            {/* {this.state.FarmProfileDetails.FarmLogo ? this.state.FarmProfileDetails.FarmLogo.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null} */}
                        </ScrollView>
                    </View>
                </Content>
                
                <Footer style={{backgroundColor:'white'}}>
                    <View style={{flexDirection:'row' ,flexWrap:'wrap'}} >
                        <View style={{width:'50%'}}>
                            <Button success  block rounded onPress={this.ResetFarmProfile.bind(this)} style={{width:'100%',justifyContent:'center'}}>
                                <Text style={{color:'white'}} >Reset</Text>
                            </Button>
                        </View>
                        <View style={{width:'50%', alignItems:'flex-end'}}>
                            <Button primary  block rounded onPress={this.SaveFarmProfile.bind(this)} style={{width:'100%',justifyContent:'center'}}>
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
