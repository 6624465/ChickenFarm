import React, { Component } from 'react';
import {View, Text,StyleSheet, NativeModules, ScrollView, TouchableOpacity, Image, Keyboard, ActivityIndicator,ToastAndroid} from 'react-native';

//import {StackNavigator} from 'react-navigation';
import { Container, Content, Header, Icon, Left, Title, Body, Button, Footer,Right } from 'native-base';

var t = require('tcomb-form-native');
var Form = t.form.Form;
var ImagePicker = NativeModules.ImageCropPicker;
import axios from 'axios';

import services from './Services';
import styles from '../stylesheet';

export default class FarmProfileList extends Component{
    static navigationOptions={
        title : 'Farm Profile',
        headerStyle:{backgroundColor:'#fff'},
        headerTitleStyle:{color:'#212121'}
    }
    componentDidMount() {
        services.GetFarmProfile(axios.defaults.headers.common['MOBILE_NO'])
        .then(function (response) {
            if(response.data.farmProfile!=null)
            {
                debugger;
                this.setState({
                    FarmProfileDetails: response.data.farmProfile,
                    imageLink: axios.defaults.baseURL+'/Uploads/'+response.data.farmProfile.FarmID+'/FarmProfile/'+response.data.farmProfile.MobileNo+'/'+response.data.farmProfile.FarmLogo
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
            FarmProfileDetails:{
                FarmID:null,
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
            imageLink:null,
            isLoading: false,
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
                    placeholder:'Please Enter Your Farm Name'
                
                },
                FarmAddress:{
                    label: 'Farm Address',
                    placeholder:'Please Enter Farm Address'
                
                },
                PhoneNo:{
                    label: 'Phone Number',
                    placeholder:'Please Enter Phone Number'
                
                },
                MobileNo:{
                    label: 'Mobile Number',
                    placeholder:'Please Enter Mobile Number',
                    editable:false
                },
                SocialPage:{
                    label: 'Social Page',
                    placeholder:'Social Page ',
                    // error:'Please Enter Your Full Name'
                
                },
                WebSite:{
                    label: 'Website',
                    placeholder:' Website Name'
                },
                AboutUs:{
                    label: 'About Us',
                    placeholder:'About Us'              
                },
                LineID:{
                    label: 'Line ID',
                    placeholder:'Line ID'
                },
            }
        }
    }

    onChange = (FarmProfileDetails) => {
        this.setState({FarmProfileDetails});
    }

    cleanupImages() {
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
    }

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
        
    renderAsset(image) {
        return this.renderImage(image);
    }

    SaveFarmProfile=()=>
    {
        Keyboard.dismiss();
        var value = this.refs.form.getValue();
        if (value) {
            this.setState({
                isLoading: true
            });
            debugger;
            var data = {
                FarmID:this.state.FarmProfileDetails.FarmID,
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
            services.SaveFarmProfile(data)
            .then(function (response) {                 
                this.setState({
                isLoading: false
                });
                if(response.data>0){
                    axios.defaults.headers.common['FarmID'] = response.data;
                    AsyncStorage.setItem('FarmID', response.data.toString()); 
                    //alert('Farm profile saved successfully.')
                    ToastAndroid.showWithGravity(
                        'Saved successfully...',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                      );
                    this.props.navigation.navigate('MainDashboard');
                }
                else{
                    this.props.navigation.navigate('Navigation');
                }
            
            // this.setState({
            //     reg: response.data.registration,
            //     status: response.data.registration.IsOTPVerified===null || response.data.registration.IsOTPVerified===true ? true : false
            // });       
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }
        else{
            ToastAndroid.showWithGravity(
                'Please Enter all manadatary fields...',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
        }
    }
    ResetFarmProfile=()=>
    {
        Keyboard.dismiss();
        this.setState({
            FarmProfileDetails:{ },
            isLogo:false,
            imageLink:null
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
                        {this.state.FarmProfileDetails.FarmID!='-1'? 
                        <Button transparent onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
                            <Icon ios='ios-menu' android="md-menu" />
                        </Button>  :null}     
                    </Left>
                    <Body>
                        <View style={{width:230,alignItems:'flex-start'}}>
                             <Title>Add Farm Profile</Title>
                        </View>
                    </Body>
                    <Right></Right>
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
                            <Text style={{color:'blue'}}>{this.state.isLogo ? 'Clear Logo' : 'Select Logo'}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={{marginBottom: 10}}>
                            <Text style={{color:'blue'}}>Clear Logo</Text>
                        </TouchableOpacity>
                         */}

                        <ScrollView>
                            {
                                (this.state.FarmProfileDetails.FarmLogo ? this.renderAsset(this.state.FarmProfileDetails.FarmLogo) : null)
                            }
                            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={{uri: this.state.imageLink}}  />
                            {/* {this.state.FarmProfileDetails.FarmLogo ? this.state.FarmProfileDetails.FarmLogo.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null} */}
                        </ScrollView>
                    </View>
                </Content>
                
                <Footer style={styles.bgc_white}>
                    <View style={styles.flexDirectionWrap} >
                        <View style={styles.width_50}>
                            <Button success  block rounded onPress={this.ResetFarmProfile.bind(this)}>
                                <Text style={styles.white} >Reset</Text>
                            </Button>
                        </View>
                        <View style={styles.width_50_flex_end}>
                            <Button primary  block rounded onPress={this.SaveFarmProfile.bind(this)}>
                                <Text style={styles.white}>Save</Text>
                            </Button>
                        </View>
                    </View>
                </Footer>
            </Container>
        );
    }
}